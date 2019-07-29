const {promisify} = require('util')


const glob = promisify(require('glob'))
const utils = require('./util/utils.js')
const {read,save} = utils

const dir = './temp/'
const types = ['post','fortpolio']

glob(dir+'post_*.json',{})
.then(files=>Promise.all(files.map(read)))
.then(files=>{
  //console.log(JSON.parse(files[11]))
  return files.map(file=>{
    const {date,slug,title:{rendered:title}} = JSON.parse(file)
    return {date,slug,title}
  })
})
.then(files=>files.sort((a,b)=>new Date(a.date)<new Date(b.date)?1:-1))
.then(files=>{
  save('temp/posts-list.json',JSON.stringify(files))
})
.catch(console.warn.bind(console,'fuuuu'))
