import React, { useRef } from 'react'
import IframeResizer from 'iframe-resizer-react'
import SmartAppSelect from './SmartAppSelect'


class Viewer extends React.Component {
    render() {
        var patientId = this.props.patient?.id;        
        var fhirServiceUrl = this.props.fhirServiceUrl;
        var smartApp = this.props.smartApp;        

        var hidden = patientId == null || smartApp == null;

        var url = "";
        if (patientId != null)
        {
            url = `${smartApp}?iss=${fhirServiceUrl}&launch=${patientId}`   
        }

        return (
            <div hidden={hidden}>
                <SmartAppSelect options={this.props.options} index={this.props.index} onChange={this.props.onChange} />
                <IframeResizer                    
                    src={url}
                    height="1024px"
                    style={{ width: '1px', minWidth: '100%', border: 'none'}} />                                    
            </div>
        )
    }
}

export default Viewer;