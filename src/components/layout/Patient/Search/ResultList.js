import React from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem';
import './ResultList.css';

const ResultList = (props) => {
    return (
      <div className="result-list">
        <table>            
          <thead></thead>
          <tbody>
          {props.results.map((patient) => {
            return <ResultItem key={patient.id} patient={patient} onSelected={props.onSelected}/>
          })} 
          </tbody>
        </table>           
        <div className="result-list-status">Found {props.results.length} patients</div>
      </div>
    );
}

ResultList.propTypes = {
    results: PropTypes.array.isRequired
}

export default ResultList;