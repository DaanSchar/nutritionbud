import * as API from "./API";
import base64 from "react-native-base64";
import * as storage from "../storage";

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

// INTAKE
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
        .then( (response) => response.json )
        .then ( (responseData) => {
            return responseData;
        })
        .catch( (error) => console.warn(error));
}

export const deleteIntake = async (intake) => {
    let headers = new Headers({ 'x-access-token': await storage.getUserToken()})

    return fetch(url + '/intakes/today/' + intake.id, {
            headers: headers,
            method: 'DELETE',
        })
        .then( (response) => response.json() )
        .then ( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const getMacrosToday = async () => {
    let headers = new Headers({ 'x-access-token': await storage.getUserToken()})

    return fetch(url + '/intakes/macros/today',{ headers: headers })
        .then( (response) => response.json() )
        .then( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}

export const getMacros = async () => {
    let headers = new Headers({ 'x-access-token': await storage.getUserToken()})

    return fetch(url + '/intakes/macros',{ headers: headers })
        .then( (response) => response.json() )
        .then( (responseData) => { return responseData; })
        .catch( (error) => console.warn(error));
}


export const login = async(username, password) => {
    let headers = new Headers()
    headers.set('Authorization', 'Basic ' + base64.encode(username.toLowerCase() + ":" + password));

    return fetch(url + '/users/login',{ headers: headers })
        .then( async (response) => {
            return await response.json()
        })
        .catch( (error) => console.warn(error));
}

export const register = (email, password, firstName, lastName) => {

    let body = {
        email: email.toLowerCase(),
        password: password,
        firstName: firstName,
        lastName: lastName,
    };

    return fetch(url + '/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)})
        .then(async response => {
            return {
                ok: await response.ok,
                json: await response.json(),
            }
        })
        .catch(error => console.log(error))
}

export const verifyToken = async () => {
    let headers = new Headers({'x-access-token': await storage.getUserToken()})

    return fetch(url + '/users/login/verify', { headers: headers})
        .then(response => {
            if (response.ok)
                return true;
            else
                return false;
        })
        .catch(error => console.warn(error))
}
