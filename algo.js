let recipesToFilter = [];

function fromFiltersCreateCardsDOM(recipesForDOM, inputList){
    let cardsDOM = "";
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
    
    let recipesCount = 0;

    recipesForDOM.forEach(recipe => {
        if(tests(recipe, inputList)){
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
            cardsDOM+=createCardDOM(recipe);
            recipesCount++;
        }        
    });

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
    createSelectsDOM();
    createOptionHandlers();
    inputSelectHandler(ingredientsInput, ingredientsList, ingredientsSelect);
    inputSelectHandler(appliancesInput, appliancesList, appliancesSelect);
    inputSelectHandler(ustensilsInput, ustensilsList, ustensilsSelect);
}

function fromSearchCreateCardsDOM(recipesForDOM, text, inputList){
    let cardsDOM = "";
    ingredientsList = [];
    appliancesList = [];
    ustensilsList = [];
    recipesToFilter = [];
    
    let recipesCount = 0;

    recipesForDOM.forEach(recipe => {
        if(testText(recipe, text)){
            if(inputList.length == 0 || tests(recipe, inputList)){
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
                cardsDOM+=createCardDOM(recipe);
                recipesCount++;
            }
            recipesToFilter.push(recipe);
        }        
    });

    document.getElementById("recipies").innerHTML=cardsDOM;
    createCountDOM(recipesCount);
}

function research(inputList){
    emptyRecipes();
    emptySelects();
    if(recipesToFilter.length==0){
        recipesToFilter = [...recipes];
    }
    fromFiltersCreateCardsDOM(recipesToFilter, inputList);
}

function emptyRecipes(){
    document.getElementById("recipies").innerHTML="";
}

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

function searchFromText(stringLength, text, inputList){
    if (stringLength>=3){
        fromSearchCreateCardsDOM(recipes, text, inputList);
        emptySelects();
        createSelectsDOM();
        createOptionHandlers();
        inputSelectHandler(ingredientsInput, ingredientsList, ingredientsSelect);
        inputSelectHandler(appliancesInput, appliancesList, appliancesSelect);
        inputSelectHandler(ustensilsInput, ustensilsList, ustensilsSelect);
    } else {
        if(recipesToFilter.length<recipes.length){
            recipesToFilter = [...recipes];
            if(inputList.length == 0){
                emptySelects();
                createCardsDOM(recipes);
                createSelectsDOM();
                createOptionHandlers();
                inputSelectHandler(ingredientsInput, ingredientsList, ingredientsSelect);
                inputSelectHandler(appliancesInput, appliancesList, appliancesSelect);
                inputSelectHandler(ustensilsInput, ustensilsList, ustensilsSelect);
            } else {
                research(inputList);
            }
        }
    }
}

function tests(recipe, inputList){
    return (testAppliance(recipe, inputList) + testUstensils(recipe, inputList) + testIngredients(recipe, inputList))==inputList.length;
}
