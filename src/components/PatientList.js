import React from 'react';
import PatientItem from './PatientItem';
import PropTypes from 'prop-types';

class PatientList extends React.Component {    
  render() {
    return (
      <div style={{float: 'left', margin: '5px'}} id="patientList">
        <table>     
          <thead>
            <tr>
              <th>Fornavn</th>
              <th>Etternavn</th>
              <th>Født</th>
            </tr>
          </thead>     
          <tbody>            
          {this.props.patients.map((patient) => {
            return <PatientItem key={patient.id} patient={patient} select={this.props.select}/>
          })}
          </tbody>
        </table>
      </div>
    );
  } 
} 

// PropTypes
PatientList.propTypes = {
  patients: PropTypes.array.isRequired
}

export default PatientList;
 