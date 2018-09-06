/* External packages */
import React, { Component } from 'react';

/* Custom React Components*/
import ContactForm from '../components/contact_form';

class ContactNew extends Component {
    constructor(props) {
        super(props);
    }

    onContactCreated(contact) {
        this.props.history.push(`/contact/${contact.id}`);
    }

    render() {
        return (
            <ContactForm formType='new' onContactCreated={ (contact) => this.onContactCreated(contact) }/>
        );
    }
}

export default ContactNew;