import { db, doc, getDoc, updateDoc, setDoc, collection, getDocs, query, where } from '/mpcenter/scripts/module.js';
// loading wabble
for(let e of getElemList('loader')){
	e.style.transform = 'scale(1, 0.95)';
	e.style.animation = 'wabble 1s infinite '+(Math.random())+'s';
}

var url = new URL(window.location.href);
let sort_value = url.searchParams.get("sort");
let sort_type = url.searchParams.get("type");
let page = url.searchParams.get("page");
let tags = [];

let items = [];
let doReload = false;
if(!sort_value || sort_values.indexOf(sort_value.toLowerCase()) == -1) sort_value = sort_values[0];
if(!sort_type || sort_types.indexOf(sort_type.toLowerCase()) == -1) sort_type = sort_types[1];
if(!page || isNaN(page) || page === '0') page = 1;
if(window.sessionStorage.addon_tags) tags = window.sessionStorage.addon_tags.split(','); else tags = allTags.slice(0);

sort_value = sort_value.toLowerCase();
sort_type = sort_type.toLowerCase();
page = parseInt(page);
rewriteLink();
// remove saved tags
window.sessionStorage.removeItem('map_tags');

onLoad = _ => {
	getElemList('link')[0].style.borderBottom = '3px solid ' + window.getComputedStyle(document.body, null).getPropertyValue('background-color');
	getElemList('link')[0].style.background = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
};
// Sort
getElem('sort').innerHTML = capFirstLetter(sort_value) + '<span style="float:right;">'+('↑↓')[sort_types.indexOf(sort_type)]+'</span>';
for(let i=0; i<sort_types.length; i++){
	getElem('sort-dropdown').innerHTML += '<div class="sort-dropdown-item sort-type" style="background:'+(sort_type==sort_types[i]?'rgb(25, 25, 25)':'')+'">'+capFirstLetter(sort_types[i])+'<span style="position:absolute;right:12px;">'+('↑↓')[i]+'</span></div>';
}
getElem('sort-dropdown').innerHTML += '<br>';
for(let e of sort_values){
	getElem('sort-dropdown').innerHTML += '<div class="sort-dropdown-item sort-value" style="background:'+(sort_value==e?'rgb(25, 25, 25)':'')+'">'+capFirstLetter(e)+'</div>';
}
getElem('sort-dropdown').height = getDomRect('sort-dropdown').height;
getElem('sort-dropdown').show = false;
getElem('sort-dropdown').style.height = '0px';
getElem('sort-dropdown').style.opacity = '1';
getElem('sort').onclick = (e) => {
	getElem('sort-dropdown').style.height = !getElem('sort-dropdown').show ? getElem('sort-dropdown').height + 'px' : '0px';
	getElem('sort').style.background = !getElem('sort-dropdown').show ? 'rgb(10, 10, 10)' : null;
	getElem('sort-dropdown').show = !getElem('sort-dropdown').show;
}
for(let i=0; i<getElemList('sort-type').length; i++){
	getElemList('sort-type')[i].onclick = (e) => { sort_type = sort_types[i]; }
}
for(let i=0; i<getElemList('sort-value').length; i++){
	getElemList('sort-value')[i].onclick = (e) => { sort_value = sort_values[i]; }
}

// Tags
for(let e of allTags){
	let checked =  tags.indexOf(e) == -1 ? '' : ' checked ';
	getElem('tag-dropdown').innerHTML += '<label class="tag-item tag-label"><input class="tag-item tag" type="checkbox"'+checked+'/>'+capFirstLetter(e)+'</label>';
}
for(let i=0; i<getElemList('tag').length; i++){
	getElemList('tag')[i].onchange = (e) => {
		if(i==0) for(let c of getElemList('tag')) {
			if(getElemList('tag')[i] == c) continue;
			c.checked = getElemList('tag')[0].checked;
		}
		if(i>0 || (i==0 && getElemList('tag')[i].checked)) doReload = true;
	}
}
getElem('tag-dropdown').height = getDomRect('tag-dropdown').height;
getElem('tag-dropdown').show = false;
getElem('tag-dropdown').style.height = '0px';
getElem('tags').onclick = (e) => {
	if(getElem('tag-dropdown').show) getCheckedTagAndRefresh();
	getElem('tag-dropdown').style.height = !getElem('tag-dropdown').show ? getElem('tag-dropdown').height + 'px' : '0px';
	getElem('tags').style.background = !getElem('tag-dropdown').show ? 'black' : null;
	getElem('tag-dropdown').show = !getElem('tag-dropdown').show;
	if(getElem('tag-dropdown').show){
		document.body.style['pointer-events'] = 'none';
		getElem('tags').style['pointer-events'] = 'auto';
		getElem('tag-dropdown').style['pointer-events'] = 'auto';
	} else {
		document.body.style['pointer-events'] = 'auto';
	}
}

function getCheckedTagAndRefresh(){
	if(!doReload) return;
	window.sessionStorage.removeItem('addon_tags');
	window.sessionStorage.addon_tags = '';
	for(let i=0; i<getElemList('tag').length; i++){
		if(!getElemList('tag')[i].checked) continue;
		window.sessionStorage.addon_tags += allTags[i];
		if(i < getElemList('tag').length-1) window.sessionStorage.addon_tags += ',';
	}
	location.reload();
}

window.onclick = (e) => {
	if(!e.target.classList.contains('sort-dropdown-item') && e.target.id !== 'sort'){
		getElem('sort-dropdown').show = false;
		getElem('sort-dropdown').style.height = '0px';
		getElem('sort').style.background = null;
	}else if(e.target.classList.contains('sort-dropdown-item')) updateLink();
	if(!e.target.classList.contains('tag-item') && e.target.id !== 'tags'){
		getCheckedTagAndRefresh();
		getElem('tag-dropdown').show = false;
		getElem('tag-dropdown').style.height = '0px';
		getElem('tags').style.background = null;
		document.body.style['pointer-events'] = 'auto';
	}
}
(async()=>{
	let qCol = await getDocs(query(collection(db, "projects"), where("type", "==", "addon")));
	if(qCol) qCol.forEach(doc => {
		let add = false;
		for(let e of doc.data().tags){
			if(tags.indexOf(e.toLowerCase())+1) add = true;
		}
		if(add) items.push(doc.data());
	});
	getElem('result').innerHTML = '';
	if(items.length == 0) {
		getElem('result').style['align-items'] = 'center';
		getElem('result').style.height = getDomRect('wrapper').bottom - getDomRect('footer').height - getDomRect('page-controller').height + 'px';
		getElem('result').innerHTML += '<div style="width:192px;color:white;"><div class="empty"></div><div style="text-align:center;color:white;opacity:0.1;">empty</div></div>';
		return;
	}
	let ranks = items.sort((a, b) => b.downloads - a.downloads);
	if(sort_value === sort_values[0]){
		if(sort_type === sort_types[0]) items.sort((a,b) => [a.name, b.name].sort().indexOf(b.name) - 1 );
		if(sort_type === sort_types[1]) items.sort((a,b) => [a.name, b.name].sort().indexOf(a.name) - 1 );
	} else if(sort_value === sort_values[1]){
		if(sort_type === sort_types[0]) items.sort((a, b) => a.date - b.date);
		if(sort_type === sort_types[1]) items.sort((a, b) => b.date - a.date);
	} else if(sort_value === sort_values[2]){
		if(sort_type === sort_types[0]) items.sort((a, b) => a.downloads - b.downloads);
		if(sort_type === sort_types[1]) items.sort((a, b) => b.downloads - a.downloads);
	} else if(sort_value === sort_values[3]){
		if(sort_type === sort_types[0]) items.sort((a, b) => (a.rating / a.rated) - (b.rating / b.rated));
		if(sort_type === sort_types[1]) items.sort((a, b) => (b.rating / b.rated) - (a.rating / a.rated));
	}
	
	let totalDisplay = 12;
	let totalCards = items.length;
	let totalPages = Math.ceil(totalCards / totalDisplay);
	page = Math.constrain(page, 1, totalPages);
	rewriteLink();

	for(let i=0; i<Math.min(totalDisplay, totalCards - totalDisplay * (page-1)); i++){
		let e = new Card(items[i], { scale: 0.9, index: i });
		e.style.animation = 'pop 0.5s forwards';
		e.style.animationDelay = (0.1 * i) + 's';
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
})();

function updateLink(){
	window.location.replace('addons?sort='+sort_value+'&type='+sort_type+'&page='+page);
}
function rewriteLink(){
	window.history.pushState('addon', 'Addons Page', 'addons?sort='+sort_value+'&type='+sort_type+'&page='+page);
}
