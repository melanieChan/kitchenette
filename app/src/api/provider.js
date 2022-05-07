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
