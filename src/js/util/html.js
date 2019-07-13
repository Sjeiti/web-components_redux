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
