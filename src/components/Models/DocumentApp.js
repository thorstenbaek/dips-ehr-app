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

    createUrl(fhirServiceUrl, patientId) {
        return `${this.url}?iss=${fhirServiceUrl}&launch=${patientId}::DocumentReference/${this.resource.id}`;    
    }
}

export default DocumentApp;