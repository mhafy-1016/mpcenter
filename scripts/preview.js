
let card;
let curr = 'card';

let item = sessionStorage.getItem('item');
if(!item) window.location.replace('admin.html');
item = JSON.parse(item);

getElem('left').onclick = _ => {
	getElem('right').disabled = false;
	getElem('right').style.opacity = '1';
	if(getElem('item-container').style.display != 'none') {
		getElem('item-container').style.opacity = '1';
		getElem('item-container').style.animation = 'fade-out 0.5s forwards, slide-left 2s forwards';
		setTimeout(addCard, 600);
	}
	else window.location.replace('admin.html');
};

getElem('right').onclick = _ => {
	getElem('right').disabled = true;
	getElem('right').style.opacity = '0';
	card.style.animation = 'poof 0.5s forwards';
	setTimeout(_=>{
		getElem('card-box').style.display = 'none';
		getElem('item-container').style.display = 'flex';
		getElem('item-container').style.opacity = '0';
		getElem('item-container').style.animation = 'fade-in 0.5s forwards 1s, from-right 2s forwards';
		getElem('card-box').innerHTML = '';
		
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
		getElemList('item-title')[0].innerHTML = item.name + ' ' + item.version;
		getElemList('item-tiny-detail')[0].innerHTML = '&nbspBy: <span style="font-size:12px;">' + item.author + '</span>';
		getElemList('item-tiny-detail')[1].innerHTML = '&nbspUploaded: <span style="font-size:12px;">'+dateToString(item.date)+'</span>';
		getElemList('item-tiny-detail')[0].style.width = '100%';
		getElemList('item-tiny-detail')[1].style.width = '100%';
		
		//u_0_1_1J
		getElemList('share-status')[0].innerHTML += '<div class="share-item-container"><div class="share-item-container-icon facebook"></div><span class="share-total facebook-share">0</span></div>'
		getElemList('share-status')[0].innerHTML += '<div class="share-item-container"><div class="share-item-container-icon twitter"></div><span class="share-total twitter-share">0</span></div>'
		getElemList('share-status')[0].innerHTML += '<div class="share-item-container"><div class="share-item-container-icon share"></div><span class="share-total twitter-share">0</span></div>'
		getElemList('share-status')[0].onclick = e => {
			if(e.target != getElemList('share-status')[0]) 
				pan(0, getDomRect('social-media-icon', 0).y - Math.floor(window.innerHeight / 4));
		}
		
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
			let ver = Object.keys(item.changelog)[Object.keys(item.changelog).length - 1];
			getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Changelog</h3>';
			let versionToggle = createElem('div', { class: 'version-toggle', html: `${ver} ▾` });
			versionToggle.current = 0;
			getElem('item-footer').innerHTML += '<span style="display: inline-block">Version: &nbsp' + versionToggle.outerHTML + '</span><br><br>';
			let table = createElem('table', { class: 'changelog' });
			table.innerHTML = `<tr><th>Changelog for ${ver}</th></tr>`;
			table.innerHTML += `<tr><td>${item.changelog[ver]}</td></tr>`;
			getElem('item-footer').appendChild(table);
			getElem('item-footer').innerHTML += '<br>'.repeat(3);
		}
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Do you know?</h3>';
		getElem('item-footer').innerHTML += '<a href="faq.html?q=How to install Minecraft Bedrock Addon in Windows?" class="item-link">How to download from linkvertise?</a><br><br>';
		if(item.type === 'addon'){
			for(let e of addonQs){
				getElem('item-footer').innerHTML += '<a target="_SEJ" rel="noreferrer" href="faq.html?q='+e+'" class="item-link">'+e+'</a><br><br>';
			}
		} else if(item.type === 'map'){
			for(let e of mapQs){
				getElem('item-footer').innerHTML += '<a target="frameName" href="faq.html?q='+e+'" class="item-link">'+e+'</a><br><br>';
			}
		}
		log(item.type);
		getElem('item-footer').innerHTML += '<br>'.repeat(3);
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Links:</h3>';
		for(let l of item.links){
			getElem('item-footer').innerHTML += '<a href='+l.link+' class="item-link">'+l.text+'</a><br><br>';
		}
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Tags:</h3>';
		let tagDiv = createElem('table', {class:'tag-container'});
		for(let e of item.tags){
			let tag = createElem('a', {class:'item-tag', html: e});
			tag.href = item.type+'s.html';
			tagDiv.appendChild(tag);
		}
		getElem('item-footer').appendChild(tagDiv);
		getElem('item-footer').innerHTML += '<br>'.repeat(4);
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold; text-align: center; line-height: 0" class="rating-title">Do you like it?</h3>';
		getElem('item-footer').innerHTML += '<p style="text-align: center;">A review would be helpful</p>';
		let heartDiv = createElem('div', {id:'rating-container'});
		heartDiv.clicked = false;
		heartDiv.lastClicked = -1;
		for(let i=0; i<10; i++){
			let h = createElem('div', {class:'rating-heart'});
			h.index = i;
			h.innerHTML += '<div class="rating-heart-item icon rating-heart-bg"></div>';
			h.innerHTML += '<div class="rating-heart-item icon rating-heart-cover"></div>';
			h.innerHTML += '<div class="rating-heart-item icon rating-heart-fg"></div>';
			heartDiv.appendChild(h);
		}
		getElem('item-footer').appendChild(heartDiv);
		getElem('item-footer').innerHTML += '<p class="rate-status" style="text-align: center;">&nbsp</p>';
		getElem('item-footer').innerHTML += '<br>';
		getElem('item-footer').innerHTML += '<h3 style="font-family: Mojang Bold">Share it</h3>';
		getElem('item-footer').innerHTML += '<a target="_blank" class="social-media-icon facebook" href=""></a>';
		getElem('item-footer').innerHTML += '<a target="_blank" class="social-media-icon twitter" href="" data-size="large" data-text="M-Project Center releases" data-url="http://192.168.254.109:3000/item.html?id=RZpUMmUJafhwR1n2gosv" data-via="Mhafy.1016" data-show-count="false"></a>'
		getElem('item-footer').innerHTML += '<a class="social-media-icon share share-button" ></a>'
		getElem('item-footer').innerHTML += '<br>'.repeat(3);
	}, 600);
};

function addCard(){
	getElem('card-box').style.display = 'flex';
	getElem('item-container').style.display = 'none';
	
	card = new Card(item, { scale: 0.9, click: false });
	card.style.animation = 'pop 0.5s forwards';
	getElem('card-box').appendChild(card);
}
addCard();
