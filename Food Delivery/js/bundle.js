/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/canculateCalories.js":
/*!*****************************************!*\
  !*** ./js/modules/canculateCalories.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sliders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliders */ "./js/modules/sliders.js");

function canculateCaloriess(resultElement) {
    const result = document.querySelector(resultElement);
    class CanculateCalories {
        constructor(gender = 'male', height, weight, age, ration = 1.375) {
            if(localStorage.getItem('canculateCalories')) {
                let obj = JSON.parse(localStorage.getItem('canculateCalories'));
                this.gender = obj.gender;
                this.height = obj.height,
                this.weight = obj.weight,
                this.age = obj.age,
                this.ration = obj.ration
            } else {
                this.gender = gender,
                this.height = height,
                this.weight = weight,
                this.age = age,
                this.ration = ration
                localStorage.setItem('canculateCalories', JSON.stringify(this));
            }
        }
        calcTotal(resultElement) {
            this.result = resultElement;
            if(!this.gender || !this.height || !this.weight || !this.age || !this.ration) {
                resultElement.textContent = '0';
                return;
            }

            if(this.gender === 'female') {
                resultElement.textContent = ((447.6 + (9.2 * this.weight) + (3.1 * this.height) - (4.3 * this.age)) * this.ration).toFixed(2);
            } else {
                resultElement.textContent = ((88.36 + (13.4 * this.weight) + (4.8 * this.height) - (5.7 * this.age)) * this.ration).toFixed(2);
            }
            return this;
        }
        getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.addEventListener('click', (event) => {
                    if(event.target.getAttribute('data-ration')) {
                        this.ration = +event.target.getAttribute('data-ration');
                    } else {
                        this.gender = event.target.getAttribute('id');
                    }
                    Object(_sliders__WEBPACK_IMPORTED_MODULE_0__["deleteActiveClass"])(elements, activeClass);
                    event.target.classList.add(activeClass);
                    
                    localStorage.setItem('canculateCalories', JSON.stringify(this));
                    this.calcTotal(this.result);
                });
            });
            return this;
        }
        getDynamicInformation(...args) {
            args.forEach(selector => {
                const input =  document.querySelector(selector);

                this.initInput(input);

                input.addEventListener('input', () => {

                    input.style.border = (input.value.match(/\D/gi)) ? '1px solid red': '';

                    switch (input.getAttribute('id')) {
                        case 'height': this.height = +input.value; break;
                        case 'weight': this.weight = +input.value; break;
                        case 'age':    this.age    = +input.value; break;
                        default: break;
                    }

                    localStorage.setItem('canculateCalories', JSON.stringify(this));
                    this.calcTotal(this.result);
                });
            });
            return this;
        }
        initLocalSettings(selector, activeClass) {
            const element = document.querySelectorAll(selector);
            Object(_sliders__WEBPACK_IMPORTED_MODULE_0__["deleteActiveClass"])(element, activeClass);
            const temp = JSON.parse(localStorage.getItem('canculateCalories'));
            element.forEach(el => {
                if(el.getAttribute('data-ration') == temp.ration) {
                    el.classList.add(activeClass);
                } else if(el.getAttribute('id') == temp.gender) {
                    el.classList.add(activeClass);
                }
            });
        }
        initInput(input) {
            const temp = JSON.parse(localStorage.getItem('canculateCalories'));
            switch (input.getAttribute('id')) {
                case 'height': input.value = (temp.height) ? temp.height : ''; break;
                case 'weight': input.value = (temp.weight) ? temp.weight : ''; break;
                case 'age':    input.value = (temp.age) ? temp.age : ''; break;
                default: break;
            }
        }
        clearLocalSettings() {
            localStorage.removeItem('canculateCalories');
        }
    };
	const canculateCalories = new CanculateCalories();
    canculateCalories.calcTotal(result);
    canculateCalories.initLocalSettings('#gender div', 'calculating__choose-item_active');
    canculateCalories.initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    canculateCalories.getStaticInformation('#gender div', 'calculating__choose-item_active');
    canculateCalories.getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    canculateCalories.getDynamicInformation('#height', '#weight', '#age');
}
/* harmony default export */ __webpack_exports__["default"] = (canculateCaloriess);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, transfer, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = transfer;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    };
    let currencyUahToUsd;
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&valcode=USD')
        .then((response) => {currencyUahToUsd = +(response[0].rate).toFixed(2)})
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price})=> {
                new MenuCard(img, altimg, title, descr, price, currencyUahToUsd, ".menu .container").render();
            });
        })
        .catch(err => console.error(err));
}
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSeletctor, modalTimerId) {
    const forms = document.querySelectorAll(formSeletctor);
    const message = {
        loading: 'img/form/spinner.svg',
        success(name){
            return `${name}, cпасибо! Скоро мы с вами свяжемся`;
        },
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            

        Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success(data.name));
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        Object(_modals__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            Object(_modals__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
        }, 4000);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if(modalTimerId) clearInterval(modalTimerId);
}
function modals (trigger, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(trigger),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () =>openModal(modalSelector, modalTimerId));
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modals);



