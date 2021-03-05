import React from 'react';
import PatientContext from '../../../Context/PatientContext';

const Viewer = props => {

    return (                
        
        <PatientContext.Consumer>{
            ({selectedPatient, fhirServiceUrl}) => {                
                return props.app?.getComponent({
                    patient: selectedPatient, 
                    service: fhirServiceUrl});
            }
        }               
        </PatientContext.Consumer>
        )
}

export default Viewer;