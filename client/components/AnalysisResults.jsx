import React, { Component, useEffect } from 'react';
import Cookies from 'js-cookie';
import { addGraph } from './d3CreateGraph';

class AnalysisResults extends Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidMount() {
    //     addGraph(this.props.results);
    // }

    render () {
        return (
            <div className="results-div">
                <h1>Here are the results of your search:  </h1>

                <p>Maybe have some text and info on what the sentiment analysis brought back</p>

                <svg id="d3Graph">
                    
                </svg>

            </div>
        )
    }
}

export default AnalysisResults;