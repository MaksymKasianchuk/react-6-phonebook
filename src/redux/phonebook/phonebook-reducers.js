import { createReducer, combineReducers  } from '@reduxjs/toolkit';
import actions from './phonebook-actions';

const contacts = createReducer([], {
    [actions.addContact]: (state, { payload }) => [...state, payload],
    [actions.deleteContact]: (state, { payload }) => state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
    [actions.changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({
    contacts, 
    filter,
});