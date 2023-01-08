let features = getElem('features');
let top_downloaded_addons = getElem('top-downloaded-addons');
let top_rated_addons = getElem('top-rated-addons');
let top_downloaded_maps = getElem('top-downloaded-maps');
let top_rated_maps = getElem('top-rated-maps');
let selection = getElem('selection');
let select = document.getElementsByClassName('select');

window.sessionStorage.removeItem('addon_tags');
window.sessionStorage.removeItem('map_tags');

getElemList('inside')[0].style.background = getElemList('inside')[1].style.background = 'rgb(30, 30, 30)';
getElemList('inside')[0].style.animation = 'wabble 1s infinite '+(Math.random())+'s';
getElemList('inside')[1].style.animation = 'wabble 1s infinite '+(Math.random())+'s';
getElemList('inside')[0].style['pointer-events'] = 'none';
getElemList('inside')[1].style['pointer-events'] = 'none';

(function updateBg(){
	if(getElem('selection')){
		(_=>{
			let a = new Image();
			a.onload =_=> { 
				document.getElementsByClassName('text-inside')[0].innerHTML = '<p><strong>ADDONS</strong></p>';
				
				getElemList('inside')[0].style.background = getElemList('bg-image')[0].style.background = 'url('+a.src+')'; 
				getElemList('inside')[0].style.backgroundPosition = getElemList('bg-image')[0].style.backgroundPosition = 'center center';
				getElemList('inside')[0].style.backgroundSize = getElemList('bg-image')[0].style.backgroundSize = '100% auto';
				
				getElemList('inside')[0].style.border = '5px solid black';
				getElemList('inside')[0].style.animation = null;
				
				getElemList('inside')[0].style['pointer-events'] = 'auto';
			}
			a.src = 'res/bg/a/' + Math.randomInt(17) + '.jpg';
			
			let b = new Image();
			b.onload =_=> { 
				document.getElementsByClassName('text-inside')[1].innerHTML = '<p><strong>MAPS</strong></p>';
				
				getElemList('inside')[1].style.background = getElemList('bg-image')[1].style.background = 'url('+b.src+')'; 
				getElemList('inside')[1].style.backgroundPosition = getElemList('bg-image')[1].style.backgroundPosition = 'center center';
				getElemList('inside')[1].style.backgroundSize = getElemList('bg-image')[1].style.backgroundSize = '100% auto';
				
				getElemList('inside')[1].style.border = '5px solid black';
				getElemList('inside')[1].style.animation = null;
				
				getElemList('inside')[1].style['pointer-events'] = 'auto';
			}
			b.src = 'res/bg/b/' + Math.randomInt(17) + '.jpg';
		})();
	}
	setTimeout(updateBg, 5000);
})();