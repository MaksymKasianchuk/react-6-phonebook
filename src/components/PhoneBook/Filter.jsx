import React from 'react';
import Section from '../Section';
import { connect } from 'react-redux';
import phonebookActions from '../../redux/phonebook/phonebook-actions';

const Filter = ({value, onChange, className}) => {
   
    return (
        <Section title="Filter" classArr={['PhoneBookSection']}>
        <input
            type="text"
            name={value}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            onChange={onChange}
            className={className}
        />
    </Section>
    );
    
};

const mapStateToProps = state => ({
    value: state.phonebook.filter,
});
  
const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(phonebookActions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);