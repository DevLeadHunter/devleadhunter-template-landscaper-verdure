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

const how = find(home, 'HOW IT WORK SECTION')
const cols = findAll(
  how,
  (n) => n.name === 'Columns' && (n.children || []).some((c) => c.name === 'Icon'),
)
console.log('how cols', cols.length)

cols.forEach((col, i) => {
  const iconRoot = find(col, 'ICON') || find(col, 'Icon')
  const paths = findAll(iconRoot, (n) => n.type === 'path')
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" fill="none">
${paths.map((p) => `  <path d="${p.geometry}" fill="#2d746d" fill-opacity="${p.opacity ?? 1}"/>`).join('\n')}
</svg>`
  fs.writeFileSync(`public/images/icon-how-${i}.svg`, svg)
  fs.writeFileSync(`.playground/public/images/icon-how-${i}.svg`, svg)
  console.log('how icon', i, paths.length)
})

// Portfolio arrow button icon if any
const portfolio = find(home, 'PORTFOLIO SECTION')
const buttons = findAll(portfolio, (n) => n.name === 'Button')
console.log('portfolio buttons', buttons.length)
buttons.forEach((b, i) => {
  const paths = findAll(b, (n) => n.type === 'path')
  if (!paths.length) return
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="none">
${paths.map((p) => `  <path d="${p.geometry}" fill="#003f2e" fill-opacity="${p.opacity ?? 1}"/>`).join('\n')}
</svg>`
  fs.writeFileSync(`public/images/icon-portfolio-arrow-${i}.svg`, svg)
  fs.writeFileSync(`.playground/public/images/icon-portfolio-arrow-${i}.svg`, svg)
  console.log('arrow', i, paths.length)
})
