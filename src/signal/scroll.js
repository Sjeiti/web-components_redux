/** Signal for scrolling.<br/>
 * The callback for this signal is Function(scrollLeft,scrollTop)
 * @name iddqd.signal.scroll
 * @type Signal
 */
import Signal from 'signals'
import {getScrollX,getScrollY} from '../utils/utils'

let scroll = new Signal
  ,doc = document
  ,body = doc.body
  ,capture = true
  ,passive = true
  ,listenerOptions = {capture,passive}

window.addEventListener('touchmove',handleScroll,listenerOptions);
window.addEventListener('scroll',handleScroll,listenerOptions);

function handleScroll(e){
	scroll.dispatch(e,getScrollX(),getScrollY())
}

export default scroll