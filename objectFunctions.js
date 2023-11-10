//equlity test between two arrays
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

//equlity test between two maps
function equalsMap(map1, map2){
    if(map1.size!=map2.size){
        return false;
    }
    for(let [key, val] of map1){
        if(!equalsArray(val, map2.get(key))){
            return false;
        }
    }
    return true;
}

//fills an array with all the values that are in a map
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

//puts all the ingredients needed in a given map from a recipe
function initIngredients(dictionnaryToFill, recipe){
    for (let ingredient of recipe.ingredients){
        ingredientName=ingredient.ingredient.toLowerCase();
        if(!dictionnaryToFill.get(ingredientName)){
            dictionnaryToFill.set(ingredientName, [recipe.id]);
        } else {
            dictionnaryToFill.get(ingredientName).push(recipe.id);
        }
    }
}

//puts the appliance needed in a given map from a recipe
function initAppliance(dictionnaryToFill, recipe){
    let applianceName = recipe.appliance.toLowerCase();
    if(!dictionnaryToFill.get(applianceName)){
        dictionnaryToFill.set(applianceName, [recipe.id]);
    } else {
        dictionnaryToFill.get(applianceName).push(recipe.id);
    }
}

//puts all the ustensils needed in a given map from a recipe
function initUstensils(dictionnaryToFill, recipe){
    for (let ustensil of recipe.ustensils){
        let ustensilName = ustensil.toLowerCase();
        if(!dictionnaryToFill.get(ustensilName)){
            dictionnaryToFill.set(ustensilName, [recipe.id]);
        } else {
            dictionnaryToFill.get(ustensilName).push(recipe.id);
        }
    }
}

//fills a map with the elements of a given array
function initDictionnary(dictionnaryToFill, recipeList){
    for (let recipe of recipeList){
        initIngredients(dictionnaryToFill, recipe);
        initAppliance(dictionnaryToFill, recipe);
        initUstensils(dictionnaryToFill, recipe);
    }
}

//tests the presence of an element in an array
function testPresence(element, arrayToTest) {
    let isInTheArray = false;
    for(let idToTest of arrayToTest){
        if(element==idToTest){
            isInTheArray=true;
        }
    }
    return isInTheArray;
}

//deletes an element in an array
function deleteRecipe(recipesToDisplay, recipeToTest){
    for (let i=0; i<recipesToDisplay.length; i++){
        if(recipesToDisplay[i]==recipeToTest){
            recipesToDisplay.splice(i,1);
        }
    }
}

//tests the presence of a string into another string
function testPresenceString(stringToFind, stringToFindIn){
    let stringToFindLength = stringToFind.length;
    let stringToFindInLength = stringToFindIn.length;
    if(!(stringToFindLength > stringToFindInLength)){
        for (let i=0; i<stringToFindInLength; i++){
            if(stringToFindIn[i] == stringToFind[0]){
                let wordToTest = subString(stringToFindIn, i, i+stringToFindLength)
                if(stringToFind==wordToTest){
                    return true;
                }
            }
        }
    }
    return false;
}

//cuts a section of a string using given indexes 
function subString(string, indexStart, indexEnd){
    let stringBuilder = "";
    for(let i=indexStart; i<indexEnd; i++){
        stringBuilder+=string[i];
    }
    return stringBuilder;
}