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

const out = {}

// Gradients
for (const name of ['GRADIENT TOP LEFT', 'GRADIENT TOP RIGHT']) {
  const g = find(home, name)
  const path = findAll(g, (n) => n.type === 'path')[0]
  out[name] = {
    x: g.x,
    y: g.y,
    width: g.width,
    height: g.height,
    fill: path.fill,
    opacity: path.opacity,
    geometry: path.geometry,
    pathX: path.x,
    pathY: path.y,
    pathW: path.width,
    pathH: path.height,
  }
}

// Hero badge
const badge = find(find(home, 'HERO SECTION'), 'bagdes')
out.badge = {
  width: badge.width,
  height: badge.height,
  paths: findAll(badge, (n) => n.type === 'path').map((p) => ({
    fill: p.fill,
    opacity: p.opacity,
    geometry: p.geometry,
    width: p.width,
    height: p.height,
    x: p.x,
    y: p.y,
  })),
}

// Play button
const play = find(find(home, 'HERO SECTION'), 'Play')
out.play = {
  fill: play.fill,
  geometry: play.geometry,
  width: play.width,
  height: play.height,
  x: play.x,
  y: play.y,
}

// Service cards
const container = find(find(home, 'SERVICES SECTION'), 'Container')
out.serviceCards = (container.children || []).map((card) => {
  const bg = (card.children || []).find((c) => c.name === 'Background')
  const iconFrame = find(card, 'ICON')
  const thumb = (card.children || []).find((c) => c.name === 'Thumbnail')
  const heading = findAll(card, (n) => n.type === 'text' && n.fontSize >= 20)[0]
  const desc = findAll(card, (n) => n.type === 'text' && n.fontSize < 20)[0]
  return {
    width: card.width,
    height: card.height,
    bg: bg
      ? {
          geometry: bg.geometry,
          fill: bg.fill,
          width: bg.width,
          height: bg.height,
          x: bg.x,
          y: bg.y,
        }
      : null,
    thumb: thumb
      ? {
          url: thumb.fill?.url || thumb.fill,
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
        opacity: p.opacity,
        geometry: p.geometry,
        width: p.width,
        height: p.height,
        x: p.x,
        y: p.y,
      })),
    },
    title: heading?.content,
    description: desc?.content,
  }
})

// About image + icons
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
      opacity: p.opacity,
      geometry: p.geometry,
      width: p.width,
      height: p.height,
      x: p.x,
      y: p.y,
    })),
  }
})

// Header logo exact
const header = find(home, 'HEADER')
const headerLogo = findAll(header, (n) => n.content === 'Eco Landscaping')[0]
out.headerLogo = {
  fill: headerLogo.fill,
  fontSize: headerLogo.fontSize,
  fontWeight: headerLogo.fontWeight,
}

// Page fill + button radius
out.pageFill = home.fill
out.buttonRadius = 4
out.heroRadius = 50

fs.writeFileSync('.design-extract/fixures.json', JSON.stringify(out, null, 2))
console.log('wrote fixtures.json')
console.log('service cards', out.serviceCards.length)
console.log('about icons', out.aboutIcons.length)
console.log('header logo', out.headerLogo)
console.log('about cornerRadius', out.aboutImage.cornerRadius)
console.log('gradient TL geom len', out['GRADIENT TOP LEFT'].geometry.length)
