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
        if(element.includes(e.target.value)){
            tempoList.push(element);
        }
    });
    select.innerHTML=`${createOptionDOM(tempoList)}`;
    createOptionHandlers();
}

function createFilterDOM(filter){
    let filterElement = document.createElement("div");
    filterElement.classList.add("filter");
    filterElement.setAttribute("data-filter",filter);
    let filterText = document.createElement("p");
    filterText.textContent=filter;
    let filterCross = document.createElement("span");
    filterCross.classList.add("filterCross");
    let crossImg = document.createElement("img");
    crossImg.setAttribute("src","./img/Cross.png")
    filterCross.appendChild(crossImg);

    filterElement.appendChild(filterText);
    filterElement.appendChild(filterCross);
    return filterElement;
}

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

function filterHandler(e){
    console.log(e.target.parentElement.parentElement);
    let filterElement=e.target;
    while(!filterElement.classList.contains("filter")){
        filterElement=filterElement.parentElement;
    }
    filterElement.remove();
    filtersList.splice(filtersList.indexOf(filterElement.getAttribute("data-filter")),1);
    research(filtersList);
}

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



function initInputs(){
    ingredientsInput.addEventListener("keyup", (e)=>{inputSelectHandler(e, ingredientsList, ingredientsSelect);});
    appliancesInput.addEventListener("keyup", (e)=>{inputSelectHandler(e, appliancesList, appliancesSelect);});
    ustensilsInput.addEventListener("keyup", (e)=>{inputSelectHandler(e, ustensilsList, ustensilsSelect);});

    searchButton.addEventListener("click", (e)=>{e.preventDefault(); searchFromText(e, searchInput.value);});
    createOptionHandlers();
}

initInputs();