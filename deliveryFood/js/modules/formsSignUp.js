'use strict';
//@ts-check
import {postData} from '../services/services';
import {getResource} from '../services/services';
import modals from './modals'
import {loading} from './formsSignIn';
import {close} from './modals'
export default function signUp() {
    const modalSignUp = document.querySelector('.modal-signup');
    const failedAuth = document.querySelector('.failed-signup');
    const formSignUp = document.querySelector('#signUpForm');
    function checkPassword(value, input) {
        if(value && value.length >= 8) {
            input.style.border = '';
			input.style.border = '';
            return value;
        } else {
            input.style.border = '1px solid red';
			input.style.border = '1px solid red';
            return false;
        }
    }
    async function checkLogin(value, input) {
        if(!value) return false;
        const users = await getResource('http://localhost:3000/users')
        if(users.length === 0) return value; 
             for(let user of users)  {
                if(user.login == value) {
                    input.style.border = '1px solid red';
			        input.style.border = '1px solid red';
                    return undefined;
                } else {
                    input.style.border = '';
			        input.style.border = '';
                    return value;
                }
            }         
    }
    async function checkFormSignUp() {
        const user = {};
        const inputs = formSignUp.querySelectorAll('input');

        for(let input of inputs) {
            switch (input.getAttribute('id')) {
                case 'loginSignUp': user.login =  await checkLogin(input.value, input); break;
                case 'passwordSignUp': user.password = checkPassword(input.value, input) ? input.value : undefined; break;
                case 'emailSignUp': user.email = input.value; break;
            };
        }

        formSignUp.reset();
        return user;
    }
    formSignUp.addEventListener('submit', async (e) => {
        e.preventDefault()

        let statusMessage = loading(formSignUp);

        const user = await checkFormSignUp();

        if(user.login && user.password && user.email) {
            postData('http://localhost:3000/users', JSON.stringify(user));
            statusMessage.remove();
            failedAuth.style.display = '';
            close(modalSignUp, 'is-open');
        } else {
            failedAuth.style.display = 'block';
            statusMessage.remove();
        }
    });
    modals('.modal-signup', '.button-signup', '.close-auth');
}