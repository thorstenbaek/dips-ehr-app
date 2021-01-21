import React from 'react';
import AppContext from '../../../Context/AppContext';
import PatientContext from '../../../Context/PatientContext';
import Tabs from './Tabs';
import Pane from './Pane';
import Viewer from './Viewer';
import './Workspace.css';

class Workspace extends React.Component {

    constructor(props) {
        super(props);
    }    

    render()
    {
        return (
            <AppContext.Consumer>
                {({running}) => {                                   
                    console.log(running);
                    return (

                    <div className="workspace">
                        <PatientContext.Consumer>
                            {({selectedPatient}) => {
                                if (selectedPatient != null) 
                                {
                                return (
                                <Tabs active={this.props.active} onClose={this.props.onClose} onSelect={this.props.onSelect}>
                                    {running.map((app, index) =>
                                        <Pane name={app.label} key={index}>
                                            <Viewer app={app}/>
                                        </Pane>
                                    )}      
                                </Tabs>
                                )}}}
                        </PatientContext.Consumer>                                
                    </div>)}}
            </AppContext.Consumer>
        )
    }
}

export default Workspace;