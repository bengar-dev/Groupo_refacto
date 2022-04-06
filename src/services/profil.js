import { api } from '../config/api'

export function getUser(userId, token) {

    const axios = require('axios').default

    return axios.get(api + '/api/user/' + userId, {
        headers: {'Authorization' : 'Bearer ' + token}
    })
        .then(function (response){
            return response.data.user
        })
        .catch(function (error){
            return false
        })

}