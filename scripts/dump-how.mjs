import fs from 'node:fs'

const pen = JSON.parse(
  fs.readFileSync('c:/Users/leogu/Desktop/Projects/pencil-devleadhunter/landscape.pen', 'utf8'),
)
const home = pen.children.find((c) => c.name === 'Homepage')

function find(n, name) {
  if (n.name === name) return n
  for (const c of n.children || []) {
    const f = find(c, name)
    if (f) return f
  }
}
function findAll(n, pred, acc = []) {
  if (pred(n)) acc.push(n)
  for (const c of n.children || []) findAll(c, pred, acc)
  return acc
}
function dump(n, d = 0, max = 5) {
  if (!n || d > max) return
  const fill = typeof n.fill === 'string' ? n.fill : n.fill?.url || ''
  const cr = n.cornerRadius != null ? ` r=${JSON.stringify(n.cornerRadius)}` : ''
  console.log(
    `${'  '.repeat(d)}${n.name || n.type} [${n.type}] ${n.x ?? ''},${n.y ?? ''} ${n.width ?? ''}x${n.height ?? ''} ${fill}${cr}`,
  )
  for (const c of n.children || []) dump(c, d + 1, max)
}

console.log('HOW IT WORK')
dump(find(home, 'HOW IT WORK SECTION'))
console.log('\nPORTFOLIO')
dump(find(home, 'PORTFOLIO SECTION'), 0, 4)
console.log('\nCTA')
dump(find(home, 'CTA SECTION'), 0, 3)

// Export how step decorative icons if any
const how = find(home, 'HOW IT WORK SECTION')
const paths = findAll(how, (n) => n.type === 'path')
console.log('\nHOW PATHS', paths.length)
fs.writeFileSync(
  'app/design-fixtures/how-paths.json',
  JSON.stringify(
    paths.map((p) => ({
      name: p.name,
      fill: p.fill,
      geometry: p.geometry,
      width: p.width,
      height: p.height,
      opacity: p.opacity,
    })),
    null,
    2,
  ),
)
