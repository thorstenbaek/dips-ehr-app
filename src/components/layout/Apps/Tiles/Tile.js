import React from 'react';
import AppContext from '../../../Context/AppContext';
import './Tile.css';

const Tile = (props) => {
    var classes = ["tile", "noselect"];
    if(!props.active)
    {
        classes.push("inactive");
    }    
    
    var letter = props.tile.label[0];
        return(
            <AppContext.Consumer>
                {({run}) => (
                <li onClick={() => run(props.tile)} className={classes.join(' ')} value={props.tile.value}>
                    {letter}
                </li>)}
            </AppContext.Consumer>
        )
}

export default Tile;    