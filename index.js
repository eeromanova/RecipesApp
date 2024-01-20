let recipes = []; //для вывода карточек
let result = "{}";
let checkboxesAllergy = [];
let checkboxesDiet = [];
let calories = {
  from: "",
  to: "",
};

let checkboxesAll = [];
let recipe = [];
let headerInput = document.querySelector(".header__container_input");

let findResipe = document.querySelector(".options_rescipes");

let header = document.querySelector(".header");

let orderRecipes = document.querySelector(".orderRecipes");
let url = `https://api.edamam.com/api/recipes/v2?type=public&dishType=Main%20course&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192`;

let arr = [];
async function getData() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      recipes = result.hits;
      console.log(result);
      console.log(result.hits);
      // console.log(result.hits[3].recipe.label);
      setRecipes();
      return result;
    } else {
      console.log(`Ошибка: ${response.status}`);
    }
  } catch (err) {
    console.log(err);
  }
}
document.addEventListener("DOMContentLoaded", getData);

const filterDropdowns = document.querySelectorAll(".filter-dropdown");
const filterDropdownButtons = document.querySelectorAll(
  ".filter-dropdown_main"
);
const filtersContainer = document.querySelector(".filter__container");

filterDropdowns.forEach((elem) => {
  elem.addEventListener("mouseover", () => {
    elem.querySelector(".dropdown-child").classList.add("dropdown-child_open");
    elem
      .querySelector(".dropdown-child")
      .classList.remove("dropdown-child_closed");
  });
});
filterDropdowns.forEach((elem) => {
  elem.addEventListener("mouseout", () => {
    elem
      .querySelector(".dropdown-child")
      .classList.remove("dropdown-child_open");
    elem
      .querySelector(".dropdown-child")
      .classList.add("dropdown-child_closed");
  });
});

const minCal = document.getElementById("minCal");
const maxCal = document.getElementById("maxCal");

const inputs = document.querySelectorAll("input");

const clearButton = document.querySelector(".clearButton");

const allergyFilter = document.getElementById("allergy__box");

const dietFilter = document.getElementById("diet__box");

const caloriesFilter = document.getElementById("calories__box");

//Полученные данные из API перебрать, каждый элемент добавить вмассив. Поиск существляется совпадением input.value и элементовмассива
let filterContainer = document.querySelector(".filter__container");
//let inputValue = headerInput.value;
getData().then((data) => {
  if (data && Array.isArray(data.hits)) {
    data.hits.forEach((hit) => {
      recipe.push(hit.recipe.label);
    });
  }
});

//В данной функции идет проверка input на заполнение. Если он НЕ пустой, то создается div, если пустой, то div удаляется

const suggestionsDiv = document.createElement("div");
header.appendChild(suggestionsDiv);
let filteredRecipes;

function handleInputEvent() {
  let inputValue = headerInput.value; // Получение текущего значения поля ввода

  if (inputValue !== "") {
    suggestionsDiv.innerHTML = ""; // Очищаем предыдущие результаты
    filteredRecipes = recipe.filter((elem) => {
      const reg = new RegExp("^" + inputValue, "gi");
      return reg.test(elem);
    });

    filteredRecipes.forEach((elem) => {
      let itemDiv = document.createElement("div");
      suggestionsDiv.style.position = "absolute"; // Или 'fixed', в зависимости от вашего макета
      suggestionsDiv.style.zIndex = "9999";
      suggestionsDiv.style.backgroundColor = "#ffab08"; // Пример фона
      suggestionsDiv.style.width = "100%";
      suggestionsDiv.style.marginLeft = "30%";
      itemDiv.textContent = elem;
      itemDiv.onclick = function () {
        headerInput.value = this.textContent;
        suggestionsDiv.remove("itemDiv");
        this.remove();
        filterContainer.style.display = "flex"; // Обновляем значение поля ввода
      };
      suggestionsDiv.appendChild(itemDiv);
    });

    suggestionsDiv.style.display = "block";
  } else {
    suggestionsDiv.style.display = "none";
    suggestionsDiv.innerHTML = "";
    filterContainer.style.display = "flex";
  }
}

