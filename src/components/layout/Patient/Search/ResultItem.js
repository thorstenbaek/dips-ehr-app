import React from 'react';
import PatientContext from '../../../Context/PatientContext';
import './ResultItem.css';

const ResultItem = props => {            

    const {ssn, familyName, givenName} = props.patient;

    return  (
        <PatientContext.Consumer>
            {({selectPatient})=> (
                <tr className="result-item" onClick={() => selectPatient(props.patient)}>
                    <td className="result-item-ssn">{ssn}</td>
                    <td className="result-item-family-name">{familyName}</td>
                    <td className="result-item-given-name">{givenName}</td>
                    <td className="result-item-age">{props.patient.age()} y</td>
                </tr>
            )}                
        </PatientContext.Consumer>)
} 

export default ResultItem; 