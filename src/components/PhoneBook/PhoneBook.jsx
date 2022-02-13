import React, { Component } from 'react';
import Section from '../Section/Section';
import styles from './PhoneBook.module.scss';
import { connect } from 'react-redux';
import phonebookActions from '../../redux/phonebook/phonebook-actions';

class PhoneBook extends Component {
    render() {
        const { contacts } = this.props;
        return (
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
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneBook); 