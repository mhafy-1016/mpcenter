import { db, doc, collection, getDocs, query, where, onSnapshot, setDoc, getDoc, updateDoc, addDoc, orderBy,
	auth, onAuthStateChanged
} from '/mpcenter/scripts/module.js';

for(let e of getElemList('header-item')){
	e.style.animation = `wabble 1s infinite ${Math.random()}s`;
}
getElem('item-body').style.animation = `wabble 1s infinite ${Math.random()}s`;
getElem('item-footer').style.animation = `wabble 1s infinite ${Math.random()}s`;

window.sessionStorage.removeItem('addon_tags');
window.sessionStorage.removeItem('map_tags');

var url = new URL(window.location.href);
let id = url.searchParams.get("id");
let item = null;
let leftW = 800 + 32;
let rightW = 280 + 32;

let rate = 0;
let rated = false;
let clicked = false;
let comments = {};
let user = null;

let combox = null;

const qCol = await getDocs(query(collection(db, "projects"), where("id", "==", id)));
if(qCol) qCol.forEach((doc) => { item = doc.data(); } );
	
update(item);
await onAuthStateChanged(auth, async u => {
	user = u;
	if(getElemList('comment-alert')[0]) getElemList('comment-alert')[0].style.display = u ? 'none' : 'block';
	if (user) {
		let ratingCol = await getDocs(query(collection(db, `projects/${item.id}/ratings`), where("rater", "==", user.uid)));
		if (ratingCol && ratingCol.size > 0) {
			ratingCol.forEach((doc) => { rate = doc.data().rate; });
			rated = true;
			updateRating(rate);
			getElemList('rate-status')[0].innerHTML = 'Thanks a lot!';
		}

		combox.textarea.disabled = false;
		combox.bottom.button.disabled = false;
		
		combox.bottom.avatar.style.background = `url(/mpcenter/res/alpha/${user.displayName.toLowerCase()[0]}.png)`;
		combox.bottom.avatar.style.backgroundSize = '100% 100%';
		combox.bottom.avatar.style.backgroundPosition = 'center center';
		(_=>{
			let total = 0;
			for(let i of user.displayName){
				if(isNaN(i)) total += i.charCodeAt(0);
				else total += parseInt(i);
			}
			combox.bottom.avatar.style.filter = `hue-rotate(${Math.floor(total/user.displayName.length)}deg)`;
		})();
		
		combox.bottom.name.innerHTML = user.displayName;
		scroll(combox.bottom.name, 16, 1);
	} else {
		updateRating(0);
		getElemList('rate-status')[0].style.color = 'yellow';
		getElemList('rate-status')[0].innerHTML = 'Please <span class="login-shorcut">Login</span> first';
		
		combox.textarea.placeholder = 'Login First';
		combox.textarea.disabled = true;
		combox.bottom.button.disabled = true;
		combox.bottom.avatar.style.background = null;
		combox.bottom.name.innerHTML = '<div class="meep">༼ つ ◕_◕ ༽つ </div><span class="cloud login-shorcut">login</span>';
	}
});

await onSnapshot(doc(db, 'projects', item.id), (doc) => {
    item = doc.data();
	if(item.rating && item.rating.length > 0){
		let ratingTotal = 0;
		for(let e of item.rating){ ratingTotal += e.rate; }
		let rating = Math.round(10 * ((ratingTotal / item.rating.length) / 10) * 10) / 10 || 0;
		for(let i=0; i<10; i++){
			let w = 100;
			if(Math.floor(rating) > i) w = 0;
			else if(Math.floor(rating) == i) w = 100 - ((rating - i) * 100);
			getElemList('heart-item-cover')[i].style.width = w + '%';
		}
		getElemList('rating-value')[0].innerHTML = rating + '/10';
	}
});

await onSnapshot(collection(db, 'projects/' + item.id + '/ratings'), doc => {
	let ratingTotal = 0;
	doc.forEach(d => { ratingTotal += d.data().rate });
	if (typeof item.rating != 'object') item.rating = [];
	for (let e of item.rating) { ratingTotal += e.rate; }
	let rating = Math.round(10 * ((ratingTotal / doc.size) / 10) * 10) / 10 || 0;
	for (let i = 0; i < 10; i++) {
		let w = 100;
		if (Math.floor(rating) > i) w = 0;
		else if (Math.floor(rating) == i) w = 100 - ((rating - i) * 100);
		getElemList('heart-item-cover')[i].style.width = w + '%';
	}
	getElemList('rating-value')[0].innerHTML = rating + '/10';
	if (rated) {
		updateRating(rate);
		getElemList('rate-status')[0].innerHTML = 'Thanks a lot!';
	}
});

