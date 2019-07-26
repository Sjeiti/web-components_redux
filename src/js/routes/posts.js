import {expand} from '@emmetio/expand-abbreviation'
import {stringToElement} from '../utils/html'
import {setDefault} from '../router.js'

setDefault((view,route)=>fetch(`./data/post_${route}.json`)
    .then(rs=>rs.json())
    .then(post=>{
      const time = post.date.split('T').shift()
      const title = post.title.rendered
      view.appendChild(stringToElement(
        expand(`time.blog{${time}}+h1{${title}}`)
        +post.content.rendered
      ))
    }))
