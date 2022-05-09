export const addItemToPantry = (token, ingredientData) => {
  return fetch(`http://localhost:5000/add_to_pantry/`, {
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
  return fetch(`http://localhost:5000/get_pantry_items/`, {
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
  return fetch(`http://localhost:5000/delete_pantry_item/`, {
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
  return fetch(`http://localhost:5000/search_by_ingredient_names/`, {
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
