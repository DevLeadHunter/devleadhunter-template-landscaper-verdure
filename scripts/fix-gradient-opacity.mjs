import fs from 'node:fs'

for (const name of ['gradient-top-left', 'gradient-top-right']) {
  for (const dir of ['public/images', '.playground/public/images']) {
    const file = `${dir}/${name}.svg`
    let s = fs.readFileSync(file, 'utf8')
    s = s.replace('fill-opacity="0.35"', 'fill-opacity="1"')
    fs.writeFileSync(file, s)
  }
  console.log('updated', name)
}