headerInput.addEventListener("input", handleInputEvent);

const seachRecipeButton = document.querySelector(".header__container_btn");

seachRecipeButton.addEventListener("click", () => {
  console.log(headerInput.value);
  let requestArr = [...headerInput.value];
  for (let i = 0; i < requestArr.length; i++) {
    if (requestArr[i] == " ") {
      requestArr[i] = "%20";
    }
  }
  console.log(requestArr);
  url = `${url}&q=${requestArr.join("")}`;
  console.log(url);
  getData();
  let str = `&q=${requestArr.join("")}`;
  let n = url.indexOf(str);
  let l = str.length;
  url = `${url.slice(0, n)}${url.slice(n + l)}`;
  console.log(url);
});

filterDropdowns.forEach((elem) => {
  elem.addEventListener("mouseover", () => {
    elem.querySelector(".dropdown-child").classList.add("dropdown-child_open");
    elem
      .querySelector(".dropdown-child")
      .classList.remove("dropdown-child_closed");
  });
});
filterDropdowns.forEach((elem) => {
  elem.addEventListener("mouseout", () => {
    elem
      .querySelector(".dropdown-child")
      .classList.remove("dropdown-child_open");
    elem
      .querySelector(".dropdown-child")
      .classList.add("dropdown-child_closed");
  });
});

filtersContainer.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", () => {
    console.log(headerInput.value);
    let requestArr = [...headerInput.value];
    for (let i = 0; i < requestArr.length; i++) {
      if (requestArr[i] == " ") {
        requestArr[i] = "%20";
      }
    }

    if (input.checked) {
      if (
        input.value == "balanced" ||
        input.value == "high-fiber" ||
        input.value == "high-protein" ||
        input.value == "low-carb" ||
        input.value == "low-fat" ||
        input.value == "low-sodium"
      ) {
        if (url.includes(headerInput.value)) {
          url = `${url}&diet=${input.value}`;
        } else {
          url = `${url}&q=${requestArr.join("")}`;
          url = `${url}&diet=${input.value}`;
        }
      } else {
        if (url.includes(headerInput.value)) {
          url = `${url}&health=${input.value}`;
        } else {
          url = `${url}&q=${requestArr.join("")}`;
          url = `${url}&health=${input.value}`;
        }
      }
      console.log(url);
      getData();
      // let str2 = `&q=${requestArr.join("")}`;
      // let n2 = url.indexOf(str2);
      // let l2 = str2.length;
      // url = `${url.slice(0, n2)}${url.slice(n2 + l2)}`;
    } else {
      if (
        input.value == "balanced" ||
        input.value == "high-fiber" ||
        input.value == "high-protein" ||
        input.value == "low-carb" ||
        input.value == "low-fat" ||
        input.value == "low-sodium"
      ) {
        console.log(url);
        let str1 = `&diet=${input.value}`;
        let n1 = url.indexOf(str1);
        let l1 = str1.length;
        url = `${url.slice(0, n1)}${url.slice(n1 + l1)}`;
        console.log(url);
      } else {
        console.log(input.value);
        console.log(url);
        let str = `&health=${input.value}`;
        let n = url.indexOf(str);
        let l = str.length;
        url = `${url.slice(0, n)}${url.slice(n + l)}`;
        console.log(url);
      }
      console.log(url);
      getData();
      console.log(headerInput.value);
      if (!headerInput.value == "" && url.includes(headerInput.value)) {
        let str2 = `&q=${requestArr.join("")}`;
        let n2 = url.indexOf(str2);
        let l2 = str2.length;
        url = `${url.slice(0, n2)}${url.slice(n2 + l2)}`;
      }
    }
  });
});

allergyFilter.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", () => {
    checkboxesAllergy = allergyFilter.querySelectorAll(
      "input[type=checkbox]:checked"
    );

    if (checkboxesAllergy.length == 0) {
      document.getElementById("allergy").classList.add("filter-dropdown_main");
      document
        .getElementById("allergy")
        .classList.remove("filter-dropdown_orange");
    } else {
      document
        .getElementById("allergy")
        .classList.remove("filter-dropdown_main");
      document
        .getElementById("allergy")
        .classList.add("filter-dropdown_orange");
    }
  });
});

