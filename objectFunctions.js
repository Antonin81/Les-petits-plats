function equalsArray(arr1, arr2){
    if(arr1.length == arr2.length){
        for (let i=0; i<arr1.length; i++){
            if(! arr1[i]==arr2[i]){
                return false;
            }
        }
        return true;
    }
    return false;
}

function equalsMap(map1, map2){
    for(let [key, val] of map1){
        if(!equalsArray(val, map2.get(key))){
            return false;
        }
    }
    return true;
}


function allRecipesInDictionnary(map){
    let list = [];
    for (let [key, vals] of map){
        for(let val of vals){
            if(!testPresence(val, list)){
                list.push(val);
            }
        }
    }
    return list;
}


function initIngredients(dictionnaryToFill, recipe){
    for (let ingredient of recipe.ingredients){
        ingredientName=ingredient.ingredient;
        if(!dictionnaryToFill.get(ingredientName)){
            dictionnaryToFill.set(ingredientName, [recipe.id]);
        } else {
            dictionnaryToFill.get(ingredientName).push(recipe.id);
        }
    }
}

function initAppliance(dictionnaryToFill, recipe){
    if(!dictionnaryToFill.get(recipe.appliance)){
        dictionnaryToFill.set(recipe.appliance, [recipe.id]);
    } else {
        dictionnaryToFill.get(recipe.appliance).push(recipe.id);
    }
}

function initUstensils(dictionnaryToFill, recipe){
    for (let ustensil of recipe.ustensils){
        if(!dictionnaryToFill.get(ustensil)){
            dictionnaryToFill.set(ustensil, [recipe.id]);
        } else {
            dictionnaryToFill.get(ustensil).push(recipe.id);
        }
    }
}

function initDictionnary(dictionnaryToFill, recipeList){
    for (let recipe of recipeList){
        initIngredients(dictionnaryToFill, recipe);
        initAppliance(dictionnaryToFill, recipe);
        initUstensils(dictionnaryToFill, recipe);
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