'use strict';
//@ts-check
import modals from './modules/modals';
import signIn from './modules/formsSignIn';
import signUp from './modules/formsSignUp';
import cardCreate from './modules/cardPartners';
import {cardPartners} from './modules/cardPartners';
import searchRestaurants from './modules/searchRestaurants';
import createMenuPage from './modules/restaurantsMenu';
document.addEventListener('DOMContentLoaded', () => {
    modals('.modal-auth', '.button-auth', '.close-auth');
    signIn();
    signUp();
    cardCreate(cardPartners, 'db/partners.json');
    searchRestaurants();
    createMenuPage();
});