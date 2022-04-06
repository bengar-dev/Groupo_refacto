import {api} from '../config/api'

export function getRegister(email, password, firstname, lastname) {

    const axios = require('axios').default

    let user = {
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname
    }

    console.log(user)

    return axios.post(api + '/api/user/signup', user)
        .then(function (response) {
            console.log(response)
            return true
        })
        .catch(function (error) {
            console.log(error.message)
            return false
        })

}