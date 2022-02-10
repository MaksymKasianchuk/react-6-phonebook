import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const addContact = createAction('phonebook/add',  (name, number) => ({
    payload: {
        id: nanoid(),
        name, 
        number,
    },
}));

const deleteContact = createAction('phonebook/delete');

const changeFilter = createAction('phonebook/changeFilter');

// eslint-disable-next-line import/no-anonymous-default-export
export default { addContact, deleteContact, changeFilter };