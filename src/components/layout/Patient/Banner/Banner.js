import React from 'react';
import Patient from '../../../Models/Patient';
import './Banner.css';
import Female from './female.svg';
import Male from './male.svg';

class Banner extends React.Component {

    capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    render() {

        if (this.props.patient != null)
        {
            const {ssn, fullName, birthDate, gender} = this.props.patient;

            return (
                <div className="grid-container">
                    <div className={`icon ${gender}`}></div>                
                    <div className="patient-name">{fullName}</div>
                    <ul className="patient-data">
                        <li className="patient-data-ssn">{ssn}</li>
                        <li className="patient-data-age">{this.props.patient.age()} years</li>
                        <li className="patient-data-gender">{this.capitalize(gender)}</li>
                    </ul>
                    <button className="patient-close-button" onClick={this.props.click}>X</button>
                </div>);    
        }
        else
            return (<div/>); 
    }
}

export default Banner;