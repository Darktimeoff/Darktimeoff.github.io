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

/***/ "./js/modules/cardPartners.js":
/*!************************************!*\
  !*** ./js/modules/cardPartners.js ***!
  \************************************/
/*! exports provided: cardPartners, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cardPartners", function() { return cardPartners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cardCreate; });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

//@ts-check

class cardPartners {
	constructor(name, time_of_delivery, stars, price, kitchen, image, products, parentSelector) {
		this.name = name;
		this.time_of_delivery = time_of_delivery;
		this.stars = stars;
		this.price = price;
		this.kitchen = kitchen;
		this.image = image;
		this.products = products;
		this.parentSelector = parentSelector;
	}
	renderCardRestaurants() {
		if(this.checkArguments()) {throw new SyntaxError("not enough data module cardRestaurants on 17 string")};
		const card = document.createElement('a');
		card.classList.add('card', 'card-restaurant');
		card.innerHTML = `
			<img src="${this.image}" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${this.name}</h3>
					<span class="card-tag tag">${this.time_of_delivery} мин</span>
				</div>
				<div class="card-info">
					<div class="rating">
						${this.stars}
					</div>
					<div class="price">От ${this.price} ₽</div>
					<div class="category">${this.kitchen}</div>
				</div>
			</div>
		`
		document.querySelector(this.parentSelector).append(card);
	}
	checkArguments() {
		for(let arg in this) {
			if(!this[arg] && typeof this[arg] != 'object') return true;
		} 
	}
}
function cardCreate(classCard, urlCardInformation) {
	Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])(urlCardInformation)
		.then(partners => {
			partners.forEach(({name, time_of_delivery, stars, kitchen, image, products}) => {
				setMinPrice(products)
					.then(price => {
						new classCard(name, time_of_delivery, stars, price, kitchen, image, products, '.cards-restaurants').renderCardRestaurants();
					})
			});
		});
}
async function setMinPrice(products) {
		const menu = await Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])(`db/${products}`);
		let min = Infinity;
		for (let i = 0; i < menu.length; i++) {
			if(menu[i].price < min) min = menu[i].price;
		}
		return min;
	
}

/***/ }),

