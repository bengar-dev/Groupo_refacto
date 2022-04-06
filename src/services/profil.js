import { api } from '../config/api'

export function getUser(userId, token) {

    const axios = require('axios').default

    return axios.get(api + '/api/user/' + userId, {
        headers: {'Authorization' : 'Bearer ' + token}
    })
        .then(function (response){
            console.log(response)
            return response
        })
        .catch(function (error){
            return false
        })

}