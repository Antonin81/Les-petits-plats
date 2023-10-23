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
    return inputList.includes(recipe.appliance) ? 1 : 0;
}

function testUstensils(recipe, inputList){
    let nbInputsVerified = 0;
    for(let input of inputList){
        if(recipe.ustensils.includes(input)){
            nbInputsVerified++;
        }
    }
    return nbInputsVerified;
}

function testIngredients(recipe, inputList){
    let nbInputsVerified = 0;
    for(let ingredient of recipe.ingredients){
        if(inputList.includes(ingredient.ingredient)){
            nbInputsVerified++;
        }
    }
    return nbInputsVerified;
}

function tests(recipe, inputList){
    return (testAppliance(recipe, inputList) + testUstensils(recipe, inputList) + testIngredients(recipe, inputList))==inputList.length;
}
