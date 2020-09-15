import React from 'react';
import SmartAppSelect from './SmartAppSelect';

class Viewer extends React.Component {
    render() {
        var patientId = this.props.patient?.id;        
        var fhirServiceUrl = this.props.fhirServiceUrl;
        var smartApp = this.props.smartApp.value;
        
        var container = document.getElementById('container');
        var patientList = document.getElementById('patientList');
        var frameWidth = container?.clientWidth - patientList?.clientWidth - 10;
        var frameHeight = 1024;

        console.log(smartApp);

        var hidden = patientId == null || smartApp == null;

        let url = `${smartApp}/launch.html?fhirServiceUrl=${fhirServiceUrl}&redirect_uri=${smartApp}/index.html&patientId=${patientId}`;    

        return (
            <React.Fragment>
                <div style={{float: 'left'}}>         
                    <div>
                        <SmartAppSelect options={this.props.options} value={this.props.value} onChange={this.props.onChange} />
                    </div>
                    <iframe hidden={hidden}
                        title="externalView"
                        src={url}
                        style={{ position: 'absolute', width: '1px', minWidth:frameWidth, height: '1px', minHeight:frameHeight}} />
                    </div>
            </React.Fragment>
        )
    }
}

export default Viewer;