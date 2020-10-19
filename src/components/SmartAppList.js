import React from 'react';

function SmartAppList(props) {
    const apps = props.apps;
  
    if (Object.keys(apps).length > 0)
    {
      const listItems = apps.map((app) =>
        <li>{app.label}: {app.value}</li>
      );
      return (
        <React.Fragment>
            <h2>Smart Apps</h2>
            <ul>{listItems}</ul>
        </React.Fragment>
    );
    }
    else
    {
      return (<React.Fragment/>)
    }
  }

  
export default SmartAppList;