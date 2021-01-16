import React from 'react';
import { Link } from 'react-router-dom';
import './SideDrawer.css';

class SideDrawer extends React.Component {

    hideMe = () => {
        this.props.hide();
    }

    render() {
        let drawerClasses = 'side-drawer';
        if (this.props.show) {
        drawerClasses = 'side-drawer open';
        }

        return (<nav className={drawerClasses}>
            <ul>
                <li><Link to="/" onClick={this.hideMe}>Home</Link></li>
                <li><Link to="/about" onClick={this.hideMe}>About</Link></li>
            </ul>
        </nav>
        );
    }
}

export default SideDrawer;  