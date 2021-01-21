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
                {props?.tiles?.map((tile, index) =>
                    <Tile key={index} tile={tile} active={selectedPatient != null}/>)}                                        
                </ul>
            </div>)}
        </PatientContext.Consumer>)
}

export default Tiles;