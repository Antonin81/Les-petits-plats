let ingredientsInput = document.getElementById("Ingredients").parentElement.querySelector("input");
let ingredientsSelect = document.getElementById("Ingredients").parentElement.querySelector(".option-list");
let appliancesInput = document.getElementById("Appliances").parentElement.querySelector("input");
let appliancesSelect = document.getElementById("Appliances").parentElement.querySelector(".option-list");
let ustensilsInput = document.getElementById("Ustensils").parentElement.querySelector("input");
let ustensilsSelect = document.getElementById("Ustensils").parentElement.querySelector(".option-list");

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

function optionHandler(e){
    console.log(e.target.getAttribute("data-value"));
}

function createOptionHandlers(){
    let selectButtons = document.querySelectorAll(".buttonSelect");
    selectButtons.forEach(selectButton => {
        selectButton.addEventListener("click",optionHandler);
    })
}

createOptionHandlers();