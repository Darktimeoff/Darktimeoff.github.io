'use strict'
//@ts-check
let dataBase =  JSON.parse(localStorage.getItem('dataBase')) || [];
const modalAdd = document.querySelector('.modal__add');
const buttonAdd = document.querySelector('.add__ad');
const buttonClose = modalAdd.querySelector('.modal__close');
const buttonSubmit = modalAdd.querySelector('.modal__btn-submit');
const formSubmit = modalAdd.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const elemetsFormSubmit = [...formSubmit.elements].filter(item => item.tagName != 'BUTTON');
const modalFileInput = document.querySelector('.modal__file-input');
const modalImageAdd = document.querySelector('.modal__image-add');
const buttonModalFile = document.querySelector('.modal__file-btn');
const menuContainer = document.querySelector('.menu__container');
const logo = document.querySelector('.logo');
const buttonShowMore = document.querySelector('.btn__show-more');

const infoPhoto = {};
const textFileBtn = buttonModalFile.textContent;
const srcModalImage = modalImageAdd.src;

class Card {
    constructor(image, price, name, parentSelector, id) {
        this.image = image;
        this.price = price;
        this.name = name;
        this.parentSelector = parentSelector;
        this.id = id;
    }
    render() {
        const card = `
        <li class="card" data-id="${this.id}">
            <img class="card__image" src="data:image/jpeg;base64,${this.image}"alt="test">
            <div class="card__description">
                <h3 class="card__header">${this.name}</h3>
                <div class="card__price">${this.price} ₽</div>
            </div>
         </li>
        `
        return document.querySelector(this.parentSelector).insertAdjacentHTML('beforeend', card);
    }
}

class CardInformation extends Card{
    constructor(name, description, price, state, image) {
        super(image, price, name);
        this.name = name;
        this.description = description;
        this.price = price;
        this.state = state;
        this.image = image;
    }
    render() {
        const cardInformation = `
            <div class="modal modal__item">
                <div class="modal__block">
                    <h2 class="modal__header">Купить</h2>
                    <div class="modal__content">
                        <div><img class="modal__image modal__image-item" src="data:image/jpeg;base64,${this.image}" alt="test"></div>
                        <div class="modal__description">
                            <h3 class="modal__header-item">${this.name}</h3>
                            <p>Состояние: <span class="modal__status-item">${this.state}</span></p>
                            <p>Описание:
                                <span class="modal__description-item">${this.description}</span>
                            </p>
                            <p>Цена: <span class="modal__cost-item">${this.price} ₽</span></p>
                            <button class="btn">Купить</button>
                        </div>
                    </div>
                    <button class="modal__close">&#10008;</button>
                </div>
            </div>
        `
        document.body.insertAdjacentHTML('beforeend', cardInformation);
    }
}

function open(el, className) {
    el.classList.remove(className);
    document.body.style.overflow = 'hidden';
    buttonSubmit.disabled = true;
}

function close(el, className, resetForm = true) {
    el.classList.add(className);
    document.body.style.overflow = '';
    if(resetForm) {
        buttonModalFile.textContent = textFileBtn;
        modalImageAdd.src = srcModalImage;
        formSubmit.reset()
    }
    else {el.remove()};
}   

function modal(modalSel, buttonCloseSel, resetForm = true, buttonOpenSel) {
    const modal = document.querySelector(modalSel);
    const buttonClose = modal.querySelector(buttonCloseSel);

    if(buttonOpenSel) {
        const buttonOpen = document.querySelector(buttonOpenSel);
        buttonOpen.addEventListener('click', () => open(modal, 'hide'));
    }

    modal.addEventListener('click', (e) => {
        if((e.target && e.target == modal) || e.target.classList.contains(buttonClose.className)) close(modal, 'hide', resetForm);
    });

    document.addEventListener('keydown', (e) => {
        if(e.keyCode == 27) close(modal, 'hide', resetForm);
    });
}

function createCards(DB) {
    for(let i = DB.length - 1; i >= 0 ; i--) {
            createCard(DB[i]); 
    }
}

function createCard(card) {
    new Card(card.image, card.costItem, card.nameItem, '.catalog', card.id).render();
}

function createCardInformation(card) {
    return new CardInformation(card.nameItem, card.descriptionItem, card.costItem, card.status, card.image).render();
}

function setDbToLocalStorage() {
    localStorage.setItem('dataBase', JSON.stringify(dataBase));
}

function inputTypeFile() {
    modalFileInput.addEventListener('change', (e) => {
        const target = e.target;
        const reader = new FileReader();
        let file = target.files[0]
    
        infoPhoto.fileName = file.name;
        infoPhoto.size = file.size;
    
        reader.readAsBinaryString(file);
        reader.addEventListener('load', (e) => {
            if(infoPhoto.size <= 1e6) {
                buttonModalFile.textContent = infoPhoto.fileName;
                infoPhoto.base64 = btoa(event.target.result); //конвертация картинки в строку
                modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`
            } else {
                buttonModalFile.textContent = 'Размер файта не должен превышать 1мб';
            }
        });
        console.dir(infoPhoto);
    });
}

function filterCards(DB, filterWord) {
    const tempDB = DB.filter(card => card.category === filterWord);
    catalog.innerHTML = '';
    createCards(tempDB);
}

formSubmit.addEventListener('input', () => {
    const valiedForm = elemetsFormSubmit.every(elem => elem.value);
    buttonSubmit.disabled = valiedForm ?  false : true;
    buttonSubmit.previousElementSibling.style.display = valiedForm ?  'none' : 'block';
});

formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {};
    elemetsFormSubmit.forEach(elem => formData[elem.name] = elem.value);
    formData.id = dataBase.length;
    formData.image = infoPhoto.base64;
    dataBase.push(formData);
    close(modalAdd, 'hide', true);
    createCard(dataBase[dataBase.length - 1]);
});

window.addEventListener('unload', setDbToLocalStorage);

menuContainer.addEventListener('click', (event) => {
    const target = event.target;
    switch(target.getAttribute('data-category')) {
        case 'cloth': filterCards(dataBase, 'cloth'); break;
        case 'foot': filterCards(dataBase, 'foot'); break;
        case 'toy': filterCards(dataBase, 'toy'); break;
        case 'furniture': filterCards(dataBase, 'furniture');break;
        case 'tech': filterCards(dataBase, 'tech');break;
        default: break;
    }
});


catalog.addEventListener('click', (e) => {
    let card = e.target.closest('.card');
    if(card) {
        const id = card.dataset.id;
        createCardInformation(dataBase[id]);
        modal('.modal__item', '.modal__close', false)
    }
});

logo.addEventListener('click', (e) => {
    e.preventDefault();
    catalog.innerHTML = '';
    createCards(dataBase);
})

modal('.modal__add', '.modal__close', true, '.add__ad');
inputTypeFile();
createCards(dataBase);



