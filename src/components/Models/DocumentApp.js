import React from 'react';
import IframeResizer from 'iframe-resizer-react';

class DocumentApp {
    constructor(url, label, context, mimetype) {
        this.url = url;        
        this.label = label;
        this.context = context;
        this.mimetype = mimetype;
        this.resource = null;
    }

    setResource(resource) {
        this.resource = resource;
    }

    getLabel() {
        return `${this.label}:${this.resource?.id}`;
    }

    getComponent(context) {
        return (<IframeResizer                                                                            
            src={`${this.url}?iss=${context.service}&launch=${context.patient.id}::DocumentReference/${this.resource.id}`}
            height="100%"
            style={{ width: '1px', minWidth: '100%', border: 'none', overflow: 'auto'}} />)
    }
}

export default DocumentApp;