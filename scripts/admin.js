import {
	auth, db, doc, getDoc, addDoc, updateDoc, setDoc, collection, getDocs, query, where,
	onAuthStateChanged
} from '/scripts/module.js';

getElem('wrapper').style.pointerEvents = 'none';
await onAuthStateChanged(auth, async u => {
	let user;
	if (u) {
		const qCol = await getDocs(query(collection(db, "users"), where("uid", "==", u.uid)));
		if (qCol) qCol.forEach((doc) => { user = doc.data(); });
	}
	if (!user || !user.admin || user.admin != true) location.replace('index.html');
	else {
		console.log('Welcome Admin');
		getElem('wrapper').style.pointerEvents = 'auto';
	}
});

getElem('type-dropdown').height = getDomRect('type-dropdown').height;
getElem('type-dropdown').show = false;
getElem('type-dropdown').value = '';
getElem('type-dropdown').style.height = '0px';
getElem('type-dropdown').style.opacity = '1';

// Version Box
for (let e of versions) {
	let l = createElem('label', { class: 'version-box-label', html: '<input class="version-box" type="checkbox"/>' + capFirstLetter(e) });
	l.value = capFirstLetter(e);
	getElem('version-checkboard').appendChild(l);
}

getElem('version-checkboard').onclick = e => {
	for (let i = 0; i < getElemList('version-box-label'); i++) {
		if (e.target == getElemList('version-box-label')[i]) getElemList('version-box')[i].checked = !getElemList('version-box')[i].checked;
    }
}

let linker = getElemList('link-item')[0].cloneNode(true);
getElemList('remove-link')[0].remove();

let selectedTags = [];

let poster = '';
let thumbnail = '';
let hasItem = false;
let item = {};

function complete(item) {
	getElem('project-id').value = item.id;
	getElem('title').value = item.name;
	getElem('version').value = item.version;
	getElem('version').onchange();
	getElem('type-dropdown-toggle').value = item.type.toUpperCase();
	for (let i = 0; i < getElemList('version-box-label').length; i++) {
		let found = false;
		for (let v of item.gameVersion) {
			if (getElemList('version-box-label')[i].value == v) found = true;
		}
		if (found) {
			getElemList('version-box')[i].checked = true;
        }
    }
	getElem('small-detail').value = item.detail;
	$('#main-detail').summernote('code', item.html);

	for(let it of item.tags){
		for(let tag of getElemList('tag')){
			if(it.toLowerCase() == tag.value) {
				selectedTags.push(it);
				tag.selected = true;
				tag.style.backgroundColor = 'transparent';
				tag.style.border = '1px solid white';
			}
		}
	}
	
	for(let i=0; i<item.links.length; i++){
		if(i >= 1) getElem('add-link').click();
		
		getElemList('link-text')[i].value = item.links[i].text;
		getElemList('linker-text')[i].value = item.links[i].link;
	}
	loadURLToInputFiled(item.thumbnail);
	thumbnail = item.thumbnail;
}

getElem('project-id').onchange = async e => {
	if(getElem('project-id').value === '') return;
	getElem('loader-bar').style.opacity = '1';
	loadingId();
	let qCol = await getDocs(query(collection(db, "projects"), where("id", "==", getElem('project-id').value)));
	if(qCol) qCol.forEach(doc => { item = doc.data(); });
	getElem('loader-bar').style.opacity = '0';
	getElem('id-loader').style.borderBottom = '1px solid ' + (item==null ? 'red' : '#73ff54');
	if(!item) return;
	complete(item);
	getElem('changelog-box').style.display = getElem('changelog-box-label').style.display = 'block';
}

getElem('version').onchange = e => {
	if (Object.keys(item).length == 0) return;
	if (typeof item.changelog != 'object') return;
	if (!item.changelog[getElem('version').value]) return;
	$('#changelog').summernote('code', item.changelog[getElem('version').value]);
};

getElem('clear').onclick = _ => {
	getElem('project-id').value = '';
	getElem('id-loader').style.borderBottom = '1px solid white';
	getElem('title').value = '';
	getElem('version').value = '';
	getElem('type-dropdown-toggle').value = 'TYPE';
	getElem('small-detail').value = '';
	$('#main-detail').summernote('code', '');
	selectedTags = [];
	for(let e of getElemList('tag')){
		e.selected = false;
	}
	getElem('tag-box').click();
	getElem('poster').value = '';
	getElem('thumbnail').value = '';
	$('#changelog').summernote('code', '');
	
	sessionStorage.clear();
}

