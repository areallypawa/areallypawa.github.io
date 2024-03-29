// лоудер
$(window).on("load", function() {
  $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

// лоудер




// Парсим файл с карточками
fetch("../sourse/files/JSON/card.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        localStorage.setItem("cards", JSON.stringify(data));
        console.log(1)
    });

const cardcontainerStor = JSON.parse(localStorage.getItem("cards") || "[]"); //все категории

if (cardcontainerStor) {
  let CardsContainer = document.getElementById('cardcontainer')
  cardcontainerStor.forEach((el) => {
    const { id, data_content1, data_content2, scr, name, } = el

    const NewCard = document.createElement('div')

    NewCard.className = 'col';
    NewCard.setAttribute('data-container',`${ data_content1 }`);
    NewCard.setAttribute('data-container2',`${ data_content2 }`);

    NewCard.innerHTML = `<div class="card"><div class="card__top"><div class="card__image" data-modal-btn="my_modal${ id }" id="main"><img src="${ scr }" alt=""></div><div class="modal" data-modal-window="my_modal${ id }"><div class="modal_content"><img class="modal-img" src="${ scr }" alt=""></div></div></div><div class="card__bottom"><h6 class="text-center">${ name }</h6><a href="${ scr }" class="mt-auto" style="text-decoration: none;"download=""><button class="card__add">Скачать <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"fill="currentColor" class="bi bi-download" viewBox="0 0 16 16"><pathd="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" /><pathd="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" /></svg></button></a></div></div>`

    CardsContainer.appendChild(NewCard);
  });
}


//Модальное окно 
let btns = document.querySelectorAll("*[data-modal-btn]");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener('click', function () {
    let name = btns[i].getAttribute('data-modal-btn');
    let modal = document.querySelector("[data-modal-window='" + name + "']");
    modal.style.display = "block";
    let close = modal.querySelector(".close_modal_window");
    close.addEventListener('click', function () {
      modal.style.display = "none";
    });
  });
}

window.onclick = function (event) {
  if (event.target.hasAttribute('data-modal-window')) {
    let modals = document.querySelectorAll('*[data-modal-window]');
    for (let i = 0; i < modals.length; i++) {
      modals[i].style.display = "none";
    }
  }
}
//Модальное окно

// наверх кнопка
$(function(){
  $(window).scroll(function(){
    if($(window).scrollTop() > 100) {
			$('#scroll_top').show();
		} else {
      $('#scroll_top').hide();
		}
	});
 
	$('#scroll_top').click(function(){
    $('html, body').animate({scrollTop: 0}, 600);
		return false;
	});
});
// наверх кнопка

// фильтрооо

// Получаем элементы всех чекбоксов и контейнеров
const checkboxes = document.querySelectorAll('[data-target], [data-target1], [data-target3]');
const containers = document.querySelectorAll('[data-container], [data-container2]');

// Слушаем события изменения состояния чекбоксов
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    // Если горит чекбокс с data-target3, отключаем остальные чекбоксы
    if (checkbox.getAttribute('data-target3') !== null && checkbox.checked) {
      checkboxes.forEach(function (cb) {
        if (cb !== checkbox) {
          cb.checked = false;
        }
      });
    } else if (checkbox.checked) {
      // Если выбран любой другой чекбокс, отключаем чекбокс "Все"
      const allCheckbox = document.querySelector('[data-target3]');
      if (allCheckbox.checked) {
        allCheckbox.checked = false;
      }
    }

    // Получаем все отмеченные чекбоксы
    const checkedCheckboxes = Array.from(document.querySelectorAll('[data-target]:checked, [data-target1]:checked, [data-target3]:checked'));

    // Если есть отмеченные чекбоксы
    if (checkedCheckboxes.length > 0) {
      // Проверяем, есть ли отмеченный чекбокс с data-target3
      const hasTarget3Checkbox = checkedCheckboxes.some(function (cb) {
        return cb.getAttribute('data-target3') !== null;
      });

      if (hasTarget3Checkbox) {
        // Показываем все контейнеры, если есть отмеченный чекбокс с data-target3
        containers.forEach(function (container) {
          container.style.display = 'block';
        });
      } else {
        // Получаем значения целей выбранных чекбоксов
        const targetValues = checkedCheckboxes.map(function (cb) {
          return cb.getAttribute('data-target') || cb.getAttribute('data-target1');
        });

        // Показываем контейнеры, у которых цель совпадает с выбранными чекбоксами, и скрываем остальные контейнеры
        containers.forEach(function (container) {
          const containerTarget = container.getAttribute('data-container') || container.getAttribute('data-container2');
          if (targetValues.includes(containerTarget) || targetValues.includes(container.getAttribute('data-container2'))) {
            container.style.display = 'block';
          } else {
            container.style.display = 'none';
          }
        });
      }
    } else {
      // Показываем все контейнеры, если нет выбранных чекбоксов
      containers.forEach(function (container) {
        container.style.display = 'block';
      });
    }
  });
});

// Слушаем событие изменения состояния чекбокса "Все"
const allCheckbox = document.querySelector('[data-target3]');
allCheckbox.addEventListener('change', function () {
  // Если чекбокс "Все" горит, отключаем остальные чекбоксы
  if (allCheckbox.checked) {
    checkboxes.forEach(function (checkbox) {
      if (checkbox !== allCheckbox) {
        checkbox.checked = false;
      }
    });
  } else {
    // Если чекбокс "Все" потух, показываем все контейнеры
    containers.forEach(function (container) {
      container.style.display = 'block';
    });
  }
});




// Получаем элемент контейнера 404
const container404 = document.querySelector('.error');

// Функция для проверки видимости контейнеров
function checkContainerVisibility() {
  let allContainersHidden = true;

  containers.forEach(function (container) {
    if (container.style.display !== 'none') {
      allContainersHidden = false;
    }
  });

  if (allContainersHidden) {
    // Если все контейнеры скрыты, показываем контейнер 404
    container404.style.display = 'block';
  } else {
    // Иначе скрываем контейнер 404
    container404.style.display = 'none';
  }
}

// Вызываем функцию для проверки видимости контейнеров при загрузке страницы
checkContainerVisibility();

// Добавляем обработчик события изменения состояния чекбоксов
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    // Проверяем видимость контейнеров после изменения состояния чекбоксов
    checkContainerVisibility();
  });
});

// Добавляем обработчик события изменения состояния чекбокса "Все"
allCheckbox.addEventListener('change', function () {
  // Если чекбокс "Все" потух, показываем контейнер 404
  if (!allCheckbox.checked) {
    container404.style.display = 'block';
  }
});
// фильтр


// строка поиска

// Получаем элементы карточек
const cards = document.querySelectorAll('.col');

// Функция для выполнения поиска и скрытия карточек
function searchAndHideCards() {
  // Получаем значение поискового запроса
  const searchQuery = document.getElementById('search-input').value.toLowerCase();
  
  // Проходим по каждой карточке
  cards.forEach(function (card) {
    // Получаем значение тега h6 внутри карточки
    const cardTitle = card.querySelector('h6').textContent.toLowerCase();
    
    // Проверяем, содержит ли значение тега h6 поисковой запрос
    if (cardTitle.includes(searchQuery)) {
      // Показываем карточку, если содержит
      card.style.display = 'block';
    } else {
      // Скрываем карточку, если не содержит
      card.style.display = 'none';
    }
  });
}

// Слушаем событие изменения в поле ввода поиска
document.getElementById('search-input').addEventListener('input', searchAndHideCards);


// строка поиска




















