
let minecraft = {
	recipe: {
		red_bed: [['air','air','air'], ['red_whool','red_whool','red_whool'], ['oak_planks','oak_planks','oak_planks']],
		bow: [['air','stick','string'], ['stick','air','string'], ['air','stick','string']],
		fishing_rod: [['air','air','stick'], ['air','stick','string'], ['stick','air','string']],
		bucket: [['air','air','air'], ['iron_ingot','air','iron_ingot'], ['air','iron_ingot','air']],
		
		leather_boots: [['air','air','air'], ['leather','air','leather'], ['leather','air','leather']],
		iron_boots: [['air','air','air'], ['iron_ingot','air','iron_ingot'], ['iron_ingot','air','iron_ingot']],
		gold_boots: [['air','air','air'], ['gold_ingot','air','gold_ingot'], ['gold_ingot','air','gold_ingot']],
		diamond_boots: [['air','air','air'], ['diamond','air','diamond'], ['diamond','air','diamond']],
		netherite_boots: [['air','air','air'], ['netherite_ingot','air','netherite_ingot'], ['netherite_ingot','air','netherite_ingot']],
		
		leather_leggings: [['leather','leather','leather'], ['leather','air','leather'], ['leather','air','leather']],
		iron_leggings: [['iron_ingot','iron_ingot','iron_ingot'], ['iron_ingot','air','iron_ingot'], ['iron_ingot','air','iron_ingot']],
		gold_leggings: [['gold_ingot','gold_ingot','gold_ingot'], ['gold_ingot','air','gold_ingot'], ['gold_ingot','air','gold_ingot']],
		diamond_leggings: [['diamond','diamond','diamond'], ['diamond','air','diamond'], ['diamond','air','diamond']],
		netherite_leggings: [['netherite_ingot','netherite_ingot','netherite_ingot'], ['netherite_ingot','air','netherite_ingot'], ['netherite_ingot','air','netherite_ingot']],
		
		leather_chestplate: [['leather','air','leather'], ['leather','leather','leather'], ['leather','leather','leather']],
		iron_chestplate: [['iron_ingot','air','iron_ingot'], ['iron_ingot','iron_ingot','iron_ingot'], ['iron_ingot','iron_ingot','iron_ingot']],
		gold_chestplate: [['gold_ingot','air','gold_ingot'], ['gold_ingot','gold_ingot','gold_ingot'], ['gold_ingot','gold_ingot','gold_ingot']],
		diamond_chestplate: [['diamond','air','diamond'], ['diamond','diamond','diamond'], ['diamond','diamond','diamond']],
		netherite_chestplate: [['netherite_ingot','air','netherite_ingot'], ['netherite_ingot','netherite_ingot','netherite_ingot'], ['netherite_ingot','netherite_ingot','netherite_ingot']],
		
		leather_helmet: [['leather','leather','leather'], ['leather','air','leather'], ['air','air','air']],
		iron_helmet: [['iron_ingot','iron_ingot','iron_ingot'], ['iron_ingot','air','iron_ingot'], ['air','air','air']],
		gold_helmet: [['gold_ingot','gold_ingot','gold_ingot'], ['gold_ingot','air','gold_ingot'], ['air','air','air']],
		diamond_helmet: [['diamond','diamond','diamond'], ['diamond','air','diamond'], ['air','air','air']],
		netherite_helmet: [['netherite_ingot','netherite_ingot','netherite_ingot'], ['netherite_ingot','air','netherite_ingot'], ['air','air','air']],
		
		wood_shovel: [['air','oak_planks','air'], ['air','stick','air'], ['air','stick','air']],
		stone_shovel: [['air','cobblestone','air'], ['air','stick','air'], ['air','stick','air']],
		iron_shovel: [['air','iron_ingot','air'], ['air','stick','air'], ['air','stick','air']],
		gold_shovel: [['air','gold_ingot','air'], ['air','stick','air'], ['air','stick','air']],
		diamond_shovel: [['air','diamond','air'], ['air','stick','air'], ['air','stick','air']],
		netherite_shovel: [['air','netherite_ingot','air'], ['air','stick','air'], ['air','stick','air']],
		
		wood_axe: [['oak_planks','oak_planks','air'], ['oak_planks','stick','air'], ['air','stick','air']],
		stone_axe: [['cobblestone','cobblestone','air'], ['cobblestone','stick','air'], ['air','stick','air']],
		iron_axe: [['iron_ingot','iron_ingot','air'], ['iron_ingot','stick','air'], ['air','stick','air']],
		gold_axe: [['gold_ingot','gold_ingot','air'], ['gold_ingot','stick','air'], ['air','stick','air']],
		diamond_axe: [['diamond','diamond','air'], ['diamond','stick','air'], ['air','stick','air']],
		netherite_axe: [['netherite_ingot','netherite_ingot','air'], ['netherite_ingot','stick','air'], ['air','stick','air']],
		
		wood_hoe: [['oak_planks','oak_planks','air'], ['air','stick','air'], ['air','stick','air']],
		stone_hoe: [['cobblestone','cobblestone','air'], ['air','stick','air'], ['air','stick','air']],
		iron_hoe: [['iron_ingot','iron_ingot','air'], ['air','stick','air'], ['air','stick','air']],
		gold_hoe: [['gold_ingot','gold_ingot','air'], ['air','stick','air'], ['air','stick','air']],
		diamond_hoe: [['diamond','diamond','air'], ['air','stick','air'], ['air','stick','air']],
		netherite_hoe: [['netherite_ingot','netherite_ingot','air'], ['air','stick','air'], ['air','stick','air']],
		
		wood_pickaxe: [['oak_planks','oak_planks','oak_planks'], ['air','stick','air'], ['air','stick','air']],
		stone_pickaxe: [['cobblestone','cobblestone','cobblestone'], ['air','stick','air'], ['air','stick','air']],
		iron_pickaxe: [['iron_ingot','iron_ingot','iron_ingot'], ['air','stick','air'], ['air','stick','air']],
		gold_pickaxe: [['gold_ingot','gold_ingot','gold_ingot'], ['air','stick','air'], ['air','stick','air']],
		diamond_pickaxe: [['diamond','diamond','diamond'], ['air','stick','air'], ['air','stick','air']],
		netherite_pickaxe: [['netherite_ingot','netherite_ingot','netherite_ingot'], ['air','stick','air'], ['air','stick','air']],
		
		wood_sword: [['air','oak_planks','air'], ['air','oak_planks','air'], ['air','stick','air']],
		stone_sword: [['air','cobblestone','air'], ['air','cobblestone','air'], ['air','stick','air']],
		iron_sword: [['air','iron_ingot','air'], ['air','iron_ingot','air'], ['air','stick','air']],
		gold_sword: [['air','gold_ingot','air'], ['air','gold_ingot','air'], ['air','stick','air']],
		diamond_sword: [['air','diamond','air'], ['air','diamond','air'], ['air','stick','air']],
		netherite_sword: [['air','netherite_ingot','air'], ['air','netherite_ingot','air'], ['air','stick','air']],
	},
	item: {
		air: {icon: 'res/items/air.png'},
		stick: { icon: 'res/items/stick.png' },
		string: { icon: 'res/items/string.png' },
		gunpowder: {icon: 'res/items/gunpowder.png'},
		leather: { icon: 'res/items/leather.png' },
		
		cobblestone: { icon: 'res/blocks/cobblestone.png' },
		red_whool: { icon: 'res/blocks/red_wool.png' },
		oak_planks: { icon: 'res/blocks/oak_planks.png' },
		
		iron_ingot: { icon: 'res/items/iron_ingot.png' },
		gold_ingot: { icon: 'res/items/gold_ingot.png' },
		diamond: { icon: 'res/items/diamond.png' },
		netherite_ingot: { icon: 'res/items/netherite_ingot.png' },
		
		red_bed: { icon: 'res/items/bed_red.png' },
		bow: { icon: 'res/items/bow_standby.png' },
		fishing_rod: { icon: 'res/items/fishing_rod_uncast.png' },
		bucket: { icon: 'res/items/bucket_empty.png' },
		
		leather_boots: { icon: 'res/items/leather_boots.png' },
		iron_boots: { icon: 'res/items/iron_boots.png' },
		gold_boots: { icon: 'res/items/gold_boots.png' },
		diamond_boots: { icon: 'res/items/diamond_boots.png' },
		netherite_boots: { icon: 'res/items/netherite_boots.png' },
		
		leather_leggings: { icon: 'res/items/leather_leggings.png' },
		iron_leggings: { icon: 'res/items/iron_leggings.png' },
		gold_leggings: { icon: 'res/items/gold_leggings.png' },
		diamond_leggings: { icon: 'res/items/diamond_leggings.png' },
		netherite_leggings: { icon: 'res/items/netherite_leggings.png' },
		
		leather_chestplate: { icon: 'res/items/leather_chestplate.png' },
		iron_chestplate: { icon: 'res/items/iron_chestplate.png' },
		gold_chestplate: { icon: 'res/items/gold_chestplate.png' },
		diamond_chestplate: { icon: 'res/items/diamond_chestplate.png' },
		netherite_chestplate: { icon: 'res/items/netherite_chestplate.png' },
		
		leather_helmet: { icon: 'res/items/leather_helmet.png' },
		iron_helmet: { icon: 'res/items/iron_helmet.png' },
		gold_helmet: { icon: 'res/items/gold_helmet.png' },
		diamond_helmet: { icon: 'res/items/diamond_helmet.png' },
		netherite_helmet: { icon: 'res/items/netherite_helmet.png' },
		
		wood_shovel: { icon: 'res/items/wood_shovel.png' },
		stone_shovel: { icon: 'res/items/stone_shovel.png' },
		iron_shovel: { icon: 'res/items/iron_shovel.png' },
		gold_shovel: { icon: 'res/items/gold_shovel.png' },
		diamond_shovel: { icon: 'res/items/diamond_shovel.png' },
		netherite_shovel: { icon: 'res/items/netherite_shovel.png' },
		
		wood_axe: { icon: 'res/items/wood_axe.png' },
		stone_axe: { icon: 'res/items/stone_axe.png' },
		iron_axe: { icon: 'res/items/iron_axe.png' },
		gold_axe: { icon: 'res/items/gold_axe.png' },
		diamond_axe: { icon: 'res/items/diamond_axe.png' },
		netherite_axe: { icon: 'res/items/netherite_axe.png' },
		
		wood_hoe: { icon: 'res/items/wood_hoe.png' },
		stone_hoe: { icon: 'res/items/stone_hoe.png' },
		iron_hoe: { icon: 'res/items/iron_hoe.png' },
		gold_hoe: { icon: 'res/items/gold_hoe.png' },
		diamond_hoe: { icon: 'res/items/diamond_hoe.png' },
		netherite_hoe: { icon: 'res/items/netherite_hoe.png' },
		
		wood_pickaxe: { icon: 'res/items/wood_pickaxe.png' },
		stone_pickaxe: { icon: 'res/items/stone_pickaxe.png' },
		iron_pickaxe: { icon: 'res/items/iron_pickaxe.png' },
		gold_pickaxe: { icon: 'res/items/gold_pickaxe.png' },
		diamond_pickaxe: { icon: 'res/items/diamond_pickaxe.png' },
		netherite_pickaxe: { icon: 'res/items/netherite_pickaxe.png' },
		
		wood_sword: { icon: 'res/items/wood_sword.png' },
		stone_sword: { icon: 'res/items/stone_sword.png' },
		iron_sword: { icon: 'res/items/iron_sword.png' },
		gold_sword: { icon: 'res/items/gold_sword.png' },
		diamond_sword: { icon: 'res/items/diamond_sword.png' },
		netherite_sword: { icon: 'res/items/netherite_sword.png' }
	}
};
(function load(i){
	if(Object.keys(minecraft.item).length == i) { return; }
	loadImg(minecraft.item[Object.keys(minecraft.item)[i]].icon, load(++i));
})(0);

