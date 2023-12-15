import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

//Acest cod definește o funcție redusă Redux care gestionează schimbările de stare pentru o listă de alerte.
// Reducătorul primește starea curentă și un obiect de acțiune și returnează o nouă stare pe baza tipului acțiunii și a încărcăturii.

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}