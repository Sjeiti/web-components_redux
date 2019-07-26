export function appendChild(parent, nodeName='div', content, attrs){
  const elm = document.createElement(nodeName)
  if (typeof content === 'string'){  
    elm.innerHTML = content
  } else {
    elm.appendChild(content)
  }
  parent && parent.appendChild(elm)
  return elm
}

export function stringToElement(s){
  const tmpl = document.createElement('template')
  tmpl.innerHTML = `<div>${s}</div>`
  const frag = document.createDocumentFragment()
  const {content} = tmpl
  while (content.children) frag.appendChild(content.firstChild)
  return frag
}

export function parentQuerySelector(elm,query,inclusive=false){
  const closest = elm.closest(query)
  const isChild = closest&&closest.contains(elm)
  return isChild&&closest||inclusive&&elm.matches(query)
}
