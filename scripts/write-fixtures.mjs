import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('.')
const PEN = 'c:/Users/leogu/Desktop/Projects/pencil-devleadhunter/landscape.pen'
const OUT = path.join(ROOT, 'app', 'design-fixtures')
fs.mkdirSync(OUT, { recursive: true })

const pen = JSON.parse(fs.readFileSync(PEN, 'utf8'))
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

const out = {}
for (const name of ['GRADIENT TOP LEFT', 'GRADIENT TOP RIGHT']) {
  const g = find(home, name)
  const pathNode = findAll(g, (n) => n.type === 'path')[0]
  out[name] = {
    x: g.x,
    y: g.y,
    width: g.width,
    height: g.height,
    fill: pathNode.fill,
    opacity: pathNode.opacity ?? 1,
    geometry: pathNode.geometry,
    pathW: pathNode.width,
    pathH: pathNode.height,
  }
}

const badge = find(find(home, 'HERO SECTION'), 'bagdes')
out.badge = {
  width: badge.width,
  height: badge.height,
  paths: findAll(badge, (n) => n.type === 'path').map((p) => ({
    fill: p.fill,
    opacity: p.opacity ?? 1,
    geometry: p.geometry,
    width: p.width,
    height: p.height,
  })),
}

const play = find(find(home, 'HERO SECTION'), 'Play')
out.play = {
  fill: play.fill,
  geometry: play.geometry,
  width: play.width,
  height: play.height,
  x: play.x,
  y: play.y,
}

const container = find(find(home, 'SERVICES SECTION'), 'Container')
out.serviceCards = (container.children || []).map((card) => {
  const bg = (card.children || []).find((c) => c.name === 'Background')
  const iconFrame = find(card, 'ICON')
  const thumb = (card.children || []).find((c) => c.name === 'Thumbnail')
  const texts = findAll(card, (n) => n.type === 'text')
  return {
    width: card.width,
    height: card.height,
    bg: bg
      ? {
          geometry: bg.geometry,
          fill: bg.fill,
          width: bg.width,
          height: bg.height,
          rotation: bg.rotation,
          flipX: bg.flipX,
        }
      : null,
    thumb: thumb
      ? {
          url: thumb.fill?.url,
          width: thumb.width,
          height: thumb.height,
          x: thumb.x,
          y: thumb.y,
          r: thumb.cornerRadius,
        }
      : null,
    icon: {
      x: iconFrame?.x,
      y: iconFrame?.y,
      width: iconFrame?.width,
      height: iconFrame?.height,
      paths: findAll(iconFrame, (n) => n.type === 'path').map((p) => ({
        fill: p.fill,
        opacity: p.opacity ?? 1,
        geometry: p.geometry,
        width: p.width,
        height: p.height,
      })),
    },
    title: texts.find((t) => t.fontSize >= 20)?.content,
    description: texts.find((t) => t.fontSize < 20)?.content,
  }
})

const about = find(home, 'ABOUT SECTION')
const aboutThumb = findAll(about, (n) => n.name === 'Thumbnail')[0]
out.aboutImage = {
  url: aboutThumb?.fill?.url,
  width: aboutThumb?.width,
  height: aboutThumb?.height,
  cornerRadius: aboutThumb?.cornerRadius,
}
out.aboutIcons = findAll(about, (n) => n.name === 'Icon box').map((box) => {
  const text = findAll(box, (n) => n.type === 'text')[0]
  const icon = find(box, 'ICON')
  return {
    label: text?.content,
    paths: findAll(icon, (n) => n.type === 'path').map((p) => ({
      fill: p.fill,
      opacity: p.opacity ?? 1,
      geometry: p.geometry,
      width: p.width,
      height: p.height,
    })),
  }
})

const header = find(home, 'HEADER')
out.headerLogo = findAll(header, (n) => n.content === 'Eco Landscaping')[0]
out.heroThumb = findAll(find(home, 'HERO SECTION'), (n) => n.name === 'Thumbnail')[0]

const file = path.join(OUT, 'homepage-fixtures.json')
fs.writeFileSync(file, JSON.stringify(out, null, 2))
console.log('WROTE', file, fs.statSync(file).size)
console.log('logo', out.headerLogo.fill, out.headerLogo.fontSize)
console.log('hero r', out.heroThumb.cornerRadius, out.heroThumb.fill?.url)
console.log('about r', out.aboutImage.cornerRadius)