async function recursive(div, res, border, flowType){
	await onSnapshot(query(collection(db, res), orderBy('date', 'asc')), doc => doc.forEach(d => {
		let data = d.data();
		if(comments[d.id] == null){
			comments[d.id] = data;
			let commenter = commenterBox(res+'/'+d.id+'/replies', {id: data.id, name: data.sender, date: data.date, comment: data.comment, linker: border==null, class: 'reply-area'});
			commenter.style.border = border;
			commenter.body.footer.button.disabled = (user == null);
			if (flowType) div.insertBefore(commenter, div.firstChild);
			else div.appendChild(commenter);
			recursive(commenter.replies_container.reply, res+'/'+d.id+'/replies');
		}
	}));
	for (let e of getElemList('comment-counter')) {
		e.innerHTML = Object.keys(comments).length;
    }
}
await recursive(getElemList('commenters')[0], 'projects/'+item.id+'/comments', '1px solid black', 'ascending');

function update(item){
	if(!item){
		getElemList('left')[0].style.display = 'flex';
		getElemList('left')[0].style['justify-content'] = 'center';
		getElemList('left')[0].style['align-items'] = 'center';
		getElemList('left')[0].style['flex-wrap'] = 'wrap';
		getElemList('left')[0].style.height = window.innerHeight - (getDomRect('left',0).top + getDomRect('footer').height + 38) + 'px';
		getElemList('left')[0].innerHTML = '<div style="text-align:center;"><h1 style="margin:0px;">Error</h1><br><a href="" style="color:yellow;font-size:1.5em;display:block;">Retry</a></div>';
		document.title = 'Error';
	}else {
		document.title += ' | ' + item.name + ' |';
		
		for(let e of getElemList('header-item')){
			e.style.minHeight = '0px';
			e.style.animation = '';
			e.style.backgroundColor = 'transparent';
		}
		getElem('item-body').style.animation = '';
		getElem('item-body').style.width = '100%';
		getElem('item-body').style.minHeight = '0px';
		getElem('item-body').style.backgroundColor = 'transparent';
		getElem('item-body').style.borderRadius = '0px';
		
		getElemList('item-path')[0].innerHTML = '&nbspMinecraft Bedrock / <a href="'+item.type+'s.html">'+capFirstLetter(item.type)+'</span>';
		getElemList('item-path')[0].style.borderRadius = '0px';
		getElemList('item-bar')[0].style.display = 'block';
		getElemList('item-title')[0].innerHTML = item.name + ' <br>v' + item.version;
		getElemList('item-tiny-detail')[0].innerHTML = '&nbspBy: <span style="font-size:12px;">' + item.author + '</span>';
		getElemList('item-tiny-detail')[1].innerHTML = '&nbspUploaded: <span style="font-size:12px;">'+dateToString(item.date)+'</span>';
		getElemList('item-tiny-detail')[0].style.width = '100%';
		getElemList('item-tiny-detail')[1].style.width = '100%';

		(_ => {
			getElemList('share-status')[0].innerHTML += '<div class="share-item-container"><div class="share-item-container-icon facebook"></div><span class="share-total facebook-share">0</span></div>'
			getElemList('share-status')[0].innerHTML += '<div class="share-item-container"><div class="share-item-container-icon twitter"></div><span class="share-total twitter-share">0</span></div>'
			getElemList('share-status')[0].innerHTML += '<div class="share-item-container"><div class="share-item-container-icon share"></div><span class="share-total twitter-share">0</span></div>'
			getElemList('share-status')[0].onclick = e => {
				if (e.target != getElemList('share-status')[0])
					pan(0, getDomRect('social-media-icon', 0).y - Math.floor(window.innerHeight / 4));
			}
		});
		
		for(let i=0; i<10; i++){
			let h = createElem('div', {class:'heart-item-container rating-status-item'});
			h.innerHTML += '<div class="heart-item icon heart-item-bg"></div>';
			h.innerHTML += '<div class="heart-item icon heart-item-cover" style="width: 100%"></div>';
			h.innerHTML += '<div class="heart-item icon heart-item-fg"></div>';
			getElemList('rating-status')[0].appendChild(h);
		}
		getElemList('rating-status')[0].innerHTML += '<span class="rating-value rating-status-item">0/10</span>';
		getElemList('rating-status')[0].onclick = e => {
			if(e.target != getElemList('rating-status')[0]) 
				pan(0, getDomRect('rating-container').y - Math.floor(window.innerHeight / 4));
		}
		
		getElem('item-body').innerHTML = item.html;
		
		getElem('item-footer').style.animation = '';
		getElem('item-footer').style.width = '100%';
		getElem('item-footer').style.minHeight = '0px';
		getElem('item-footer').style.backgroundColor = 'transparent';
		
		if (typeof item.changelog == 'object') {
			let ver = Object.keys(item.changelog)[Object.keys(item.changelog).length-1];
			getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Changelog</h3>';
			let versionToggle = createElem('div', {class:'version-toggle', html: `${ver} ▾`});
			versionToggle.current = 0;
			getElem('item-footer').innerHTML += '<span style="display: inline-block">Version: &nbsp'+versionToggle.outerHTML+'</span><br><br>';
			let table = createElem('table', {class:'changelog'});
			table.innerHTML = `<tr><th>Changelog for ${ver}</th></tr>`;
			table.innerHTML += `<tr><td>${item.changelog[ver]}</td></tr>`;
			getElem('item-footer').appendChild(table);
			getElem('item-footer').innerHTML += '<br>'.repeat(3);
		}
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Do you know?</h3>';
		if(item.type === 'addon'){
			for(let e of addonQs){
				getElem('item-footer').innerHTML += '<a href="faq.html?q='+e+'" class="item-link">'+e+'</a><br><br>';
			}
		} else if(item.type === 'map'){
			for(let e of mapQs){
				getElem('item-footer').innerHTML += '<a href="faq.html?q='+e+'" class="item-link">'+e+'</a><br><br>';
			}
		}
		
		getElem('item-footer').innerHTML += '<br>'.repeat(3);
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold" class="download-link">Downlaod Links:</h3>';
		getElem('item-footer').innerHTML += '<br>';
		for (let l of item.links) {
			getElem('item-footer').innerHTML += '<a href='+l.link+' class="item-link">'+l.text+'</a><br><br>';
		}
		getElem('item-footer').innerHTML += '<br>'.repeat(3);
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Tags:</h3>';
		let tagDiv = createElem('table', {class:'tag-container'});
		for(let e of item.tags){
			let tag = createElem('a', {class:'item-tag', html: e});
			tag.href = item.type+'s.html';
			tagDiv.appendChild(tag);
		}
		getElem('item-footer').appendChild(tagDiv);
		if (typeof item.gameVersion === 'object') {
			getElem('item-footer').innerHTML += '<br>';
			getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Compatible Version(s):</h3>';
			let gv = createElem('div', { class: 'game-version-box' });
			for (let e of item.gameVersion) {
				gv.innerHTML += '<div class="game-version">' + e + '</div>'
			}
			getElem('item-footer').appendChild(gv);
		}

		getElem('item-footer').innerHTML += '<br>'.repeat(4);
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold; text-align: center; line-height: 0" class="rating-title">Do you like it?</h3>';
		getElem('item-footer').innerHTML += '<p style="text-align: center;">A review would be helpful</p>';
		let heartDiv = createElem('div', {id:'rating-container'});
		heartDiv.clicked = false;
		heartDiv.lastClicked = -1;
		for(let i=0; i<10; i++){
			heartDiv.appendChild(createElem('div', { class: 'rating-heart icon' }));
		}
		getElem('item-footer').appendChild(heartDiv);
		getElem('item-footer').innerHTML += '<p class="rate-status" style="text-align: center;">&nbsp</p>';
		getElem('item-footer').innerHTML += '<br>';
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Share it</h3>';
		getElem('item-footer').innerHTML += '<a target="_blank" class="social-media-icon facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href) + '&t=' + encodeURIComponent(document.title) + '"></a>';
		getElem('item-footer').innerHTML += '<a target="_blank" class="social-media-icon twitter" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + '&url=' + window.location.href +'&via=Mhafy1016"></a>';
		//getElem('item-footer').innerHTML += '<a class="social-media-icon share share-button" ></a>'
		getElem('item-footer').innerHTML += '<br>'.repeat(3);

		document.querySelector('meta[property="og:image"]').setAttribute("content", item.thumbnail);

		// Right Panel
		getElemList('right')[0].innerHTML += '<h3 style="font-family: Mojang Bold; margin-bottom: 4px;">Share it</h3>';
		getElemList('right')[0].innerHTML += '<a target="_blank" class="social-media-icon facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href) + '&t=' + encodeURIComponent(document.title) + '"></a>';
		getElemList('right')[0].innerHTML += '<a target="_blank" class="social-media-icon twitter" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + '&url=' + window.location.href + '&via=Mhafy1016"></a>';
		getElemList('right')[0].innerHTML += '<br>'.repeat(2);
		getElemList('right')[0].appendChild(tagDiv);

		if (typeof item.gameVersion === 'object') {
			getElemList('right')[0].innerHTML += '<br>';
			let gv = createElem('div', { class: 'game-version-box' });
			for (let e of item.gameVersion) {
				gv.innerHTML += '<div class="game-version">' + e + '</div>'
			}
			getElemList('right')[0].appendChild(gv);
		}
		
		// Comments Panel
		getElem('item-comments').style.display = 'block';
		combox = commentBox("projects/" + item.id + "/comments", {placeholder:'Write a Comment'});
		getElem('item-comments').insertBefore(combox, getElemList('commenters')[0]);
		
		// rating
		window.addEventListener('mouseover', (e) => {
			if (user) {
				updateRating(rated ? rate : 0);
				getElemList('rate-status')[0].innerHTML = rated ? 'Thanks a lot!' : '&nbsp';

				if (getElem('rating-container').contains(e.target) && !isMobile && !rated) {
					let i = 0;
					for (let r of getElemList('rating-heart')) {
						r.index = i++;
						if (r.contains(e.target)) {
							updateRating(r.index + 1);
							getElemList('rate-status')[0].innerHTML = 'Click to rate';
							r.onclick = async _ => {
								await setDoc(doc(collection(db, `projects/${item.id}/ratings`)), {
									rater: user.uid,
									rate: r.index + 1,
									checked: false
								});
								rate = r.index + 1;
								rated = true;
								getElemList('rate-status')[0].innerHTML = 'Thanks a lot!';
								r.onclick = null;
							}
						}
					}
				}
			} else if(!user) {
				updateRating(0);
				getElemList('rate-status')[0].style.color = 'yellow';
				getElemList('rate-status')[0].innerHTML = 'Please <span class="login-shorcut">Login</span> first';
			}
		}, false);
		
		window.addEventListener('click', async(e) => {
			if(e.target.classList.contains('item-tag')) window.sessionStorage[item.type+'_tags'] = e.target.innerHTML.toLowerCase(); 
			else if (e.target.classList.contains('login-shorcut')) getElemList('login')[0].onclick();

			if(e.target.classList.contains('share-button')){
				getElem('link-bg').style.display = 'block';
				getElemList('link-area')[0].value = window.location.href + '';
				getElemList('link-copy')[0].disabled = false;
				getElemList('link-copy')[0].value = 'COPY';
				getElem('link-board').style.animation = 'pop 0.5s forwards';
			} else if (e.target.id == 'link-bg') getElem('link-bg').style.display = 'none';

			if (isMobile && !rated) {
				let i = 0;
				let inside = false;
				for (let r of getElemList('rating-heart')) {
					r.index = i++;
					if (r.contains(e.target)) {
						inside = true;
						if (rate == r.index + 1) {
							await setDoc(doc(collection(db, 'projects/' + item.id + '/ratings')), {
								rater: user.uid,
								rate: r.index + 1,
								checked: false
							});
							rated = true;
							getElemList('rate-status')[0].innerHTML = 'Thanks a lot!';
						} else {
							updateRating(r.index + 1);
							getElemList('rate-status')[0].innerHTML = 'Click again';
							rate = r.index + 1;
						}
					}
				}
				if (!inside) rate = -1;
			}
		});
		
		
		if(getElemList('version-toggle')[0]){
			let dd = createElem('div', {class:'version-toggle-dropdown'});
			dd.height = '';
			dd.shown = false;
			let index = 0;
			for(let e in item.changelog) {
				let el = createElem('div', { class: 'version-dropdown-item', html: e});
				el.index = index++;
				el.onclick = () => { 
					getElemList('version-toggle')[0].current = el.index;
					getElemList('version-toggle')[0].innerHTML = el.innerHTML+' ▾'
					
					dd.style.height = '0px';
					dd.shown = false;
					
					dd.style.left = getDomRect(getElemList('version-toggle')[0]).left + 'px';
					dd.style.top = window.scrollY + getDomRect(getElemList('version-toggle')[0]).bottom-1 + 'px';
					dd.style.minWidth = getDomRect(getElemList('version-toggle')[0]).width + 'px';

					getElemList('changelog')[0].innerHTML = `<tr><th>Changelog for ${el.innerHTML}</th></tr>`;
					getElemList('changelog')[0].innerHTML += `<tr><td>${item.changelog[el.innerHTML]}</td></tr>`;
				}
				dd.appendChild(el);
			}
			
			getElemList('version-toggle')[0].onclick = (e) => {
				if(!dd.shown){
					dd.style.height = dd.height + 'px';
					dd.shown = true;
				} else {
					dd.style.height = '0px';
					dd.shown = false;
				}
				for(let ditem of getElemList('version-dropdown-item')){
					ditem.style.backgroundColor = (e.target.innerHTML == ditem.innerHTML+' ▾') ? 'rgba(255,255,255,0.2)' : '';
				}
				dd.style.left = getDomRect(getElemList('version-toggle')[0]).left + 'px';
				dd.style.top = window.scrollY + getDomRect(getElemList('version-toggle')[0]).bottom-1 + 'px';
				dd.style.minWidth = getDomRect(getElemList('version-toggle')[0]).width + 'px';
			}
			
			window.onclick = function(e){
				if(e.target == getElemList('version-toggle')[0] || dd.contains(e.target)) return;
				dd.style.left = getDomRect(getElemList('version-toggle')[0]).left + 'px';
				dd.style.top = window.scrollY + getDomRect(getElemList('version-toggle')[0]).bottom-1 + 'px';
				dd.style.minWidth = getDomRect(getElemList('version-toggle')[0]).width + 'px';
				if(dd.shown){
					dd.style.height = '0px';
					dd.shown = false;
				}
			}
			
			document.body.appendChild(dd);
			setTimeout(_=>{ dd.height = getDomRect(dd).height; dd.style.height = '0px'; dd.style.overflow = 'hidden hidden'; dd.style.opacity = '1';}, 10);
		}
		
		updateDoc(doc(db, "projects", item.id), { views: item.views+1 });
	}
}

