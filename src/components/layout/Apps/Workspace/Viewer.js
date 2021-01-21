import React, { useRef } from 'react';
import IframeResizer from 'iframe-resizer-react';
import PatientContext from '../../../Context/PatientContext';

const Viewer = props => {

    return (
        <PatientContext.Consumer>{
            ({selectedPatient, fhirServiceUrl}) => {
                var patientId = selectedPatient?.id;
                
                var url = "";
                if (patientId != null && props.app?.value != "") {
                    url = `${props.app?.value}?iss=${fhirServiceUrl}&launch=${patientId}`;
                    return (
                        
                            <IframeResizer                                                                            
                                src={url}
                                height="1024px"
                                style={{ width: '1px', minWidth: '100%', border: 'none', overflow: 'auto'}} />
                        )
                }
                else
                {                                
                    return <div className="viewer">Select patient to see content</div>;
                }
            }
        }               
        </PatientContext.Consumer>
        )
}


export default Viewer;