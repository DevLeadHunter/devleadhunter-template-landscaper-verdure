import fs from 'node:fs'

const f = JSON.parse(fs.readFileSync('app/design-fixtures/homepage-fixtures.json', 'utf8'))

function writeBoth(rel, content) {
  fs.writeFileSync(`public/images/${rel}`, content)
  fs.writeFileSync(`.playground/public/images/${rel}`, content)
}

function writeGradient(name, key) {
  const g = f[key]
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${g.width}" height="${g.height}" viewBox="0 0 ${g.pathW} ${g.pathH}" fill="none">
  <path d="${g.geometry}" fill="#00b67a" fill-opacity="0.35"/>
</svg>`
  writeBoth(`${name}.svg`, svg)
  console.log('wrote', name, { x: g.x, y: g.y, w: g.width, h: g.height })
}

writeGradient('gradient-top-left', 'GRADIENT TOP LEFT')
writeGradient('gradient-top-right', 'GRADIENT TOP RIGHT')

f.serviceCards.forEach((card, i) => {
  const paths = card.icon.paths
    .map((p) => `<path d="${p.geometry}" fill="#2d746d" fill-opacity="${p.opacity}"/>`)
    .join('\n  ')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" fill="none">\n  ${paths}\n</svg>`
  writeBoth(`icon-service-${i}.svg`, svg)
  console.log('service icon', i, card.title)
})

f.aboutIcons.forEach((icon, i) => {
  const paths = icon.paths
    .map((p) => `<path d="${p.geometry}" fill="#2d746d" fill-opacity="${p.opacity}"/>`)
    .join('\n  ')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" fill="none">\n  ${paths}\n</svg>`
  writeBoth(`icon-about-${i}.svg`, svg)
  console.log('about icon', i, icon.label)
})

{
  const paths = f.badge.paths
    .map((p) => `<path d="${p.geometry}" fill="#2d746d" fill-opacity="${p.opacity}"/>`)
    .join('\n  ')
  console.log('badge sample', f.badge.paths[0]?.geometry?.slice(0, 140))
  // Badge geometry appears to use small local coords already sized ~67
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="67" height="70" viewBox="0 0 67.02 69.41" fill="none">\n  ${paths}\n</svg>`
  writeBoth('hero-badge.svg', svg)
}

{
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="42" height="50" viewBox="0 0 256 256" fill="none"><path d="${f.play.geometry}" fill="#000"/></svg>`
  writeBoth('play.svg', svg)
}

{
  // After rotation 180 + flipX, notch sits top-right (~63x58)
  const notchSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="264" height="390" viewBox="0 0 264 390">
  <path fill="#ffffff" d="M0 0 H201 V58 H264 V390 H0 Z"/>
</svg>`
  writeBoth('service-card-bg.svg', notchSvg)
  console.log('bg', f.serviceCards[0].bg)
}

console.log('hero thumb', f.heroThumb.cornerRadius, f.heroThumb.fill?.url)
console.log('done')
