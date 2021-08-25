import * as storage from "../storage";
import * as API from "./API";

const url = API.baseUrl;

export const getIntakeToday = async () => {
    let token = await storage.getUserToken()
    let headers = new Headers({ 'x-access-token': token})

    return fetch(url + '/intakes/today', { headers: headers })
        .then( (response) => response.json() )
        .then( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const addMealToIntake = async (meal, portionSize) => {
    let headers = new Headers({
        'x-access-token': await storage.getUserToken(),
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
        .then( (response) => { return response.json() })
        .catch( (error) => console.warn(error));
}

export const deleteIntake = async (intake) => {
    let headers = new Headers({ 'x-access-token': await storage.getUserToken()})

    return fetch(url + '/intakes/today/' + intake.id, {
        headers: headers,
        method: 'DELETE',
    })
        .then( (response) => { return response.json() })
        .catch( (error) => console.warn(error));
}

export const getMacrosToday = async () => {
    let headers = new Headers({ 'x-access-token': await storage.getUserToken()})

    return fetch(url + '/intakes/macros/today',{ headers: headers })
        .then( (response) => { return response.json() })
        .catch( (error) => console.warn(error));
}

export const getMacros = async () => {
    let headers = new Headers({ 'x-access-token': await storage.getUserToken()})

    return fetch(url + '/intakes/macros',{ headers: headers })
        .then( (response) => { return response.json() })
        .catch( (error) => console.warn(error));
}
