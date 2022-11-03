// import React, { Component } from 'react'
import Form from './Form/Form.jsx'
import Contacts from './Contacts/Contacts.jsx';
import Filter from './Filter/Filter.jsx';
import { useState, useEffect } from 'react';



export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    JSON.parse(localStorage.getItem('contacts'));
  }, [contacts]);


  const formSubmitHandler = newContact => {
    setContacts(prevState => [...prevState, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(({ id }) => id !== contactId)
    );
  };

  const contactsName = contacts.map(contact => contact.name);

  return (
    <section>
      <Form onSubmit={formSubmitHandler} contactsName={contactsName} />

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter onFilterChange={changeFilter} filterContacts={filter} />
          <Contacts
            contactsList={getVisibleContacts()}
            onDeleteContact={deleteContact}
          />
        </>
      ) : (
        <p >You have no contacts</p>
      )}
    </section>
  );
}