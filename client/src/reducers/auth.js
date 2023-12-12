import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../actions/types';


const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}


// Acest cod definește un reducer Redux care gestionează starea pentru funcționalitatea de autentificare într-o aplicație. Reducerul primește o stare curentă și o acțiune, iar în funcție de tipul acțiunii și încărcătură, returnează o nouă stare.

// Starea Inițială:
// token: Tokenul de autentificare preluat din stocarea locală (localStorage).
// isAuthenticated: O valoare booleană care indică dacă utilizatorul este autentificat sau nu.
// loading: O valoare booleană care indică dacă aplicația se află în proces de încărcare.
// user: Un obiect care conține datele utilizatorului autentificat.
// Reducer:
// Reducerul folosește un switch pentru a trata diferite tipuri de acțiuni. Acestea sunt constante importate din fișierul ../actions/types.

// USER_LOADED: Se actualizează starea cu datele utilizatorului autentificat, indicând că autentificarea a avut succes.

// REGISTER_SUCCESS și LOGIN_SUCCESS: Se salvează tokenul în stocarea locală și se actualizează starea cu datele utilizatorului și indicând că autentificarea a avut succes.

// REGISTER_FAIL, AUTH_ERROR, LOGIN_FAIL, LOGOUT: Se elimină tokenul din stocarea locală și se actualizează starea pentru a indica că utilizatorul nu mai este autentificat.

// default: În cazul în care tipul acțiunii nu este recunoscut, se returnează starea curentă neschimbată.

// Reducerul este exportat pentru a fi utilizat într-un store Redux și va fi apelat de către acesta în răspuns la acțiuni specifice pentru autentificare.