/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/*! exports provided: default, deleteActiveClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteActiveClass", function() { return deleteActiveClass; });
function deleteActiveClass(list, classNm) {
    list.forEach(item => {
        item.classList.remove(classNm)
    })
}
function sliders(sliderSectionSelector, slideItemsWrapperSelector, slideItemsInnerSelector, slideItemsSelector, prevArrowSelectorSelector, nextArrowSelector, totalCountElmSelector, currentCountElmSelector) {
    const prev = document.querySelector(prevArrowSelectorSelector);
    const next = document.querySelector(nextArrowSelector);
    const offerSlide = document.querySelectorAll( slideItemsSelector);
    const total =  document.querySelector(totalCountElmSelector);
    const current = document.querySelector(currentCountElmSelector);
    const slidesWrapper = document.querySelector(slideItemsWrapperSelector);
    const slideInner = document.querySelector(slideItemsInnerSelector);
    const width = window.getComputedStyle(slidesWrapper).width;
    const slider = document.querySelector(sliderSectionSelector);
    let slideIndex = 0;
    let offset = 0;
    function totalCountSlide(slideElments, totalElment) {
        totalElment.textContent = addZero(slideElments.length - 1);
    }
    function currentSlide(currentElement, index = 0) {
        currentElement.textContent = addZero(index);
    }
    function addZero(number) {
        return (number < 10) ? 0 + '' + number : number;
    }
    function canculateSlidePosition(slideInner, index, width) {
        offset = (index === 0) ? 0 : index * parseInt(width);
        slideInner.style.transform = `translateX(-${offset}px)`;
    }
    function addDots(slideElments, indicatorElement) {
        for(let i = 0; i < slideElments.length; i++) {
            const dot = document.createElement('li');
                dot.classList.add('dot')
            indicatorElement.append(dot);
        }
        return document.querySelectorAll('.dot');
    }
    function findClass(list, className) {
        for(let i = 0; i < list.length; i++) {
            if(list[i].classList.contains(className)) {
                return i;
            }
        }
    }
    function dotNavigationInit(slider, slideElement, slideInner, width, currentSlideIndElm) {
        const indicatorWrapper = document.createElement('ol');
        indicatorWrapper.classList.add('carousel-indicators');
        slider.append(indicatorWrapper);
        const dot = addDots(slideElement, indicatorWrapper);
        indicatorWrapper.addEventListener('click', (e) => {
            if(e.target && e.target.classList.contains('dot')) {
                e.target.style.opacity = '1';
                setTimeout(() => {e.target.style.opacity = ''}, 500);
                deleteActiveClass(dot, 'active');
                e.target.classList.add('active');
                canculateSlidePosition(slideInner, findClass(dot, 'active'), width);
                currentSlide(currentSlideIndElm, findClass(dot, 'active'));
            }
        });
    }
    function carouselInit(slider, slideInner, slideList, next, prev, width, current, total, dotActive = true) {
        totalCountSlide(slideList, total);
        currentSlide(current);
        slideInner.style.width = 100 * offerSlide.length + '%';
        slideInner.style.display = 'flex';
        slideInner.style.transition = '0.5s all'
        slidesWrapper.style.overflow = 'hidden';

        slideList.forEach(slide => {
            slide.style.width = width;
        });

        next.addEventListener('click', () => {
            if  (offset == parseInt(width) * (offerSlide.length - 1)) {
                offset = 0;
                slideIndex = 0;
            } else {
                offset += parseInt(width);
                slideIndex += 1;
            }
            slideInner.style.transform = `translateX(-${offset}px)`;
            currentSlide(current, slideIndex);
        });
        prev.addEventListener('click', () => {
            if  (offset == 0) {
                offset = parseInt(width) * (offerSlide.length - 1);
                slideIndex = offerSlide.length - 1;
            } else {
                offset -= parseInt(width);
                slideIndex -= 1;
            }
            slideInner.style.transform = `translateX(-${offset}px)`;
            currentSlide(current, slideIndex);
        });
        if(dotActive) dotNavigationInit(slider, slideList, slideInner, width, current);
    }
    carouselInit(slider, slideInner, offerSlide, next, prev, width, current, total, true);
}

/* harmony default export */ __webpack_exports__["default"] = (sliders);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function tabs(tabHeaderItem, tabHeaderItems, tabContentItems, activeClass) {
    let tabs = document.querySelectorAll(tabHeaderItem),
		tabsContent = document.querySelectorAll(tabContentItems),
		tabsParent = document.querySelector(tabHeaderItems);

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains(tabHeaderItem.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timers.js":
/*!******************************!*\
  !*** ./js/modules/timers.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timers (timerSelector, deadline, daysSelector='#days', hoursSelector='#hours', minutesSelector='#minutes', secondsSelector='seconds') {
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector(daysSelector),
            hours = timer.querySelector(hoursSelector),
            minutes = timer.querySelector(minutesSelector),
            seconds = timer.querySelector(secondsSelector),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(timerSelector, deadline);
}
/* harmony default export */ __webpack_exports__["default"] = (timers);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timers */ "./js/modules/timers.js");
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");
/* harmony import */ var _modules_canculateCalories__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/canculateCalories */ "./js/modules/canculateCalories.js");

//@ts-check









window.addEventListener('DOMContentLoaded', function() {
    // Tabs
    const modalTimerId = setTimeout(() => Object(_modules_modals__WEBPACK_IMPORTED_MODULE_2__["openModal"])('.modal', modalTimerId), 300000);
    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
    Object(_modules_timers__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2020-08-11', '#days',  '#hours', '#minutes', '#seconds');
    Object(_modules_modals__WEBPACK_IMPORTED_MODULE_2__["default"])('[data-modal]', '.modal', modalTimerId);
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    Object(_modules_sliders__WEBPACK_IMPORTED_MODULE_5__["default"])('.offer__slider', '.offer__slider-wrapper', '.offer__slider-inner', '.offer__slide', '.offer__slider-prev', '.offer__slider-next', '#total', '#current');
    Object(_modules_canculateCalories__WEBPACK_IMPORTED_MODULE_6__["default"])('.calculating__result span');
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });

//@ts-check
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: data
    });
    return await res.json();
};
const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Ошибка в получение данных с базы данных ${url}, status ${res.status}`);
    }

    return await res.json();
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map