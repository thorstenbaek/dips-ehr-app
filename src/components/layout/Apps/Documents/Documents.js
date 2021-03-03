import React from 'react';
import PatientContext from '../../../Context/PatientContext';
import DocumentList from './DocumentList';

const Documents = () => {
    
    return (
        <PatientContext.Consumer>{
            ({selectedPatient, fhirServiceUrl, openDocument}) => {                
                return <DocumentList fhirServiceUrl={fhirServiceUrl} patient={selectedPatient} openDocument={openDocument}/>
            }
        }
        </PatientContext.Consumer>
        )
    
}


export default Documents;