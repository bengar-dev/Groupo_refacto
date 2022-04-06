import { api } from '../config/api'

export function getPosts() {

    const token = JSON.parse(localStorage.getItem('token'))

    const axios = require('axios').default

    return axios.get(api + '/api/post/', {
        headers: {'Authorization' : 'Bearer ' + token.token}
    })
        .then(function(response){
            return response.data
        })
        .catch(function (error){
            return false
        })

}