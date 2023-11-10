//list of recipes resulting of a search without using the filters
let recipesToFilter = [...recipes];

function resetOptionLists(){
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
}

//fills the list of options selectable from the displayed recipes
function buildOptionLists(recipe){
    recipe.ingredients.forEach(ingredient=>{
        if(!ingredientsList.includes(ingredient.ingredient)){
            ingredientsList.push(ingredient.ingredient);
        }
    });
    recipe.ustensils.forEach(ustensil=>{
        if(!ustensilsList.includes(ustensil)){
            ustensilsList.push(ustensil);
        }
    });
    if(!appliancesList.includes(recipe.appliance)){
        appliancesList.push(recipe.appliance);
    }
}

//applies the search of the select input bar on the options list
function researchInSelects(){
    inputSelectHandler(ingredientsInput, ingredientsList, ingredientsSelect);
    inputSelectHandler(appliancesInput, appliancesList, appliancesSelect);
    inputSelectHandler(ustensilsInput, ustensilsList, ustensilsSelect);
}

//creates the cards DOM according to the selected filters
function fromFiltersCreateCardsDOM(recipesForDOM, inputList){

    let cardsDOM = "";
    resetOptionLists();
    let recipesCount = 0;

    recipesForDOM.forEach(recipe => {
        if(tests(recipe, inputList)){

            buildOptionLists(recipe);

            cardsDOM+=createCardDOM(recipe);
            recipesCount++;
        }        
    });

    if(recipesCount==0){
        showAbsenceMessage();
    }

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
    emptySelects();
    createSelectsDOM();
    createOptionHandlers();
    researchInSelects();
}

//creates the cards DOM according to string in the main search bar
function fromSearchCreateCardsDOM(recipesForDOM, text, inputList){

    let cardsDOM = "";
    resetOptionLists();
    recipesToFilter = [];
    let recipesCount = 0;

    recipesForDOM.forEach(recipe => {
        if(testText(recipe, text)){
            if(inputList.length == 0 || tests(recipe, inputList)){
                buildOptionLists(recipe);
                cardsDOM+=createCardDOM(recipe);
                recipesCount++;
            }
            recipesToFilter.push(recipe);
        }        
    });

    if(recipesCount==0){
        showAbsenceMessage();
    }

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
    emptySelects();
    createSelectsDOM();
    createOptionHandlers();
    researchInSelects();
}

//Researches recipes from a list of filters
function research(inputList){
    emptyRecipes();
    unShowAbsenceMessage();
    fromFiltersCreateCardsDOM(recipesToFilter, inputList);
}

//empties the recipes section
function emptyRecipes(){
    document.getElementById("recipies").innerHTML="";
}

//empties the options lists of the selects' DOM
function emptySelects(){
    document.querySelectorAll(".option-list").forEach(optionList=>{
        optionList.innerHTML="";
    });
}

function testAppliance(recipe, inputList){
    return inputList.includes(recipe.appliance) ? 1 : 0;
}

function testUstensils(recipe, inputList){
    let nbInputsVerified = 0;
    inputList.forEach(input=>{
        if(recipe.ustensils.includes(input)){
            nbInputsVerified++;
        }
    })
    return nbInputsVerified;
}

function testIngredients(recipe, inputList){
    let nbInputsVerified = 0;
    recipe.ingredients.forEach(ingredient => {
        if(inputList.includes(ingredient.ingredient)){
            nbInputsVerified++;
        }
    })
    return nbInputsVerified;
}

function testText(recipe, text){

    if(recipe.name.includes(text)){
        return true;
    }

    if(recipe.description.includes(text)){
        return true;
    }

    let isInIngredients=false;

    recipe.ingredients.forEach(ingredient => {
        if(ingredient.ingredient.includes(text)){
            isInIngredients = true;
        }
    });

    return isInIngredients;

}

//Researches recipes from a string
function searchFromText(stringLength, text, inputList){
    //applies a search algorithm only if there are 3 letters minimum
    if (stringLength>=3){
        unShowAbsenceMessage();
        fromSearchCreateCardsDOM(recipes, text, inputList);
    } else {
        //activates only if there was already a custom recipes display
        if(recipesToFilter.length<recipes.length){
            recipesToFilter = [...recipes];
            //displays all the recipes if not any filters are applied, else applies the filters on all recipes
            if(inputList.length == 0){
                unShowAbsenceMessage();
                emptySelects();
                createCardsDOM(recipes);
                createSelectsDOM();
                createOptionHandlers();
                researchInSelects();
            } else {
                research(inputList);
            }
        }
    }
}

function tests(recipe, inputList){
    return (testAppliance(recipe, inputList) + testUstensils(recipe, inputList) + testIngredients(recipe, inputList))==inputList.length;
}
