import React from 'react';

class About extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = { 
            settings: {},
        }
    }

    // loadSettings()
    // {
    //   console.log("Loading settings");
    //   Axios.get("http://localhost:5000/weatherforecast")
    //   .then(res => {        
    //     this.setState({ settings: res.data });
    //   });
    // }

    async componentDidMount() {    
        if (!this.props.configuration)
        {
          return;
        }
      
        var settings = await this.props.configuration.getSettings();
        this.setState(
          {
            settings: settings
          }
        );
      }
    
    render() {
    return (
        <React.Fragment>
            <h2>DIPS EHR web application</h2>
            <p>
                Version: v1.0.0.0
            </p>            
            <h2>
                Configuration
            </h2>
            <h3>
                Settings from {this.props.configuration.getServiceUrl()}:
            </h3>
            <ul>
              {
                Object.keys(this.state.settings).map((key, index) => {
                  return <li key={index}>{key}: {this.state.settings[key]}</li>
              })}
            </ul>
        </React.Fragment>
    )
  }
}

export default About;