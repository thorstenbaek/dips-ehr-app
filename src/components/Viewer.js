import React from 'react';
import SmartAppSelect from './SmartAppSelect';

class Viewer extends React.Component {
    render() {
        var patientId = this.props.patient?.id;        
        var fhirServiceUrl = this.props.fhirServiceUrl;
        var smartApp = this.props.smartApp;
        
        var container = document.getElementById('container');
        var patientList = document.getElementById('patientList');
        var frameWidth = 0; 
        if (container && patientList)
        {
            frameWidth = container?.clientWidth - patientList?.clientWidth - 10;
        }

        var frameHeight = 1024;

        var hidden = patientId == null || smartApp == null;

        var url = "";
        if (patientId != null)
        {
            var iss = 'https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiJmMDQ2MjkzNi1lYjRiLTRkYTEtYjQ1YS1mYmQ5NmViZjhjY2IiLCJlIjoic21hcnQtUHJhY3RpdGlvbmVyLTcxNjE0NTAyIn0/fhir';

            url = `${smartApp}/launch.html?fhirServiceUrl=${fhirServiceUrl}&redirect_uri=${smartApp}/index.html&patientId=${patientId}`;    
            // url = `${smartApp}/index.html?fhirServiceUrl=${fhirServiceUrl}&redirect_uri=${smartApp}/index.html&patientId=${patientId}`;    
            //url = `http://examples.smarthealthit.org/growth-chart-app/launch.html?iss=https://launch.smarthealthit.org/v/r3/fhir&launch=eyJhIjoiMSIsImsiOiIxIiwiaiI6IjEiLCJmIjoiMSJ9&patientId=${patientId}`   
            //url = `http://examples.smarthealthit.org/growth-chart-app/launch.html?iss=https://launch.smarthealthit.org/v/r3/fhir&launch=eyJhIjoiMSIsImsiOiIxIiwiaiI6IjEiLCJmIjoiMSJ9`   
            //https://launch.smarthealthit.org/v/r3/auth/authorize?response_type=code&client_id=growth_chart&scope=patient%2FObservation.read%20patient%2FPatient.read%20offline_access%20launch&redirect_uri=http%3A%2F%2Fexamples.smarthealthit.org%2Fgrowth-chart-app%2F&aud=&state=JzW17hRCs2JcAUfR&launch=eyJhIjoiMSIsImsiOiIxIiwiaiI6IjEiLCJmIjoiMSJ9&patient=smart-1137192&login_type=patient&aud_validated=1&login_success=1
            
            // url = `http://examples.smarthealthit.org/growth-chart-app/launch.html?iss=https://launch.smarthealthit.org/v/r3/fhir&launch=eyJhIjoiMSIsImsiOiIxIiwiaiI6IjEiLCJmIjoiMSJ9&patientId=${patientId}`   
            // url = `http://examples.smarthealthit.org/growth-chart-app/launch.html?iss=http://localhost:8080&launch=eyJhIjoiMSIsImsiOiIxIiwiaiI6IjEiLCJmIjoiMSJ9&patientId=${patientId}`   
                                                 
            
            
        }

        return (
            <React.Fragment>
                <div style={{float: 'left'}}>         
                    <div>
                        <SmartAppSelect options={this.props.options} index={this.props.index} onChange={this.props.onChange} />
                    </div>
                    <iframe hidden={hidden}
                        title="externalView"
                        src={url}
                        style={{ position: 'absolute', width: '1px', minWidth:frameWidth, height: '1px', minHeight:frameHeight}}
                        />
                    </div>
            </React.Fragment>
        )
    }
}

export default Viewer;