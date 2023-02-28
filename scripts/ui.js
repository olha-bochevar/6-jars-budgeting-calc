// add button 'Edit' to each category
const createBtn = () => {
  const btn = document.createElement("button");
  btn.classList.add("category-change");
  const btnContent = `<i class="fa-regular fa-pen-to-square"></i></i>Змінити`;
  btn.innerHTML = `${btnContent}`;
  return btn;
};
const categoryDiv = document.querySelectorAll("div.category-description");
categoryDiv.forEach(category => category.append(createBtn()));

//show tab
const showTab = counter => {
  if (counter >= 0 && counter < tabs.length) {
    // remove active class for all tabs
    tabs.forEach(tab => tab.classList.remove("active"));

    // give active class current tab and progress step
    tabs[counter].classList.add("active");

    checkCurrentProgressStep(counter);
  }
  // control btnPrev's behavior
  if (counter > 0 && counter <= tabs.length) {
    btnPrev.disabled = false;
  } else {
    btnPrev.disabled = true;
  }
  // do not allow click btn next when tabs are over
  if (counter == tabs.length - 1) {
    btnNext.disabled = true;
    showResults();
  } else {
    btnNext.disabled = false;
  }
};

// check active class for progress steps
const checkCurrentProgressStep = counter => {
  steps.forEach(step => step.classList.remove("active"));

  for (let idx = 0; idx <= counter; idx++) {
    steps[idx].classList.add("active");
  }
};

const showSelectedCategoriesResults = (data, results) => {
  let html = "";
  results.forEach(result => {
    data.forEach(item => {
      if (result.category === item.id) {
        html += `
                ${item.title}, ${result.result}`;
      }
    });
  });

  resultSection.innerText += html;
};

const showResults = () => {
  let income = form.income.value.trim();
  const selectedRates = getRates();
  const results = getCalc(selectedRates, income);

  let html = document.createElement("h3");
  html = `Ваш дохід: ${income}.

    Ваші ставки:`;

  // get data with full category titles from json file
  getData(url).then(data => {
    showSelectedCategoriesResults(data, results);
  });

  resultSection.innerText = html;
};
