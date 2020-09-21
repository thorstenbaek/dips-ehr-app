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

    this.state = { 
      fhirServiceUrl: FHIR_SERVICE_URI,
      patients: [],
      selectedPatient: null,    
      smartApps: [
        {label: "Growth Chart", value: "http://growth-chart-app.northeurope.cloudapp.azure.com"}, 
        {label: "DIPS Demo", value: "https://dips-smartonfhir-app.northeurope.cloudapp.azure.com"}, 
        {label: "NAV Pleiepenger", value: "https://nav-smartonfhir-app.azurewebsites.net"}],
      selectedSmartAppIndex: 0, //Growth Chart
    };    
  }   

  refreshPatients()
  {
    console.log("Refresh patients");
    Axios.get(this.state.fhirServiceUrl + "/Patient")
    .then(res => {
      console.log(res.data.entry);
      this.setState({ patients: res.data.entry.map(p => p.resource) });
    });
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

  smartAppChange = (event) => {
    this.setState({
      selectedSmartAppIndex: this.state.smartApps.findIndex(item => item.value === event.target.value)
      }
    )
  }

  addPatient = (patient) => {
    const newPatient = {
      id: uuidv4(),
      firstName: patient.firstName,
      lastName: patient.lastName,
      birthDate: patient.birthDate
    }

    this.setState({
      patients: [...this.state.patients, newPatient]}
    );
  }

  render() {    

    var selectedSmartApp = this.state.smartApps[this.state.selectedSmartAppIndex].value;
    console.log(selectedSmartApp);

    return (    
      <Router>
        <div className="App">
          <div className="container" id="container" style={{overflow:'hidden'}}>            
            <Header/>                        
            <Route exact path="/" render={() => (
              <React.Fragment>
                <PatientList patients={this.state.patients} select={this.selectPatient}/>                    

                <Viewer smartApp={selectedSmartApp} fhirServiceUrl={this.state.fhirServiceUrl} patient={this.state.selectedPatient} onChange={this.smartAppChange}
                        options={this.state.smartApps} 
                        index={this.state.selectedSmartAppIndex}/>
              </React.Fragment>
            )} />
            <Route path="/about" render={() => (
              <About fhirServiceUrl={this.state.fhirServiceUrl} 
                />
            )}/>            
          </div>
        </div>
      </Router>  
    );
  } 
}

export default App;
 