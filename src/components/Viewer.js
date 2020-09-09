import React from 'react';

class Viewer extends React.Component {
    
     

    // smartUrl = "https://examples.smarthealthit.org/cardiac-risk-app/launch.html?fhirServiceUrl=http://localhost:8080&redirect_uri=http://examples.smarthealthit.org/cardiac-risk-app/index.html&patientId=";
    // smartUrl = "https://examples.smarthealthit.org/bp-centiles-app/launch.html?fhirServiceUrl=http://localhost:8080&redirect_uri=http://examples.smarthealthit.org/bp-centiles-app/index.html&patientId=";
    

    render() {

        
        var patientId = this.props.patient?.id;        
        console.log(patientId);
        var fhirServiceUrl = this.props.fhirServiceUrl;
        console.log(fhirServiceUrl);

        var container = document.getElementById('container');
        var patientList = document.getElementById('patientList');
        var frameWidth = container?.clientWidth - patientList?.clientWidth - 10;
        var frameHeight = 1024;

        let url = `http://localhost:9000/launch.html?fhirServiceUrl=${fhirServiceUrl}&redirect_uri=http://localhost:9000/index.html&patientId=${patientId}`;    

        return (
            <div style={{float: 'left'}} 
                hidden={patientId == null}>                                                
            <iframe
                title="externalView"
                src={url}
                style={{ position: 'absolute', width: '1px', minWidth:frameWidth, height: '1px', minHeight:frameHeight}} />
            </div>
        )
    }
}

export default Viewer;