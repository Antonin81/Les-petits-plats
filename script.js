let ingredientsList = [];
let appliancesList = [];
let ustensilsList = [];

//empties the list of options in the selects
function resetOptionLists(){
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
}

/**
 * 
 * Creates all the recipy cards of the DOM
 */
function createCardsDOM(recipesForDOM){
    let cardsDOM = "";
    resetOptionLists();
    let recipesCount=0;
    
    recipesForDOM.forEach(recipe => {
        cardsDOM+=createCardDOM(recipe);
        recipesCount++;
    });
    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
}

/**
 * 
 * Creates one recipy card of the DOM
 */
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
        <p class="ingredient-name">${formatString(ingredient.ingredient)}</p>
        <p class="ingredient-quantity">${ingredient.quantity!=undefined ? ingredient.quantity : ""} ${ingredient.unit!=undefined ? ingredient.unit : ""}</p>
    </div>
        `;

        if(!ingredientsList.includes(ingredient.ingredient.toLowerCase())){
            ingredientsList.push(ingredient.ingredient.toLowerCase());
        }
    });

    if(!appliancesList.includes(recipe.appliance.toLowerCase())){
        appliancesList.push(recipe.appliance.toLowerCase());
    }

    recipe.ustensils.forEach(ustensil => {
        if(!ustensilsList.includes(ustensil.toLowerCase())){
            ustensilsList.push(ustensil.toLowerCase());
        }
    });

    DOM+=`</div>
    </div>
    </article>`;

    return DOM;
}

/**
 * 
 * Puts strings in this format : "String"
 */
function formatString(string){
    let lowerString=string.toLowerCase();
    let formatedString = "";
    let beginning = lowerString.slice(0,1);
    let end = lowerString.slice(1);
    formatedString+=beginning.toUpperCase();
    formatedString+=end;
    return formatedString
}

/**
 * 
 * Creates an option for the select menus for filters
 */
function createOptionDOM(array){
    let DOM = "";
    array.forEach(element => {
        DOM+=`<li><button class="buttonSelect" data-value="${element}">${formatString(element)}</button></li>`;
    })
    return DOM;
}

/**
 * Fills the select menus with the options that are available
 */
function createSelectsDOM(){
    let ingredientsSelect = document.getElementById("Ingredients").nextElementSibling.querySelector(".option-list");
    let applianceSelect = document.getElementById("Appliances").nextElementSibling.querySelector(".option-list");
    let ustensilsSelect = document.getElementById("Ustensils").nextElementSibling.querySelector(".option-list");
    ingredientsSelect.innerHTML=createOptionDOM(ingredientsList);
    applianceSelect.innerHTML=createOptionDOM(appliancesList);
    ustensilsSelect.innerHTML=createOptionDOM(ustensilsList);
}

/**
 * 
 * Writes the right numbre in the displayed recipies counter
 */
function createCountDOM(count){
    document.getElementById("sort-section").querySelector("h2").innerHTML=`${count} recettes`;
}

/**
 * Closes all the select menus
 */
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

/**
 * 
 * Displays the message when there are no recipies corresponding to filters
 */
function showAbsenceMessage(input){
    document.querySelector(".word-message").textContent=input;
    document.getElementById("no-recipes-message").style.display="block";
}

/**
 *  Shows the message when there are no recipies corresponding to filters
 */
function unShowAbsenceMessage(){
    document.getElementById("no-recipes-message").style.display="none";
}

function init(){
    createCardsDOM(recipes);
    createSelectsDOM();
    document.querySelectorAll(".select-button").forEach(button=>{
        button.addEventListener("click",()=>{
            toggleDropdown(button);
        })
    });
}

init();