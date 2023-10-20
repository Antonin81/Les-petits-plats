function research(inputList){
    emptyRecipes();
    let recipesCards="";
    recipes.forEach(recipe => {
        if(tests(recipe, inputList)){
            console.log(recipe);
            recipesCards+=createCardDOM(recipe);
        }
    });
    document.getElementById("recipies").innerHTML=recipesCards;
}

function emptyRecipes(){
    document.getElementById("recipies").innerHTML="";
}

function testAppliance(recipe, inputList){
    return inputList.includes(recipe.appliance);
}

function testUstensils(recipe, inputList){
    let isAnUstensil = false;
    inputList.forEach(input => {
        if(recipe.ustensils.includes(input)){
            isAnUstensil=true;
        }
    });
    return isAnUstensil;
}

function testIngredients(recipe, inputList){
    let isAnIngredient = false;
    recipe.ingredients.forEach(ingredient => {
        if(inputList.includes(ingredient.ingredient)){
            isAnIngredient=true
        }
    });
    return isAnIngredient;
}

function tests(recipe, inputList){
    return testAppliance(recipe, inputList) || testUstensils(recipe, inputList) || testIngredients(recipe, inputList);
}
