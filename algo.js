function research(inputList){
    emptyRecipes();
    let recipesCards="";
    let count=0;
    recipes.forEach(recipe => {
        if(tests(recipe, inputList)){
            recipesCards+=createCardDOM(recipe);
            count++;
        }
    });
    document.getElementById("recipies").innerHTML=recipesCards;
    createCountDOM(count);
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

function tests(recipe, inputList){
    return (testAppliance(recipe, inputList) + testUstensils(recipe, inputList) + testIngredients(recipe, inputList))==inputList.length;
}
