/* External packages */
import React from 'react';
import { shallow } from 'enzyme';

/* Custom React Components */
import TopHeader from 'components/top_header';
import App from 'components/App';

let wrapped;

beforeEach( () => {
    // we are using "wrapped" to indicate that the object we get from shallow is a wrapped version of our component,
    // which simply means the component has extra functionality given to it.
    wrapped = shallow(<App />);
});

it('shows a top header', () => {
    // when we invoke find, it returns an array which has an element for each CommentBox that is found.
    // In this case we expect it to find just one CommentBox.
    expect(wrapped.find(TopHeader).length).toEqual(1);
});
