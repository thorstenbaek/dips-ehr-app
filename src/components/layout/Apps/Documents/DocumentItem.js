import React from 'react';
import './DocumentItem.css';

const DocumentItem = props => {
    
    return (
        <tr className="document-item" onClick={() => props.openDocument(props.document.id)}>
            <td>{props.document.description}</td>
            <td>{props.document.date}</td>
        </tr>
    )}

export default DocumentItem;