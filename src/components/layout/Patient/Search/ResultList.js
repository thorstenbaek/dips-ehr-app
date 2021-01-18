import React from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';
import './ResultList.css';

const ResultList = (props) => {
    return (
      <table>            
        <thead></thead>
        <tbody>
        {props.results.map((patient) => {
          return <ResultItem key={patient.id} patient={patient} onSelected={props.onSelected}/>
        })} 
        </tbody>
      </table>           
    );
}

ResultList.propTypes = {
    results: PropTypes.array.isRequired
}

export default ResultList;