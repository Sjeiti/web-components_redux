const {promisify} = require('util')


const glob = promisify(require('glob'))
const utils = require('./util/utils.js')
const {read,save} = utils

const dir = './temp/'
const types = ['post','fortpolio']

// posts
glob(dir+'post_*.json',{})
.then(files=>Promise.all(files.map(read)))
.then(files=>files.map(file=>{
  const {date,slug,title:{rendered:title}} = JSON.parse(file)
  return {date,slug,title}
}))
.then(files=>files.sort((a,b)=>new Date(a.date)<new Date(b.date)?1:-1))
.then(files=>save('temp/posts-list.json',JSON.stringify(files)))
.catch(console.warn.bind(console,'fuuuu'))

glob(dir+'fortpolio_*.json',{})
.then(files=>Promise.all(files.map(read)))
.then(files=>files.sort((a,b)=>a.order<b.order?1:-1))
.then(files=>files.map(file=>{
  const {
    slug
    ,title
    ,excerpt
    ,'meta-datefrom':dateFrom
    ,'meta-dateto':dateTo
    ,'meta-featured':featured
    ,'meta-incv':inCv // on||''
    ,'meta-inportfolio':inPortfolio
    ,image
    ,tags
    ,categories
  } = JSON.parse(file)
  return {
    slug
    ,title
    ,excerpt
    ,dateFrom
    ,dateTo
    ,featured: featured==='on'
    ,inCv: inCv==='on'
    ,inPortfolio: inPortfolio==='on'
    ,thumbnail: image&&image.thumbnail
    ,tags
    ,categories
  }
}))
.then(files=>save('temp/fortpolio-list.json',JSON.stringify(files)))
.catch(console.warn.bind(console,'fuuuu'))
