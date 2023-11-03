let recipesToFilter = [];

function fromFiltersCreateCardsDOM(recipesForDOM, inputList){
    let cardsDOM = "";
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
    
    let recipesCount = 0;

    recipesForDOM.forEach(recipe => {
        if(tests(recipe, inputList)){
            cardsDOM+=createCardDOM(recipe);
            recipesCount++;
        }        
    });

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
}

function fromSearchCreateCardsDOM(recipesForDOM, text){
    let cardsDOM = "";
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
    recipesToFilter = [];
    
    let recipesCount = 0;

    recipesForDOM.forEach(recipe => {
        if(testText(recipe, text)){
            cardsDOM+=createCardDOM(recipe);
            recipesToFilter.push(recipe);
            recipesCount++;
        }        
    });

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
}

function research(inputList){
    emptyRecipes();
    fromFiltersCreateCardsDOM(recipesToFilter, inputList);
}

function emptyRecipes(){
    document.getElementById("recipies").innerHTML="";
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

function searchFromText(e, text){
    fromSearchCreateCardsDOM(recipes, text);
}

function tests(recipe, inputList){
    return (testAppliance(recipe, inputList) + testUstensils(recipe, inputList) + testIngredients(recipe, inputList))==inputList.length;
}
