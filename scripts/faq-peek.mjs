import fs from 'node:fs'

const h = JSON.parse(fs.readFileSync('.design-extract/homepage.json', 'utf8'))
console.log('page fill', h.fill)

const raw = fs.readFileSync(
  'c:/Users/leogu/Desktop/Projects/pencil-devleadhunter/landscape.pen',
  'utf8',
)
const re = /"content":\s*"([^"]{8,200})"/g
const all = []
let m
while ((m = re.exec(raw))) all.push(m[1])
const faqs = [...new Set(all)].filter((t) => /\?|policy|cancel|cost|include|guarantee/i.test(t))
console.log(faqs.join('\n---\n'))
