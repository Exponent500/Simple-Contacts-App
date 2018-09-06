/* External packages */
import React from 'react';
import { shallow } from 'enzyme';

/* Custom React Components */
import ContactNew from 'components/contact_new';
import ContactForm from 'components/contact_form';

let wrapped;

beforeEach( () => {
    wrapped = shallow(<ContactNew />);
});

it('shows a ContactForm', () => {
    expect(wrapped.find(ContactForm).length).toEqual(1);
});