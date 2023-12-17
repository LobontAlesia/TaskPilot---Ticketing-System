//axios este un client HTTP bazat pe promisiuni pentru browser și node.js
import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_PROGRAMMING_LANGUAGES_FAIL,
  UPDATE_PROGRAMMING_LANGUAGES_SUCCESS,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User 

//verifică dacă un token de utilizator este stocat în stocarea locală și îl setează ca antet de autorizare pentru viitoarele solicitări API.
// Apoi trimite o solicitare GET către /api/auth pentru a prelua datele utilizatorului și declanșează o acțiune USER_LOADED cu datele preluate.
// În caz de eroare, declanșează o acțiune AUTH_ERROR.
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User

// trimite o solicitare POST la /api/users cu numele, adresa de e-mail și parola utilizatorului.
// Dacă este înregistrat cu succes, declanșează o acțiune REGISTER_SUCCESS și o acțiune USER_LOADED cu datele utilizatorului.
// În caz de eroare, declanșează o acțiune REGISTER_FAIL.
export const register = ({ name, email, password, programmingLanguages }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password, programmingLanguages });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // Încarcă utilizatorul cu limbajele de programare înregistrate
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
// trimite o solicitare POST la /api/auth cu adresa de e-mail și parola utilizatorului.
// Dacă este înregistrat cu succes, declanșează o acțiune LOGIN_SUCCESS și o acțiune USER_LOADED cu datele utilizatorului.
// În caz de eroare, declanșează o acțiune LOGIN_FAIL.
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
// declanșează o acțiune LOGOUT
// șterge toate datele utilizatorului din stocarea locală
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};

// acțiune pentru a actualiza limbajele de programare în baza de date
export const updateProgrammingLanguages = (programmingLanguages) => async (dispatch) => {
  try {
    // efectuează cererea API pentru a actualiza limbajele de programare în baza de date
    // utilizează axios sau orice altă metodă dorită
    // ...

    dispatch({
      type: UPDATE_PROGRAMMING_LANGUAGES_SUCCESS,
      payload: programmingLanguages,
    });
  } catch (err) {
    // în caz de eroare, poți declanșa o acțiune de eroare
    dispatch({
      type: UPDATE_PROGRAMMING_LANGUAGES_FAIL,
      payload: err,
    });
  }
};