/* External packages */
import React from 'react';
import { Link } from 'react-router-dom';
import { mount } from 'enzyme';

/* Custom React Components */
import TopHeader from 'components/top_header';
import Root from 'Root';

let wrapped;

beforeEach( () => {
    wrapped = mount(
        <Root>
            <TopHeader />
        </Root>
    );
});

afterEach( () => {
    wrapped.unmount();
})

// it('shows a link', () => {
//     expect(wrapped.find(<Link />).length).toEqual(1);
// });