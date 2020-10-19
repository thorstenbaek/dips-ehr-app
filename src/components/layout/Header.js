import React from 'react';
import { Link } from 'react-router-dom';
import OAuthLoginControl from '../OAuthLoginControl';

class Header extends React.Component {

    render()
    {    
        return (
            <header style={blackStyle}>
                <OAuthLoginControl style={loginStyle} onLoggedIn={this.props.onLoggedIn} onLoggedOut={this.props.onLoggedOut} />   
                <div style={headerStyle}>                
                    <h1>DIPS EHR</h1>                
                    <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link>
                </div>
            </header>
        )
    }
}

const blackStyle = {
    background: '#333',
    color: '#fff',
}

const loginStyle = {
    left: '4px',    
}

const headerStyle = {    
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;