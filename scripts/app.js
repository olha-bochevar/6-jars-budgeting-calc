// DOM
const btnNext = document.querySelector(
  "div.form-buttons > button.form-button.next"
);
const btnPrev = document.querySelector(
  "div.form-buttons > button.form-button.prev"
);

const form = document.querySelector("form");
const resultSection = document.querySelector("#results");
const steps = document.querySelectorAll("div.form-steps > ul > .step");
const tabs = document.querySelectorAll(".tabs > div");
const categories = document.querySelectorAll("#categories > ul > li.category");
const checkboxes = document.querySelectorAll(".category-check input");
const rates = document.querySelectorAll(".category-rate");

// current - for current tab tracking and modifying classList of another tabs
let current = 0;

// setting a default value for categories
checkboxes.forEach(checkbox => (checkbox.checked = true));

// mathematic calculation of persentage
const getPersentage = (a, b) => {
  return (a * b) / 100;
};

// get checked categories
const getCategories = () => {
  let arr = [];
  categories.forEach(category => {
    const check = category.firstElementChild.children[0];

    if (check.checked) {
      arr.push(check.getAttribute("name"));
    }
  });
  return arr;
};
// get number of rate for selected category
const getRates = () => {
  const selectedCategories = getCategories();
  let selectedRates = [];
  selectedCategories.forEach(category => {
    rates.forEach(rate => {
      if (rate.getAttribute("id") == category) {
        const obj = {
          category: rate.getAttribute("id"),
          rate: rate.textContent.trim(),
        };
        selectedRates.push(obj);
      }
    });
  });
  return selectedRates;
};

// calculation of sum for every category
const getCalc = (selectedRates, income) => {
  let num;
  const result = [];
  let obj = {};
  selectedRates.forEach(rate => {
    num = Number(rate.rate.slice(0, -1)); // remove symbol %
    res = getPersentage(income, num);
    obj = {
      category: rate.category,
      result: res,
    };
    result.push(obj);
  });
  return result;
};

// EVENTS

btnNext.addEventListener("click", e => {
  e.preventDefault();

  // increase counter of tabs
  current++;
  showTab(current);

  // grab checked categories
  getCategories();
});

btnPrev.addEventListener("click", e => {
  e.preventDefault();

  current--;
  showTab(current);
});
