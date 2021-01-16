import React from 'react';
import { Link } from 'react-router-dom';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton';
import logo from './DIPS-Sandbox-logo.png';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__drawer-toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar__logo">
                <a href="/">
                <img height="52" width="239" src={logo}/> 
                </a>            
            </div>
            <div className="spacer"/>
            <div className="toolbar__navigation-items">
                <ul>                    
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </div>
        </nav>
    </header>
)

export default Toolbar;