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
            url = `${smartApp}/launch.html?iss=${fhirServiceUrl}&launch=${patientId}`   
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