function updateRating(r){
	for (let j = 0; j < getElemList('rating-heart').length; j++){
		getElemList('rating-heart')[j].style.background = (j < r) ? 'url(/mpcenter/res/heart-full.png' : 'url(/mpcenter/res/heart.png';
		getElemList('rating-heart')[j].style.backgroundSize = '100% 100%';
	}
}

window.addEventListener('online', () => {
	location.reload();
}, false);

onScroll = (e) => {
	getElem('return-top').style.animation = (window.scrollY >= 32) ? 'pop 0.5s forwards' : null;
	getElem('return-top').style.transform = (window.scrollY >= 32) ? null : 'scale(0, 0)';
}

onLoad = function(){
	getElemList('right')[0].style.display = (window.innerWidth < leftW + rightW) ? 'none' : 'inline-block';
}
onLoad();

function commentBox(path, options={}){
	let e = createElem('div', {class:'commenter-container'});
	e.textarea = createElem('textarea', {class: 'commenter-area ' + options.class});
	e.textarea.disabled = options.textAreaDisabled || false;
	e.textarea.setAttribute('name', 'commenter-area');
	e.textarea.setAttribute('placeholder', options.placeholder || '');
	e.textarea.setAttribute('rows', '3');
	e.textarea.setAttribute('cols', '50');
	
	e.bottom = createElem('div', {class: 'commenter-bottom'});
	e.bottom.avatar = createElem('div', {class: 'commenter-bottom-item commenters-avatar icon'});
	
	e.bottom.name = createElem('div', {class: 'commenter-bottom-item commenters-name'});
	e.bottom.name.innerHTML = '<div class="meep">༼ つ ◕_◕ ༽つ </div><span class="cloud login-shorcut">login</span>';
	e.bottom.button = createElem('input', {class: 'submit-button'});
	e.bottom.button.value = 'Submit';
	e.bottom.button.disabled = options.buttonDisabled || false;
	e.bottom.button.onclick = (ev) => {
		if(e.textarea.value.replace(/\n|\s/g, "").length == 0) return;
		reCaptcha(async _ => {
			e.textarea.disabled = true;
			e.bottom.button.disabled = true;
			e.bottom.button.value = "Wait..";
			await addDoc(collection(db, path), {
				id: user.uid,
				sender: user.displayName,
				comment: e.textarea.value.replace(/\n\s*\n/g, '\n').replace(/\n/g, "\r\n"),
				date: new Date().getTime(),
				checked: false,
			});
			e.textarea.value = '';
			e.textarea.disabled = false;
			e.bottom.button.disabled = false;
			e.bottom.button.value = "Submit";
		});
	}
	
	e.appendChild(e.textarea);
	e.appendChild(e.bottom);
	
	e.bottom.appendChild(e.bottom.avatar);
	e.bottom.appendChild(e.bottom.name);
	e.bottom.appendChild(e.bottom.button);
	
	return e;
}


