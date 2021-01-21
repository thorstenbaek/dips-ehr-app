import React from 'react';
import Pane from './Pane';
import equal from 'fast-deep-equal'
import './Tabs.css';

class Tabs extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            tabHeader: [],            
            childContent: [],            
        };
    }

    updateChildren()
    {
        const {children, active} = this.props;                
        const headers = [];
        const childCnt = {};
        
        React.Children.forEach(children, (element) => {
            if (!React.isValidElement(element)) 
            {
                console.error("Invalid element");
                return;
            }
            const {name} = element.props;
            headers.push(name);
            childCnt[name] = element.props.children;            
        });
        this.setState({
            tabHeader: headers,
            childContent: {...childCnt},            
            active: active
        })
        console.log(childCnt);                        
    }

    componentDidMount() {
        this.updateChildren();
    }

    componentDidUpdate(prevProps) {
        if(!equal(this.props, prevProps)) 
        {
            this.updateChildren();
        }
      }     

    changeTab = name => {
        this.props.onSelect(name);
    }

    closeTab = name => {        
        this.props.onClose(name);
    }

    render() {
        const contents = Object.keys(this.state.childContent);
        const headers = this.state?.tabHeader;

        if (headers?.length > 0)
            return (
                <div className="tabs">
                    <ul className="tab-header">
                        {headers.map((item)=> (
                            <li onClick={() => this.changeTab(item)}
                                key={item}
                                className={item === this.state.active ? "active" : ""}>
                                {item}
                                <button onClick={() => this.closeTab(item)}>X</button>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="tab-content">
                        {contents.map((key, index) => {
                            if (key === this.state.active) {
                                return <div className="tab-child" key={index}>{this.state.childContent[key]}</div>
                            }
                            else {
                                return null;
                            }
                        })}
                    </div>
                </div>)
            else
                return null;
    }
};

Tabs.propTypes = {
    children: function(props, propName, componentName) {
        const prop = props[propName];
        let error = null;

        React.Children.forEach(prop, function(child){
            if (child.type !== Pane) {
                error = new Error(`'${componentName}' children should be of type 'Pane'`);
            }
        });
        
        return error;
    }
};

export default Tabs;


