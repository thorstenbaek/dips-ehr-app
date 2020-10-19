import React from 'react';
import GitHubLogin from 'react-github-login';
import { v4 as uuidv4 } from 'uuid';

const REDIRECT_URI = "http://localhost:3000";
const CLIENT_ID = "da6e0157f0262ecf9320";

class OAuthLoginControl extends React.Component {

    constructor(props) {
        super(props);        

        this.state = {
            status: "initial",
            unguessable: uuidv4(),
            token: null,
            user: null,
          };                 
    }

    

    async postData(url) {

        console.log(url);
    
        const options = {
          method: 'POST',      
          headers: {
            'accept': 'application/json'}
        };
           
        var response = await fetch(url, options);
        var json = await response.json();    
        return json;
      }
     
      async onLoggedIn(response)
      {
        this.setState({
          status: "got code " + response.code + response.state
        })
    
        const url = `https://dips-oauth2-proxy.sandbox-dev.norwayeast.cloudapp.azure.com/access_token?code=${response.code}&redirect_uri=${REDIRECT_URI}&state=${this.state.unguessable}`;
    
        var token = await this.postData(url);    
        
        var accessToken = token.access_token;
    
        this.setState({
          token: accessToken,
          status: "finished loading (" + accessToken + ")"
        }); 
        
        this.props.onLoggedIn(accessToken);
    
        const userUrl = "https://api.github.com/user/emails";
        
        const options = {      
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        };
        
        var res = await fetch(userUrl, options);
        var emails = await res.json();
        if (emails && emails.length > 0)
        {
          var user = emails[0];
          this.setState({
            user: user.email
          });          
        }
      }

      onBtnClick = () =>
      {
          this.setState(
              {
                  token: null,
                  user: null,
                  status: "no user session"
              }
          )

          this.props.onLoggedOut();
      }
    

    render() {
        let display;
        
        if (this.state.token == null)
        {      
            display =    
            <GitHubLogin clientId={CLIENT_ID} state={this.state.unguessable}
                        redirectUri={REDIRECT_URI}
                        onSuccess={response => {
                            this.onLoggedIn(response); 
                        }}
                        onFailure={response => {
                            this.onLoginError(response);
                        }}/>
        }
        else
        {
            const attrs = { onClick: this.onBtnClick };
            display = 
            <p>
                {this.state.user} <button {...attrs}>Log out</button>
              </p>
        }

        return (
        <React.Fragment>            
            <div style={{position:'absolute', right:'5px', top:'5px'}}>
              {display}
            </div>
        </React.Fragment>
        );
    }
}

export default OAuthLoginControl;


