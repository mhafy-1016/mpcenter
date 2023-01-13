import { db, doc, getDoc, updateDoc, setDoc, collection, getDocs, query, where } from '/mpcenter/scripts/module.js';

let items = [];
var url = new URL(window.location.href);
let page = parseInt(url.searchParams.get("page") || 1);
let search = url.searchParams.get("search") || '';
if(!page || isNaN(page) || page === '0') page = 1;

let seach_bar = getElem('search-box');
let result = getElem('result');
getElem('search').style.borderBottom = '3px solid ' + window.getComputedStyle(document.body, null).getPropertyValue('background-color');
getElem('search').style.background = window.getComputedStyle(document.body, null).getPropertyValue('background-color');

window.sessionStorage.removeItem('addon_tags');
window.sessionStorage.removeItem('map_tags');

let qCol = await getDocs(collection(db, "projects"));
if(qCol) qCol.forEach(doc => items.push(doc.data()));

seach_bar.style.display = 'block';
result.style.display = 'flex';

let totalDisplay = 12;
let totalCards = 0;
let totalPages = Math.ceil(totalCards / totalDisplay);
let totalPageButton = 5;

seach_bar.value = search;
search_list(seach_bar.value);

seach_bar.addEventListener('keyup', (e) => {
	page = 1;
	search_list(seach_bar.value);
}, false);

function search_list(name){
	search = name;
	window.history.pushState('search', 'Search Page', 'search?search='+search+'&page='+page);
	
	if(!name || name === '') return;
	let list = [];
	for(let e of items){
		if(e.name.toLowerCase().indexOf(name.toLowerCase())+1) {
			list.push([e, true]);
		}
	}
	for(let e of getElemList('cards')){
		for(let i of list){
			if(e.data.id == i[0].id) i[1] = false;
		}
	}
	list.sort((a,b) => [a.name, b.name].sort().indexOf(a.name) - 1 );
	totalCards = list.length;
	totalPages = Math.ceil(totalCards / totalDisplay);
	page = Math.constrain(page, 0, totalPages);
	
	result.innerHTML = '';
	for(let i=0; i<Math.min(totalDisplay, totalCards - totalDisplay * (page-1)); i++){
		if(!list[i]) continue;
		let e = new Card(list[(page-1) * totalDisplay + i][0], { scale: 0.9, index: i, doWave: list[(page-1) * totalDisplay + i][1] });
		if(!list[(page-1) * totalDisplay + i][1]) e.style.transform = 'scale(1)';
		else {
			e.style.animation = 'pop 0.5s forwards';
			e.style.animationDelay = (0.1 * i) + 's';
		}
		getElem('result').appendChild(e);
	}
	
	for(let i=0; i<getElemList('page-item').length; i++){
		if(page <= 2) {
			if(i < totalPages) getElemList('page-item')[i].value = i + 1;
		} else if(page >= totalPages-2) getElemList('page-item')[i].value = totalPages + (i-4);
		else if(page + (i-2) >= 1 && page + (i-2) <= totalPages) getElemList('page-item')[i].value = page + (i-2);
	}
	for(let e of getElemList('page-item')){
		e.disabled = isNaN(e.value);
		if(page == e.value) e.style.border = '1px solid white';
		e.onclick = (ev) => { if(page != e.value) skip(e.value); };
	}
	getElemList('skip-item')[0].disabled = (page < 6);
	getElemList('skip-item')[1].disabled = (page < 2);
	getElemList('skip-item')[2].disabled = (page > totalPages-1);
	getElemList('skip-item')[3].disabled = (page > totalPages-5);
	getElemList('skip-item')[0].onclick = (e) => skip(Math.max(1, page-5));
	getElemList('skip-item')[1].onclick = (e) => skip(Math.max(1, page-1));
	getElemList('skip-item')[2].onclick = (e) => skip(Math.min(totalPages, page+1));
	getElemList('skip-item')[3].onclick = (e) => skip(Math.min(totalPages, page+5));
	function skip(n){ page = n; updateLink(); }
}

function updateLink(){
	window.location.replace('search?search='+search+'&page='+page);
}
