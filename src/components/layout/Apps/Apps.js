import React from 'react';
import Tiles from './Tiles/Tiles';
import Workspace from './Workspace/Workspace';
import AppContext from '../../Context/AppContext';

class Apps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {            
            running: [],
            active: null,
            run: this.run
        }
    }

    select = name => {
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

    run = tile => {
        if (this.state.running?.includes(tile))
        {
            this.setState({active: tile.label})
        }
        else {
            this.setState({
                active: tile.label,
                running: [...this.state.running, tile],                            
            })            
        };    
    }

    render = () => {
        return (
            <AppContext.Provider value={this.state}>
                <Tiles tiles={this.props.apps} />
                <Workspace active={this.state.active} onClose={this.close} onSelect={this.select}/>                         
            </AppContext.Provider>)
    }
}

export default Apps;