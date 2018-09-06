/* External packages */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/* Redux Action Creators */
import { getContacts } from '../actions/';

class Contacts extends Component {
    // React lifecycle method that is automatically called by React when this component first shows up on the DOM.
    // This is ideal for something we want to do once, when the component first shows up.
    componentDidMount() {
        this.props.getContacts();
    }

    renderContacts() {
       return  _.map(this.props.contacts, contact => {
           return (
                <li 
                    className="list-group-item contact-list-item"
                    key={contact.id}
                    onClick={ () => this.props.history.push(`/contact/${contact.id}`) }>
                    {contact.firstName} {contact.lastName}
               </li>
           )
       })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-7">
                        <h3 className="">Contacts</h3>
                    </div>
                    <div className="col-5 text-right">
                        <Link className="btn btn-primary" to="/contact/new">
                            Add A Contact
                        </Link>
                    </div>
                </div>
                <div className="row contact-list">
                    <div className="col-12">
                        <ul className="list-group">
                            {this.renderContacts()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { contacts: state.contacts };
}

// Here we are not specifying a mapDispatchToProps function as the second
// argument for the connect method. But in doing this the Component
// still has access to a getContacts property on it's props.

export default connect(mapStateToProps, { getContacts })(Contacts);