getElem('title').onclick = e => { e.target.style.borderBottom = '1px solid white'; }
$('#version').keypress(function(event) {
    if ((event.which < 48 || event.which > 57 ) && event.which != 46) {
        event.preventDefault();
    }
}).on('paste', function(event) {
    event.preventDefault();
});

for(let e of getElemList('type-dropdown-item')){
	e.onclick = _ => { getElem('type-dropdown-toggle').click(); getElem('type-dropdown-toggle').value = e.value; }
}
getElem('type-dropdown-toggle').onclick = (e) => {
	e.target.style.background = 'black';
	getElem('type-dropdown').show = !getElem('type-dropdown').show;
	getElem('type-dropdown').style.transition = 'height 0.5s ease';
	if(getElem('type-dropdown').show) getElem('type-dropdown').style.height = getElem('type-dropdown').height + 'px';
	else getElem('type-dropdown').style.height = '0px';
}
getElem('type-dropdown-toggle').onfocus = e => { e.target.style.background = 'rgb(10, 10, 10)'; };
getElem('type-dropdown-toggle').onfocusout = e => { e.target.style.background = 'black'; };


getElem('small-detail').onclick = e => {
	e.target.style.border = '1px solid white';
}

for(let e of allTags){
	let d = createElem('input', {class:'tag'});
	d.type = 'button';
	d.value = e;
	d.selected = false;
	d.onfocus = _ => {
		for(let e of getElemList('tag')){
			e.style.backgroundColor = e.selected ? 'transparent' : 'rgba(255,255,255,0.2)';
			e.style.border = e.selected ? '1px solid white' : '1px solid transparent';
		}
		if(!d.selected){
			d.style.backgroundColor = 'transparent';
			d.style.border = '1px solid white';
		}
	}
	d.onfocusout = _ => {
		for(let e of getElemList('tag')){
			e.style.backgroundColor = e.selected ? 'transparent' : 'rgba(255,255,255,0.2)';
			e.style.border = e.selected ? '1px solid white' : '1px solid transparent';
		}
	}
	getElem('tag-box').appendChild(d);
}
getElem('tag-box').onclick = e => {
	if(e.target.classList.contains('tag')){
		if(selectedTags.indexOf(e.target.value) == -1)selectedTags.push(e.target.value);
		else selectedTags.splice(selectedTags.indexOf(e.target.value), 1);
		e.target.selected = selectedTags.indexOf(e.target.value) != -1;
	}
	for(let e of getElemList('tag')){
		e.style.backgroundColor = e.selected ? 'transparent' : 'rgba(255,255,255,0.2)';
		e.style.border = e.selected ? '1px solid white' : '1px solid transparent';
	}
}
window.onmouseover = e => {
	for(let t of getElemList('tag')){
		t.style.backgroundColor = t.selected ? 'transparent' : 'rgba(255,255,255,0.2)';
		t.style.border = t.selected ? '1px solid white' : '1px solid transparent';
	}
	if(e.target.classList.contains('tag')){
		if(!e.target.selected){
			e.target.style.backgroundColor = 'transparent';
			e.target.style.border = '1px solid white';
		}
	}
}

getElem('add-link').onclick = e => {
	getElem('link-box').insertBefore(linker.cloneNode(true), getElem('add-link'));
};


window.onclick = (e) => {
	if(!getElem('type-dropdown-box').contains(e.target)) {
		if(getElem('type-dropdown').show) getElem('type-dropdown-toggle').click();
	}
	if(e.target.classList.contains('remove-link')) e.target.parentNode.remove();
}

