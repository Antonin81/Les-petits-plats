let recipesToFilter = [];

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
    recipes.forEach(recipe => {
        if(testText(recipe, text)){
            // recipesCards+=createCardDOM(recipe);
            // count++;
            console.log(recipe);
            recipesToFilter.push(recipe);
        }
    });
    console.log(recipesToFilter);
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
}

function tests(recipe, inputList){
    return (testAppliance(recipe, inputList) + testUstensils(recipe, inputList) + testIngredients(recipe, inputList))==inputList.length;
}
