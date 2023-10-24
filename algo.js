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

function initDictionnary(){
    for (let recipe of recipes){
        initIngredients(recipe);
        initAppliance(recipe);
        initUstensils(recipe);
    }
}

function testPresence(recipeToTest, arrayToTest) {
    let isInTheArray = false;
    for(let idToTest of arrayToTest){
        if(recipeToTest==idToTest){
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

function research(inputList){
    let recipesToDisplay=[];
    for (let i=0; i<inputList.length; i++){
        if (i==0){
            recipesToDisplay = dictionnary.get(inputList[i]);
        } else {
            let arrayToTest = dictionnary.get(inputList[i]);
            for (let recipeToTest of recipesToDisplay){
                if(!testPresence(recipeToTest, arrayToTest)){
                    deleteRecipe(recipesToDisplay, recipeToTest);
                }
            }
        }
    }
    console.log(recipesToDisplay);
}

function initAlgo(){
    initDictionnary();
    console.log(dictionnary);
}

initAlgo();