function reCaptcha(succ, fail){
	document.body.style['pointer-events'] = 'none';
	getElem('captcha-view').style.display = 'block';
	getElem('captcha-view').style['pointer-events'] = 'auto';
	
	getElem('captcha-container').style.animation = 'pop 0.5s forwards';
	
	getElem('captcha-title').innerHTML = 'Complete the<br>Recipe';
	getElem('captcha-title').style.animation = null;
	
	getElem('captcha-close').onclick = () => {
		getElem('captcha-view').onmouseup = getElem('captcha-view').ontouchend = getElem('captcha-view').ontouchcancel = null;
		getElem('captcha-view').onmousemove = getElem('captcha-view').ontouchmove = null;
		getElem('captcha-close').onclick = null;
		
		document.body.style['pointer-events'] = 'auto';
		getElem('captcha-view').style.display = 'none';
	}

	for(let e of getElemList('captcha-grid-cell')){
		e.innerHTML = '';
	}
	let index = 0;
	let res = Math.rArray(Object.keys(minecraft.recipe));
	let recipe_original = minecraft.recipe[res];
	let shuffle = shuffleRecipe(dupRecipe(recipe_original), Math.randomInt(1, 3), 0);
	let recipe_shuffled = shuffle.recipe;
	let moves = shuffle.shuffled;
	for(let e of getElemList('captcha-grid-cell')){
		let ingredient = recipe_shuffled[Math.floor(index / 3)][index % 3];
		let item = createElem('div', {class:'captcha-grid-cell-item'});
		item.style.position = 'absolute';
		item.style.width = '100%';
		item.style.height = '100%';
		item.style.background = 'url('+minecraft.item[ingredient].icon+')';
		item.value = ingredient;
		item.style.backgroundSize = '80% 80%';
		item.style.backgroundPosition = 'center center';
		item.style.backgroundRepeat = 'no-repeat';
		e.appendChild(item);
		calibrate(item);
		index++;
	}
	
	let result = createElem('div', {class:'captcha-result-item'});
	result.style.position = 'absolute';
	result.style.width = '100%';
	result.style.height = '100%';
	result.style.background = 'url('+minecraft.item[res].icon+')';
	result.style.backgroundSize = '60% 60%';
	result.style.backgroundPosition = 'center center';
	result.style.backgroundRepeat = 'no-repeat';
	getElem('captcha-result').innerHTML = result.outerHTML;

	function calibrate(item){
		if(item.parentNode.childNodes.length > 1) item.remove();
		item.pos = {x: 0, y: 0};
		item.zIndex = item.style.zIndex;
		item.onmousedown = item.ontouchstart = async function(de) {
			de.preventDefault();
			if(item.value === 'air') return;
			item.pos.x = de.clientX;
			item.pos.y = de.clientY;
			getElem('captcha-title').style.animation = null;
			getElem('captcha-view').onmousemove = getElem('captcha-view').ontouchmove = (ev) => {
				ev.preventDefault();
				if(ev.type === 'touchmove'){
					item.style.top = (item.offsetTop - (item.pos.y - ev.touches[0].clientY)) + "px";
					item.style.left = (item.offsetLeft - (item.pos.x - ev.touches[0].clientX)) + "px";
					item.pos.x = ev.touches[0].clientX;
					item.pos.y = ev.touches[0].clientY;
				} else {
					item.style.top = (item.offsetTop - (item.pos.y - ev.clientY)) + "px";
					item.style.left = (item.offsetLeft - (item.pos.x - ev.clientX)) + "px";
					item.pos.x = ev.clientX;
					item.pos.y = ev.clientY;
				}
				item.style.zIndex = 999999999999999999;
			}
			getElem('captcha-view').onmouseup = getElem('captcha-view').ontouchend = getElem('captcha-view').ontouchcancel = await function(ev){
				let ar = getDomRect(item);
				ar.x += ar.width / 2;
				ar.y += ar.height / 2;
				item.style.top = '0px';
				item.style.left = '0px';
				getElem('captcha-view').onmouseup = getElem('captcha-view').ontouchend = getElem('captcha-view').ontouchcancel = null;
				getElem('captcha-view').onmousemove = getElem('captcha-view').ontouchmove = null;
				
				item.style.zIndex = item.zIndex;
				let swapped = false;
				for(let i=0; i<getElemList('captcha-grid-cell').length; i++){
					if(getElemList('captcha-grid-cell')[i] == item.parentNode) continue;
					let br = getDomRect(getElemList('captcha-grid-cell')[i]);
					br.x += br.width / 2;
					br.y += br.height / 2;
					if(Math.hypot(ar.x - br.x, ar.y - br.y) <= br.width * .3){
						swapped = true;
						let a = item.cloneNode(true);
						let b = getElemList('captcha-grid-cell')[i].firstChild ? getElemList('captcha-grid-cell')[i].firstChild.cloneNode(true) : null;
						let ap = item.parentNode;
						let bp = getElemList('captcha-grid-cell')[i];
						
						a.value = item.value;
						b.value = getElemList('captcha-grid-cell-item')[i].value;
						
						ap.innerHTML = '';
						bp.innerHTML = '';
						if(b) ap.appendChild(b);
						if(a) bp.appendChild(a);
						break;
					}
				}
				moves--;
				if(moves > 0) return;
				
				let recipe_client = [[],[],[]];
				for(let i=0; i<getElemList('captcha-grid-cell-item').length; i++){
					recipe_client[Math.floor(i / 3)][i % 3] = getElemList('captcha-grid-cell-item')[i].value;
				}
				let match = compare(recipe_original, recipe_client);
				if(swapped){
					getElem('captcha-view').style['pointer-events'] = 'none';
					if(!match) { setTimeout(_=>{
							getElem('captcha-title').style.animation = 'wrong-text 0.5s';
							getElem('captcha-title').innerHTML = 'Incorrect';
							setTimeout(_=>{
								if(typeof fail === 'function') fail();
								getElem('captcha-close').onclick();
							}, 500);
						}, 500);
					} else {
						setTimeout(_=>{
							getElem('captcha-title').innerHTML = '<span style="color:rgb(0,220,0);">Well Done!</span>';
							setTimeout(_=>{
								if(typeof succ === 'function') succ();
								getElem('captcha-close').onclick();
							}, 500);
						}, 500);
					}
				}
				for(let e of getElemList('captcha-grid-cell-item')){
					calibrate(e);
				}
			}
		}
	}
}

