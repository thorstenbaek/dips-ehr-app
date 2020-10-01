import React from 'react';

export const SmartAppSelect =({name, options, index, onChange}) => (
    <select name={name} index={index} onChange={onChange} >
        {options.map(({value, label}, index) => <option key={index} value={value}>{label}</option>)}                                      
    </select>                                
)

export default SmartAppSelect;


