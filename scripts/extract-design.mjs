import fs from 'node:fs'
import path from 'node:path'

const penPath = 'c:/Users/leogu/Desktop/Projects/pencil-devleadhunter/landscape.pen'
const outDir = path.resolve('.design-extract')
const pen = JSON.parse(fs.readFileSync(penPath, 'utf8'))

function collectTexts(node, acc = []) {
  if (node.type === 'text' && node.content) {
    acc.push({
      name: node.name,
      content: node.content,
      fontSize: node.fontSize,
      fontWeight: node.fontWeight,
      fill: node.fill,
      lineHeight: node.lineHeight,
      letterSpacing: node.letterSpacing,
      textAlign: node.textAlign,
      width: node.width,
      height: node.height,
    })
  }
  if (node.children) node.children.forEach((c) => collectTexts(c, acc))
  return acc
}

function collectImages(node, acc = []) {
  const fill = node.fill
  if (typeof fill === 'object' && fill?.url) {
    acc.push({
      name: node.name,
      type: node.type,
      url: fill.url,
      width: node.width,
      height: node.height,
    })
  }
  if (Array.isArray(fill)) {
    for (const f of fill) {
      if (f?.url)
        acc.push({
          name: node.name,
          type: node.type,
          url: f.url,
          width: node.width,
          height: node.height,
        })
    }
  }
  if (node.children) node.children.forEach((c) => collectImages(c, acc))
  return acc
}

function sectionSummary(page) {
  return (page.children || []).map((s) => ({
    name: s.name,
    type: s.type,
    width: s.width,
    height: s.height,
    fill: typeof s.fill === 'string' ? s.fill : s.fill?.url || null,
    layout: s.layout,
    gap: s.gap,
    padding: s.padding,
    texts: collectTexts(s).map((t) => t.content.replace(/\s+/g, ' ').trim()),
    images: collectImages(s).map((i) => i.url),
  }))
}

const report = {}
for (const page of pen.children) {
  const slug = (page.name || page.id).toLowerCase().replace(/[^a-z0-9]+/g, '-')
  report[slug] = {
    name: page.name,
    size: `${page.width}x${page.height}`,
    fill: page.fill,
    sections: sectionSummary(page),
    allTexts: collectTexts(page).map((t) => ({
      ...t,
      content: t.content.replace(/\s+/g, ' ').trim(),
    })),
    allImages: collectImages(page),
  }
  fs.writeFileSync(path.join(outDir, `${slug}-report.json`), JSON.stringify(report[slug], null, 2))
}

fs.writeFileSync(
  path.join(outDir, 'summary.json'),
  JSON.stringify(
    Object.fromEntries(
      Object.entries(report).map(([k, v]) => [
        k,
        {
          name: v.name,
          size: v.size,
          sections: v.sections.map((s) => ({
            name: s.name,
            height: s.height,
            textCount: s.texts.length,
            imageCount: s.images.length,
          })),
        },
      ]),
    ),
    null,
    2,
  ),
)

console.log(
  JSON.stringify(
    Object.fromEntries(Object.entries(report).map(([k, v]) => [k, v.sections.map((s) => s.name)])),
    null,
    2,
  ),
)
