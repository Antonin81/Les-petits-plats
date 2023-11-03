let dictionnary=new Map();

function initIngredients(recipe){
    for (let ingredient of recipe.ingredients){
        ingredientName=ingredient.ingredient;
        if(!dictionnary.get(ingredientName)){
            dictionnary.set(ingredientName, [recipe.id]);
        } else {
            dictionnary.get(ingredientName).push(recipe.id);
        }
    }
}

function initAppliance(recipe){
    if(!dictionnary.get(recipe.appliance)){
        dictionnary.set(recipe.appliance, [recipe.id]);
    } else {
        dictionnary.get(recipe.appliance).push(recipe.id);
    }
}

function initUstensils(recipe){
    for (let ustensil of recipe.ustensils){
        if(!dictionnary.get(ustensil)){
            dictionnary.set(ustensil, [recipe.id]);
        } else {
            dictionnary.get(ustensil).push(recipe.id);
        }
    }
}

function initDictionnary(recipeList){
    for (let recipe of recipeList){
        initIngredients(recipe);
        initAppliance(recipe);
        initUstensils(recipe);
    }
}

function testPresence(element, arrayToTest) {
    let isInTheArray = false;
    for(let idToTest of arrayToTest){
        if(element==idToTest){
            isInTheArray=true;
        }
    }
    return isInTheArray;
}

function deleteRecipe(recipesToDisplay, recipeToTest){
    for (let i=0; i<recipesToDisplay.length; i++){
        if(recipesToDisplay[i]==recipeToTest){
            recipesToDisplay.splice(i,1);
        }
    }
}


function emptyRecipes(){
    document.getElementById("recipies").innerHTML="";
}

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

function searchRecipesToDisplay(inputList){
    let recipesToDisplay=[];
    for (let i=0; i<inputList.length; i++){
        if (i==0){
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

function research(inputList){
    emptyRecipes();
    let recipesToDisplay=searchRecipesToDisplay(inputList);
    fromFiltersCreateCardsDOM(dictionnary, recipesToDisplay);
}

//empties the options lists of the selects' DOM
function emptySelects(){
    document.querySelectorAll(".option-list").forEach(optionList=>{
        optionList.innerHTML="";
    });
}

//applies the search of the select input bar on the options list
function researchInSelects(){
    inputSelectHandler(ingredientsInput, ingredientsList, ingredientsSelect);
    inputSelectHandler(appliancesInput, appliancesList, appliancesSelect);
    inputSelectHandler(ustensilsInput, ustensilsList, ustensilsSelect);
}

function resetOptionLists(){
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
}

//creates the cards DOM according to string in the main search bar
function fromSearchCreateCardsDOM(recipesForDOM, text, inputList){

    let cardsDOM = "";
    resetOptionLists();
    dictionnary = new Map();
    let recipesCount = 0;
    let recipesToPutInDictionnary = [];

    for(let recipe of recipesForDOM){
        if(testText(recipe, text)){
            if(inputList.length == 0 || testPresence(recipe.id, searchRecipesToDisplay(inputList))){
                buildOptionLists(recipe);
                cardsDOM+=createCardDOM(recipe);
                recipesCount++;
            }
            recipesToPutInDictionnary.push(recipe);
        } 
    }

    initDictionnary(recipesToPutInDictionnary);

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
    emptySelects();
    createSelectsDOM();
    createOptionHandlers();
    researchInSelects();
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
        fromSearchCreateCardsDOM(recipes, text, inputList);
    } else {
        initDictionnary(recipe);
        //activates only if there was already a custom recipes display
        if(dictionnary.size<recipes.length){
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

function initAlgo(){
    initDictionnary(recipes);
}

initAlgo();