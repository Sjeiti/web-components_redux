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
  const tmpl = document.createElement('div')
  tmpl.innerHTML = s
  const frag = document.createDocumentFragment()
  while (tmpl.children.length) frag.appendChild(tmpl.firstChild)
  return frag
}

export function parentQuerySelector(elm,query,inclusive=false){
  const closest = elm.closest(query)
  const isChild = closest&&closest.contains(elm)
  return isChild&&closest||inclusive&&elm.matches(query)
}
