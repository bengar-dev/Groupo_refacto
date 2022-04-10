import { api } from '../config/api'
const token = JSON.parse(localStorage.getItem('token'))
const axios = require('axios').default;

export function getComments() {
  return axios.get(api + '/api/post/cmt/all', {
      headers: {'Authorization' : 'Bearer ' + token.token}
  })
      .then(function(response){
          return response.data
      })
      .catch(function (error){
          return false
      })
}

export function postCmt(postid, comment) {

  let data = {
    userId: token.userId,
    msg: comment
  }

  return axios.post(api + '/api/post/' + postid + '/cmt', data, {
    headers: {'Authorization' : 'Bearer ' + token.token}
  })
    .then(function (response) {
      return true
    })
    .catch(function (error) {
        return false
    })
}
