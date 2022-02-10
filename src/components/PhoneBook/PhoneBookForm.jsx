import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';

const PhoneBookForm = ({nameVal, numberval, handleChange, handleSubmit, className}) => {
    return (
        <Section title="PhoneBook" classArr={['PhoneBookSection']}>
            <form className={className} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
                <input
                    value={nameVal}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    onInput={handleChange}
                />
                <label htmlFor="number">Number</label>
                <input
                    value={numberval}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    onInput={handleChange}
                />
                <button type="submit" className="PhoneBookForm__button">
                    Save
                </button>
            </form>
        </Section>
    );
};

PhoneBookForm.propTypes = {
    nameVal: PropTypes.string.isRequired,
    numberval: PropTypes.string.isRequired, 
    handleChange: PropTypes.func.isRequired, 
    handleSubmit: PropTypes.func.isRequired,
};

export default PhoneBookForm;