import React from 'react';
import DocumentReference from '../../../Models/DocumentReference';
import DocumentItem from './DocumentItem';
import './DocumentList.css';

class DocumentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            documents: []
        };
    }

    async componentDidMount()
    {
        const url = `${this.props.fhirServiceUrl}/documentreference?patient=${this.props.patient.id}`;
        var response = await fetch(url);        
        var bundle = await response.json();    
        this.setState({
            documents: bundle?.entry.map(d => new DocumentReference(d.resource))
        });
    }

    render() {        
        return (
        <div className="document-list"> 
            <table>                
            <thead></thead>           
            <tbody>
                {this.state.documents.map(d => {
                    return <DocumentItem key={d.id} document={d} openDocument={this.props.openDocument}/>
                })}
            </tbody>
            <tfoot></tfoot>
            </table>
        </div>
        );
    }
}

export default DocumentList;