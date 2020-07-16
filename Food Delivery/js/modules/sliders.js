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

export default sliders;
export {deleteActiveClass};