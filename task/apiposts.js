const fetch = require('node-fetch')
const utils = require('./util/utils.js')
const {read,save} = utils

const baseApiUri = 'https://ronvalstar.nl/api'

fetch(baseApiUri+'/wp/v2/posts?per_page=99')
  .then(rs=>rs.json())
  .then(posts=>posts.map(post=>({
    id: post.id
    ,date: post.date
    ,title: post.title.rendered
    ,slug: post.slug
  })))
  .then(posts=>{
    console.log(JSON.stringify(posts))
    save('temp/posts-list.json',JSON.stringify(posts))
  })

