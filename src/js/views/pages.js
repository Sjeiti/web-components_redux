import {add} from '../router'
import {stringToElement,clean} from '../utils/html'

add(
  ''
  ,'home'
  ,'contact'
  ,'about'
  ,'cv'
  ,(view,route)=>{
    console.log(`fetch: ./data/page_${route}.json`)
    return fetch(`./data/page_${route}.json`)
      .then(rs=>rs.json())
      .then(page=>{
        clean(view)
        view.appendChild(stringToElement(page.content.rendered))
        return page
      })
  })
