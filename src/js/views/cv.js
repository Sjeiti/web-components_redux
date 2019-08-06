import {expand} from '@emmetio/expand-abbreviation'
import {add} from '../router'
import {clean,selectEach,stringToElement} from '../utils/html'
import {addRule,removeRule} from '../utils/style'
import {scrollTo} from '../utils'

const data = ['page_cv','fortpolio-list','taxonomies']

add(
  'cv'
  ,(view,route,params)=>{
    console.log('cv',view,route,params)
    return Promise.all(data.map(n=>fetch(`/data/json/${n}.json`).then(rs=>rs.json())))
      .then(([page,projects,taxonomies])=>{
        // 
        clean(view)
        view.appendChild(stringToElement(page.content.rendered))
        const portfolioProjects = projects.filter(p=>p.inPortfolio)
        //
        const cvProjects = projects.filter(p=>p.inCv)
        view.insertAdjacentHTML('beforeend', expand(
          `ul.unstyled.cv-projects>(${cvProjects.map(
            project=>`(li${project.categories.map(c=>`.cat-${c}`).join('')}`
             +`>div>(`
              +`h3{${project.title}}`
             +`)`
            +`)`
          ).join('+')})`
        ))
        //
        return page
      })
  }
)
