const fetch = require('node-fetch')
const utils = require('./util/utils.js')
const {read,save} = utils

const baseApiUri = 'https://ronvalstar.nl/api'
const saveEndpoints = [
  /*'/rv/v1/fortpolio'
  ,'/wp/v2/types'
  ,'/wp/v2/taxonomies'
  ,'/wp/v2/categories'
  ,'/wp/v2/tags'
  ,'/wp/v2/posts'
  ,'/wp/v2/pages'*/
  '/wp/v2/posts/3366'
]

console.log('ff')

fetch(baseApiUri)
  .then(rs=>rs.json())
  .then(api=>{
    const routes = Object.keys(api.routes)
      //.filter(r=>r.methods.includes('GET'))
      //.map(r=>r.endpoints[0])
    console.log(routes)
    //console.log(JSON.stringify(routes[24]))
    //console.log(api.routes)
    //for (var s in api.routes[0])console.log(s)
  })

saveEndpoints.forEach(p=>{
  fetch(baseApiUri+p)
    .then(rs=>rs.json())
    .then(s=>save(`./temp/${p.substr(7).replace(/[^a-z0-9]/g,'')}.json`,JSON.stringify(s,null,2)))
})
