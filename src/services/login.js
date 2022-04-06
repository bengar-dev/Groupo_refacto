import { api } from '../config/api'

export function  getLogin(email, password) {

    const axios = require('axios').default

    let user = {
        email:email,
        password:password
    }

    return axios.post(api + '/api/user/login', user)
        .then(function (response) {
            return response.data
        })
        .catch(function (error){
            return false
        })

}