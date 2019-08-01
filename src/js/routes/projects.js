import {expand} from '@emmetio/expand-abbreviation'
import {add} from '../router'
import {clean} from '../utils/html'

add('projects',(view,route)=>
    fetch('./data/fortpolio-list.json')
      .then(rs=>rs.json())
      .then(posts=>{
        console.log('fortpoliofetched',JSON.stringify(posts[0]),posts)
        clean(view)
        view.insertAdjacentHTML('beforeend', expand(`ul.unstyled.blog>(${posts.map(
          post=>`(li>a[href="/${post.slug}"]>({${post.title}}))`
        ).join('+')})`))
        return {title:'projects',slug:'projects'}
      })
)