dietFilter.querySelectorAll("input").forEach((input) => {
  input.addEventListener("change", () => {
    checkboxesDiet = dietFilter.querySelectorAll(
      "input[type=checkbox]:checked"
    );
    console.log(checkboxesDiet);
    if (checkboxesDiet.length == 0) {
      document.getElementById("diet").classList.add("filter-dropdown_main");
      document
        .getElementById("diet")
        .classList.remove("filter-dropdown_orange");
    } else {
      document.getElementById("diet").classList.remove("filter-dropdown_main");
      document.getElementById("diet").classList.add("filter-dropdown_orange");
    }
  });
});

minCal.addEventListener("change", () => {
  calories.from = minCal.value;
  if (!minCal.value == "") {
    document
      .getElementById("calories")
      .classList.remove("filter-dropdown_main");
    document.getElementById("calories").classList.add("filter-dropdown_orange");
  } else {
    document.getElementById("calories").classList.add("filter-dropdown_main");
    document
      .getElementById("calories")
      .classList.remove("filter-dropdown_orange");
  }
});

maxCal.addEventListener("change", () => {
  calories.to = maxCal.value;
  if (!maxCal.value == "") {
    document
      .getElementById("calories")
      .classList.remove("filter-dropdown_main");
    document.getElementById("calories").classList.add("filter-dropdown_orange");
  } else {
    document.getElementById("calories").classList.add("filter-dropdown_main");
    document
      .getElementById("calories")
      .classList.remove("filter-dropdown_orange");
  }
});

const clearFilters = () => {
  minCal.value = "";
  maxCal.value = "";
  inputs.forEach((input) => {
    input.checked = "";
  });
  filterDropdownButtons.forEach((button) => {
    button.classList.remove("filter-dropdown_orange");
    button.classList.add("filter-dropdown_main");
  });
  if (!headerInput.value == "") {
    let requestArr = [...headerInput.value];
    for (let i = 0; i < requestArr.length; i++) {
      if (requestArr[i] == " ") {
        requestArr[i] = "%20";
      }
    }
    console.log(requestArr);
    url = `https://api.edamam.com/api/recipes/v2?type=public&dishType=Main%20course&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192&q=${requestArr.join(
      ""
    )}`;
  } else {
    url = `https://api.edamam.com/api/recipes/v2?type=public&dishType=Main%20course&app_id=f1dc740d&app_key=3ccb371b4e1b48ffdecb96d49d3cb192`;
  }
  console.log(url);
  getData();
};

clearButton.addEventListener("click", clearFilters);
//Получение рецептов

const container = document.querySelector(".container");

const getRecipes = () => {
  return recipes
    .map(
      ({
        recipe: { image },
        recipe: { label },
        recipe: { ingredientLines },
        recipe: { calories },
        recipe: { url },
        recipe: { source },
      }) => {
        return `<div class="card">
      <img class="card__img" src="${image}" alt="${label}"/>
      <p class="card__title">${label}</p>
      <p class="card__ingredients">${ingredientLines.length} ingredients</p>
      <p class="card__calories">${Math.round(calories)} calories</p>
      <ul><li class="card__btn"><a htef='#' class='card__btn_chosen'>Open recipe </a></li></ul>
      <div class="card__source"><a href="${url}" class="card__link">Source: ${source}</a>
      </div>
    </div>`;
      }
    )
    .join("");
};


// Вывод рецептов на интерфейс
const setRecipes = () => {
  container.innerHTML = getRecipes();
};

const buttonsChosen=container.querySelectorAll('.card__btn_chosen');
buttonsChosen.forEach((button)=>{
  button.addEventListener('click', ()=>{
    let id = button
    .parentNode.querySelector(".card__title");
  localStorage.setItem("id", id);
  })
})

