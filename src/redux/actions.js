import axios from 'axios';
import config from '../config.js';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGOUT = 'LOGOUT';
const QUIZ_SUCCESS = 'QUIZ_SUCCESS';
const QUIZ_FAIL = 'QUIZ_FAIL';
const FETCHING = 'FETCHING';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
const ACKNOWLEDGEMENT = 'ACKNOWLEDGEMENT';
const NAME_SUCCESS = 'NAME_SUCCESS';
const NAME_FAILURE = 'NAME_FAILURE';
const SEARCHING_CELEB_DB = 'SEARCHING_CELEB_DB';
const ADD_QUIZ_SUCCESS = 'ADD_QUIZ_SUCCESS';
const ADD_QUIZ_FAIL = 'ADD_QUIZ_FAIL';
const ADD_DATA_FAIL = 'ADD_DATA_FAIL';

export { LOGIN_SUCCESS, LOGIN_FAIL, QUIZ_SUCCESS, FETCHING, QUIZ_FAIL, SIGNUP_SUCCESS, SIGNUP_FAILURE, ACKNOWLEDGEMENT, LOGOUT, NAME_SUCCESS, NAME_FAILURE, SEARCHING_CELEB_DB, ADD_QUIZ_SUCCESS, ADD_QUIZ_FAIL, ADD_DATA_FAIL };


export const login = (user, pass) => dispatch => {

  axios.post(`https://doa-dev-be.herokuapp.com/api/login`, { username: user, password: pass})
    .then(res => dispatch({

      type: LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
        username: user,
        id: res.data.user_id
      }

    }))
    .catch(err => dispatch({
      type: LOGIN_FAIL
    }));

}

export const signup = (user, pass) => dispatch => {

  axios.post(`https://doa-dev-be.herokuapp.com/api/register`, {username: user, password: pass})
    .then(res => dispatch({
      type: SIGNUP_SUCCESS
    }))
    .catch(err => dispatch({
      type: SIGNUP_FAILURE
    }));

}

export const logout = () => {

  return {

    type: LOGOUT

  }

}

export const fetchQuizzes = () => dispatch => {

  // fetching from backend will go here\

  dispatch({
    type: FETCHING
  });

  axios.get(`https://doa-dev-be.herokuapp.com/api/quizzes`)
    .then(res => dispatch({
      type: QUIZ_SUCCESS,
      payload: Array.from(res.data)
    }))
    .catch(err => dispatch({
      type: QUIZ_FAIL,
      payload: err
    }));

}

export const acknowledge = () => {

  return {

    type: ACKNOWLEDGEMENT

  }

}

export const loginToken = () => dispatch => {

  // check token on backend. Until implemented, token will always be accepted.

  dispatch({

    type: LOGIN_SUCCESS,
    payload: {

      token: localStorage.token,
      username: localStorage.username,
      id: localStorage.id

    }

  })

}

export const checkCeleb = (celebName, token) => dispatch => {

  dispatch({
    type: SEARCHING_CELEB_DB
  });

  const options = {
      headers: {
        Authorization: token,
      }
    }

  axios.post(`https://doa-dev-be.herokuapp.com/api/celebrity`, {name: celebName}, options)
    .then(res => dispatch({

      type: NAME_SUCCESS,
      payload: res.data

    }))
    .catch(err => dispatch({
      type: NAME_FAILURE
    }))

}

export const addQuiz = (name, quiz, token, id) => dispatch => {

  const options = {
      headers: {
        Authorization: token,
      }
    }

  axios.post(`https://doa-dev-be.herokuapp.com/api/user/${id}/quiz`, { name: name, user_id: id }, options)
    .then(res => {
      console.log(res.data);
      axios.post(`https://doa-dev-be.herokuapp.com/api/quiz/${res.data[0]}`, { celebId: quiz }, options)
        .then(res => dispatch({
          type: ADD_QUIZ_SUCCESS
        }))
        .catch(err => dispatch({
          type: ADD_DATA_FAIL
        }));

    })
    .catch(err => dispatch({
      type: ADD_QUIZ_FAIL
    }))

}
