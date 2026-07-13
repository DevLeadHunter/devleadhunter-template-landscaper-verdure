import net from 'node:net'
import crypto from 'node:crypto'

const KEY = crypto.randomBytes(16).toString('base64')

function encodeFrame(payload) {
  const data = Buffer.from(payload)
  const len = data.length
  let header
  if (len < 126) {
    header = Buffer.alloc(2)
    header[0] = 0x81
    header[1] = 0x80 | len
  } else {
    header = Buffer.alloc(4)
    header[0] = 0x81
    header[1] = 0x80 | 126
    header.writeUInt16BE(len, 2)
  }
  const mask = crypto.randomBytes(4)
  const masked = Buffer.alloc(len)
  for (let i = 0; i < len; i++) masked[i] = data[i] ^ mask[i % 4]
  return Buffer.concat([header, mask, masked])
}

function decodeFrames(buf) {
  const messages = []
  let offset = 0
  while (offset + 2 <= buf.length) {
    const finOpcode = buf[offset]
    const second = buf[offset + 1]
    const masked = (second & 0x80) !== 0
    let len = second & 0x7f
    let pos = offset + 2
    if (len === 126) {
      len = buf.readUInt16BE(pos)
      pos += 2
    } else if (len === 127) {
      len = Number(buf.readBigUInt64BE(pos))
      pos += 8
    }
    let mask
    if (masked) {
      mask = buf.subarray(pos, pos + 4)
      pos += 4
    }
    if (pos + len > buf.length) break
    const payload = Buffer.alloc(len)
    for (let i = 0; i < len; i++) payload[i] = masked ? buf[pos + i] ^ mask[i % 4] : buf[pos + i]
    if ((finOpcode & 0x0f) === 0x1) messages.push(payload.toString())
    offset = pos + len
  }
  return { messages, rest: buf.subarray(offset) }
}

const sock = net.connect({ host: '::1', port: 63855 }, () => {
  sock.write(
    `GET / HTTP/1.1\r\nHost: localhost\r\nConnection: Upgrade\r\nUpgrade: websocket\r\nSec-WebSocket-Version: 13\r\nSec-WebSocket-Key: ${KEY}\r\n\r\n`,
  )
})

let handshakeDone = false
let buffer = Buffer.alloc(0)
let clientId = null

sock.on('data', (chunk) => {
  if (!handshakeDone) {
    const str = chunk.toString()
    if (str.includes('101 Switching Protocols')) {
      handshakeDone = true
      const idx = chunk.indexOf('\r\n\r\n')
      buffer = chunk.subarray(idx + 4)
    } else {
      console.log('handshake fail', str.slice(0, 200))
      return
    }
  } else {
    buffer = Buffer.concat([buffer, chunk])
  }

  const { messages, rest } = decodeFrames(buffer)
  buffer = rest
  for (const msg of messages) {
    console.log('MSG', msg.slice(0, 500))
    try {
      const json = JSON.parse(msg)
      if (json.request_id === 'client-id-assignment') {
        clientId = json.client_id
        console.log('client', clientId)
        // Probe available methods
        const probes = [
          { type: 'ping' },
          { request_id: '1', method: 'get_editor_state' },
          { request_id: '2', action: 'get_editor_state' },
          { request_id: '3', type: 'get_editor_state' },
          { request_id: '4', command: 'list' },
        ]
        for (const p of probes) {
          sock.write(encodeFrame(JSON.stringify(p)))
        }
      }
    } catch {
      // ignore partial frames
    }
  }
})

sock.setTimeout(8000, () => {
  console.log('done timeout, clientId=', clientId)
  sock.destroy()
  process.exit(0)
})
