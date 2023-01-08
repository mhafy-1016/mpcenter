function deck(w, h, totalCards, isMobile, options={}){
	let d = document.createElement('div');
	d.className = 'deck';
	d.style.width = '100%';
	d.style.height = h + 'px';
	
	let cards = document.createElement('div');
	cards.className = 'cards-container';
	cards.currentCard = 0;
	if(totalCards >= Math.floor(window.innerWidth / w) * 2) {
		cards.skippedCards = Math.max(Math.floor(window.innerWidth / w) - 1, 1);
	} else { cards.skippedCards = 1; }
	cards.startLoop = false;
	cards.style.display = 'flex';
	cards.style.height = h + 12 + 'px';
	cards.style.overflowX = isMobile ? 'scroll' : 'hidden';
	cards.style.overflowY = 'hidden';
	
	for(let i=0; i<totalCards; i++){
		cards.appendChild(new Card(w, h, false, i));
	}
	
	if(totalCards == 0) cards.innerHTML = '<div style="margin:auto; color:white;">No Data Yet</div>';
	d.appendChild(cards);
	
	if(!isMobile && totalCards > Math.floor(window.innerWidth / w)){
		let controls = document.createElement('div');
		controls.className = 'deck-controller';
		controls.style.width = '100%';
		controls.style.height = cards.style.height;
		controls.style.position = 'absolute';
		controls.style.display	= 'none';
		controls.style.zIndex = '2';
		controls.style['pointer-events'] = 'none';
		controls.style.marginTop = '-'+cards.style.height;
		
		let left = document.createElement('div');
		left.className = 'controller-left';
		left.style.width = 48 + 'px';
		left.style.height = '100%';
		left.style.backgroundImage = 'url(res/arrow.png)';
		left.style.backgroundPosition = 'center center';
		left.style.backgroundSize = '48px 48px';
		left.style.transform = 'scaleX(-1)';
		left.style.backgroundRepeat = 'no-repeat';
		left.style.backgroundColor = 'rgba(0, 0, 0)';
		left.style.opacity = '0.5';
		left.style.display = 'none';
		left.style['pointer-events'] = 'auto';
		left.addEventListener('click', function(){
			let dist = w * cards.skippedCards;
			if(cards.startLoop == true && cards.skippedCards > 1){
				while(cards.skippedCards * w > cards.scrollLeft){
					let copy = cards.lastChild.cloneNode(true);
					cards.lastChild.remove();
					cards.insertBefore(copy, cards.firstChild);
					cards.scrollTo(cards.scrollLeft + w, 0);
				}
			}
			let temp = Math.max(cards.scrollLeft - dist, 0);
			scrollToSmoothly(cards, temp, 2);
		}, false);
		controls.appendChild(left);
		
		let right = document.createElement('div');
		right.className = 'controller-left';
		right.style.width = 48 + 'px';
		right.style.height = '100%';
		right.style.backgroundImage = 'url(res/arrow.png)';
		right.style.backgroundPosition = 'center center';
		right.style.backgroundSize = '48px 48px';
		right.style.backgroundRepeat = 'no-repeat';
		right.style.backgroundColor = 'rgba(0, 0, 0)';
		right.style.opacity = '0.5';
		right.style.float = 'right';
		right.style.display	= 'inline-block';
		right.style['pointer-events'] = 'auto';
		right.addEventListener('click', function(){
			let dist = w * cards.skippedCards;
			while(cards.firstChild.getBoundingClientRect().right <= 0 && cards.skippedCards > 1){
				let copy = cards.firstChild.cloneNode(true);
				cards.firstChild.remove();
				cards.appendChild(copy);
				cards.scrollTo(cards.scrollLeft - w, 0);
			}
			if(cards.startLoop == false) dist -= 48;
			let temp = cards.scrollLeft + dist;
			scrollToSmoothly(cards, temp, 2);
			cards.startLoop = true;
			left.style.display = 'inline-block';
		}, false);
		function easeInQuad(t, b, c, d) {
			return c * (t /= d) * t + b;
		}
		controls.appendChild(right);
		d.addEventListener('mouseover', function(){
			controls.style.display	= 'inline-block';
		}, false);
		d.addEventListener('mouseout', function(){
			controls.style.display	= 'none';
		}, false);
		
		d.appendChild(controls);
		
	} else if(isMobile && totalCards >= 3) {
		cards.lastScrollPos = cards.scrollLeft;
		cards.addEventListener('touchstart', (ev) => { cards.lastScrollPos = cards.scrollLeft; }, false);
		cards.addEventListener('touchmove', keepScrolling, false);
		function keepScrolling(){
			if( cards.lastScrollPos == cards.scrollLeft ) return;
			if(cards.scrollLeft - cards.lastScrollPos < 0) {
				let tries = 100;
				while(cards.firstChild.getBoundingClientRect().right >= 0){
					let temp = cards.lastChild.cloneNode(true);
					cards.lastChild.remove();
					cards.insertBefore(temp, cards.firstChild);
					cards.scrollTo({left:cards.scrollLeft + w});
					if(tries-- <= 0) break;
				}
			} else if(cards.scrollLeft - cards.lastScrollPos > 0) {
				let tries = 100;
				while(cards.lastChild.getBoundingClientRect().left <= window.innerWidth){
					let temp = cards.firstChild.cloneNode(true);
					cards.firstChild.remove();
					cards.appendChild(temp);
					cards.scrollTo({left:cards.scrollLeft - w});
					if(tries-- <= 0) break;
				}
			}
			cards.lastScrollPos = cards.scrollLeft;
			setTimeout(keepScrolling, 16);
		}
	}
	if(options.showHint) {
		setTimeout(() => {
			scrollToSmoothly(cards, 32, .01);
			setTimeout(() => { scrollToSmoothly(cards, 0, .01); }, 1000);
		}, 500);
	}
	return d;
}

function scrollToSmoothly(scroll, pos, inc) {
	let currentPos = scroll.scrollLeft;
	let t = inc;
	if(currentPos < pos){
		for(let i=currentPos; i<=pos; i+=inc, t+=inc){
			setTimeout(function() { scroll.scrollTo(i, 0); }, t / 2);
		}
	} else {
		for (let i = currentPos; i >= pos; i-=inc, t+=inc) {
			setTimeout(function() { scroll.scrollTo(i, 0); }, t / 2);
		}
	}
	setTimeout(function() { scroll.scrollTo(pos, 0); }, t / 2);
}