$(document).ready(function() {
	$('#main-detail').summernote({
        placeholder: 'Presentation here...',
        minHeight: 360,
		height: 360,
        toolbar: [
			['style', ['style']],
			['font', ['bold', 'underline', 'clear','fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['table', ['table']],
			['insert', ['link', 'picture', 'video']],
			['view', ['fullscreen', 'codeview', 'help']]
		],
		imageAttributes: {
			icon: '<i class="note-icon-pencil"/>',
			figureClass: 'figureClass',
			figcaptionClass: 'captionClass',
			captionText: 'Caption Goes Here.',
			manageAspectRatio: true // true = Lock the Image Width/Height, Default to true
		},
		popover: {
			image: [
				['image', ['resize100', 'resize75', 'resize50', 'resize25', 'resizeNone']],
				['float', ['floatLeft', 'floatRight', 'floatNone']],
				['custom', ['imageAttributes']],
				['remove', ['removeMedia']]
			],
			link: [
				['link', ['linkDialogShow', 'unlink']]
			],
			table: [
				['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
				['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
			],
			air: [
				['color', ['color']],
				['font', ['bold', 'underline', 'clear']],
				['para', ['ul', 'paragraph']],
				['table', ['table']],
				['insert', ['link', 'picture']]
			]
		}
	});
	$('#changelog').summernote({
		placeholder: 'Changelog here...',
		minHeight: 240,
		height: 240,
        toolbar: [
			['style', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
			['font', ['fontname', 'fontsize']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']]
		]
	});
	$('#thumbnail').change(function() {
		var fr = new FileReader;
		fr.onload = function() {
			var img = new Image;
			img.onload = function() {
				if(img.width != img.height && !confirm('The image is '+img.width+'x'+img.height+' (not squared)\nContinue?')) getElem('thumbnail').value = '';
				else thumbnail = img.src;
			};
			img.src = fr.result;
		};
		fr.readAsDataURL(this.files[0]);
	});
	
	getElem('changelog-box').style.display = getElem('changelog-box-label').style.display = 'none';
	if(sessionStorage.getItem('item')) {
		(async _=>{
		let item = null;
		let qCol = await getDocs(query(collection(db, "projects"), where("id", "==", JSON.parse(sessionStorage.getItem('item')).id)));
		if(qCol) qCol.forEach(doc => { item = doc.data(); });
		if(item) getElem('changelog-box').style.display = getElem('changelog-box-label').style.display = 'block';
		})();
		
		complete(JSON.parse(sessionStorage.getItem('item')));
	}
});


function createItem(){
	if(getElem('title').value === '') {
		getElem('title').style.borderBottom = '1px solid red';
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#title").offset().top - window.innerHeight / 2
		}, 500);
		return;
	}
	if(getElem('type-dropdown-toggle').value == 'TYPE'){
		getElem('type-dropdown-toggle').style.background = 'red';
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#type-dropdown-toggle").offset().top - window.innerHeight / 2
		}, 500);
		return;
	}
	if(getElem('small-detail').value.split(' ').filter(word => word !== '').length < 20) {
		getElem('small-detail').style.border = '1px solid red';
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#small-detail").offset().top - window.innerHeight / 2
		}, 500);
		return;
	}
	let hasVersionChecked = false;
	for (let e of getElemList('version-box')) {
		if (e.checked) hasVersionChecked = true;
	}
	if (!hasVersionChecked) {
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#version-checkboard").offset().top - window.innerHeight / 2
		}, 500);
		return;
	}
	let s = $('#main-detail').summernote('code').replace(/<\/p>/gi, "\n").replace(/<br\/?>/gi, "\n").replace(/<\/?[^>]+(>|$)/g, "") + '';
	if(s.split(' ').filter(word => word !== '').length < 20) {
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#main-detail").offset().top + window.innerHeight / 2
		}, 500);
		return;
	}
	if(selectedTags.length == 0){
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#tag-box").offset().top - (window.innerHeight / 2) + ($("#tag-box").height() / 2)
		}, 500);
		return;
	}
	if(getElemList('link-text')[0].value == '' || getElemList('linker-text')[0].value == ''){
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#link-box").offset().top - (window.innerHeight / 2) + ($("#link-box").height() / 2)
		}, 500);
		return;
	}
	if( document.getElementById("thumbnail").files.length == 0 ) return;
	
	item.author = 'Mhafy1016';
	item.name = getElem('title').value;
	if (typeof item.changelog == 'object') {
		item.changelog[getElem('version').value] = $('#changelog').summernote('code');
	} else {
		item.changelog = {};
		item.changelog[getElem('version').value] = $('#changelog').summernote('code');
    }
	item.date = new Date().getTime();
	item.detail = getElem('small-detail').value;
	if (!item.downloads) item.downloads = 0;
	item.id = getElem('project-id').value || customID(20);
	item.links = [];
	item.html = $('#main-detail').summernote('code');
	for(let i=0; i<getElemList('link-item').length; i++){
		item.links[i] = {
			text: getElemList('link-text')[i].value,
			link: getElemList('linker-text')[i].value
		};
	}
	if (typeof item.shares != 'object') item.shares = {
		facebook: 0,
		twitter: 0,
		share: 0
	};
	item.tags = selectedTags;
	item.thumbnail = thumbnail;
	item.type = (getElem('type-dropdown-toggle').value + '').toLowerCase();
	item.rating = [];
	item.gameVersion = [];
	for (let i = 0; i < getElemList('version-box-label').length; i++) {
		if (getElemList('version-box')[i].checked) item.gameVersion.push(getElemList('version-box-label')[i].value)
	}
	item.version = getElem('version').value;
	if(item.views) item.views = 0;
	return true;
}

