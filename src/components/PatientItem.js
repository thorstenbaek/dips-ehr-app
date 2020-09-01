import React from 'react';
import PropTypes from 'prop-types';

class PatientItem extends React.Component {    
    getStyle = () => {
        return {
            padding: '5px',
            background: this.props.patient.isSelected ? '#f4f4f4' : '#ffffff',
            fontWeight: this.props.patient.isSelected ? 'bold' : 'normal'
        }        
    }
    
    render() {
        const {id, name, birthDate} = this.props.patient;

        return  <tr style={ this.getStyle() } 
                    onClick={this.props.select.bind(this, id)}>
                    <td>
                        {name[0].given}
                    </td>
                    <td>
                        {name[0].family}
                    </td>
                    <td>
                        {birthDate}
                    </td>
                </tr>    
  } 
} 

// PropTypes
PatientItem.propTypes = {
    patient: PropTypes.object.isRequired
  }

export default PatientItem; 