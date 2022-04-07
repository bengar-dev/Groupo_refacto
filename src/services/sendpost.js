import { api } from '../config/api'

export function sendPost(content, img) {
    
    const axios = require('axios').default
    const token = JSON.parse(localStorage.getItem('token'))

    const data = new FormData();
    data.append('msg', content)
    data.append('img', img)
    data.append('userId', token.userId)

    return axios.post(api + '/api/post', data, {
        headers: {
            'Authorization' : 'Bearer ' + token.token,
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    })
        .then(function (response) {
            return response.data.data.id
        })
        .catch(function (error) {
            console.log(error)
            return false
        })

}