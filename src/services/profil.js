import { api } from '../config/api'

const token = JSON.parse(localStorage.getItem('token'))
const axios = require('axios').default

export function getUser(userId, token) {

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

export function editUser(firstname, lastname, img) {

    const data = new FormData()
    data.append('firstname', firstname)
    data.append('lastname', lastname)
    data.append('userId', token.userId)
    
    if(typeof img === 'object') {
        data.append('img', img)
    }

    return axios.put(api + '/api/user/' + token.userId, data, {
        headers: {
            'Authorization' : 'Bearer ' + token.token,
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
         }
    })
        .then(function (response) {
            return true
        })
        .catch(function (error) {
            return false
        })

}

export function deleteUser(pass) {

    return axios.delete(api + '/api/user/' + token.userId, {
        headers: {'Authorization' : 'Bearer ' + token.token},
        data: {password: pass}
    })
        .then(function (response) {
            return true
        })
        .catch(function (error) {
            return false
        })
}