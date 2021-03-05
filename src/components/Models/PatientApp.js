class PatientApp {
    constructor(url, component, label) {
        this.url = url;
        this.component = component;
        this.label = label;
    }

    getLabel()
    {
        return this.label;
    }

    createUrl(fhirServiceUrl, patientId) {
        return `${this.url}?iss=${fhirServiceUrl}&launch=${patientId}`;    
    }
}

export default PatientApp;