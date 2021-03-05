import React from 'react';
import IframeResizer from 'iframe-resizer-react';
import PatientContext from '../../../Context/PatientContext';

const Viewer = props => {

    return (
        <PatientContext.Consumer>{
            ({selectedPatient, fhirServiceUrl}) => {
                var patientId = selectedPatient?.id;
                
                console.log(props.app);

                var url = "";
                if (patientId != null) {
                    if (props.app?.url != null) {
                        url = props.app.createUrl(fhirServiceUrl, patientId);
                        return (
                            
                                <IframeResizer                                                                            
                                    src={url}
                                    height="100%"
                                    style={{ width: '1px', minWidth: '100%', border: 'none', overflow: 'auto'}} />
                            )
                    }
                    else if (props.app?.component != "") {
                         return props.app?.component;
                    }
                    else {
                        return (<div>Missing context for SMART app</div>)
                    }
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