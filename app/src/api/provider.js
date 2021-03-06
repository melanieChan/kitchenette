var api_url = 'http://localhost:5000/'

export const addItemToPantry = (token, ingredientData) => {
  return fetch(api_url + `add_to_pantry/`, {
    method: "POST",
    //credentials: "include",

    // send input data with token
    body: JSON.stringify({...ingredientData, token: token}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      // console.log('d',data);
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const getPantryItems = (token) => {
  return fetch(api_url + `get_pantry_items/`, {
    method: "POST",

    // request using token
    body: JSON.stringify({token: token}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      // console.log('d',data);
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

// removes an item from the user's pantry when the quantity falls to 0
export const deletePantryItem = (token, ingredientToDelete) => {
  return fetch(api_url + `delete_pantry_item/`, {
    method: "POST",
    body: JSON.stringify({...ingredientToDelete, token: token}), // send data to delete
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      // console.log('d',data);
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const searchRecipesByIngredients = (token, ingredientListQuery) => {
  return fetch(api_url + `search_by_ingredient_names/`, {
    method: "POST",
    body: JSON.stringify({ingredients: ingredientListQuery, token: token}), // send data to search
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    return response.json().then(function(data) {
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const saveRecipe = (token, recipeData) => {
  console.log(recipeData)
  return fetch(api_url + `save_recipe/`, {
    method: "POST",
    // send input data with token
    body: JSON.stringify({recipeData: recipeData, token: token}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const getSavedRecipes = (token) => {
  return fetch(api_url + `get_save_recipes/`, {
    method: "POST",
    body: JSON.stringify({token: token}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const updatePantryItemQuantity = (token, ingredientData) => {
  return fetch(api_url + `update_pantry_item_quantity/`, {
    method: "POST",
    body: JSON.stringify({ingredient_data: ingredientData, token: token}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      console.log('d',data);
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const cookRecipe = (token, recipeData) => {
  return fetch(api_url + `cook_recipe/`, {
    method: "POST",
    body: JSON.stringify({recipe_data: recipeData, token: token}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      console.log('d',data);
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const unsaveRecipe = (token, recipe_id) => {
  return fetch(api_url + `unsave_recipe/`, {
    method: "POST",
    body: JSON.stringify({recipe_id: recipe_id, token: token}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const loginAuth = (username, password) => {
  return fetch(api_url + `login/`, {
    method: "POST",
    body: JSON.stringify({username: username, password: password}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}

export const registerAuth = (username, password) => {
  return fetch(api_url + `register/`, {
    method: "POST",
    body: JSON.stringify({username: username, password: password}),
    cache: "no-cache",
    headers: new Headers({
      "content-type": "application/json"
    })
  })
  .then(function(response) {
    if (response.status !== 200) {
      console.log(`Error. Status code: ${response.status}`);
      return;
    }
    // get data and send it back
    return response.json().then(function(data) {
      return data
    });
  })
  .catch(function(error) {
    console.log("Fetch error: " + error);
  });
}
