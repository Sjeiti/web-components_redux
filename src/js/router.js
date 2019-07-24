import {parentQuerySelector} from './utils/html'

console.log(JSON.stringify(location,null,true))
//for (let s in location) console.log(s)

//const {pathname} = location
//console.log('page',pathname)

const pages = [
  'home'
  ,'contact'
  ,'about'
  ,'cv'
]

//openPage('post3328')
open(window.location.href)

window.addEventListener('popstate',onPopstate)

function onPopstate(e){
  console.log("location: " + document.location + ", state: " + JSON.stringify(e.state))
}

let url = location.href
;['click','keyup']
  .forEach(event=>document.body.addEventListener(event, onUserInput, true))

function onUserInput(e){
  const {target} = e
  const anchor = parentQuerySelector(target,'a[href^="/"]',true)
  if (anchor) {
    open(anchor.getAttribute('href'))
    e.preventDefault()
  } else {
    requestAnimationFrame(()=>{
      url!==location.href&&console.log('url changed');
      url!==location.href&&open(location.href)
      url = location.href;
    });
  }
}

function open(uri){
  console.log('open',uri)
  const {pathname} = new URL(uri)
  const name = pathname.replace(/^\/|\/$/g,'')
  console.log('\t','name',name)
  if (pages.includes(name)){
    openPage(name)
  } else if (name==='blog') {
    ////////////////////////////
    console.log('blogblogblog')
    fetch('./data/posts-list.json')
      .then(rs=>rs.json())
      .then(posts=>{ 
        console.log('bbbbbbbbbblogblogblog')
        const main = document.querySelector('main')
        main.insertAdjacentHTML('beforeend', expand(`h1{blog}+ul.unstyled.blog>(${posts.map(
          post=>`(li>a[href="./${post.slug}"]{${post.title}})`
        ).join('+')})`))
        /*alert(expand(`h1{blog}+ul.unstyled.blog>(${posts.map(
          post=>`(li>a[href="./${post.slug}"]{${post.title}})`
        ).join('+')})`))*/
      })
    ////////////////////////////
  } else if (name==='projects') {
  } else {
    openPost(name)
  }
}

function openPage(name){
  openFetch(`./data/page_${name}.json`)
}

function openPost(name){
  openFetch(`./data/post_${name}.json`)
}

function openFetch(path){
  fetch(path)
    .then(rs=>rs.json())
    .then(post=>{
      const main = document.querySelector('main')
      //
      /*const ex = s=>main.appendChild(stringToElement(expand(s)))
      ex(`time.blog{${post.date.split('T').shift()}}`)
      ex(`h1{${post.title.rendered}}`)
      ex(post.content.rendered)*/
      //
      /*const htmlString = expand(`time.blog{${post.date.split('T').shift()}}+h1{${post.title.rendered}}`)+post.content.rendered
      //alert(htmlString)
      main.appendChild(stringToElement(htmlString))*/
      //
      const frag = document.createDocumentFragment()
      appendChild(frag,'time', post.date.split('T').shift())
        .classList.add('blog')
      //
      appendChild(frag,'h1', post.title.rendered)
      //
      const tmpl = document.createElement('template')
      tmpl.innerHTML = post.content.rendered
      frag.appendChild(tmpl.content)
      //
      const pre = document.createElement('pre')
      const code = document.createElement('code')
      code.textContent = JSON.stringify(post,null,2)
      pre.appendChild(code)
      frag.appendChild(pre)
      //
      main.appendChild(frag)
    })
}

