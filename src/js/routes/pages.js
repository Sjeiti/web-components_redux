import { expand } from '@emmetio/expand-abbreviation'
import {parentQuerySelector,appendChild} from '../utils/html'
import {add} from '../router'

add(
  'home'
  ,'contact'
  ,'about'
  ,'cv'
  ,(view,route)=>
    fetch(`./data/page_${route}.json`)
      .then(rs=>rs.json())
      .then(post=>{
        const main = document.querySelector('main')
        //
        const frag = document.createDocumentFragment()
        //
        appendChild(frag,'h1', post.title.rendered)
        //
        const tmpl = document.createElement('template')
        tmpl.innerHTML = post.content.rendered
        frag.appendChild(tmpl.content)
        //
        console.log(JSON.stringify(post,null,2))
        //
        main.appendChild(frag)
      })
)
