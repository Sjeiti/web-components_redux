

const utils = require('./util/utils.js')
const {read,save} = utils
const {parse} = require('node-html-parser')

const basePath = `${__dirname}/../src/`
const baseUri = 'https://disconnect.ronvalstar.nl/'
const lastmod = `<lastmod>${new Date().toISOString()}</lastmod>`

read(`${basePath}index.html`)
  .then(content=>parse(content))
  .then(root => {
    const qa = root.querySelectorAll.bind(root)
    const list = qa('.node')
    list.splice(0,0,...qa('.content'))
    return save(`${basePath}index.xml`,`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://disconnect.ronvalstar.nl</loc>${lastmod}</url>
  ${list.map(n=>`<url><loc>${baseUri+n.id}</loc>${lastmod}</url>`).join('\n  ')}
</urlset>`)
  })