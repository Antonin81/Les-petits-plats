let ingredientsInput = document.getElementById("Ingredients").parentElement.querySelector("input");
let ingredientsSelect = document.getElementById("Ingredients").parentElement.querySelector(".option-list");
let appliancesInput = document.getElementById("Appliances").parentElement.querySelector("input");
let appliancesSelect = document.getElementById("Appliances").parentElement.querySelector(".option-list");
let ustensilsInput = document.getElementById("Ustensils").parentElement.querySelector("input");
let ustensilsSelect = document.getElementById("Ustensils").parentElement.querySelector(".option-list");

let searchInput = document.querySelector(".header-form input");
let searchButton = document.querySelector(".header-form button");

let filtersList = [];

function emptySelect(select){
    select.innerHTML="";
}

function inputSelectHandler(e, list, select){
    emptySelect(select);
    let tempoList=[];
    list.forEach(element => {
        if(element.toLowerCase().includes(e.target.value)){
            tempoList.push(element);
        }
    });
    select.innerHTML=`${createOptionDOM(tempoList)}`;
    createOptionHandlers();
}

ingredientsInput.addEventListener("keyup", (e)=>{inputSelectHandler(e, ingredientsList, ingredientsSelect);});
appliancesInput.addEventListener("keyup", (e)=>{inputSelectHandler(e, appliancesList, appliancesSelect);});
ustensilsInput.addEventListener("keyup", (e)=>{inputSelectHandler(e, ustensilsList, ustensilsSelect);});

searchButton.addEventListener("click", (e)=>{e.preventDefault(); searchFromText(e, searchInput.value);});

function optionHandler(e){
    if(filtersList.includes(e.target.getAttribute("data-value"))){
        filtersList.splice(filtersList.indexOf(e.target.getAttribute("data-value")), 1);
        document.querySelector(`[data-filter='${e.target.getAttribute("data-value")}']`).remove();     
    } else {
        filtersList.push(e.target.getAttribute("data-value"));
        document.getElementById("filters").appendChild(createFilterDOM(e.target.getAttribute("data-value")));
    }
    createOptionHandlers();
}

function createOptionHandlers(){
    let selectButtons = document.querySelectorAll(".buttonSelect");
    selectButtons.forEach(selectButton => {
        selectButton.addEventListener("click",optionHandler);
    })
    let crossFilters = document.querySelectorAll(".filterCross");
    crossFilters.forEach(crossFilter=>{
        console.log(crossFilter);
        crossFilter.addEventListener("click",(e)=>{
            e.target.parentElement.remove();
            filtersList.splice(filtersList.indexOf(e.target.parentElement.getAttribute("data-filter")),1);
        });
    })
}

createOptionHandlers();