/***/ "./js/modules/cartModal.js":
/*!*********************************!*\
  !*** ./js/modules/cartModal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cart; });
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");

//@ts-check


function cart() { 
	const modalDialog = document.querySelector('.modal-cart').querySelector('.modal-dialog');
	const cardsMenu = document.querySelector('.cards-menu');
    const modalPriceTotal = document.querySelector('.modal-pricetag');
    const cartArray = [];
    function counterItem() {
		modalDialog.addEventListener('click', (e) => {
			let foodCurPrice = e.target.closest('.food-row').querySelector('.food-price');
			let foodName = e.target.closest('.food-row').querySelector('.food-name');
			let tempObj = cartArray.find((item, i) => {
				if(item.title === foodName.textContent) {
					item.i = i;
					return item;
				}
			});
			if(e.target.getAttribute('data-plus') =='') {
				let currentCounter = e.target.previousElementSibling;
				currentCounter.textContent = (+currentCounter.textContent)  + 1;
				modalPriceTotal.textContent = parseInt(modalPriceTotal.textContent) + parseInt(foodCurPrice.textContent) + ' ₽';
				if(tempObj) tempObj.count += 1; 
			} else if(e.target.getAttribute('data-minus') =='') {
				let currentCounter = e.target.nextElementSibling;
				currentCounter.textContent =  (+currentCounter.textContent) - 1;
				if(tempObj) tempObj.count -= 1; 
				if((+currentCounter.textContent) == 0 && tempObj.count == 0) {
					e.target.closest('.food-row').remove()
					cartArray.splice(tempObj.i, 1);
				};
				modalPriceTotal.textContent = parseInt(modalPriceTotal.textContent) - parseInt(foodCurPrice.textContent) + ' ₽';
			}
		});
	}
	function getCartInf() {
		cardsMenu.addEventListener('click', (e) => {
			let button = e.target.closest('.button-add-cart');
			if(button) {
				const title = e.target.closest('.card-text').querySelector('.card-title-reg').textContent;
				const price = button.nextElementSibling.textContent;
				const id = button.id;
				const food = cartArray.find((item) => {
					return item.id === id;
				})
				if(food) food.count += 1;
				else {
					cartArray.push({
						id,
						title,
						price,
						count: 1
					});
				}
				addToCart(cartArray, modalDialog, '.modal-body');
			}
		});
	}
	function renderCart(title, price, count, modalElm, parentSelector) {
		modalElm.querySelector(parentSelector).insertAdjacentHTML('afterbegin',  `
			<div class="food-row">
				<span class="food-name">${title}</span>
				<strong class="food-price">${price}</strong>
				<div class="food-counter">
					<button class="counter-button" data-minus>-</button>
					<span class="counter">${count}</span>
					<button class="counter-button" data-plus>+</button>
				</div>
			</div>
		`);
	}
	function addToCart(cartArray, modalElm, parentSelector) {
		modalDialog.querySelector('.modal-body').innerHTML = '';
		let sum = 0;
		cartArray.forEach(({id, title, price, count}) => {
			renderCart(title, price, count, modalElm, parentSelector)
			sum += parseInt(price) * parseInt(count);
		});
		modalPriceTotal.textContent = parseInt(sum) + ' ₽';
	}
	function clearCart(cartItemParentElm) {
		const buttonClearCart = modalDialog.querySelector('.clear-cart');
		buttonClearCart.addEventListener('click', () => {
			cartItemParentElm.innerHTML = '';
			modalPriceTotal.textContent = '0 ₽';
			Object(_modals__WEBPACK_IMPORTED_MODULE_0__["close"])(document.querySelector('.modal-cart'), 'is-open');
		});
	}	
	Object(_modals__WEBPACK_IMPORTED_MODULE_0__["default"])('.modal-cart', '.button-cart', '.close');
	getCartInf();
	counterItem();
	clearCart(modalDialog.querySelector('.modal-body'));
}

/***/ }),

/***/ "./js/modules/formsSignIn.js":
/*!***********************************!*\
  !*** ./js/modules/formsSignIn.js ***!
  \***********************************/
/*! exports provided: loading, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loading", function() { return loading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return signIn; });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");

//@ts-check



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
function signIn() {
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
		const users = await Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/users');
		for(let item of users) {
			if(item.login == user.login && item.password == user.password) {
				return true;
			}
		}  
	}
	function logIn(modalAuth, forms, buttonAuth, buttonOut, buttonSignUp, userName, user, classOpen, statusMessage) {
		forms.reset();
		buttonSignUp.style.display = 'none';
		Object(_modals__WEBPACK_IMPORTED_MODULE_1__["close"])(modalAuth, classOpen);
		buttonAuth.style.display = 'none';
		buttonOut.style.display = 'flex';
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

/***/ }),

/***/ "./js/modules/formsSignUp.js":
/*!***********************************!*\
  !*** ./js/modules/formsSignUp.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return signUp; });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");
/* harmony import */ var _formsSignIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formsSignIn */ "./js/modules/formsSignIn.js");

//@ts-check





