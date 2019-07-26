/** Signal for scrolling.<br/>
 * The callback for this signal is Function(scrollLeft,scrollTop)
 * @type Signal
 */
import {signal} from './index'
import {getScrollX,getScrollY} from '../utils/utils'

export const scroll = signal()
const doc = document
const body = doc.body
const capture = true
const passive = true
const listenerOptions = {capture,passive}

window.addEventListener('touchmove',handleScroll,listenerOptions);
window.addEventListener('scroll',handleScroll,listenerOptions);

function handleScroll(e){
	scroll.dispatch(e,getScrollX(),getScrollY())
}
