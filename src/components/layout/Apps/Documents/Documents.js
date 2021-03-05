import React from 'react';
import PatientContext from '../../../Context/PatientContext';
import DocumentList from './DocumentList';

const Documents = props => {
    
    return (
        <PatientContext.Consumer>{
            ({selectedPatient, fhirServiceUrl}) => {                
                return (
                    <DocumentList fhirServiceUrl={fhirServiceUrl} 
                                  patient={selectedPatient} 
                                  openDocument={props.openDocument}/>
                    )
            }
        }
        </PatientContext.Consumer>
        )
    
}


export default Documents;