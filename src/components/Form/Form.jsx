import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Form.module.css'

export default function Form({ onSubmit, contactsName }) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    // const nameInputId = nanoid();
    // const numberInputId = nanoid();

    const handleInputChange = event => {
        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    };

    const handleSubmit = event => {
        event.preventDefault();

        const filterName = contactsName.some(
            contactName => contactName.toLowerCase() === name.toLowerCase()
        );

        if (filterName) {
            return alert('You already have a contact with that name');
        }

        const newContact = {
            id: nanoid(),
            name,
            number,
        };

        onSubmit(newContact);
        reset();
    };

    const reset = () => {
        setName('');
        setNumber('');
    };


    return (
        <div className={css.blok__form}>
            <form className={css.form} onSubmit={handleSubmit}>
                <label className={css.label}>
                    Name
                    <input
                        className={css.input}
                        onChange={handleInputChange}
                        value={name}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>
                <label>
                    Number
                    <input
                        className={css.input}
                        onChange={handleInputChange}
                        value={number}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
                <button type="submit">App contacts</button>
            </form>
        </div>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contactsName: PropTypes.arrayOf(PropTypes.string.isRequired),
};

