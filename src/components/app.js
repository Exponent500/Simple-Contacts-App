/* External packages */
import React, { Component } from 'react';

// BrowserRouter interacts with React Router's History library and
// decides what to do based on a change within the URL.

// Route provides config that says if the URL looks like this
// then I want to show this component.
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/* React Custom Components */
import Contacts from '../components/contacts';
import Contact from '../components/contact';
import ContactNew from '../components/contact_new';
import TopHeader from '../components/top_header';


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                <TopHeader />
                <div className="container app-container">
                    <Switch>
                    {/* By providing Contact as the value to the component prop,
                    we are providing Contact with a bunch of Navigation related helpers
                    and objects that assists with navigation -- which are added as props. */}
                    <Route path="/contact/new" component={ContactNew} />
                    <Route path="/contact/:id" component={Contact} />
                    <Route path="/" component={Contacts} />
                    </Switch>
                </div>
                </div>
            </BrowserRouter>
        );
    };
}

export default App;