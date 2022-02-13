import React, { Component } from 'react';
import Section from '../Section';
import phonebookActions from '../../redux/phonebook/phonebook-actions';
import { connect } from 'react-redux';
import styles from './PhoneBookForm.module.scss';

class PhoneBookForm extends Component {

    state = {
        name: '',
        number: '',
    };
    
    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        const normalizedName = this.state.name.toLowerCase();
        const { name, number } = this.state;
        if(this.props.contacts.find(contact => contact.name.toLowerCase() === normalizedName)){
            this.reset();
            return alert(`${this.state.name} is already exist in phonebook`);
        } 
        this.props.onSubmit(name, number);
        this.reset();
    };
    
    reset = () => {
        this.setState({   
            name: '',
            number: '',
        });
    };

    render(){
        const { name, number } = this.state;
        return (
            <Section title="PhoneBook" classArr={['PhoneBookSection']}>
                <form className={styles.PhoneBookForm} onSubmit={this.handleSubmit}>
                <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onInput={this.handleChange}
                    />
                    <label htmlFor="number">Number</label>
                    <input
                        value={number}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onInput={this.handleChange}
                    />
                    <button type="submit" className="PhoneBookForm__button">
                        Save
                    </button>
                </form>
            </Section>
        )
    }
};


const getVisibleContacts = (allContacts, filter) =>{
    const normalizedFilter = filter.toLowerCase();
    return allContacts.filter(({ name }) => 
        name.toLowerCase().includes(normalizedFilter)
    );
};

const mapStateToProps = ({ phonebook: { contacts, filter } }) => ({
    contacts: getVisibleContacts(contacts, filter),
});

const mapDispatchToProps = dispatch => ({
    onSubmit: (name, number) => dispatch(phonebookActions.addContact(name, number)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PhoneBookForm);