function commenterBox(path, options={}){
	let e = createElem('div', {class:'commenter'});
	e.container = createElem('div', {class:'commenter-container'});
	e.container.avatar = createElem('div', {class:'commenter-avatar icon'});
	e.container.avatar.style.background = 'url(/mpcenter/res/alpha/'+options.name.toLowerCase()[0]+'.png)';
	e.container.avatar.style.backgroundSize = '100% 100%';
	e.container.avatar.style.backgroundPosition = 'center center';
	(_=>{
		let total = 0;
		for(let i of options.name){
			if(isNaN(i)) total += i.charCodeAt(0);
			else total += parseInt(i);
		}
		e.container.avatar.style.filter = 'hue-rotate('+Math.floor(total/options.name.length)+'deg)';
	})();
	e.container.appendChild(e.container.avatar);
	
	e.body = createElem('div', {class:'commenter-body'});
	e.body.name = createElem('div', {class:'commenter-body-item commenter-name', html: options.name || 'Loading...'});
	if(options.id) (async ()=>{
		let name = '';
		const list = await getDocs(query(collection(db, "users"), where("uid", "==", options.id)));
		if(list) list.forEach((doc) => { name = doc.data().displayName; } );
		
		e.body.name.textContent = name;
		
		(_=>{
			let total = 0;
			for(let i of name){
				if(isNaN(i)) total += i.charCodeAt(0);
				else total += parseInt(i);
			}
			e.container.avatar.style.filter = 'hue-rotate('+Math.floor(total/name.length)+'deg)';
		})();
	})();
	e.body.date = createElem('div', {class:'commenter-body-item commenter-date', html: dateToString(options.date) || ''});
	e.body.date.value = options.date;
	e.body.appendChild(e.body.name);
	e.body.appendChild(e.body.date);
	
	e.body.comment = createElem('div', {class:'commenter-body-item commenter-comment'});
	e.body.comment.textContent = (options.comment || '').replace(/<br>/g, '\r\n');
	e.body.appendChild(e.body.comment);
	
	e.replies_container = createElem('div', {class:'commenter-replies'});
	e.replies_container.combox = commentBox(path, options);
	e.replies_container.combox.show = false;
	e.replies_container.combox.style.display = 'none';
	e.replies_container.appendChild(e.replies_container.combox);
	e.replies_container.reply = createElem('div', {class:'commenter-replies-container'});
	e.replies_container.appendChild(e.replies_container.reply);
	
	e.body.footer = createElem('div', {class:'commenter-body-item commenter-body-footer'});
	e.body.footer.button = createElem('input', {class:'commenter-body-footer-button'});
	e.body.footer.button.type = 'button';
	e.body.footer.button.value = 'Reply';
	e.body.footer.button.onclick = (ev) => {
		if(user) {
			if(!e.replies_container.combox.show) {
				e.body.footer.button.value = 'Cancel';
				e.replies_container.combox.style.display = 'block';
				
				e.replies_container.combox.bottom.avatar.style.background = 'url(/mpcenter/res/alpha/'+user.displayName.toLowerCase()[0]+'.png)';
				e.replies_container.combox.bottom.avatar.style.backgroundSize = '100% 100%';
				e.replies_container.combox.bottom.avatar.style.backgroundPosition = 'center center';
				(_=>{
					let total = 0;
					for(let i of user.displayName){
						if(isNaN(i)) total += i.charCodeAt(0);
						else total += parseInt(i);
					}
					e.replies_container.combox.bottom.avatar.style.filter = 'hue-rotate('+Math.floor(total/user.displayName.length)+'deg)';
				})();
				
				e.replies_container.combox.bottom.name.innerHTML = user.displayName;
				e.replies_container.combox.textarea.focus();
			} else {
				e.body.footer.button.value = 'Reply';
				e.replies_container.combox.style.display = 'none';
			}
			
			e.replies_container.combox.show = !e.replies_container.combox.show;
		}
	}
	
	e.body.footer.appendChild(e.body.footer.button);
	e.body.appendChild(e.body.footer);
	e.container.appendChild(e.body);
	e.appendChild(e.container);
	e.appendChild(e.replies_container);
	
	return e;
}
