import {expand} from '@emmetio/expand-abbreviation'
import {stringToElement,clean} from '../utils/html'
import {setDefault} from '../router.js'
import {nextTick} from '../utils'
import {prismToRoot} from '../utils/prism'

setDefault((view,route)=>fetch(`./data/post_${route}.json`)
    .then(rs=>rs.json())
    .then(post=>{
      clean(view)
      const time = post.date.split('T').shift()
      const title = post.title.rendered
      view.appendChild(stringToElement(
        expand(`time.blog{${time}}+h1{${title}}`)
        +post.content.rendered
      ))
      nextTick(()=>prismToRoot(view))
      return post
    }))
