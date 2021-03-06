import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Configuration from './components/helpers/Configuration';
import About from './components/pages/About';
import Toolbar from './components/layout/Menu/Toolbar/Toolbar';
import SideDrawer from './components/layout/Menu/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import PatientBanner from './components/layout/Patient/Banner/Banner';
import PatientSearch from './components/layout/Patient/Search/Search';
import Apps from './components/layout/Apps/Apps';
import PatientContext from './components/Context/PatientContext';
import './App.css';
import SmartApp from './components/Models/SmartApp';

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
      selectedPatient: null,
      selectPatient: this.selectPatient,
      sideDrawerOpen: false,
      searchResults: null 
    };    

    this.reloadSettings = this.reloadSettings.bind(this);
  }     

  async reloadSettings()
  {
    this.state.configuration.clearCache();

    var smartApps = await this.state.configuration.getSetting("SmartOnFhirApps");
    if (smartApps)
    {
      var convertedApps = smartApps.map(app => {
        return new SmartApp(app.url, app.name);        
      });
    }

    var fhirService = await this.state.configuration.getSetting("FhirServiceUri");

    this.setState({
      fhirServiceUrl: fhirService,
      smartApps: convertedApps
    });
  }
  
  async componentDidMount() {
    await this.reloadSettings();    
  }

  closePatient = () => {
    this.setState({
      selectedPatient: null,
    });
  }

  selectPatient = patient => {
    this.setState({
      selectedPatient: patient,
      searchResults: null 
    });
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

  smartAppChange = (event) => {
    this.setState({
      selectedSmartAppIndex: this.state.smartApps.findIndex(item => item.value === event.target.value)
      }
    )
  }

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  }

  drawerToggleButtonClickHandler = () => {
    this.setState((previousState) => {
      return {sideDrawerOpen: !previousState.sideDrawerOpen};
    });
  };

  doSearchHandler = results => {
    this.setState(
      {searchResults: results});
  }

  render() {        
    /*let selectedSmartApp;

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
    }*/

    // if (selectedSmartApp)
    // {
    //   viewer = <Viewer smartApp={selectedSmartApp} fhirServiceUrl={this.state.fhirServiceUrl} patient={this.state.selectedPatient} onChange={this.smartAppChange}
    //                   options={this.state.smartApps} 
    //                   index={this.state.selectedSmartAppIndex}
    //                   token={this.state.token}
    //   />
    // }    

     var content = this.state.searchResults != null ? 
                   this.state.searchResults :                 
                   <Apps apps={this.state.smartApps}/>               
                  
    var patientPanel = this.state.selectedPatient ? 
      (<PatientBanner patient={this.state.selectedPatient} click={this.closePatient}/>) : 
      (<PatientSearch 
          onSearch={this.doSearchHandler} 
          fhirServiceUrl={this.state.fhirServiceUrl} />);

    var backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    return (        
      <PatientContext.Provider value={this.state}>
        <Router>                 
            <Toolbar drawerClickHandler={this.drawerToggleButtonClickHandler}/>
            <SideDrawer show={this.state.sideDrawerOpen} hide={this.backdropClickHandler}/>
            {backdrop}                        
            <div className="container">              
                <Route exact path="/" render={() => (
                  <>                  
                    {patientPanel}                    
                    {content}
                  </>              
                )} />
                <Route path="/about" render={() => (
                  <About configuration={this.state.configuration} reloadSettings={this.reloadSettings}/>
                )}/>  
            </div>
          
        </Router>                                                              
      </PatientContext.Provider>
    );
  } 
}

export default App;
 