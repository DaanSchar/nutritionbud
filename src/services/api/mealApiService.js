import * as API from "./API";

const url = API.baseUrl;

export const getAllMeals = () => {
    return fetch(url + '/meals')
        .then( (response) => response.json() )
        .then( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const createMeal = (meal) => {
    return fetch(url + '/meals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(meal),
        })
        .then( (response) => response.json() )
        .then ( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const getMealById = (id) => {
    return fetch(url + '/meals/' + id.toString())
        .then( (response) => response.json() )
        .then( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}
