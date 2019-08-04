import {expand} from '@emmetio/expand-abbreviation'
import {add} from '../router'
import {clean} from '../utils/html'

add('blog',(view,route)=>
    fetch('./data/posts-list.json')
      .then(rs=>rs.json())
      .then(posts=>{
        console.log('blogfetched',JSON.stringify(posts[0]),posts)
        clean(view)
        view.insertAdjacentHTML('beforeend', expand(`ul.unstyled.blog>(${posts.map(
          post=>`(li>a[href="/${post.slug}"]>(time{${post.date.split('T').shift()}}+{${post.title}}))`
        ).join('+')})`))
        return {title:'blog'}
      })
)