function signUp() {
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
        const users = await Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])('http://localhost:3000/users')
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

        let statusMessage = Object(_formsSignIn__WEBPACK_IMPORTED_MODULE_2__["loading"])(formSignUp);

        const user = await checkFormSignUp();

        if(user.login && user.password && user.email) {
            Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["postData"])('http://localhost:3000/users', JSON.stringify(user));
            statusMessage.remove();
            failedAuth.style.display = '';
            Object(_modals__WEBPACK_IMPORTED_MODULE_1__["close"])(modalSignUp, 'is-open');
        } else {
            failedAuth.style.display = 'block';
            statusMessage.remove();
        }
    });
    Object(_modals__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal-signup', '.button-signup', '.close-auth');
}

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/*! exports provided: open, close, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "close", function() { return close; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return modals; });

//@ts-check
function open(element, className) {
    element.classList.add(className);
    document.body.style.overflow = 'hidden';
}
function close(element, className) {
    element.classList.remove(className);
    document.body.style.overflow = '';
}
function modals(modalAuthSel, buttonAuthSel, closeAuthSel) {
    const buttonAuth = document.querySelector(buttonAuthSel);
    const modalAuth = document.querySelector(modalAuthSel);
    const closeAuth = modalAuth.querySelector(closeAuthSel);

    function modalClose(modalElm,  buttonClose, classOpen, keyCod = 27) {
        modalElm.addEventListener('click', (e) => {
            if(e.target == modalElm) {
                close(modalElm, classOpen);
            } 
        });
        buttonClose.addEventListener('click', () => {close(modalElm, classOpen);})

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === keyCod  && modalElm.classList.contains(classOpen)) { 
                close(modalElm, classOpen);
            }
        });
    }
    function modal(modalElm, buttonOpen, buttonClose, classOpen) {
        buttonOpen.addEventListener('click', () => open(modalElm, classOpen));
        modalClose(modalElm, buttonClose, classOpen);
    }
    modal(modalAuth, buttonAuth, closeAuth, 'is-open');
}

/***/ }),

/***/ "./js/modules/restaurantsMenu.js":
/*!***************************************!*\
  !*** ./js/modules/restaurantsMenu.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createMenuPage; });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modals */ "./js/modules/modals.js");

//@ts-check



class CardMenu{
    constructor(name, description, price, image, id, parentSelector) {
        this.name = name;
        this.description = description;
        this.price = +price;
        this.image = image;
        this.id = id;
        this.parentSelector = parentSelector;

    }
    renderCardRestaurantsMenu() {
		if(this.checkArguments()) {throw new SyntaxError("not enough data module cardRestaurants on 17 string")};
		const card = document.createElement('div');
		card.classList.add('card');
		card.innerHTML = `
            <img src="${this.image}" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${this.name}</h3>
                </div>
                <!-- /.card-heading -->
                <div class="card-info">
                    <div class="ingredients">${this.description}
                    </div>
                </div>
                <!-- /.card-info -->
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart" id=${this.id}>
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${this.price} ₽</strong>
                </div>
            </div>
		`
		document.querySelector(this.parentSelector).append(card);
    }
    checkArguments() {
		for(let arg in this) {
			if(!this[arg] && typeof this[arg] != 'object') return true;
		} 
	}
}

function createMenuPage() {
    const containerPromo = document.querySelector('.container-promo');
    const buttonCart = document.querySelector('.button-cart');
    const menu = document.querySelector('.menu');
    const restaurants = document.querySelector('.restaurants');
    const logo  = document.querySelector('.logo');
    const cardRestaurants = document.querySelector('.cards-restaurants');
    function createRestaurantMenu() {
        cardRestaurants.addEventListener('click', (e) => {
            e.preventDefault();
            let cardRestaurant = e.target.closest('.card-restaurant');
            let cardTitle = cardRestaurant.querySelector('.card-title');
            let price = cardRestaurant.querySelector('.price').textContent;
            Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])(`db/partners.json`)
                .then(response => {
                    const restaurant = findNesessaryItem(response, 'name', cardTitle.textContent);
                    renderMenuPage();
                    changeHeaderMenuPage(restaurant.name, restaurant.stars, price, restaurant.kitchen);
                    createMenuCard(CardMenu, `db/${restaurant.products}`, '.cards-menu');
                });
        });
    }
    function createMenuCard(classCard, url, parentSelector) {
        Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResource"])(url)
            .then(items => {
                items.forEach(({id, name, description, price, image}) => {
                    new classCard(name, description, price, image, id, parentSelector).renderCardRestaurantsMenu();
                })
            })
    }
    function cancelRenderMenuPage() {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        buttonCart.style.display = '';
        menu.classList.add('hide');
        document.querySelector('.cards-menu').innerHTML = '';
    }
    function renderMenuPage(cancelRender = false) {
        containerPromo.classList.add('hide');
        restaurants.classList.add('hide');
        buttonCart.style.display = 'flex';
        menu.classList.remove('hide');
        if(cancelRender && !menu.classList.contains('hide')) cancelRenderMenuPage();
        else return;
    }
    function findNesessaryItem(list, property, value) {
        for(let item of list) {
            if(item[property] == value) {
                return item;
            }
        }
    }
    function changeHeaderMenuPage(title, rating, price, category) {
        const titleElm = menu.querySelector('.restaurant-title');
        const ratingElm = menu.querySelector('.rating');
        const priceElm = menu.querySelector('.price');
        const categoryElm = menu.querySelector('.category');

        titleElm.textContent = title;
        ratingElm.textContent = rating;
        priceElm.textContent = price
        categoryElm.textContent =  category;
    }
    logo.addEventListener('click', () => {
        renderMenuPage(true);
    })
    createRestaurantMenu();
}

