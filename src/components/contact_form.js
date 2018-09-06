/* External packages */
import React, { Component } from 'react';

// reduxForm is a function that is very similar to the connect helper we use from react-redux. 
// It allows this component to communicate with the formsReducer.

// The Field Component is used to specify an input within a form.
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/* Redux Action Creators */
import { createContact, updateContact } from '../actions';

class ContactForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // initialize is added to props by way of the reduxForm method that wraps this component.
        // This pre-populates the form with values.
        if (this.props.formType === 'edit') {
            this.props.initialize(this.props.contact);
        }
    }

    // This method returns JSX that represents an input field used by a React Field component.
    // The field parameter contains form input properties and event handlers.
    renderField(field) {
        // The meta object is automatically added to the field object by the validate method written further down the file
        const { meta: { touched, error } } = field;
        const classNameForInput = `form-control ${touched && error ? 'form-input-error-highlight' : ''}`;

        return (
            <div className="form-row">
                <div className="col-2">
                    <label className="col-form-label"><b>{field.label}</b></label>
                </div>
                <div className="col-4">
                    <input className={classNameForInput}
                        type="text"
                        // The input object contains event handlers (onChange, onBlur, onFocus).
                        // This removes the need to specify onChange, onFocus and onBlur handlers, to name a few.
                        {...field.input}
                    />
                    {/* Only show the error if the input has been 'touched' */}
                    <div className="form-input-error-message">
                        {touched ? error: ''}
                    </div>
                </div>
            </div>
        )
    }

    // This method takes a form's values and either saves them as a new contact or updates an existing contact.
    onSubmit(values) {
        if (this.props.formType === 'edit') {
            const { id } = this.props.contact;
            this.props.updateContact(id, values, () => {
                this.props.onContactSaved();
            });
        } else {
            this.props.createContact(values, (response) => {
                this.props.onContactCreated(response.data);
            });
        }
    }

    onCancelClicked() {
        this.props.onEditCanceled();
    }

    render() {
        // handleSubmit gets attached to props by way of the reduxForm method that wraps this component.
        const { handleSubmit, contact, formType, invalid, submitting, pristine } = this.props;

        if (formType === 'edit' && !contact) {
            return <div>Loading...</div>;
        }

        return (
            // handleSubmit runs the reduxForm side of things, like validation. Once this is completed with no errors,
            // it then invokes the method provided to it -- in this case onSubmit.
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {/* The name prop dictates what piece of the form state that the user is editing  */}
                {/* The component prop is a function that returns some JSX */}
                <Field
                    label="First Name"
                    name="firstName"
                    component={this.renderField}
                />
                <Field
                    label="Last Name"
                    name="lastName"
                    component={this.renderField}
                />
                <Field
                    label="Company"
                    name="company"
                    component={this.renderField}
                />
                <Field
                    label="Personal Email"
                    name="personalEmail"
                    component={this.renderField}
                />
                <Field
                    label="Work email"
                    name="workEmail"
                    component={this.renderField}
                />
                <Field
                    label="Mobile Phone #"
                    name="mobileNumber"
                    component={this.renderField}
                />
                <Field
                    label="Work Phone #"
                    name="workNumber"
                    component={this.renderField}
                />
                <Field
                    label="Home Address"
                    name="homeAddress"
                    component={this.renderField}
                />
                <Field
                    label="LinkedIn"
                    name="linkedIn"
                    component={this.renderField}
                />
                <Field
                    label="Twitter"
                    name="twitter"
                    component={this.renderField}
                />
                <Field
                    label="Facebook"
                    name="facebook"
                    component={this.renderField}
                />
                <Field
                    label="Instagram"
                    name="instagram"
                    component={this.renderField}
                />
                
                <div className="contact-action-btn-group">
                    <button 
                        type="submit"
                        className="btn btn-primary contact-action-save-btn"
                        disabled={invalid|submitting|pristine}>Save</button>
                    { 
                        formType === 'edit' && 
                        <button className="btn btn-danger" onClick={ () => this.onCancelClicked() }>Cancel</button>
                    }
                    {   
                        formType === 'new' &&
                        <Link to="/" className="btn btn-danger">Cancel</Link>
                    }
                </div>
            </form>
        );
    }
}

function mapStateToProps({ contacts }, ownProps) {
    return { contact: ownProps.contact};
}

function validate(values) {
    const errors = {};

    // Validate the inputs from the 'values' object
    if (!values.firstName) {
        errors.firstName = "Enter a First Name";
    }

    if (!values.lastName) {
        errors.lastName = "Enter a Last Name";
    }
    // If errors is empty, the form is fine to submit.
    // If errors has any properties, redux form assumes form is invalid.
    return errors;
}

// reduxForm helper adds additional props to our component.
// For example the handleSubmit and initialize methods we are using above.
// Here we are also providing it a validate method for it to use to validate the form inputs
// per the rules set within the validate method above.
export default reduxForm({
    validate: validate,
    form: 'ContactForm',
})(
    connect(mapStateToProps, { createContact, updateContact })(ContactForm)
);