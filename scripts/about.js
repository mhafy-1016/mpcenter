
getElemList('about-logo')[0].style.animation = 'pop 0.5s';
getElemList('about-logo')[1].style.animation = 'pop 0.5s';

window.sessionStorage.removeItem('addon_tags');
window.sessionStorage.removeItem('map_tags');

let data = 'PGgxIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7ICI+TWhhZnkxMDE2PC9oMT48cCBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyI+SEkgdGhpcyBpcyBNaGFmeTEwMTYgdGhhbmt5b3UgZm9yIHZpc2l0aW5nIG15IHdlYnNpdGUuPC9wPjxwIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7Ij5JIGFtIHB1cnN1aW5nIEJhY2hlbG9yIG9mIFNjaWVuY2UgaW4gSW5mb3JtYXRpb24gVGVjaG5vbG9neSAoQlNJVCkuPC9wPjxwIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7Ij5JIG1hZGUgdGhpcyB3ZWJzaXRlIHRvIHVwbG9hZCBhbGwgb2YgbXkgcHJvamVjdHMgaW4gPC9wPjxwIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7Ij5NaW5lY3JhZnQgQmVkcm9jayBFZGl0aW9uLCB5ZWFoIEkga25vdyBpdCdzIHVnbHkgOyg8L3A+PHAgc3R5bGU9InRleHQtYWxpZ246IGNlbnRlcjsiPmJ1dCBiYXJlIHdpdGggaXQgdGhvdWdoIGJlY2F1c2UgaXQncyBzdGlsbCBkZXZlbG9waW5nLjwvcD48cCBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyI+TXkgZ29hbCBmb3IgY3JlYXRpbmcgdGhpcyB3ZWJzaXRlIGlzIHRvIHNoYXJlIGFsbCBteSBjcmVhdGlvbnM8L3A+PHAgc3R5bGU9InRleHQtYWxpZ246IGNlbnRlcjsiPmFuZCB0byBtYWtlIHlvdXIgZ2FtZXBsYXkgbW9yZSBmdW4gYW5kIGV4Y2l0aW5nLjwvcD48cCBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyI+PGJyPjwvcD48cCBzdHlsZT0idGV4dC1hbGlnbjogY2VudGVyOyI+SWYgeW91IGhhdmUgcXVlc3Rpb25zIG9yIHlvdSB3YW50IHRvIGtub3cgbW9yZSBhYm91dCBtZTxicj55b3UgY2FuIGFzayBtZSBieSB1c2luZyB0aGUgbGlua3MgYmVsb3cuIEFnYWluIFRoYW5reW91IHZlcnkgbXVjaCA7RDwvcD4=';

onLoad = () => {
	if(isMobile){
		getElem('about-container').style['flex-wrap'] = 'wrap';
		getElem('about-container').style.height = 'auto';
		for(let e of getElemList('inside-about')){
			e.style.width = window.innerWidth + 'px';
		}
		getElemList('inside-about')[0].style.height = window.innerWidth + 'px';
	} else {
		getElem('about-container').style['flex-wrap'] = '';
		getElem('about-container').style.height = '480px';
		getElemList('inside-about')[0].style.width = '40%';
		getElemList('inside-about')[1].style.width = '60%';
		for(let e of getElemList('inside-about')){
			e.style.height = '100%';
		}
	}
	
	for(let e of getElemList('about-logo')){
		let w = Math.min(getDomRect('inside-about', 0).width, getDomRect('inside-about', 0).height);
		e.style.width = w * 0.75 + 'px';
		e.style.height = w * 0.75 + 'px';
		e.style.left = (getDomRect('inside-about', 0).width / 2 - w * 0.75 / 2) + 'px';
		e.style.top = (getDomRect('inside-about', 0).height / 2 - w * 0.75 / 2) + 'px';
	}
	
	getElem('about').innerHTML = atob(data);
	
	document.getElementsByClassName('link')[3].style.borderBottom = '3px solid ' + window.getComputedStyle(document.body, null).getPropertyValue('background-color');
	document.getElementsByClassName('link')[3].style.background = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
}