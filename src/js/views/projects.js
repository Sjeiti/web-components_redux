import {expand} from '@emmetio/expand-abbreviation'
import {add} from '../router'
import {clean} from '../utils/html'

const data = ['fortpolio-list','taxonomies']

add(
  'projects'
  ,'projects/:category'
  ,'project/:project'
  ,(view,route,params)=>{
    console.log('project',view,route,params)
    const {project:projectSlug,category} = params
    let title = 'projects'
    let parentSlug
    return Promise.all(data.map(n=>fetch(`/data/${n}.json`).then(rs=>rs.json())))
      .then(([projects,taxonomies])=>{
        console.log('\tloaded')
        const portfolioProjects = projects.filter(p=>p.inPortfolio)
        //
        const qs = view.querySelector.bind(view)
        const existingCategories = qs('.project-category')
        const existingProjects = qs('.projects')
        const existingProject = qs('.project')
        const exists = !!(existingCategories&&existingProjects)
        console.log('\texists',exists)
        //
        if(!exists){
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
        }
        // project selected
        // todo: remove old
        if(projectSlug){
          const currentProject = projects.filter(p=>p.slug===projectSlug).pop()
          title = currentProject.title 
          parentSlug = 'projects'
          view.insertAdjacentHTML('beforeend', expand(
            `div.project>h2{${title}}`
          ))
        }
        // category
        // todo: remove current project
        console.log('\tproject category:',category)
        if(category&&existingCategories){
          title = `${category} projects`
          parentSlug = 'projects'
          //
          const current = 'current'
          const seldo = (selector,fn)=>Array.from(existingCategories.querySelectorAll(selector)).forEach(fn)
          const select = `projects/${category}`
          console.log('\tselect',select)
          seldo('.'+current,elm=>elm.classList.remove(current))
          seldo(`a[href="/${select}"]`,elm=>elm.classList.add(current))
        }
        //
        return {title,parentSlug}
      })
  }
)

/*fetch('./data/fortpolio-list.json')
  .then(rs=>rs.json())
  .then(projects=>projects.filter(p=>p.inPortfolio))
  .then(projects=>{
    projects.forEach(project=>add(`project/${project.slug}`,v=>v))
  })*/
