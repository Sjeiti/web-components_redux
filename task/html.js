
const utils = require('./util/utils.js')
const {read,save} = utils

const basePath = `${__dirname}/../src/`
const baseTarget = `${__dirname}/../temp/`
const targetUriVideo = 'https://res.cloudinary.com/dn1rmdjs5/video/upload/v1550855082/disconnect/'//https://disconnect_.ronvalstar.nl/'
const targetUriImage = 'https://res.cloudinary.com/dn1rmdjs5/image/upload/v1550855082/disconnect/'//https://disconnect_.ronvalstar.nl/'

read(`${basePath}index.html`)
    .then(content=>{
      const matches = content.match(/\/data\/root\/([^"]+)/g)
      matches&&matches.forEach(uri=>{
        const uriType = uri.split(/\./g).pop()
        const baseUri = ['jpg','png','gif'].includes(uriType)?targetUriImage:targetUriVideo
        content = content.replace(uri,baseUri+uri.replace(/\/data\/root\//,'').replace(/\s/g,'_'))
      })
      return content
    })
  // .then(content=>content
  //     .replace(/(audio|video|img)\ssrc="\/data\/root\/([^"]+)/g,`$1 src="${targetUri}`)
  //     .replace(/\s/g,'_'))
  .then(save.bind(null,`${baseTarget}index.html`))
