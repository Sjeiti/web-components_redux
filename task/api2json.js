const fetch = require('node-fetch')
const utils = require('./util/utils.js')
const {read,save} = utils

const baseApiUri = 'https://ronvalstar.nl/api'
const saveEndpoints = [
  '/rv/v1/fortpolio'
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
    .then(rs=>rs.text())
    .then(s=>save(`./temp/${p.substr(7)}.json`,s))
})
