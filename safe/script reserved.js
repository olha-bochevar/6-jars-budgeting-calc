// DOM
const btnNext = document.querySelector("div.form-buttons > button.form-button.next");
const btnPrev = document.querySelector("div.form-buttons > button.form-button.prev");

const form = document.querySelector('form');
const result = document.querySelector("#results");
const steps = document.querySelectorAll("div.form-steps > ul > .step");
const tabs = document.querySelectorAll('.tabs > div');
const categories = document.querySelectorAll("#categories > ul > li.category");
const checkboxes = document.querySelectorAll('.category-check input');
const rates = document.querySelectorAll('.category-rate');
// variables 
    // current - for current tab tracking and modifying classList of another tabs
let current = 0;


// FUNCTIONS

// default 
checkboxes.forEach(checkbox => checkbox.checked = true);    

const getCategories = () => {
    let arr = [];
    categories.forEach(category => {
        const check = category.firstElementChild.children[0];
       
        if(check.checked) {
            arr.push(check.getAttribute('name'));
           
        };
        
    });
    return arr;
};
//console.log(getCategories());
const getRates = () => {
   const selectedCategories = getCategories();
   //console.log(selectedCategories);
   let selectedRates  = [];
    selectedCategories.forEach(category => {
        rates.forEach(rate => {
            if(rate.getAttribute('id') == category){
               const obj = {
                category: rate.getAttribute('id'),
                rate: rate.textContent.trim()
            }
            selectedRates.push(obj);
            };
        })
    }) 
    return selectedRates;
    
   
   };


// add active class for progress steps
const addClassActiveStepProgress = (current) => {
    steps[current].classList.add('active');
};
// remove active class for progress steps
const removeClassActiveStepProgress = (current) => {
    steps[current].classList.remove('active');
};
// add active class for tab
const addClassActiveTab = (current) => {
    tabs[current].classList.add('active');
};
// remove active class for tab
const removeClassActiveTab = (current) => {
    tabs[current].classList.remove('active');
};
// enable / disable previous button state
/* const changePrevBtnState = (current) => {
    if(current > 0) {
        btnPrev.disabled = false;
    } else {
        btnPrev.disabled = true;
    }
}; */
const getIncome = () => {
    return form.income.value;
};
const getProcent = (a,b) => {
    return (a*b)/100;
}
const getCalc = (selectedRates, income) => {
    let num;
    const result = [];
    let obj = {};
    selectedRates.forEach(rate => {
        num = Number(rate.rate.slice(0, -1));
        res = getProcent(income, num);
         obj = {
            category: rate.category,
            result: res
        };
        result.push(obj);
    });
   return result;
};


const showResults = () => {

    let income = getIncome();
    const selectedRates = getRates();
    const results = getCalc(selectedRates, income);
   // console.log(results);
    let html = document.createElement('h3');
    html = `Ваш дохід: ${getIncome()}.

    Ваші ставки:`;
   /*  results.forEach(result => {
        html += `
        ${result.category}, ${result.result}`;
    }); */
    
   /*  const request = getData(url);
    const data = request.then(resp => {
        console.log(resp)
        return resp;
    }); */

  
    results.forEach(res => {
       
       
    })
    result.innerText = html;
};



// EVENTS

btnNext.addEventListener('click', (e) => {
    e.preventDefault();
   
    current++;
    if(current < tabs.length) {
        removeClassActiveTab(current-1);
        addClassActiveTab(current);
        btnPrev.disabled = false;
        addClassActiveStepProgress(current);
        getCategories();
    };
    
    if (current == tabs.length-1) {
       /*  btnNext.innerHTML = `<i class="fa-solid fa-house"></i>`; */
        btnNext.disabled = true;
        showResults();
    } else {
       /*  btnNext.innerHTML = `<i class="fa-sharp fa-solid fa-arrow-right"></i>`; */
       btnNext.disabled = false;
    };
   
    
});


btnPrev.addEventListener('click', (e) => {
    e.preventDefault();

    if(current > 0) {
        removeClassActiveTab(current);
        removeClassActiveStepProgress(current);
        current--;
        addClassActiveTab(current);
        btnNext.disabled = false;
        
    };
    if (current === 0) {
       btnPrev.disabled = true; 
    }
})