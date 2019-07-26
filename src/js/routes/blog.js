import { expand } from '@emmetio/expand-abbreviation'
import {add} from '../router'

add('blog',(target,route)=>
    fetch('./data/posts-list.json')
      .then(rs=>rs.json())
      .then(posts=>{ 
        target.insertAdjacentHTML('beforeend', expand(`ul.unstyled.blog>(${posts.map(
          post=>`(li>a[href="/${post.slug}"]{${post.title}})`
        ).join('+')})`))
      })
)
