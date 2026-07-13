import fs from 'node:fs'

const pen = JSON.parse(
  fs.readFileSync('c:/Users/leogu/Desktop/Projects/pencil-devleadhunter/landscape.pen', 'utf8'),
)
const home = pen.children.find((c) => c.name === 'Homepage')

function findAll(n, pred, acc = []) {
  if (pred(n)) acc.push(n)
  for (const c of n.children || []) findAll(c, pred, acc)
  return acc
}

function find(n, name) {
  if (n.name === name) return n
  for (const c of n.children || []) {
    const f = find(c, name)
    if (f) return f
  }
}

function dump(n, d = 0, max = 6) {
  if (!n || d > max) return
  const fill =
    typeof n.fill === 'string'
      ? n.fill
      : n.fill?.url || (n.fill ? JSON.stringify(n.fill).slice(0, 120) : '')
  const geom = n.geometry ? ` geom=${String(n.geometry).slice(0, 80)}` : ''
  const cr = n.cornerRadius != null ? ` r=${JSON.stringify(n.cornerRadius)}` : ''
  const content = n.content ? ` "${String(n.content).replace(/\s+/g, ' ').slice(0, 50)}"` : ''
  console.log(
    `${'  '.repeat(d)}${n.name || n.type} [${n.type}] ${n.width ?? ''}x${n.height ?? ''} ${fill}${cr}${geom}${content}`,
  )
  for (const c of n.children || []) dump(c, d + 1, max)
}

const logos = findAll(home, (n) => n.content === 'Eco Landscaping')
console.log(
  'LOGOS',
  logos.map((l) => ({ fill: l.fill, fontSize: l.fontSize, fontWeight: l.fontWeight })),
)

for (const name of ['GRADIENT TOP LEFT', 'GRADIENT TOP RIGHT', 'GRADIENT BOTTOM LEFT']) {
  const g = find(home, name)
  console.log('\n##', name)
  dump(g, 0, 4)
}

console.log('\n## HERO')
dump(find(home, 'HERO SECTION'), 0, 5)

console.log('\n## SERVICES first card')
const services = find(home, 'SERVICES SECTION')
const firstCol = (services.children || []).find((c) => c.name === 'Container')?.children?.[0]
dump(firstCol, 0, 6)

console.log('\n## ABOUT')
dump(find(home, 'ABOUT SECTION'), 0, 7)

// Export icon geometries for SVG recreation
const serviceIcons = findAll(firstCol, (n) => n.type === 'path')
fs.writeFileSync('.design-extract/service-card-paths.json', JSON.stringify(serviceIcons, null, 2))

const about = find(home, 'ABOUT SECTION')
const aboutPaths = findAll(
  about,
  (n) => n.type === 'path' || n.type === 'vector' || n.name === 'ICON' || n.name === 'Icon',
)
fs.writeFileSync(
  '.design-extract/about-icons.json',
  JSON.stringify(aboutPaths.slice(0, 40), null, 2),
)

// Image fills in hero
console.log('\nHERO IMAGES')
for (const n of findAll(find(home, 'HERO SECTION'), () => true)) {
  if (n.fill?.url) console.log(n.name, n.fill.url, n.width, n.height, 'r=', n.cornerRadius)
  if (Array.isArray(n.fill)) for (const f of n.fill) if (f.url) console.log(n.name, f.url)
}
