import React from 'react';
import IframeResizer from 'iframe-resizer-react';

class PatientApp {
    constructor(url, label) {
        this.url = url;
        this.label = label;
    }

    getLabel()
    {
        return this.label;
    }

    getComponent(context)
    {
        return (<IframeResizer                                                                            
                    src={`${this.url}?iss=${context.service}&launch=${context.patient?.id}`}
                    height="100%"
                    style={{ width: '1px', minWidth: '100%', border: 'none', overflow: 'auto'}} />)
    }
}

export default PatientApp;