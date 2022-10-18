import React, { Component } from 'react'
import { nanoid } from 'nanoid';
import Form from './Form/Form.jsx'
import Contacts from './Contacts/Contacts.jsx';
import Filter from './Filter/Filter.jsx';


class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  onSubmit = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  }

  contackFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  getContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.includes(filter)
    );
  };

  remoteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  render() {
    const { contacts, filter } = this.state

    return (
      <section>
        <Form onSubmit={this.onSubmit} />
        <h2>Contacts</h2>

        {contacts.length > 0 ? (
          <>
            <Filter
              contackFilter={this.contackFilter}
              filter={filter}
            />
            <Contacts
              contactsList={this.getContacts()}
              remoteContact={this.remoteContact}
            />
          </>
        ) : (<p>You have no contacts</p>)
        }
      </section>
    );
  }
}


export default App;