function shuffleRecipe(recipe, times, shuffled){
	let tries = 0;
	let a = null;
	let ay = 0, ax = 0;
	while(a == null || a === 'air'){
		ay = Math.randomInt(3);
		ax = Math.randomInt(3);
		a = recipe[ay][ax];
		tries++;
		if(tries >= 1000) break;
	}
	tries = 0;
	let b = null;
	let by = 0, bx = 0;
	while(b == null || b !== 'air'){
		by = Math.randomInt(3);
		bx = Math.randomInt(3);
		b = recipe[by][bx];
		tries++;
		if(tries >= 1000) break;
	}
	
	if(tries < 1000){
		recipe[ay][ax] = b;
		recipe[by][bx] = a;
		shuffled++;
	}
	times--;
	if(times > 0) return shuffleRecipe(recipe, times, shuffled);
	else return {recipe: recipe, shuffled: shuffled};
}
function dupRecipe(recipe){
	let r = [];
	for(let i=0; i<recipe.length; i++){
		r[i] = [];
		for(let j=0; j<recipe[i].length; j++){
			r[i][j] = recipe[i][j];
		}
	}
	return r;
}
function compare(a, b){
	let match = true;
	for(let i=0; i<a.length; i++){
		for(let j=0; j<b[i].length; j++){
			if(a[i][j] != b[i][j]) match = false;
		}
	}
	return match;
}
