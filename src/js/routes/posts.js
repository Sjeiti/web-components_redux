import { expand } from '@emmetio/expand-abbreviation'
import {parentQuerySelector,appendChild} from '../utils/html'
import {setDefault} from '../router.js'

setDefault((view,route)=>fetch(`./data/post_${route}.json`)
    .then(rs=>rs.json())
    .then(post=>{
      const main = document.querySelector('main')
      //
      const frag = document.createDocumentFragment()
      appendChild(frag,'time', post.date.split('T').shift())
        .classList.add('blog')
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
    }))
