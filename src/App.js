import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import About from './components/pages/About';
import Header from './components/layout/Header';
import Viewer from './components/Viewer';
import PatientList from './components/PatientList';

import './App.css';


class App extends React.Component {

  constructor(props) {
    super(props);
   
    const FHIR_SERVICE_URI = window.FHIR_SERVICE_URI;

    console.log("FHIR service url :" + FHIR_SERVICE_URI);

    this.state = { 
      fhirServiceUrl: FHIR_SERVICE_URI,
      patients: [],
      selectedPatient: null,    
    };    
  }   


  refreshPatients()
  {
    Axios.get(this.state.fhirServiceUrl + "/Patient")
    .then(res => this.setState({ patients: res.data }));
  }

  componentDidMount() {
    this.refreshPatients();
  }

  // set current selected patient
  selectPatient = (id) => {
    
    
    this.setState({      
      selectedPatient: this.state.patients.filter(patient => patient.id === id)[0],          
      patients: this.state.patients.map(patient => {
        patient.isSelected = patient.id === id;              
        
        return patient;
      })
    });
  }

  addPatient = (patient) => {
    const newPatient = {
      id: uuidv4(),
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate
    }

    this.setState(
      {patients: [...this.state.patients, newPatient]}
    );
  }

  render() {    
    return (    
      <Router>
        <div className="App">
          <div className="container" id="container" style={{overflow:'hidden'}}>            
            <Header/>                        
            <Route exact path="/" render={() => (
              <React.Fragment>
                <PatientList patients={this.state.patients} select={this.selectPatient}/>    
                <Viewer patient={this.state.selectedPatient} fhirServiceUrl={this.state.fhirServiceUrl}/>
              </React.Fragment>
            )} />
            <Route path="/about" render={() => (
              <About fhirServiceUrl={this.state.fhirServiceUrl}/>
            )}/>            
          </div>
        </div>
      </Router>  
    );
  } 
}

export default App;
 