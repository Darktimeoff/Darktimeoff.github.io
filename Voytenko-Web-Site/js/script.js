'use strict'
const menu = document.querySelector('.menu__navigation'),
  menuItem = document.querySelectorAll('.menu__item'),
  hamburger = document.querySelector('.menu__hamburger'),
  profile = document.querySelector('.profile'),
  profileInformationsListItems = document.querySelectorAll('.profile__informations-list-item');
  let newsItem, newsButton = document.querySelector('.news__button');
  let specialtyItem, specialtyButton = document.querySelector('.specialty__button');
  let documentsItem, documentsButton = document.querySelector('.documents__button');


  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('menu__hamburger_active');
      menu.classList.toggle('menu__navigation_active');
  });

  menuItem.forEach(item => {
      item.addEventListener('click', () => {
          hamburger.classList.toggle('menu__hamburger_active');
          menu.classList.toggle('menu__navigation_active');
      })
  })
  function hideItem(list, classListNm, count = 2) {
	if(list === undefined){
		list = document.querySelectorAll(classListNm);
		if(list) {
			for(let i = count; i < list.length; i++) {
				list[i].style.display = 'none';
			}
		} else {
			return 0;
		}
	} else {
		for(let i = count; i < list.length; i++) {
			list[i].style.display = 'none';
		}
	}
  }
  function showItemWithActiveClass(element, list, count, className) {
    element.addEventListener('click', () => {
        element.classList.toggle(className);
        if(element.classList.contains(className)) {
           list.forEach((item, i) => {
                if(i >= count) item.style.display = 'none';
            })
        } else {
           list.forEach((item, i) => {
                if(i >= count) item.style.display = 'block';
            })
        }
    })
  }
  function showItem(element, list, classListNm, count = 2, hideActivated = true) {
        list = document.querySelectorAll(classListNm);
		element.addEventListener('click', () => {
			if(hideActivated) {
				for(let i = 0; i < list.length; i++) {
					list[i].style.display = '';
                }
				hideActivated = false;
			} else {
				hideItem(list, classListNm, count)
                hideActivated = true;
			}
		})
  }
  function hideAndShowItem(list, classListNm, clickElement, count = 2) {
	  hideItem(list, classListNm, count);
	  showItem(clickElement, list, classListNm, count);
  }
  showItemWithActiveClass(profile, profileInformationsListItems, 4, 'profile_active');
  hideAndShowItem(newsItem, '.news__item', newsButton, 2);
  hideAndShowItem(specialtyItem, '.specialty__item', specialtyButton, 2);
  hideAndShowItem(documentsItem, '.documents__item', documentsButton, 8);


 
