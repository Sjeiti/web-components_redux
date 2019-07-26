import {add} from '../router'
import {stringToElement} from '../utils/html'

add(
  'home'
  ,'contact'
  ,'about'
  ,'cv'
  ,(view,route)=>
    fetch(`./data/page_${route}.json`)
      .then(rs=>rs.json())
      .then(post=>
        view.appendChild(stringToElement(post.content.rendered))
      )
)
