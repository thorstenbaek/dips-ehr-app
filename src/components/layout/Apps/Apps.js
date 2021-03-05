import React from 'react';
import Tiles from './Tiles/Tiles';
import Workspace from './Workspace/Workspace';
import AppContext from '../../Context/AppContext';
import ComponentApp from '../../Models/ComponentApp';
import PatientApp from '../../Models/PatientApp';
import DocumentApp from '../../Models/DocumentApp';
import Documents from './Documents/Documents';

class Apps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  
            patientApps: [],          
            documentApps: [],
            openDocument: this.openDocument,
            running: [],
            active: null,
            run: this.run
        }
    }

    async componentDidMount() {        
        var smartApps = await this.props.configuration.getSetting("SmartOnFhirApps");
        if (smartApps)
        {
          var patientApps = smartApps.filter(app => app.context == "patient").map(app => {
            return new PatientApp(app.url, app.name);        
          });

          var documentApps = smartApps.filter(app => app.context == "document").map(app => {
              return new DocumentApp(app.url, app.name, app.context, app.mimetype);
          })
        }
    
        var fhirService = await this.props.configuration.getSetting("FhirServiceUri");
          
        var documentList = new ComponentApp(      
          (<Documents fhirServiceUrl={fhirService} patient={this.state.selectedPatient} openDocument={this.openDocument}/>), 
          "Documents");
    
        this.setState({          
            patientApps: [documentList, ...patientApps],
            documentApps: [...documentApps]
        });    
    }

    openDocument = (document) => {
        var documentApp = null;

        if (document.content.length > 0) {
            var apps = this.state.documentApps.filter(d => d.mimetype.toLowerCase() == document.content[0].attachment.contentType.toLowerCase());            
            if (apps.length > 0)
            {
                documentApp = apps[0];
            }
        }

        if (documentApp == null)
        {
            throw Error("Missing app for document format");
        }
        else 
        {   
            documentApp.setResource(document);            
            this.run(documentApp);
        }
      }

    select = name => {
        if (this.state.active == name)
        {
            return;
        }

        this.setState({
            active: name
        });        
    }

    close = name => {
        const filtered = this.state.running.filter(r => r.label !== name);
        const newActive = filtered.length > 0 ? filtered[0] : null;

        this.setState({
            active: newActive?.label, //Why is this not working?
            running: filtered,                                
        });
    }

    run = (app) => {
        //var runningApps = this.state.running?.map(r => r.getLabel());
        //if (this.state.running?.includes(app))
        //runningApps.map(r => console.log(r.getLabel()));
        
        if (this.state.running?.includes(app))
        {
            this.setState({active: app.label})
        }
        else {
            this.setState({
                active: app.label,
                running: [...this.state.running, app],                            
            })            
        };    
    }

    render = () => {
        return (
            <AppContext.Provider value={this.state}>
                <Tiles apps={this.state.patientApps} />
                <Workspace active={this.state.active} onClose={this.close} onSelect={this.select}/>                         
            </AppContext.Provider>)
    }
}

export default Apps;