import React from 'react';
import './Toolbar.css';
import '../SideDrawer/DrawerToggleButton';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const Toolbar = props => (
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__drawer-toggle-button">
                <DrawerToggleButton click={props.drawerClickHandler}/>
            </div>
            <div className="toolbar__logo">
                <a href="/">
                    <img src="./images/DIPS-sandbox-logo.png"/> 
                </a>            
            </div>
            <div className="spacer"/>
            <div className="toolbar__navigation-items">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </div>
        </nav>
    </header>
)

export default Toolbar;