import React from 'react';

export const SmartAppSelect =({name, options, value, onChange}) => (
    <select name={name} value={value} onChange={onChange} >
        {options.map(({value, label}, index) => <option value={value}>{label}</option>)}                                      
    </select>                                
)

export default SmartAppSelect;


