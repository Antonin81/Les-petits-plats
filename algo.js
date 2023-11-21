let dictionnary=new Map();
let fullDictionnary=new Map();

//empties the sections filled by recipes
function emptyRecipes(){
    document.getElementById("recipies").innerHTML="";
}

//empties the list of options in the selects
function resetOptionLists(){
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
}

//sets the lists of the items that will be in the selects' options
function buildOptionLists(recipe){
    for(let ingredient of recipe.ingredients){
        let ingredientName=ingredient.ingredient.toLowerCase();
        if(!testPresence(ingredientName,ingredientsList)){
            ingredientsList.push(ingredientName);
        }
    }
    for(let ustensil of recipe.ustensils){
        let ustensilName = ustensil.toLowerCase();
        if(!testPresence(ustensilName, ustensilsList)){
            ustensilsList.push(ustensilName);
        }
    }
    let applianceName = recipe.appliance.toLowerCase();
    if(!testPresence(applianceName, appliancesList)){
        appliancesList.push(applianceName);
    }
}

//creates the cards DOM according to the selected filters
function fromFiltersCreateCardsDOM(recipesForDOM, recipesToDisplay){
    let cardsDOM = "";
    resetOptionLists();
    let recipesCount = 0;

    for(let recipe of recipesForDOM){
        if(testPresence(recipe.id, recipesToDisplay)){
            buildOptionLists(recipe);
            cardsDOM+=createCardDOM(recipe);
            recipesCount++;
        }  
    }

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
    emptySelects();
    createSelectsDOM();
    createOptionHandlers();
    researchInSelects();
}

//creates a list of recipes that must be displayed according to a list of filters
function searchRecipesToDisplay(inputList){
    let recipesToDisplay=[];
    if(inputList.length === 0){
        if(equalsMap(dictionnary, fullDictionnary)){
            for(let i=0; i<recipes.length; i++){
                recipesToDisplay.push(i+1);
            }
            return recipesToDisplay;
        } else {
            return allRecipesInDictionnary(dictionnary);
        }
    }
    for (let i=0; i<inputList.length; i++){
        if (i===0){
            recipesToDisplay = [...dictionnary.get(inputList[i])];
        } else {
            let arrayToTest = [...dictionnary.get(inputList[i])];
            for (let recipeToTest of recipesToDisplay){
                if(!testPresence(recipeToTest, arrayToTest)){
                    deleteRecipe(recipesToDisplay, recipeToTest);
                }
            }
        }
    }
    return recipesToDisplay;
}

//initiates the research by filters
function research(inputList){
    emptyRecipes();
    unShowAbsenceMessage();
    let recipesToDisplay=searchRecipesToDisplay(inputList);
    fromFiltersCreateCardsDOM(recipes, recipesToDisplay);
}

//empties the options lists of the selects' DOM
function emptySelects(){
    for(let optionList of document.querySelectorAll(".option-list")){
        optionList.innerHTML="";
    }
}

//applies the search of the select input bar on the options list
function researchInSelects(){
    inputSelectHandler(ingredientsInput, ingredientsList, ingredientsSelect);
    inputSelectHandler(appliancesInput, appliancesList, appliancesSelect);
    inputSelectHandler(ustensilsInput, ustensilsList, ustensilsSelect);
}

//creates the cards DOM according to string in the main search bar
function fromSearchCreateCardsDOM(recipesForDOM, text, inputList){

    let cardsDOM = "";
    resetOptionLists();
    let recipesCount = 0;
    let recipesToPutInDictionnary = [];
    for(let recipe of recipesForDOM){
        if(testText(recipe, text)){
            if(inputList.length === 0 || testPresence(recipe.id, searchRecipesToDisplay(inputList))){
                buildOptionLists(recipe);
                cardsDOM+=createCardDOM(recipe);
                recipesCount++;
            }
            recipesToPutInDictionnary.push(recipe);
        } 
    }

    if(recipesCount===0){
        showAbsenceMessage(text);
    }

    dictionnary = new Map();
    initDictionnary(dictionnary, recipesToPutInDictionnary);

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
    emptySelects();
    createSelectsDOM();
    createOptionHandlers();
    researchInSelects();
}

//tests the presence of a string in the title, the description or the ingredients of a recipe
function testText(recipe, text){

    if(testPresenceString(text,recipe.name)){
        return true;
    }

    if(testPresenceString(text, recipe.description)){
        return true;
    }

    let isInIngredients=false;

    for(let ingredient of recipe.ingredients){
        if(testPresenceString(text, ingredient.ingredient)){
            isInIngredients = true;
        }
    }

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
        if(!equalsMap(dictionnary, fullDictionnary)){
            dictionnary = new Map();
            initDictionnary(dictionnary, recipes);
            if(inputList.length === 0){
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

function initAlgo(){
    initDictionnary(dictionnary, recipes);
    initDictionnary(fullDictionnary, recipes);
}

initAlgo();