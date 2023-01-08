

function Card(data={}, options={}){
	options.scale = options.scale || 0.96;
	options.index = options.index || 1;
	if(options.click == undefined) options.click = function(){ window.location.replace('item.html?id='+data.id); };
	let rated = data.rating.length;
	let rating = 0;
	for(let a of data.rating){
		rating += a.rate;
	}
	let e = createElem('div', {class: 'cards'});
	e.data = data;
	
	e.card = createElem('div', {class: 'card'});
	e.card.style.transform = 'scale('+options.scale+')';
	e.card.style.backgroundColor = data.avgColor;
	
	e.card.bg = createElem('div', {class: 'card-bg'});
	e.card.bg.style.transform = 'rotate(10deg)';
	e.card.bg.style.opacity = '0';
	e.card.appendChild(e.card.bg);
	
	e.card.info = createElem('div', {class: 'card-info', html: data.detail});
	e.card.appendChild(e.card.info);
	
	let stat = createElem('div', {class: 'card-status'});
	stat.heartsElement = new Hearts(10, (rating / rated) / 10);
	stat.appendChild(stat.heartsElement);
	if(options.doWave) stat.heartsElement.doWave(0.1, (0.1 * options.index) + 0.5);
	else stat.heartsElement.cover();
	e.card.appendChild(stat);
	
	e.card.cover = createElem('div', {class: 'card-cover'});
	e.card.appendChild(e.card.cover);
	
	let n = createElem('div', {class: 'card-rank', html: data.version || ''});
	e.card.appendChild(n);
	
	e.card.flag = createElem('div', {class: 'card-flag', html: '&nbsp&nbspNEW&nbsp&nbsp'});
	e.card.flag.style.backgroundColor = 'red';
	e.card.appendChild(e.card.flag);
	
	if(DateDiff.inDays(new Date(data.date), new Date()) > 7){
		e.card.flag.style.display = 'none';
	}
	
	e.card.addEventListener('mouseover', function(ev){
		e.card.style.transform = 'scale(1)';
		e.card.style.cursor = 'pointer';
		
		domAnimate(e.card.cover, 'shine', 0.25);
		
		stat.style.transition = 'height .5s ease .25s, opacity .5s ease .25s';
		stat.style.height = '0px';
		stat.style.opacity = '0';
		
		n.style.transition = 'opacity .5s ease .25s, right .5s ease .25s';
		n.style.right = '-24px';
		n.style.opacity = '0';
		n.style.animation = null;
		
		e.card.flag.style.transition = 'opacity .5s ease .25s, left .5s ease .25s';
		//e.card.flag.style.left = '-24px';
		e.card.flag.style.opacity = '0';
		
		e.card.info.style.transition = 'opacity .5s ease .3s';
		e.card.info.style.opacity = '1';
		setTimeout(_=>{
			if(typeof options.click === 'function') e.card.cover.onmousedown = _ => options.click();
		}, 250);
	}, false);
	e.card.addEventListener('mouseout', function(){
		e.card.style.transform = 'scale('+options.scale+')';
		e.card.style.cursor = 'default';
		
		domAnimate(e.card.cover, 'shine', 0.25, 'reverse', 0.25);
		
		stat.style.transition = 'height .5s, opacity .5s';
		stat.style.height = '13.333%';
		stat.style.opacity = '1';
		
		n.style.transition = '';
		n.style.right = '4px';
		n.style.opacity = '1';
		n.style.animation = 'version-in 0.5s';
		
		e.card.flag.style.transition = 'opacity .5s ease, left .5s ease';
		//e.card.flag.style.left = '-5px';
		e.card.flag.style.opacity = '1';
		
		e.card.info.style.transition = 'opacity .5s';
		e.card.info.style.opacity = '0';
		e.card.cover.onmousedown = null;
	}, false);
	
	e.appendChild(e.card);
	loadImg(data.thumbnail, _=>{
		e.card.bg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
		e.card.bg.style.opacity = '1';
		e.card.bg.style.transform = 'rotate(0deg)';
		setDOMBG(e.card.bg, 'url('+data.thumbnail+')', {position: 'center', size: 'auto 100%'});
	});
	
	return e;
}