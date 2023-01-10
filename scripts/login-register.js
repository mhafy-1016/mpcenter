import { db, getDocs, query, collection, 
	doc, setDoc, addDoc, updateDoc, getDoc,
	auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, user
} from '/mpcenter/scripts/module.js';

(async _ => {
	let path = new URL(window.location.href).pathname.replace(/\//g, '').split('.')[0];
	if(path==='') path = 'home';
	let d = await getDoc(doc(db, "most-visited", "pages"));
	if(d.exists()) {
		let data = {}; data[path] = (d.data()[path]||0) + 1;
		updateDoc(doc(db, "most-visited", "pages"), data);
	}
})();

let ld = getElem('login-dropdown');
ld.height = getDomRect('login-dropdown').height;
ld.show = true;
ld.style.height = '0px';
ld.style.opacity = '1';

let ud = getElem('user-dropdown'); ud.style.display = 'block';
ud.height = getDomRect('user-dropdown').height;
ud.show = true;
ud.style.height = '0px';
ud.style.opacity = '1';

let username = getElemList('user-name')[0];
let user_icon = getElemList('user-icon')[0];
let signout_button = getElemList('signout-button')[0];
let signout_button_container = getElemList('signout-button-container')[0];

let login_view = getElem('login-view');
login_view.type = '';
login_view.loading = false;

let login_container = getElem('login-container');
login_container.style.transform = 'scale(0, 0)';

login_view.style['pointer-events'] = 'none';

let username_field = getElemList('login-container-item')[0];
let password_field = getElemList('login-container-item')[1];
let input_alert = getElemList('input-alert');
let btn_container  = getElemList('login-button-container')[0];
let confirm_button = getElemList('login-button')[0];
username_field.valid = false;
password_field.valid = false;

await onAuthStateChanged(auth, updateLoginState);

async function updateLoginState(user){
	user_icon.style.backgroundImage = 'url(res/user.png)';
	user_icon.style.backgroundSize = '100% 100%';

	if (document.getElementById('cover')) document.getElementById('cover').style.opacity = '0';
	if (document.getElementById('cover')) setTimeout(_ => document.getElementById('cover').remove(), 1000);

	if (user) {
		const uid = user.uid;
		ld.style.display = 'none';
		ud.style.display = 'block';
		getElemList('user-icon')[0].onclick = (e) => {
			username.innerHTML = user.displayName || 'Fetching...';
			if(ud.show) ud.style.height = ud.height + 'px';
			else ud.style.height = '0px';
			ud.show = !ud.show;
		}
		scroll(username, 16, 1);
		signout_button.onclick = async function(){
			await signOut(auth).then(() => {
				reset();
				location.reload();
			});
		}
		
		if(user.displayName) {
			getElemList('user-avatar')[0].style.background = 'url(res/alpha/'+user.displayName.toLowerCase()[0]+'.png)';
			getElemList('user-avatar')[0].style.backgroundSize = '100% 100%';
			getElemList('user-avatar')[0].style.backgroundPosition = 'center center';
			(_=>{
				let total = 0;
				for(let i of user.displayName){
					if(isNaN(i)) total += i.charCodeAt(0);
					else total += parseInt(i);
				}
				getElemList('user-avatar')[0].style.filter = 'hue-rotate('+Math.floor(total/user.displayName.length)+'deg)';
			})();
		}
		
	} else {
		ud.style.display = 'none';
		ld.style.display = 'block';
		getElemList('user-icon')[0].onclick = (e) => {
			if(ld.show) ld.style.height = ld.height + 'px';
			else ld.style.height = '0px';
			ld.show = !ld.show;
			username_field.value = '';
			password_field.value = '';
			reset();
		}
		
		getElemList('login')[0].onclick = (e) => {
			ld.style.height = '0px';
			ld.show = true;
			login_view.style.opacity = '1';
			login_container.style.animation = 'pop 0.5s forwards';
			login_view.style['pointer-events'] = null;
			login_view.type = 'login';
			getElemList('login-title')[0].innerHTML = 'Login';
		}
		getElemList('signup')[0].onclick = (e) => {
			ld.style.height = '0px';
			ld.show = true;
			login_view.style.opacity = '1';
			login_container.style.animation = 'pop 0.5s forwards';
			login_container.style.transform = 'scale(1, 1)';
			for(let l of getElemList('login-item')){
				l.style.opacity = '1';
			}
			login_view.style['pointer-events'] = null;
			login_view.type = 'signup';
			getElemList('login-title')[0].innerHTML = 'Register';
		}
		
		username_field.onkeyup = function(e){
			if(e.key === 'Enter') login();
			username_field.valid = checkString(username_field.value) && username_field.value.length >= 6;
			input_alert[0].innerHTML = '';
			if(username_field.value.length < 6) input_alert[0].innerHTML = 'Must be 6 characters long';
			else if(!checkString(username_field.value)) input_alert[0].innerHTML = 'No special characters allowed';
			username_field.style.outline = username_field.valid ? '0px' : '1px solid red';
		}
		
		password_field.onkeyup = function(e){
			if(e.key === 'Enter') login();
			password_field.valid = password_field.value.length >= 8;
			password_field.style.outline = password_field.valid ? '0px' : '1px solid red';
			input_alert[1].innerHTML = password_field.valid ? '' : 'Must be 8 characters long';
		}

		login_view.onclick = function(e){
			if(login_view == e.target && !login_view.loading) {
				login_container.style.animation = null;
				login_view.style.opacity = '0';
				login_view.style['pointer-events'] = 'none';
			}
			if(e.target.classList.contains('login-button')) {
				login();
			}
		};
		
		function login(){
			username_field.style.outline = username_field.valid ? '0px' : '1px solid red';
			password_field.style.outline = password_field.valid ? '0px' : '1px solid red';
			if(!username_field.valid || !password_field.valid) return;
			reCaptcha(async _ => {
				let h = getDomRect(btn_container).height;
				let w = getDomRect(btn_container).width;
				btn_container.style.padding = '0px';
				btn_container.style.width = w + 'px';
				btn_container.style.height = h + 'px';
				btn_container.innerHTML = '<div class="login-loading" style="width: '+h+'px; height: '+h+'px;"></div>';
				
				confirm_button.disabled = username_field.disabled = password_field.disabled = true;
				username_field.style.color = password_field.style.color = 'white';
				login_view.loading = true;
				
				if(login_view.type == 'login'){
					signInWithEmailAndPassword(auth, username_field.value + comp, password_field.value).then(userCredential => {
						reset();
						ud.show = false;
						ud.style.height = '0px';
						login_view.click();
						location.reload();
					}).catch((error) => {
						reset();
						input_alert[0].innerHTML = 'Error Login';
					});
				} else if(login_view.type == 'signup'){
					let newUser = await getDoc(doc(db, "users", username_field.value));
					if(newUser.exists()){
						reset();
						input_alert[0].innerHTML = 'Already Exists';
					} else {
						await createUserWithEmailAndPassword(auth, username_field.value + comp, password_field.value).then(userCredential => {
							updateProfile(auth.currentUser, { displayName: username_field.value, role: 'user' });
							setDoc(doc(db, "users", userCredential.user.uid), {
								displayName: username_field.value,
								email: username_field.value + comp,
								uid: userCredential.user.uid
							}).then(_=>{
								reset();
								login_view.click();
								location.reload();
							}).error(_=>{
								reset();
								input_alert[0].innerHTML = 'Error';
							});
						}).catch(er => {
							reset();
							log(er);
							input_alert[0].innerHTML = 'Signup Error';
						});
					}
				}
				
			});
		}
	}
}

function reset(){
	confirm_button = createElem('div', {html: '<input type="button" class="login-button" value="CONFIRM"/>'}).firstChild;
	confirm_button.disabled = username_field.disabled = password_field.disabled = false;
	login_view.loading = username_field.valid = password_field.valid = false;
	username_field.style.color = password_field.style.color = 'black';
	input_alert[0].innerHTML = input_alert[1].innerHTML = '';
	btn_container.innerHTML = confirm_button.outerHTML;
}


function addDocument(data){
	addDoc(collection(db, "projects"), data).then(_ => {
		log('finished');
	});
}

function signout(){
	signOut(auth).then(() => {
		log('Logged out');
	}).catch((error) => {
		log('Log out failed');
	});
}
