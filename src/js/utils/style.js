const styleEl = document.createElement('style')
document.head.appendChild(styleEl)
const styleSheet = styleEl.sheet

export function addRule(rule){
  styleSheet.insertRule(rule, styleSheet.cssRules.length)
}

export function removeRule(selector){
  Array.from(styleSheet.cssRules)
    .forEach((rule,i)=>{
      const {cssText} = rule
      cssText.includes(selector)
        &&styleSheet.deleteRule(i)
      console.log('rule',rule.cssText)
    })
}

export function select(selector){

}
