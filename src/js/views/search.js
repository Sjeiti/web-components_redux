import {expand} from '@emmetio/expand-abbreviation'
import {add} from '../router'
import {clean,selectEach} from '../utils/html'
import {addRule,removeRule} from '../utils/style'
import {scrollTo,nextTick} from '../utils'
import {component} from '../Component'
import {search} from '../component/Search'
import {open} from '../router'

search.add(query=>open(`/search/${encodeURIComponent(query)}`))

add(
  'search/:query'
  ,'search'
  ,(view,route,params)=>{
    console.log('search',view,route,params)
    const {query} = params
    let title = 'search'
    //
    //
    const slugPosts = {}
    const data = ['fortpolio-list','posts-list','pages-list']
    Promise.all(data.map(s=>fetch(`/data/json/${s}.json`).then(r=>r.json())))
      .then(([fortpolio,posts])=>{
        //[...fortpolio,...posts].forEach(o=>console.log(o.slug))
        ;[...fortpolio,...posts].forEach(o=>slugPosts[o.slug]=o)
      })
    //
    //
    const qs = view.querySelector.bind(view)
    const existingSearch = qs('[data-search]')
    const exists = !!(existingSearch)
    console.log('\texists',exists)
    //
    if(!exists){
      clean(view)
      view.insertAdjacentHTML('beforeend', expand(
        `[data-search="{
          label:''
          ,submit:''
          ,placeholder:'search'
          ,autoSuggest:true
        }"]+ul.unstyled.result+.no-result.hidden{No results for '${query}'.}`
      ))
    }
    const searchElm = existingSearch||qs('[data-search]')
    const result = qs('.result')
    const noResult = qs('.no-result')
    //
    false&&nextTick(()=>{
      const searchInst = component.of(searchElm)
      searchInst.value = query
    })
    //
    const getSlugUri = slug=>{
      const [type,key] = slug.split('_')
      return `${type==='fortpolio'?'/project':''}/${key}`
    }
    //
    const baseUri = '/data/search/'
    fetch(baseUri+`words.json`)
      .then(rs=>rs.json())
      .then(words=>words.filter(word=>word.includes(query.toLowerCase())))
      .then(words=>Promise.all(words.map(word=>fetch(`${baseUri}s_${word}.json`).then(r=>r.json()))))
      .then(a=>(console.log('alSlugs',a),a))
      .then(allSlugs=>allSlugs.reduce((acc,slugs)=>(acc.push(...slugs),acc),[]))
      .then(slugs=>{
        const {length} = slugs
        noResult.classList.toggle('hidden',!!length)
        clean(result).insertAdjacentHTML('beforeend', expand(
          slugs.map(slug=>{
            const uri = getSlugUri(slug)
            const key = slug.split('_').pop()
            return `li>a[href="${uri}"]{${slugPosts[key]?.title}}`
          }).join('+')
        ))
      })
      .catch(console.warn.bind(console,'eerr'))
    //
    return Promise.resolve({title})
  }
)
