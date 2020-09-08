import React from 'react';

class About extends React.Component {
    render() {
    return (
        <React.Fragment>
            <h1>DIPS EHR web application</h1>
            <p>
                Version: v1.0.0.0
            </p>            
            <p>
                FHIR Service: {this.props.fhirServiceUrl}
            </p>
        </React.Fragment>
    )
    }
}

export default About;