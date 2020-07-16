import {deleteActiveClass} from './sliders';
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
                    deleteActiveClass(elements, activeClass);
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
            deleteActiveClass(element, activeClass);
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
export default canculateCaloriess;