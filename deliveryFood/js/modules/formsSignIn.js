'use strict';
//@ts-check
import {getResource} from '../services/services';
import {close} from './modals'

export function loading(parent) {
	let statusMessage = document.createElement('img');
		statusMessage.src = 'img/icon/spinner.svg';
		statusMessage.style.cssText = `
			display: block;
			margin: 0 auto;
		`;
		parent.insertAdjacentElement('afterend', statusMessage);
	return statusMessage;
}
export default function signIn() {
	const modalAuth = document.querySelector('.modal-auth');
	const userName = document.querySelector('.user-name');
	const forms = document.querySelector('#logInForm');
	const loginInp = forms.querySelector('#login');
	const passwordInp = forms.querySelector('#password');
	const failedAuth = forms.querySelector('.failed-auth');
	const buttonAuth = document.querySelector('.button-auth');
	const buttonOut =  document.querySelector('.button-out');
	const buttonSignUp = document.querySelector('.button-signup');
	const user = {
		_login: '',
		_password:'',
		get login() {
			return this._login;
		},
		get password() {
			return this._password;
		},
		set login(value) {
			this._login = value
		},
		set password(value) {
			this._password = value;
		}
	}

	
	async function authentication(user) {
		const users = await getResource('http://localhost:3000/users');
		for(let item of users) {
			if(item.login == user.login && item.password == user.password) {
				return true;
			}
		}  
	}
	function logIn(modalAuth, forms, buttonAuth, buttonOut, buttonSignUp, userName, user, classOpen, statusMessage) {
		forms.reset();
		buttonSignUp.style.display = 'none';
		close(modalAuth, classOpen);
		buttonAuth.style.display = 'none';
		buttonOut.style.display = 'block';
		userName.style.display = 'block';
		userName.textContent = user;
		statusMessage.remove();
	}
	function logOut(userName, buttonAuth, buttonOut, buttonSignUp) {
		userName.style.display = '';
		userName.textContent = '';
		buttonOut.style.display = '';
		buttonAuth.style.display = 'block';
		buttonSignUp.style.display = '';
		buttonOut.onclick = null;
	}
	function loading(parent) {
		let statusMessage = document.createElement('img');
            statusMessage.src = 'img/icon/spinner.svg';
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
			`;
			parent.insertAdjacentElement('afterend', statusMessage);
		return statusMessage;
	}
	forms.addEventListener('submit', (e) => {
		e.preventDefault()
	   if(loginInp.value && passwordInp.value) {
			
			user.login = loginInp.value;
			user.password = passwordInp.value;
			let statusMessage = loading(forms);

			authentication(user)
				.then(result => {
					if(result) {
						loginInp.style.border = '';
						passwordInp.style.border = '';
						failedAuth.style.display = '';
						logIn(modalAuth, forms, buttonAuth, buttonOut, buttonSignUp, userName, user.login, 'is-open', statusMessage);
						buttonOut.onclick =  () => logOut(userName, buttonAuth, buttonOut, buttonSignUp);
					} else {
						loginInp.style.border = '1px solid red';
						passwordInp.style.border = '1px solid red';
						failedAuth.style.display = 'block';
						statusMessage.remove();
						forms.reset();
					}
					 
				})
				.catch (err => {
					failedAuth.style.display = 'block';
					failedAuth.textContent = `${err.name} + ${err.message}, зайдите пожалуйства попоже`;
					statusMessage.remove();
					forms.reset();
				})

				
	   }
	});


}