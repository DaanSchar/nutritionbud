import base64 from "react-native-base64";
import * as API from "./API";
import * as storage from "../storage";

const url = API.baseUrl;

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
