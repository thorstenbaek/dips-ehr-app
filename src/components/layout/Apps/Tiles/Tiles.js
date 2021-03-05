import React from 'react';
import Tile from './Tile';
import PatientContext from '../../../Context/PatientContext';
import './Tiles.css';

const Tiles = props => {
    return (
        <PatientContext.Consumer>
            {({selectedPatient}) => (                                
            <div className="tiles">
                <ul>
                {props?.apps?.map((app, index) =>
                    <Tile key={index} app={app} active={selectedPatient != null}/>)}                                        
                </ul>
            </div>)}
        </PatientContext.Consumer>)
}

export default Tiles;