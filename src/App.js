import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import Configuration from './components/helpers/Configuration';
import About from './components/pages/About';
import Toolbar from './components/layout/Menu/Toolbar/Toolbar';
import SideDrawer from './components/layout/Menu/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import PatientBanner from './components/layout/Patient/Banner/Banner';
import Viewer from './components/Viewer';
import PatientList from './components/PatientList';
import Patient from './components/Models/Patient';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    var hostname = window.location.hostname;
    
    if (window.location.port !== "")
    {
      console.log(`Adding port '${window.location.port}' to hostname`);
      hostname = hostname + ":" + window.location.port;
    }
    
    this.state = {           
      configuration: new Configuration(window.CONFIGURATION_SERVICE_URI, hostname),    
      patients: [],
      selectedPatient: null,
      sideDrawerOpen: false  
    };    

    this.reloadSettings = this.reloadSettings.bind(this);
  }     

  async refreshPatients()
  {
    console.log("Refresh patients");
    var res = await Axios.get(this.state.fhirServiceUrl + "/Patient");
    
    console.log(res);
    this.setState({ patients: res.data.entry.map(p => new Patient(p.resource)) });    
  }

  async reloadSettings()
  {
    this.state.configuration.clearCache();

    var smartApps = await this.state.configuration.getSetting("SmartOnFhirApps");
    console.log(smartApps);
    if (smartApps)
    {
      var convertedApps = smartApps.map(app => {
        console.log(app);
        return {
          label: app.name,
          value: app.url
        };
      });
    }

    this.setState({
      fhirServiceUrl: await this.state.configuration.getSetting("FhirServiceUri"),
      smartApps: convertedApps
    });
  }
  
  async componentDidMount() {
    await this.reloadSettings();
    await this.refreshPatients();
  }

  onLoggedIn = (token) => {
    this.setState({
      token: token
    })
  }

  onLoggedOut = () => {
    this.setState({
      token: null
    })
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

  // addPatient = (patient) => {
  //   const newPatient = {
  //     id: uuidv4(),
  //     firstName: patient.firstName,
  //     lastName: patient.lastName,
  //     birthDate: patient.birthDate
  //   }

  //   this.setState({
  //     patients: [...this.state.patients, newPatient]}
  //   );
  // }

  onSuccess()
  {
  }

  onFailure()
  {}

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  drawerToggleButtonClickHandler = () => {
    this.setState((previousState) => {
      return {sideDrawerOpen: !previousState.sideDrawerOpen};
    });
  };

  render() {        
    let selectedSmartApp;

    if (this.state.smartApps)
    {            
      if (this.state.selectedSmartAppIndex)
      {
        selectedSmartApp = this.state.smartApps[this.state.selectedSmartAppIndex].value;
      }
      else
      {
        selectedSmartApp = this.state.smartApps[0].value;
      }          
    }

    let viewer;

    if (selectedSmartApp)
    {
      viewer = <Viewer smartApp={selectedSmartApp} fhirServiceUrl={this.state.fhirServiceUrl} patient={this.state.selectedPatient} onChange={this.smartAppChange}
                      options={this.state.smartApps} 
                      index={this.state.selectedSmartAppIndex}
                      token={this.state.token}
      />
    }    

    var content = //this.state.token ? 
                  <React.Fragment>
                    <PatientList patients={this.state.patients} select={this.selectPatient}/>                    
                    {viewer}
                  </React.Fragment>
                  /*: 
                  <React.Fragment>
                    <h3>Sign in to view data</h3>
                  </React.Fragment>*/

    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    return (        
      <Router>        
        <div className="App" style={{height:'100%'}}>
          <Toolbar drawerClickHandler={this.drawerToggleButtonClickHandler}/>
          <SideDrawer show={this.state.sideDrawerOpen} hide={this.backdropClickHandler}/>
          
          {backdrop}
          {/* <Header onLoggedIn={this.onLoggedIn} onLoggedOut={this.onLoggedOut}/>*/}          
          
          
          <div className="container" id="container">
            
              <Route exact path="/" render={() => (
                <React.Fragment>
                  <PatientBanner patient={this.state.selectedPatient}/>
                  {content}
                </React.Fragment>              
              )} />
              <Route path="/about" render={() => (
                <About configuration={this.state.configuration} reloadSettings={this.reloadSettings}/>
              )}/>  
      
          </div>
        </div>      
        </Router>                                                              
    );
  } 
}

export default App;
 