/***/ }),

/***/ "./js/modules/searchRestaurants.js":
/*!*****************************************!*\
  !*** ./js/modules/searchRestaurants.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return searchRestaurants; });

//@ts-check
function searchRestaurants() {
    const inputSearch = document.querySelector('.input-search');
    let cardTitle = document.querySelectorAll('.card-title');
    let restaurants = document.querySelectorAll('.card-restaurant');

    function hideListElements(list, index = undefined) {
        for (let i = 0; i < list.length; i++) {
            if(i === index)  continue; 
            else {
               list[i].style.display = 'none';
            }
        }
        hideListElements.index = index;
    }

    function showListElements(list, index = undefined) {
        for (let i = 0; i < list.length; i++) {
            if(i === index) continue; 
            else {
                list[i].style.display = 'block';
            }
        }
    }

    inputSearch.addEventListener('input', (e) => {

        if(cardTitle.length === 0) {cardTitle = document.querySelectorAll('.card-title');}
        if(restaurants.length === 0) {restaurants = document.querySelectorAll('.card-restaurant');}

        if(!inputSearch.value) showListElements(restaurants, hideListElements.index);
        else{
            let searchWord = new RegExp(inputSearch.value.toLowerCase());
            for(let i = 0; i < cardTitle.length; i++) {
                if(cardTitle[i].textContent.toLowerCase().match(searchWord)) {

                    hideListElements(restaurants, i);
                    break;
                } else {
                    continue;
                }
            }
        }
    });
}


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
/* harmony import */ var _modules_formsSignIn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/formsSignIn */ "./js/modules/formsSignIn.js");
/* harmony import */ var _modules_formsSignUp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/formsSignUp */ "./js/modules/formsSignUp.js");
/* harmony import */ var _modules_cardPartners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cardPartners */ "./js/modules/cardPartners.js");
/* harmony import */ var _modules_searchRestaurants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/searchRestaurants */ "./js/modules/searchRestaurants.js");
/* harmony import */ var _modules_restaurantsMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/restaurantsMenu */ "./js/modules/restaurantsMenu.js");
/* harmony import */ var _modules_cartModal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cartModal */ "./js/modules/cartModal.js");

//@ts-check









document.addEventListener('DOMContentLoaded', () => {
    Object(_modules_modals__WEBPACK_IMPORTED_MODULE_0__["default"])('.modal-auth', '.button-auth', '.close-auth');
    Object(_modules_formsSignIn__WEBPACK_IMPORTED_MODULE_1__["default"])();
    Object(_modules_formsSignUp__WEBPACK_IMPORTED_MODULE_2__["default"])();
    Object(_modules_cardPartners__WEBPACK_IMPORTED_MODULE_3__["default"])(_modules_cardPartners__WEBPACK_IMPORTED_MODULE_3__["cardPartners"], 'db/partners.json');
    Object(_modules_searchRestaurants__WEBPACK_IMPORTED_MODULE_4__["default"])();
    Object(_modules_restaurantsMenu__WEBPACK_IMPORTED_MODULE_5__["default"])();
    Object(_modules_cartModal__WEBPACK_IMPORTED_MODULE_6__["default"])();
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