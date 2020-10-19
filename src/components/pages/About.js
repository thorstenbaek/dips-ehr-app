import React from 'react';
import SmartAppList from '../SmartAppList'


class About extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = { 
            fhirServiceUri: "",
            settings: {},
        }

        this.clearCacheButtonClick = this.clearCacheButtonClick.bind(this);
    }    

    async reloadSettings() {
      var settings = await this.props.configuration.getSetting("SmartOnFhirApps");
      var fhirServiceUri = await this.props.configuration.getSetting("FhirServiceUri");
      if (settings)
      {
        var convertedSettings = settings.map(app => {
        return {
          label: app.name,
          value: app.url
        }});
     
        this.setState(
        {
            settings: convertedSettings
        });
      }

      if (fhirServiceUri)
      {
        this.setState(
          {
            fhirServiceUri: fhirServiceUri
          });
      }
    }

    async clearCacheButtonClick()
    {
      this.clearCache()
    }

    async clearCache() {
      this.props.configuration.clearCache();
      console.log("Cleared configuration cache");
      await this.props.reloadSettings();        
    }

    async componentDidMount() {    
        if (!this.props.configuration)
        {
          return;
        }
        await this.reloadSettings();        
    }    

    render() {
      return (
        <React.Fragment>
            <h2>DIPS EHR web application</h2>
            <p>
                Version: v1.0.0.2
            </p>            
            <h2>
                Configuration
            </h2>
            <p>
                Configuration Service: {this.props.configuration.getServiceUrl()}
            </p>
            <p>
                FHIR Service: {this.state.fhirServiceUri}
            </p>
            <p>
                Environment: {this.props.configuration.getEnvironment()}
            </p>
            
            <SmartAppList apps={this.state.settings}/>
            <button onClick={this.clearCacheButtonClick}>Clear cache</button>
        </React.Fragment>
    )
  }
}

export default About;