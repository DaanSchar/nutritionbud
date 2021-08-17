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
        .then( (response) => response.json )
        .then ( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const getMealById = (id) => {
    return fetch(url + '/meals/' + id.toString())
        .then( (response) => response.json() )
        .then( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

// INTAKE
export const getIntakeToday = () => {
    let headers = new Headers({ 'x-access-token': API.userToken})

    return fetch(url + '/intakes/today', { headers: headers })
        .then( (response) => response.json() )
        .then( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const addMealToIntake = (meal, portionSize) => {
    let headers = new Headers({
        'x-access-token': API.userToken,
        'Content-Type': 'application/json'
    })
    let body = {
        mealId: meal.publicId,
        portionSize: portionSize,
    }


    return fetch(url + '/intakes', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        })
        .then( (response) => response.json )
        .then ( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const deleteIntake = (intake) => {
    let headers = new Headers({ 'x-access-token': API.userToken})

    return fetch(url + '/intakes/today/' + intake.id, {
            headers: headers,
            method: 'DELETE',
        })
        .then( (response) => response.json )
        .then ( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const getMacros = () => {
    let headers = new Headers({ 'x-access-token': API.userToken})

    return fetch(url + '/intakes/today/macros',{ headers: headers })
        .then( (response) => response.json() )
        .then( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

