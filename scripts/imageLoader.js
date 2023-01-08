let assetsLoaded = false;
let images = [
	'res/heart.png',
	'res/heart-inside.png',
	'res/menu.png',
	
	'res/logo/logo.png',
	'res/logo/logo-back.png',
	
	'res/bg/a/0.jpg',
	'res/bg/a/1.jpg',
	'res/bg/a/2.jpg',
	'res/bg/a/3.jpg',
	'res/bg/a/4.jpg',
	'res/bg/a/5.jpg',
	'res/bg/a/6.jpg',
	'res/bg/a/7.jpg',
	'res/bg/a/8.jpg',
	'res/bg/a/9.jpg',
	'res/bg/a/10.jpg',
	'res/bg/a/11.jpg',
	'res/bg/a/12.jpg',
	'res/bg/a/13.jpg',
	'res/bg/a/14.jpg',
	'res/bg/a/15.jpg',
	'res/bg/a/16.jpg',
	
	'res/bg/b/0.jpg',
	'res/bg/b/1.jpg',
	'res/bg/b/2.jpg',
	'res/bg/b/3.jpg',
	'res/bg/b/4.jpg',
	'res/bg/b/5.jpg',
	'res/bg/b/6.jpg',
	'res/bg/b/7.jpg',
	'res/bg/b/8.jpg',
	'res/bg/b/9.jpg',
	'res/bg/b/10.jpg',
	'res/bg/b/11.jpg',
	'res/bg/b/12.jpg',
	'res/bg/b/13.jpg',
	'res/bg/b/14.jpg',
	'res/bg/b/15.jpg',
	'res/bg/b/16.jpg',
];

(_=>{
	function loadImage(i){
		if(i>=images.length) {
			assetsLoaded = true;
			return;
		}
		let img = new Image();
		img.src = images[i];
		img.onload=()=>loadImage(i+1);
	}
	loadImage(0);
})();