/*
[
  {
    "id":3465
    ,"date":"2018-12-24T15:16:38"
    ,"title":"Updating a Cypress alias"
    ,"slug":"updating-a-cypress-alias"
  },{
    "id":3418,"date":"2018-04-25T19:36:08","title":"A use case for Javascript generators","slug":"javascript-generators-iterators-use-case"},{"id":2967,"date":"2018-03-03T01:00:14","title":"Project invoice","slug":"project-invoice"},{"id":3366,"date":"2017-08-09T20:45:25","title":"The best programming editor on Android is free","slug":"best-free-editor-on-android"},{"id":3328,"date":"2017-08-02T08:59:52","title":"Experiment: marbles","slug":"experiment-marbles"},{"id":3355,"date":"2017-07-12T19:40:59","title":"Pixel perfect bookmarklet","slug":"pixel-perfect-bookmarklet"},{"id":3319,"date":"2017-01-28T07:58:10","title":"A Vue.js timing hack in component transitions","slug":"vue-js-timing-hack-component-transitions"},{"id":3282,"date":"2017-01-24T15:30:55","title":"Experiment: procedural fire with sparks in glsl","slug":"experiment-fire"},{"id":3273,"date":"2017-01-14T10:07:46","title":"Experiment: spiral map","slug":"experiment-spiralmap"},{"id":2557,"date":"2017-01-08T11:19:03","title":"Experiment: clouds","slug":"experiment-clouds"},{"id":3122,"date":"2016-12-24T08:49:00","title":"WordPress with a REST API using Vue and Webpack","slug":"wordpress-rest-api-using-vue-webpack"},{"id":3093,"date":"2016-11-26T09:54:11","title":"Angular 2 or Vue","slug":"angular-two-versus-vue"},{"id":3058,"date":"2016-09-06T15:06:00","title":"Experiment: difference with radial gradients in canvas","slug":"experiment-radialdifference"},{"id":2995,"date":"2016-04-13T20:14:49","title":"Strange attractors in Javascript","slug":"strange-attractors-javascript"},{"id":2947,"date":"2015-11-03T08:09:00","title":"Memory and speed performance of different namespace patterns","slug":"memory-and-speed-performance-of-different-namespace-patterns"},{"id":2905,"date":"2015-10-25T07:22:25","title":"Experiment: webgl blob","slug":"experiment-blob"},{"id":2606,"date":"2015-10-22T20:40:18","title":"How to structure Javascript code within a closure in a logical way","slug":"how-to-structure-javascript-code-within-a-closure-in-a-logical-way"},{"id":2764,"date":"2015-02-19T19:14:01","title":"Javascript inheritance and protected methods","slug":"javascript-inheritance-protected-methods"},{"id":2687,"date":"2015-01-28T12:24:12","title":"Lorem ipsum dummy article shortcode plugin","slug":"lorem-ipsum-dummy-article-shortcode-plugin"},{"id":2741,"date":"2015-01-24T21:13:30","title":"Goodbye sjeiti.com","slug":"goodbye-sjeiti-com"},{"id":2708,"date":"2015-01-05T10:02:05","title":"Tinysort v2","slug":"tinysort-v2"},{"id":2665,"date":"2014-11-11T12:21:49","title":"Strong password generator bookmarklet generator","slug":"strong-password-generator-bookmarklet"},{"id":2589,"date":"2014-08-26T18:17:47","title":"Experiment: Voronoi","slug":"experiment-voronoi"},{"id":2553,"date":"2014-06-22T15:25:56","title":"Experiment: glass","slug":"experiment-glass"},{"id":2478,"date":"2014-06-11T17:05:40","title":"WordPress Pocket widget","slug":"wordpress-pocket-widget"},{"id":2477,"date":"2014-05-26T10:34:38","title":"DRY responsive Javascript","slug":"dry-responsive-javascript"},{"id":2475,"date":"2014-05-10T11:10:39","title":"Using Google spreadsheets for your freelance invoicing","slug":"using-google-spreadsheets-for-invoicing"},{"id":2390,"date":"2014-05-06T20:58:18","title":"Change CSS styles at the root.","slug":"change-css-styles-at-the-root"},{"id":2578,"date":"2014-04-26T19:37:36","title":"Experiment: snow","slug":"experiment-snow"},{"id":2576,"date":"2014-04-24T11:19:04","title":"Experiment: vertical","slug":"experiment-vertical"},{"id":2574,"date":"2014-04-24T11:19:04","title":"Experiment: touches","slug":"experiment-touches"},{"id":2571,"date":"2014-04-24T11:19:04","title":"Experiment: starzoom","slug":"experiment-starzoom"},{"id":2568,"date":"2014-04-24T11:19:04","title":"Experiment: flow field","slug":"experiment-flowfield"},{"id":2565,"date":"2014-04-24T11:19:04","title":"Experiment: plasma","slug":"experiment-plasma"},{"id":2561,"date":"2014-04-24T11:19:04","title":"Experiment: grid","slug":"experiment-grid"},{"id":2559,"date":"2014-04-24T11:19:03","title":"Experiment: ff","slug":"experiment-ff"},{"id":2555,"date":"2014-04-22T15:38:25","title":"Experiment: boids","slug":"experiment-boids"},{"id":2563,"date":"2014-01-22T15:42:48","title":"Experiment: heart","slug":"experiment-heart"},{"id":2389,"date":"2013-08-08T12:48:56","title":"Testing for unused functions with Grunt","slug":"testing-for-unused-functions-with-grunt"},{"id":2388,"date":"2013-05-29T09:53:26","title":"A freelance developer&#8217;s tool box","slug":"a-freelance-developers-tool-box"},{"id":1958,"date":"2013-04-07T11:08:55","title":"Bookmarklet for fullscreen Google Maps","slug":"bookmarklet-for-fullscreen-google-maps"},{"id":1826,"date":"2013-01-22T14:37:43","title":"Storing multiple properties in one integer using bitwise AND","slug":"multiple-properties-in-one-variable"},{"id":1775,"date":"2012-09-26T11:11:32","title":"Creating tileable noise maps","slug":"creating-tileable-noise-maps"},{"id":1722,"date":"2012-08-24T11:16:27","title":"Migrating a subversion repository from Google Code to Github","slug":"migrating-a-subversion-repository-from-google-code-to-github"},{"id":1652,"date":"2012-07-06T17:45:45","title":"Logo","slug":"logo"},{"id":1030,"date":"2012-07-03T07:46:41","title":"Tinysort: a tiny survey","slug":"tinysort-a-tiny-survey"},{"id":975,"date":"2012-06-30T11:30:27","title":"Android phone DOM","slug":"android-phone-dom"},{"id":1001,"date":"2012-06-28T16:40:08","title":"Test Rainbow line numbering","slug":"test-rainbow"},{"id":977,"date":"2012-06-18T15:01:18","title":"LESS variables to Javascript","slug":"less-variables-to-javascript"},{"id":934,"date":"2012-05-25T12:47:34","title":"Interactive fluid dynamics in Javascript","slug":"interactive-fluid-dynamics-in-javascript"},{"id":938,"date":"2012-05-01T21:42:37","title":"Using WordPress media library in a plugin","slug":"using-wordpress-media-library-in-a-plugin"},{"id":907,"date":"2012-04-25T20:59:00","title":"Javascript performance testing","slug":"javascript-performance-testing"},{"id":892,"date":"2012-02-14T23:26:43","title":"JS1k","slug":"js1k"},{"id":879,"date":"2012-01-31T13:47:35","title":"Unit testing private functions in Javascript","slug":"unit-testing-private-functions"},{"id":873,"date":"2012-01-30T13:41:24","title":"","slug":"873"},{"id":849,"date":"2011-06-03T00:12:36","title":"Dynamic bookmarklets (and WebGL)","slug":"dynamic-bookmarklets-and-webgl"},{"id":836,"date":"2011-04-09T00:24:10","title":"It could be dawn","slug":"it-could-be-dawn"},{"id":832,"date":"2011-04-09T00:17:59","title":"SFBrowser 3.2.2","slug":"sfbrowser-3-2-2"},{"id":830,"date":"2011-02-02T23:39:45","title":"Witnie in the sky with diamonds","slug":"witnie-in-the-sky-with-diamonds"},{"id":821,"date":"2011-02-02T10:56:35","title":"Pig in woods","slug":"pig-in-woods"},{"id":756,"date":"2010-11-19T02:38:25","title":"SFBrowser for WordPress","slug":"sfbrowser-for-wordpress"},{"id":687,"date":"2010-10-22T13:14:15","title":"canvasImg","slug":"canvasimg"},{"id":657,"date":"2010-10-22T13:07:44","title":"perpetuum mobile","slug":"perpetuum-mobile"},{"id":632,"date":"2010-09-17T14:17:38","title":"Stereoscopic 3D zoom with Javascript","slug":"stereoscopic-3d-zoom-with-javascript"},{"id":604,"date":"2010-09-13T18:41:39","title":"coding on an android","slug":"coding-on-an-android"},{"id":587,"date":"2010-07-22T21:38:36","title":"meten is weten","slug":"meten-is-weten"},{"id":579,"date":"2010-06-02T10:33:04","title":"emergence","slug":"emergence"},{"id":473,"date":"2010-05-13T22:49:36","title":"Simplex noise in as3","slug":"simplex-noise-in-as3"},{"id":448,"date":"2010-05-12T14:05:05","title":"Perlin noise versus Simplex noise in Javascript (final comparison)","slug":"perlin-noise-versus-simplex-noise-in-javascript-final-comparison"},{"id":426,"date":"2010-05-10T13:39:54","title":"Perlin noise in Javascript comparisons","slug":"perlin-noise-in-javascript-comparisons"},{"id":420,"date":"2010-05-04T14:45:21","title":"freelance space for hire","slug":"freelance-space-for-hire"},{"id":418,"date":"2010-03-06T11:33:35","title":"Twitter","slug":"twitter"},{"id":414,"date":"2010-02-13T19:01:37","title":"icon for new jQuery plugin","slug":"icon-for-new-jquery-plugin"},{"id":411,"date":"2010-01-27T12:03:11","title":"cleanup","slug":"cleanup"},{"id":407,"date":"2009-12-17T16:11:38","title":"Android Processing","slug":"android-processing"},{"id":360,"date":"2009-09-18T02:21:43","title":"jQuery.feedQuilt","slug":"gridfeed"},{"id":388,"date":"2009-07-13T17:54:06","title":"WOOT FWA SOTD!!!","slug":"woot-fwa-sotd"},{"id":385,"date":"2009-07-07T14:52:31","title":"HTML5","slug":"html5"},{"id":336,"date":"2009-02-28T00:00:29","title":"Perlin clouds","slug":"perlin-clouds"},{"id":335,"date":"2009-02-19T12:23:00","title":"learning a new language","slug":"learning-a-new-language"},{"id":334,"date":"2009-01-29T16:10:23","title":"localhost.ronvalstar","slug":"ronvalstarnl"},{"id":333,"date":"2008-12-31T11:56:53","title":"SFBrowser 3 beta","slug":"sfbrowser-3-beta"},{"id":328,"date":"2008-12-13T19:58:42","title":"Attractors rebuild","slug":"attractors-rebuild"},{"id":332,"date":"2008-12-13T16:13:04","title":"sfbrowser.googlecode","slug":"sfbrowsergooglecode"},{"id":331,"date":"2008-11-22T21:07:44","title":"jQuery plugin update","slug":"331"},{"id":327,"date":"2008-10-06T16:11:43","title":"workplace for hire","slug":"workplace-for-hire"},{"id":326,"date":"2008-07-31T17:10:33","title":"Perlin Noise and Frocessing","slug":"perlin-noise-and-frocessing"},{"id":339,"date":"2008-06-30T14:46:49","title":"Processing.js","slug":"processingjs"},{"id":338,"date":"2008-06-29T12:16:32","title":"SFBrowser","slug":"sfbrowser"},{"id":337,"date":"2008-06-19T13:17:28","title":"Hyves redesign","slug":"hyves-redesign"},{"id":322,"date":"2008-06-08T21:46:24","title":"jquery.tinysort","slug":"jquerytinysort"},{"id":321,"date":"2008-06-08T20:09:51","title":"TinySort","slug":"tinysort"},{"id":320,"date":"2008-06-02T16:54:59","title":"PSP e-books","slug":"psp-e-books-ii"},{"id":319,"date":"2008-06-02T15:16:51","title":"E-books on your PSP","slug":"e-books-on-your-psp"},{"id":318,"date":"2008-02-16T14:14:53","title":"48 hours of rendering","slug":"48-hours-of-rendering"},{"id":317,"date":"2008-02-13T20:08:50","title":"Protected: Strange attractors","slug":"strange-attractors"},{"id":316,"date":"2008-02-10T22:26:46","title":"Strange stuff","slug":"strange-stuff"},{"id":315,"date":"2008-02-10T01:40:28","title":"Lorenz84","slug":"lorenz84"},{"id":312,"date":"2007-12-23T19:56:43","title":"little fluffy clouds","slug":"little-fluffy-clouds"}]
    */
