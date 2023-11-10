let dictionnary=new Map();
let fullDictionnary=new Map();

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


function searchRecipesToDisplay(inputList){
    let recipesToDisplay=[];
    if(inputList.length == 0){
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
    unShowAbsenceMessage();
    let recipesToDisplay=searchRecipesToDisplay(inputList);
    fromFiltersCreateCardsDOM(recipes, recipesToDisplay);
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

    if(recipesCount==0){
        showAbsenceMessage();
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
        if(!equalsMap(dictionnary, fullDictionnary)){
            dictionnary = new Map();
            initDictionnary(dictionnary, recipes);
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

function initAlgo(){
    initDictionnary(dictionnary, recipes);
    initDictionnary(fullDictionnary, recipes);
}

initAlgo();

//RECUPERER LE NOMBRE DE RECETTES AFFICHEES POUR SAVOIR QUAND LANCER LA RECHERCHE ET DONC OPTIMISER ?