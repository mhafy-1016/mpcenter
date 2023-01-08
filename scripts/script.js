Math.constrain = (v, min, max) => Math.min(Math.max(min, v), max);
Math.rArray = (array) => array[Math.floor(Math.random()*array.length)];
Math.randomInt = (min, max) => Math.floor(Math.random()*(min || max)) + (max ? min : 0);
Math.wrap = (n, min, max) => { 
	if(n < min) return max + (n % max);
	return n % max;
};
const log = (str) => console.log(str);
const math = Math;
const createElem = (type, options={}) => {
	const e = document.createElement(type);
	if(options.id) e.id = options.id;
	if(options.class) e.className = options.class;
	if(options.html) e.innerHTML = options.html;
	return e;
}
const getElem = (id) => document.getElementById(id);
const getElemList = (classId) => document.getElementsByClassName(classId);
const getDomRect = (e, i) => {
	if(typeof e === 'object'){
		if(!isNaN(i)) return e[i].getBoundingClientRect();
		else return e.getBoundingClientRect();
	} else if(typeof e === 'string'){
		if(!isNaN(i)) return document.getElementsByClassName(e)[i].getBoundingClientRect();
		else return document.getElementById(e).getBoundingClientRect();
	}
}
const setDOMBG = (e, bg, options={}) => {
	e.style.background = bg;
	if(options.position) e.style.backgroundPosition = options.position;
	if(options.size) e.style.backgroundSize = options.size;
	if(options.repeat) e.style.backgroundRepeat = options.repeat;
}
const setDomRect = (d, x, y, w, h) => {
	if(typeof x === 'object'){
		d.style.left = x.x + 'px';
		d.style.top = x.y + 'px';
		d.style.width = x.width + 'px';
		d.style.height = x.height + 'px';
	} else {
		if(!isNaN(x)) d.style.left = x + 'px';
		if(!isNaN(y)) d.style.top = y + 'px';
		if(!isNaN(w)) d.style.width = w + 'px';
		if(!isNaN(h)) d.style.height = h + 'px';
	}
}
const domRect = (e, i) => getDomRect(e, i);
const domAnimate = (e, anim, dur, type='normal', delay=0) => {
	delay += 0.1; e.style.animation = '';
	setTimeout(_=> { e.style.animation = anim + ' ' + dur + 's ' + type + ' ' + (delay-0.1) + 's' }, 10);
}
const dateToString = (n) => new Date(n).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
const NoToString = (n) => {
	if(n > 75e4) return Math.floor(n / 1e6 * 10) / 10 + 'm';
	else if(n > 750) return Math.floor(n / 1e3 * 10) / 10 + 'k';
	return n + '';
}
const comToHex = c => (c.toString(16).length == 1 ? '0' + c.toString(16) : c.toString(16));
const rgbToHex = (r,g,b) => ("#" + comToHex(r) + comToHex(g) + comToHex(b));
const loadImg = (src, f) => {
	let img = new Image();
	img.src = src;
	img.onload = f;
	return img;
}
const DateDiff = {
    inDays: (d1, d2) => Math.floor((d2.getTime()-d1.getTime())/(24*3600*1000)),
    inWeeks: (d1, d2) => parseInt((d2.getTime()-d1.getTime())/(24*3600*1000*7)),
    inMonths: (d1, d2) => {
        let d1Y = d1.getFullYear();
        let d2Y = d2.getFullYear();
        let d1M = d1.getMonth();
        let d2M = d2.getMonth();
        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },
    inYears: (d1, d2) => d2.getFullYear()-d1.getFullYear()
}
const customID = (no) => { return 'x'.repeat(no).replace(/x/g, _ => { return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random()*62)]; }); }
const mobile = (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))); 
const checkString = (str) => { return !(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(str) && !(/[^\x00-\x7F]/).test(str) && str.indexOf(' ')==-1; }
const isInside = (x, y, rect) => { return x > rect.x && x < rect.x + rect.width && y > rect.y && y < rect.y + rect.height; }
const doLoop = (n, f) => { for(let i=0; i<n; i++){ f(i); } };
const capFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

let allTags = ['all', 'items', 'armors', 'effects', 'ability', 'custom mobs', 'superpower', 'variants', 'supernatural', 'natural', 'high quality', 'multiplayer', 'singleplayer', 'weapons', 'monsters', 'myths', 'historical', 'fairycore', 'bosses', 'agriculture', 'botany', 'structure', 'fantasy', 'colorful', 'biome', 'anime/cartoon', 'horror', 'shooter', 'combat', 'sci-fi', 'stylized', 'pvp', 'co-op', 'magic', 'medieval', 'mechs', 'memes', 'aliens', 'cyberpunk', 'thriller', 'demons', 'modern', 'dystopian', 'survival', 'dragons', 'parkour', 'parody', 'trading', 'feature'];
let sort_values = [ 'alphabetical', 'latest', 'downloads', 'ratings' ]
let sort_types = [ 'ascending', 'descending' ];
let comp = '@mpcenter.com';
let versions = ["1.9.50", "1.9.40","1.9.30","1.9.20","1.9.10","1.9.0","1.8.30","1.8.10","1.8.0","1.7.40","1.7.30","1.7.11","1.7.0"];
//let versions  ["1.7.0","1.7.11","1.7.30","1.7.40","1.8.0","1.8.10","1.8.30","1.9.0","1.9.10","1.9.20","1.9.30","1.9.40"];

let addonQs = [
	'How to install Minecraft Bedrock Addon in Windows?',
	'How to install Minecraft Bedrock Addon in Android?',
	'How to install Minecraft Bedrock Addon in IOS?'
];
let mapQs = [
	'How to install Minecraft Bedrock Map in Windows?',
	'How to install Minecraft Bedrock Map in Android?',
	'How to install Minecraft Bedrock Map in IOS?'
]

let hue = parseFloat(localStorage.getItem("hue") || 0);

let isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;

let top_banner = getElem('banner');
let footer = getElem('footer');
let wrapper = getElem('wrapper');

let onLoad = [];
let onScroll = null;
let links, linksOriginal, linksWidth;

if(getElemList('links')[0]) {
	linksOriginal = getElemList('links')[0].cloneNode(true);
	linksWidth = getDomRect('links', 0).right;
	getElemList('links')[0].style.left = getElem('logo-div') ? 'calc(72px + 32px)' : '16px';
}

if(getElem('logo-div')) getElem('logo-div').style.opacity = '1';
if(getElemList('logo')[0]) getElemList('logo')[0].style.animation = 'pop 0.5s';
if(getElemList('logo')[1]) getElemList('logo')[1].style.animation = 'pop 0.5s';

if(getElem('footer')) getElem('wrapper').style.minHeight = (window.innerHeight - getDomRect('footer').height) + 'px';
function reloadLinks(){
	try{
	isMobile = linksWidth > window.innerWidth - getDomRect('search').width - 16;
	if(isMobile){
		if(!links) {
			links = createElem('div');
			links.id = 'links';
			links.style.position = 'fixed';
			links.style.left = '0';
			links.style.top = getDomRect(top_banner).bottom + 'px';
			links.style.height = '0px';
			links.style.overflow = 'hidden hidden';
			links.style.transition = 'height 0.5s';
			links.style.backgroundColor = 'black';
			links.hide = true;
			links.isInside = false;
			links.style.width = '100%';
			links.height = 0;
			for(let l of getElemList('link')){
				let temp = l.cloneNode(true);
				temp.style.top = '0px';
				temp.style.left = '32px';
				temp.style.width = '100%';
				temp.style.display = 'inline-block';
				links.appendChild(temp);
				links.height += getDomRect(l).height; 
			}
			
			links.style.zIndex = '99';
			document.body.appendChild(links);
			if(getElemList('links')[0]) getElemList('links')[0].remove();
			
			let toggle = document.createElement('div');
			toggle.id = 'toggle';
			toggle.style.position = 'absolute';
			toggle.style.left = '0px';
			toggle.style.top = '0px';
			toggle.style.width = '48px';
			toggle.style.height = '48px';
			//toggle.style.margin = '12px 0px 12px 12px';
			toggle.style.opacity = '0';
			toggle.style.background = 'url(res/menu.png)';
			toggle.style.backgroundSize = '24px 24px';
			toggle.style.backgroundPosition = 'center';
			toggle.style.backgroundRepeat = 'no-repeat';
			toggle.style.transition = 'transform .5s, opacity 0.5s ease 1s';
			
			toggle.addEventListener('click', function(){
				if(links.hide){
					links.style.height = links.height + 'px';
					for(let i=0; i<links.childNodes.length; i++){
						links.childNodes[i].style.transition = 'left .5s ease ' + (0.1 * i) + 's';
						links.childNodes[i].style.left = '0px';
					}
					getElem('banner').style.background = 'black';
					if(getElem('logo-div'))getElem('logo-div').style.transform = 'scale(0.7)';
					links.hide = false;
				} else {
					links.style.height = '0px';
					for(let i=0; i<links.childNodes.length; i++){
						links.childNodes[i].style.transition = 'left 0s ease 0.5s';
						links.childNodes[i].style.left = '32px';
					}
					getElem('banner').style.background = 'rgba(0,0,0,' + Math.min(1, window.scrollY / 128) + ')';
					if(getElem('logo-div'))getElem('logo-div').style.transform = 'scale(1)';
					links.hide = true;
				}
			}, false);
			links.addEventListener('mouseover', ()=>{ links.isInside = true; }, false);
			links.addEventListener('mouseout', ()=>{ links.isInside = false; }, false);
			
			top_banner.insertBefore(toggle, getElem('search'));
			if(getElem('logo-div'))getElem('logo-div').style.transition = 'left .5s ease 0.5s, transform 0.5s';
			if(getElem('logo-div'))getElem('logo-div').style.left = getDomRect(toggle).right + 'px';
			toggle.style.opacity = '1';
		}
	} else {
		if(getElem('links')){
			getElem('toggle').style.transform = 'scale(0)';
			setTimeout(_=>getElem('toggle').remove(), 500);
			getElem('links').remove();
			
			top_banner.insertBefore(linksOriginal.cloneNode(true), getElem('search'));
			if(getElem('logo-div'))getElem('logo-div').style.transition = 'left .5s ease .5s';
			if(getElem('logo-div'))getElem('logo-div').style.left = '16px';
			links = null;
		}
		getElemList('links')[0].style.left = 16 + 88 + 'px';
		for(let i=0; i<getElemList('link').length; i++){
			getElemList('link')[i].style.top = '-64px';
			setTimeout(_=>{
				getElemList('link')[i].style.transition = 'top .5s ease '+(0.5 + (0.25 * i))+'s';
				getElemList('link')[i].style.top = '0px';
			}, 10);
		}
	}
	getElem('wrapper').style.minHeight = (window.innerHeight - getDomRect('footer').height) + 'px';
	} catch(err) { }
	
	if(typeof onLoad === 'function') onLoad();
	else if(typeof onLoad === 'object') for(let l of onLoad){
		if(typeof l === 'function') l();
	}
	if (getElem('banner')) getElem('banner').style.background = 'rgba(0,0,0,' + Math.min(1, window.scrollY / 128) + ')';
}
reloadLinks();
window.addEventListener('resize', reloadLinks, false);
document.body.onload = reloadLinks;

window.onscroll = (e) => {
	if(links){
		if(!links.hide){
			links.style.height = '0px';
			links.hide = true;
		}
	}
	if(getElem('banner')) getElem('banner').style.background = 'rgba(0,0,0,'+Math.min(1, window.scrollY / 128)+')';
	if(typeof onScroll === 'function') onScroll(e);
}
document.body.onclick = (e) => {
	if(links){
		if(!links.isInside && e.target.id != 'toggle' && e.target.id != 'banner'){
			links.style.height = '0px';
			if(getElem('logo-div'))getElem('logo-div').style.transform = 'scale(1)';
			links.hide = true;
		}
	}
	if(getElem('login-dropdown') && !getElem('login-dropdown').contains(e.target) && e.target != getElemList('user-icon')[0]){
		getElem('login-dropdown').style.height = '0px';
		getElem('login-dropdown').show = true;
	}
	if(getElem('user-dropdown') && !getElem('user-dropdown').contains(e.target) && e.target != getElemList('user-icon')[0]){
		getElem('user-dropdown').style.height = '0px';
		getElem('user-dropdown').show = true;
	}
	if(typeof onClick === 'function') onClick(e);
}

setInterval(_=>{
	hue = Math.wrap(hue+0.36, 0, 360);
	localStorage.setItem("hue", hue+'');
	let e;
	if(e = getElemList('logo-front')[0]) e.style.filter = 'hue-rotate('+hue+'deg)';
	else if(e = getElemList('about-logo')[1]) e.style.filter = 'hue-rotate('+hue+'deg)';
	
	if(getElem('return-top')){
		getElem('return-top').style.top = (Math.min(getDomRect('footer').top, window.innerHeight) - (getDomRect('return-top').height + 8)) + 'px';
		getElem('return-top').onclick = _ => pan(0, 0);
	}
}, 10);


function pan(x, y, f){
	let dx = x - window.scrollX, dy = y - window.scrollY, last = window.scrollY;
	window.scrollBy(Math.round(dx * 0.1), Math.round(dy * 0.1));
	setTimeout(_=>{
		if(Math.abs(last-window.scrollY) > 0) pan(x, y, f);
		else if(typeof f == 'function') f();
	},  16);
}



function scroll(div, speed, dir){
	div.scrollTo(div.scrollLeft + dir, 0);
	if(div.scrollLeft >= div.scrollWidth-getDomRect(div).width || div.scrollLeft <= 0 ) dir *= -1;
	setTimeout(_=>{ scroll(div, speed, dir); }, speed);
}


function Hearts(amnt, prcnt){;
	prcnt = Math.round(amnt * prcnt * 10) / 10;
	let percent = prcnt;
	let percentDelta = prcnt;
	
	let d = createElem('div', {class: 'rating-container'});
	
	d.heartSection = createElem('div', {class: 'heart-container'});
	d.heartSection.heart = [];
	for(let i=0; i<amnt; i++){
		percentDelta = Math.max(percentDelta - 1, 0);
		d.heartSection.heart[i] = new Heart((percent - percentDelta));
		percent = percentDelta
		d.heartSection.appendChild(d.heartSection.heart[i]);
	}
	d.appendChild(d.heartSection);
	
	d.textSection = createElem('div', {class: 'rating-text', html: isNaN(prcnt) ? '0.0' : (prcnt+'').length == 1 ? prcnt + '.0' : prcnt});
	d.appendChild(d.textSection);
	d.doWave = function(dur, delay){
		for(let i=0; i<d.heartSection.heart.length; i++){
			d.heartSection.heart[i].childNodes[2].style.animation = 'beat '+dur+'s';
			d.heartSection.heart[i].childNodes[2].style.animationDelay = (0.1 * i) + delay + 's';
		}
		setTimeout(_=>{
			for(let i=0; i<d.heartSection.heart.length; i++){
				d.heartSection.heart[i].cover.cover(dur, 0.1 * i + delay);
			}
		}, 10);
	}
	d.cover = (dur=0, delay=0) => {
		for(let i=0; i<d.heartSection.heart.length; i++){
			d.heartSection.heart[i].cover.cover(dur, 0.1 * i + delay);
		}
	}
	return d;
}

function Heart(prcnt){
	let h = createElem('div', {class: 'heart'});
	h.percent = prcnt;
	
	h.appendChild(createElem('div', {class: 'heart-background heart-content'}));
	
	h.cover = createElem('div', {class: 'heart-cover heart-content'});
	h.cover.cover = (dur, delay=0) => {
		h.cover.style.transition = 'width ' + dur + 's ease ' + delay + 's, left ' + dur + 's ease ' + delay + 's';
		h.cover.style.left = (100 * h.percent) + '%';
		h.cover.style.width = 100 * (1 - h.percent) + '%';
	}
	h.cover.uncover = function(){
		h.cover.style.left = '0px';
		h.cover.style.width ='100%';
	}
	h.appendChild(h.cover);
	
	h.appendChild(createElem('div', {class: 'heart-foreground heart-content'}));
	
	return h;
}







function Dropdown(x, y, w, h, list, options={}){
	let e = createElem('div');
	e.id = 'sort-dropdown';
	e.style.position = 'absolute';
	if(!isNaN(x)) e.style.left = x + 'px';
	if(!isNaN(y)) e.style.top = y + 'px';
	if(!isNaN(w)) e.style.width = w + 'px';
	if(!isNaN(h)) e.style.height = h + 'px';
	e.style.background = options.baseBg || 'black';
	e.style.transition = 'top 0.5s';
	
	function recur(array){
		for(let a of array){
			if(typeof a === 'object'){
				recur(a);
				e.lastChild.style.marginBottom = '12px';
			} else {
				let item = createElem('div');
				item.style.padding = '8px 0 8px 8px';
				item.style.color = 'white';
				item.style.fontSize = '14px';
				item.style.borderBottom = '1px solid rgb(100, 100, 100)';
				item.innerHTML = a.charAt(0).toUpperCase() + a.slice(1);
				e.appendChild(item);
			}
		}
	}
	recur(list);
	return e;
}


function spotterBox(top,right,bottom,left){
	top -= 16;
	right += 16;
	bottom += 16;
	left -= 16;
	let e = createElem('div', {id:'main-box'});
	e.style.position = 'fixed';
	e.style.zIndex = '9'.repeat(20);
	e.style.left = e.style.top = '0px';
	e.style.width = e.style.height = '100%';
	
	let t = createElem('div', {class:'main-box-item box-top'});
	let r = createElem('div', {class:'main-box-item box-top'});
	let b = createElem('div', {class:'main-box-item box-top'});
	let l = createElem('div', {class:'main-box-item box-top'});
	t.style.backgroundColor=r.style.backgroundColor=b.style.backgroundColor=l.style.backgroundColor='rgb(0,0,0,0.75)';
	t.style.position=r.style.position=b.style.position=l.style.position='absolute';
	t.style.left = t.style.top = '0px';
	r.style.right = r.style.top = '0px';
	b.style.left = b.style.bottom = '0px';
	l.style.left = l.style.top = '0px';
	
	t.style.width = '100%'; t.style.height = '0px';
	r.style.width = '0px';  r.style.height = '100%';
	b.style.width = '100%'; b.style.height = '0px';
	l.style.width = '0px';  l.style.height = '100%';
	
	e.appendChild(t);
	e.appendChild(r);
	e.appendChild(b);
	e.appendChild(l);
	document.body.appendChild(e);
	
	setTimeout(_=>{
		t.style.transition=r.style.transition=b.style.transition=l.style.transition='left 0.5s ease, top 0.5s ease, width 0.5s ease, height 0.5s ease';
		t.style.height = top + 'px';
		r.style.top = top + 'px'; r.style.width = 'calc(100% - ' + right + 'px)'; r.style.height = bottom - top + 'px';
		b.style.height = 'calc(100% - ' + bottom + 'px)';
		l.style.top = top + 'px'; l.style.width = left + 'px'; l.style.height = bottom - top + 'px';
		
		
		setTimeout(_=>e.remove(), 2900);
	}, 100);
}













(_=>{
	if(!getElem('login-view')) return;
	let s = document.createElement("script");
	s.type = "module";
	s.src = "scripts/login-register.js";
	document.body.appendChild(s);
})();