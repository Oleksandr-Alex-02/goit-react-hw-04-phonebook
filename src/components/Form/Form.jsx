import React, { Component } from 'react'
import PropTypes from 'prop-types'

import css from './Form.module.css'

export default class Form extends Component {
    state = {
        name: '',
        number: ''
    }

    handleInputChange = evt => {
        const { name, value } = evt.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = evt => {
        evt.preventDefault();

        const { name, value } = evt.target;
        this.setState({ [name]: value });
        this.props.onSubmit(this.state)
        this.reset()
    };

    reset = () => {
        this.setState({
            name: '',
            number: '',
        })
    }

    render() {
        return (
            <div className={css.blok__form}>
                <form className={css.form} onSubmit={this.handleSubmit}>
                    <label className={css.label}>
                        Name
                        <input
                            className={css.input}
                            onChange={this.handleInputChange}
                            value={this.state.name}
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
                            onChange={this.handleInputChange}
                            value={this.state.number}
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
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired
}