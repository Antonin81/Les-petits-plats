let ingredientsInput = document.getElementById("Ingredients").parentElement.querySelector("input");
let ingredientsSelect = document.getElementById("Ingredients").parentElement.querySelector(".option-list");
let appliancesInput = document.getElementById("Appliances").parentElement.querySelector("input");
let appliancesSelect = document.getElementById("Appliances").parentElement.querySelector(".option-list");
let ustensilsInput = document.getElementById("Ustensils").parentElement.querySelector("input");
let ustensilsSelect = document.getElementById("Ustensils").parentElement.querySelector(".option-list");

let searchInput = document.querySelector(".header-form input");
let searchButton = document.querySelector(".header-form button");

let filtersList = [];

/**
 * 
 * Empties a given select menu
 */
function emptySelect(select){
    select.innerHTML="";
}

/**
 * 
 * Handler for the search action in select menus' search bars 
 */
function inputSelectHandler(target, list, select){
    emptySelect(select);
    let tempoList=[];
    list.forEach(element => {
        if(element.includes(target.value.toLowerCase())){
            tempoList.push(element);
        }
    });
    select.innerHTML=`${createOptionDOM(tempoList)}`;
    createOptionHandlers();
}

/**
 * 
 * Creates the DOM element of a filter
 */
function createFilterDOM(filter){
    let filterElement = document.createElement("div");
    filterElement.classList.add("filter");
    filterElement.setAttribute("data-filter",filter);
    let filterText = document.createElement("p");
    filterText.textContent=formatString(filter);
    let filterCross = document.createElement("span");
    filterCross.classList.add("filterCross");
    let crossImg = document.createElement("img");
    crossImg.setAttribute("src","./img/Cross.png")
    filterCross.appendChild(crossImg);

    filterElement.appendChild(filterText);
    filterElement.appendChild(filterCross);
    return filterElement;
}

/**
 * 
 * Handler for the click event on a select menu's option
 */
function optionHandler(e){
    if(filtersList.includes(e.target.getAttribute("data-value"))){
        filtersList.splice(filtersList.indexOf(e.target.getAttribute("data-value")), 1);
        document.querySelector(`[data-filter='${e.target.getAttribute("data-value")}']`).remove();     
    } else {
        filtersList.push(e.target.getAttribute("data-value"));
        document.getElementById("filters").appendChild(createFilterDOM(e.target.getAttribute("data-value")));
    }
    createOptionHandlers();
    research(filtersList);
}

/**
 * 
 * Handler for the click on a filter's cross
 */
function filterHandler(e){
    let filterElement=e.target;
    while(!filterElement.classList.contains("filter")){
        filterElement=filterElement.parentElement;
    }
    filterElement.remove();
    filtersList.splice(filtersList.indexOf(filterElement.getAttribute("data-filter")),1);
    research(filtersList);
}

/**
 * Adds event listeners for clicks on the newly created options
 */
function createOptionHandlers(){
    let selectButtons = document.querySelectorAll(".buttonSelect");
    selectButtons.forEach(selectButton => {
        selectButton.addEventListener("click",optionHandler);
    })
    let crossFilters = document.querySelectorAll(".filterCross");
    crossFilters.forEach(crossFilter=>{
        crossFilter.addEventListener("click",filterHandler);
    })
}

/**
 * Handler for the search event in the main search bar
 */
function searchHandler(){
    searchFromText(searchInput.value.length, searchInput.value, filtersList);
}

function initInputs(){
    ingredientsInput.addEventListener("keyup", (e)=>{inputSelectHandler(e.target, ingredientsList, ingredientsSelect);});
    appliancesInput.addEventListener("keyup", (e)=>{inputSelectHandler(e.target, appliancesList, appliancesSelect);});
    ustensilsInput.addEventListener("keyup", (e)=>{inputSelectHandler(e.target, ustensilsList, ustensilsSelect);});

    searchButton.addEventListener("click", (e)=>{e.preventDefault();});
    searchInput.addEventListener("keyup",searchHandler);
    createOptionHandlers();
}

initInputs();