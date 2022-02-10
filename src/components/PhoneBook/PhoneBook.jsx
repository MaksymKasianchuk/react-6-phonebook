import React, { Component } from 'react';
import Section from '../Section/Section';
import Filter from './Filter';
import PhoneBookForm from './PhoneBookForm';
import styles from './PhoneBook.module.scss';
import { connect } from 'react-redux';
import phonebookActions from '../../redux/phonebook/phonebook-actions';

class PhoneBook extends Component {

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

    render() {
        const { name, number } = this.state;
        const { contacts, filter } = this.props;
        return (
            <>
                <PhoneBookForm 
                    nameVal={name} 
                    numberval={number} 
                    handleChange={this.handleChange} 
                    handleSubmit={this.handleSubmit}
                    className={styles.PhoneBookForm}
                />
                <Filter 
                    value={filter} 
                    handleChangeFilter={this.changeFilter}
                    className={styles.Filter}
                />
                <Section title="Contacts" classArr={['PhoneBookSection']}>

                    {   contacts.length > 0 ?
                            <ul className={styles.Contacts}>
                                {   
                                    contacts.map(({id, name, number}) => (
                                        <li key={id}>
                                            <span className={styles.ContactsName}>
                                            {name} 
                                            </span>
                                            <span className={styles.ContactsNumber}>
                                            {number}
                                            </span>
                                            <button 
                                            type="button" 
                                            onClick={() => this.props.onDeleteContact(id)}
                                            className={styles.DeleteBtn}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        :
                            <p className={styles.Empty}>Nothing here! Please, add a contact!</p>
                    }
                </Section>
            </>
        );
    }
}

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
    onDeleteContact: id => dispatch(phonebookActions.deleteContact(id)),
    onSubmit: (name, number) => dispatch(phonebookActions.addContact(name, number)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook);