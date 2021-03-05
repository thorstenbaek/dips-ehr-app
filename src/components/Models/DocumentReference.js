class DocumentReference {
    constructor(resource) {
        this.id = resource.id;
        this.date = resource.date;
        this.description = resource.description;        
        this.type = resource.type;
        this.content = resource.content;
    }
}

export default DocumentReference;