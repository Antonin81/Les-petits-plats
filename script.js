let ingredientsList = [];
let appliancesList = [];
let ustensilsList = [];
let recipesCount = 0;

function createCardsDOM(){
    let cardsDOM = "";
    recipes.forEach(recipe => {
        cardsDOM+=createCardDOM(recipe);
        recipesCount++;
    });
    document.getElementById("recipies").innerHTML=cardsDOM;
}

function createCardDOM(recipe){

    let DOM = `
    <article>
    <div class="preparation-time">
        <p>${recipe.time}min</p>
    </div>
    <img src="./img/photos/${recipe.image}" alt="">
    <div class="recipy-content">
        <h2>${recipe.name}</h2>
        <h3>RECETTE</h3>
        <p class="steps">${recipe.description}</p>
        <h3>INGREDIENTS</h3>
        <div class="ingredients">
    `;

    recipe.ingredients.forEach(ingredient => {
        DOM+=`<div>
        <p class="ingredient-name">${ingredient.ingredient}</p>
        <p class="ingredient-quantity">${ingredient.quantity!=undefined ? ingredient.quantity : ""} ${ingredient.unit!=undefined ? ingredient.unit : ""}</p>
    </div>
        `;

        if(!ingredientsList.includes(ingredient.ingredient)){
            ingredientsList.push(ingredient.ingredient);
        }
    });

    if(!appliancesList.includes(recipe.appliance)){
        appliancesList.push(recipe.appliance);
    }

    recipe.ustensils.forEach(ustensil => {
        if(!ustensilsList.includes(ustensil)){
            ustensilsList.push(ustensil);
        }
    });

    DOM+=`</div>
    </div>
    </article>`;

    return DOM;
}

function createOptionDOM(array){
    let DOM = "";
    array.forEach(element => {
        // let formatedElement = "";
        // let beginning = element.slice(0,1);
        // let end = element.slice(1);
        // formatedElement+=beginning.toUpperCase();
        // formatedElement+=end;
        // ATTENTION /!\ dans le data value ya un truc à revoir
        DOM+=`<li><button class="buttonSelect" data-value="${element}">${element}</button></li>`;
    })
    return DOM;
}

function createSelectsDOM(){
    let ingredientsSelect = document.getElementById("Ingredients").nextElementSibling.querySelector(".option-list");
    let applianceSelect = document.getElementById("Appliances").nextElementSibling.querySelector(".option-list");
    let ustensilsSelect = document.getElementById("Ustensils").nextElementSibling.querySelector(".option-list");
    ingredientsSelect.innerHTML=createOptionDOM(ingredientsList);
    applianceSelect.innerHTML=createOptionDOM(appliancesList);
    ustensilsSelect.innerHTML=createOptionDOM(ustensilsList);
}

function createCountDOM(){
    document.getElementById("sort-section").querySelector("h2").innerHTML=`${recipesCount} recettes`;
}

function closeAllDropdowns(){
    document.querySelectorAll(".select-button").forEach(select => {
        closeDropdown(select, select.nextElementSibling);
    })
}

//opens the select dropdown
function openDropdown(button, dropdown){
    button.setAttribute("data-open",true);
    dropdown.classList.remove("hidden");
}

//closes the select dropdown
function closeDropdown(button, dropdown){
    button.setAttribute("data-open",false);
    dropdown.classList.add("hidden");
}

//toggles the select dropdown
function toggleDropdown(button){
    let dropdown = button.nextElementSibling;
    if(dropdown.classList.contains("hidden")){
        closeAllDropdowns();
        openDropdown(button, dropdown);
    } else {
        closeDropdown(button, dropdown);
    }
}

function init(){
    createCardsDOM();
    createSelectsDOM();
    createCountDOM();
    document.querySelectorAll(".select-button").forEach(button=>{
        button.addEventListener("click",()=>{
            toggleDropdown(button);
        })
    });
}

init();