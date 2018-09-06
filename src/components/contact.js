/* External packages */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* Redux Action Creators */
import { getContact, deleteContact } from '../actions';

/* Custom React Components */
import ContactForm from '../components/contact_form';

// Contact React class that has multiple views. One when viewing a contact, the other when editing said contact.
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
    }
    componentDidMount() {
        // Props.match object is provided to us directly by react router when this React Component
        // is provided to a React Route Component.
        // Params is an object that lists all the wildcard tokens that exist within the given URL.
        const { id } = this.props.match.params;
        this.props.getContact(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deleteContact(id, () => {
            // Props.history object is provided to us directly by react router when this React Component
            // is provided to a React Route Component. The route pushed is the route we navigate to.
            this.props.history.push('/');
        });
    }

    onBackToContactsClick() {
        this.props.history.push('/');
    }

    onContactCreated() {
        this.setState({ editMode: false });
    }

    onContactSaved() {
        this.setState({ editMode: false });
    }
    
    onEditCanceled() {
        this.setState({ editMode: false });
    }

    enterEditMode() {
        this.setState({ editMode: true });
    }

    render() {
        const { contact } = this.props;
        const { editMode } = this.state;
        if (!contact) {
            return <div>Loading...</div>;
        }

        const { homeAddress, linkedIn, twitter, facebook, instagram } = contact;
        const googleMapsHomeAddressURL = `http://maps.google.com/?q=${homeAddress}`;
        const linkedInProfileURL = `https://www.linkedin.com/in/${linkedIn}`;
        const twitterProfileURL = `https://twitter.com/${twitter}`;
        const facebookProfileURL = `https://www.facebook.com/${facebook}`;
        const instagramProfileURL = `https://www.instagram.com/${instagram}`;

        return (
            <div>
                <div>
                    <Link to="/">Back To Contacts</Link>
                </div>
                <div className="view-contact-container">
                        { editMode && 
                            <ContactForm 
                                contact={contact}
                                formType='edit'
                                onContactSaved={ () => this.onContactSaved() }
                                onEditCanceled={ () => this.onEditCanceled() }
                                onContactCreated={ () => this.onContactCreated() } /> }
                        
                        { !editMode &&
                            <div>
                                <div className="text-center">
                                    <h3 className="view-contact-name">{contact.firstName} {contact.lastName}</h3>
                                </div>
                            
                                <h6><b>Company: </b>{contact.company}</h6>
                                <h6><b>Personal Email: </b>
                                    <a href={"mailto:" + contact.personalEmail}>{contact.personalEmail}</a>
                                </h6>
                                <h6><b>Work Email: </b> 
                                    <a href={"mailto:" + contact.workEmail}>{contact.workEmail}</a>
                                </h6>
                                <h6><b>Mobile #: </b>
                                    <a href={"tel:" + contact.mobileNumber}>{contact.mobileNumber}</a>
                                </h6>
                                <h6><b>Work #: </b>
                                    <a href={"tel:" + contact.workNumber}>{contact.workNumber}</a>
                                </h6>
                                <h6><b>Home Address: </b>
                                    <a href={googleMapsHomeAddressURL}>{homeAddress}</a>
                                </h6>
                                <h6><b>LinkedIn: </b>
                                    <a href={linkedInProfileURL}>{linkedIn}</a>
                                </h6>
                                <h6><b>Twitter: </b>
                                    <a href={twitterProfileURL}>{twitter}</a>
                                </h6>
                                <h6><b>Facebook: </b>
                                    <a href={facebookProfileURL}>{facebook}</a>
                                </h6>
                                <h6><b>Instagram: </b>
                                    <a href={instagramProfileURL}>{instagram}</a>
                                </h6>
                                <div className="view-contact-action-btn-group">
                                    <button
                                        className="btn btn-primary contact-action-edit-btn"
                                        onClick={ () => this.enterEditMode() }
                                    >
                                        Edit Contact
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={this.onDeleteClick.bind(this)}
                                    >
                                        Delete Contact
                                    </button>
                                </div>
                            </div>
                        }
                </div>
            </div>
        );
    }
}

// The ownProps argument is the props object that is going to be given to this PostsShow component.
function mapStateToProps({ contacts }, ownProps) {
    return { contact: contacts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { getContact, deleteContact })(Contact);