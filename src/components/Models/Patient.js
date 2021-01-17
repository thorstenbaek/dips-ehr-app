class Patient {    

    constructor(resource)
    {
        this.resource = resource;
        this.id = resource.id;
        this.ssn = this.getSSN();
        this.fullName = `${resource.name[0].family}, ${resource.name[0].given}`;
        this.familyName = resource.name[0].family;
        this.givenName = resource.name[0].given.join(' ');
        this.birthDate = resource.birthDate;
        this.gender = resource.gender;
    }
    
    
    
    getSSN = () => {
        var ssn = this.resource.identifier.filter(i => i.system == 'http://hl7.org/fhir/sid/us-ssn');
        return ssn[0]?.value;        
    }

    age = () => {
        var diff = Date.now() - new Date(this.birthDate);
        var ageDate = new Date(diff);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }    
}

export default Patient;