import {expand} from '@emmetio/expand-abbreviation'
import {add} from '../router'
import {clean} from '../utils/html'

const data = ['fortpolio-list','taxonomies']

add('projects','projects/:category','project/:project',(view,route)=>
    Promise.all(data.map(n=>fetch(`./data/${n}.json`).then(rs=>rs.json())))
      .then(([projects,taxonomies])=>{
        const portfolioProjects = projects.filter(p=>p.inPortfolio)
        clean(view)
        view.insertAdjacentHTML('beforeend', expand(
          `ul.unstyled.project-category>(${taxonomies['fortpolio_category'].map(
            o=>`(li>a[href="/projects/${o.slug}"]{${o.name}})`
          ).join('+')})`
        ))
        view.insertAdjacentHTML('beforeend', expand(
          `ul.unstyled.projects>(${portfolioProjects.map(
            project=>`(li[style="background-image:url(${project.thumbnail})"]>a[href="/project/${project.slug}"]>({${project.title}}))`
          ).join('+')})`
        ))
        return {title:'projects',slug:'projects'}
      })
)

/*fetch('./data/fortpolio-list.json')
  .then(rs=>rs.json())
  .then(projects=>projects.filter(p=>p.inPortfolio))
  .then(projects=>{
    projects.forEach(project=>add(`project/${project.slug}`,v=>v))
  })*/
