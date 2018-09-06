import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TopHeader extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <Link className="navbar-brand" to="/">Contacts App</Link>
            </nav>            
        );
    }
}

export default TopHeader;