getElem('submit').onclick = async e => {
	if (createItem()) {
		getElem('submit').value = 'WAIT...';
		getElem('submit').disabled = true;
		getElem('preview').disabled = true;
		await setDoc(doc(db, 'projects', item.id), item);
		alert('Done!');
		getElem('submit').value = 'SUBMIT';
		getElem('submit').disabled = false;
		getElem('preview').disabled = false;
	}
}

getElem('preview').onclick = e => {
	if (!createItem()) return;
	
	let delay = 0.1;
	getElem('preview-box').style.animation = 'poof 0.5s forwards';
	getElem('image-uploader-box').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('changelog-box').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('changelog-box-label').style.animation = 'slide-right 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('link-box').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('link-box-label').style.animation = 'slide-right 0.5s forwards '+delay+'s'; delay += 0.1;
	for(let i=getElemList('tag').length-1; i>=0; i--){
		getElemList('tag')[i].style.animation = 'poof 0.5s forwards '+delay+'s'; delay += 0.01;
	}
	getElem('tag-box').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('tag-box-label').style.animation = 'slide-right 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('presentation').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('small-detail').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('small-detail-label').style.animation = 'slide-right 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('type-dropdown-toggle').style.animation = getElem('type-dropdown-box').style.animation = 'poof 0.5s forwards '+delay+'s'; delay += 0.1;
	//getElem('version-dropdown-toggle').style.animation = getElem('version-dropdown-box').style.animation = 'poof 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('version').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('title').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('title-label').style.animation = 'slide-right 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('id-loader').style.animation = getElem('project-id').style.animation = 'slide-left 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('clear').style.animation = 'poof 0.5s forwards '+delay+'s'; delay += 0.1;
	getElem('project-id-label').style.animation = 'slide-right 0.5s forwards '+delay+'s'; delay += 0.1;
	
	$([document.documentElement, document.body]).animate({ scrollTop: 0 }, 2000);
	
	setTimeout(_=>{
		getElem('main-view').style.display = 'none';
		sessionStorage.setItem('item', JSON.stringify(item));
		window.location.replace('preview.html');
	}, 2500);
	
	e.target.disabled = true;
};











function loadingId(x=0, dir=1){
	if(getElem('loader-bar').style.opacity === '0') return;
	x += 10 * dir;
	let half = getDomRect('id-loader').width / 2;
	getElem('loader-bar').style.left = x + 'px';
	getElem('loader-bar').style.width = Math.min(x + (getDomRect('loader-bar').width / 2), half) - (Math.max(x + (getDomRect('loader-bar').width / 2), half) - half) + 'px';
	if(x + getDomRect('loader-bar').width >= getDomRect('id-loader').width) dir = -1;
	else if(x <= 0) dir = 1;
	setTimeout(_=>loadingId(x, dir), 16);
}


function loadURLToInputFiled(url){
  getImgURL(url, (imgBlob)=>{
    let fileName = 'thumbnail'
    let file = new File([imgBlob], fileName,{type:"image/jpeg", lastModified:new Date().getTime()}, 'utf-8');
    let container = new DataTransfer(); 
    container.items.add(file);
    document.querySelector('#thumbnail').files = container.files;
    
  })
}
// xmlHTTP return blob respond
function getImgURL(url, callback){
  var xhr = new XMLHttpRequest();
  xhr.onload =_=> callback(xhr.response);
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}