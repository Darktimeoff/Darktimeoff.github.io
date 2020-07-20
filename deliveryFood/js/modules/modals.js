'use strict';
//@ts-check
export function open(element, className) {
    element.classList.add(className);
    document.body.style.overflow = 'hidden';
}
export function close(element, className) {
    element.classList.remove(className);
    document.body.style.overflow = '';
}
export default function modals(modalAuthSel, buttonAuthSel, closeAuthSel) {
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