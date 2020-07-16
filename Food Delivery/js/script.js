'use strict';
//@ts-check
import tabs  from './modules/tabs';
import timers  from './modules/timers';
import modals  from './modules/modals';
import cards  from './modules/cards';
import forms  from './modules/forms';
import sliders  from './modules/sliders';
import canculateCaloriess  from './modules/canculateCalories';
import {openModal} from './modules/modals'

window.addEventListener('DOMContentLoaded', function() {
    // Tabs
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 300000);
    tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    timers('.timer', '2020-08-11', '#days',  '#hours', '#minutes', '#seconds');
    modals('[data-modal]', '.modal', modalTimerId);
    cards();
    forms('form', modalTimerId);
    sliders('.offer__slider', '.offer__slider-wrapper', '.offer__slider-inner', '.offer__slide', '.offer__slider-prev', '.offer__slider-next', '#total', '#current');
    canculateCaloriess('.calculating__result span');
});