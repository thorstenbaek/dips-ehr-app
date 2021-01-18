import React from 'react';
import Axios from 'axios';
import ResultList from './ResultList';
import Patient from '../../../Models/Patient';
import './Search.css';

class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: null
        };
    }

    doSearch = async () => {
        try {
            this.props.onSearch(<div>Searching...</div>);    

            var query = this.props.fhirServiceUrl + "/Patient";
            if (this.state.searchText != null)
            {
                query = query + "?family=" + this.state.searchText;
            }

            var res = await Axios.get(query);

            this.props.onSearch(<ResultList results={res.data.entry.map(p => new Patient(p.resource))}/>);    

        } catch (error) {
            this.props.onSearch(<div>Error: {error.message}</div>);    
        }
    }
    
    render()
    {
        return (
            <div className="search">
                <input type="text"
                    className="search-input" 
                    text={this.state?.searchText} placeholder="Search patient..." 
                    onChange={event => {
                        this.setState({searchText: event.target.value})
                    }}
                    onKeyDown={event => {
                        if(event.key === 'Enter') {
                            this.doSearch();
                        }
                    }}/>
                <button className="search-button" onClick={this.doSearch}>Search</button>
            </div>
            );
    }
}

export default Search;