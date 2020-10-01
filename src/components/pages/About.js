import React from 'react';

class About extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = { 
            settings: {},
        }

        this.clearCacheButtonClick = this.clearCacheButtonClick.bind(this);
    }    

    async reloadSettings() {
      var settings = await this.props.configuration.getSettings();
        this.setState(
          {
            settings: settings
          }
        );
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
                Configuration service: {this.props.configuration.getServiceUrl()}
            </p>
            <p>
                Environment: {this.props.configuration.getEnvironment()}
            </p>
            <ul>
              {
                Object.keys(this.state.settings).map((key, index) => {
                  return <li key={index}>{key}: {this.state.settings[key]}</li>
              })}
            </ul>
            <button onClick={this.clearCacheButtonClick}>Clear cache</button>
        </React.Fragment>
    )
  }
}

export default About;