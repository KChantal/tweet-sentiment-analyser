import React, { Component, useEffect } from "react";
import Cookies from "js-cookie";
// import { addGraph } from './d3CreateGraph';
import * as d3 from "D3";

class AnalysisResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const data = JSON.parse(this.props.sentimentData.slice(2));

    const dateArray = [];

    for (let i = 0; i < data.length; i++) {}

    const margin = { top: -180, right: 100, bottom: 250, left: 40 },
      width = 400,
      height = 400;

    const n = 9;
    const startDate = new Date(2020, 3, 29);
    const endDate = new Date(2020, 4, 8);

    // 5. X scale will use the index of our data
    var xScale = d3
      .scaleTime()
      .domain([startDate, endDate]) // input
      .range([0, width]); // output

    // 6. Y scale
    var yScale = d3
      .scaleLinear()
      .domain([-200, 200]) // input
      .range([height, 0]); // output

    // 7. d3's line generator
    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.date);
      }) // set the x values for the line generator
      .y(function (d) {
        return yScale(d.avgScore);
      }) // set the y values for the line generator
      .curve(d3.curveMonotoneX); // apply smoothing to the line

    const dataset = JSON.parse(this.props.sentimentData.slice(2));

    var svg = d3
      .select("#d3Graph")
      .append("svg")
      .attr("width", 400)
      .attr("height", 400)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0," + height / 2 + ")")
      .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator
    svg
      .append("path")
      .datum(dataset) // 10. Binds data to the line
      .attr("class", "line")
      .attr("stroke", "steelblue") // Assign a class for styling
      .attr("d", line); // 11. Calls the line generator

    // 12. Appends a circle for each datapoint
    svg
      .selectAll(".dot")
      .data(dataset)
      .enter()
      .append("circle") // Uses the enter().append() method
      .attr("className", "dot") // Assign a class for styling
      .attr("cx", function (d, i) {
        return xScale(d.date);
      })
      .attr("cy", function (d) {
        return yScale(d.avgScore);
      })
      .attr("r", 6);
  }

  render() {
    const data = JSON.parse(this.props.sentimentData.slice(2));

    const totalAvg =
      data.reduce((acc, curr) => {
        console.log(typeof curr.avgScore);
        const num = curr.avgScore;
        acc += num;
        return acc;
      }, 0) / data.length;

    let overallSentiment;

    if (totalAvg < 0 && totalAvg > -100) {
      overallSentiment = (
        <p>
          The overall sentiment in tweets containing your search term was{" "}
          <br></br>
          <span className="negative">negative</span>
        </p>
      );
    } else if (totalAvg < -101) {
      overallSentiment = (
        <p>
          The overall sentiment in tweets containing your search term was{" "}
          <br></br>
          <span className="negative">extremely negative</span>
        </p>
      );
    } else if (totalAvg > 0 && totalAvg < 101) {
      overallSentiment = (
        <p>
          The overall sentiment in tweets containing your search term was{" "}
          <br></br>
          <span className="positive">positive</span>
        </p>
      );
    } else if (totalAvg > 100) {
      overallSentiment = (
        <p>
          The overall sentiment in tweets containing your search term was
          <br></br>
          <span className="positive">extremely positive!</span>
        </p>
      );
    }

    const posWords = JSON.parse(
      JSON.parse(this.props.words.slice(2)).positiveWords
    );
    const posLiEls = [];
    for (let i = 0; i < posWords.length; i++) {
      posLiEls.push(<li key={`posWord-${i}`}>{posWords[i]}</li>);
    }

    const negWords = JSON.parse(
      JSON.parse(this.props.words.slice(2)).negativeWords
    );

    const negLiEls = [];
    for (let i = 0; i < negWords.length; i++) {
      console.log(negWords[i]);
      negLiEls.push(<li key={`negWord-${i}`}>{negWords[i]}</li>);
    }

    return (
      <div className="results-div">
        <h2>Here are the results of your search: </h2>

        {overallSentiment}

        <p className="positive">
          <em>Most common positive words in Tweets: </em>
        </p>
        <ul className="positive">{posLiEls}</ul>

        <p className="negative">
          <em>Most common negative words in Tweets: </em>
        </p>
        <ul className="negative">{negLiEls}</ul>

        {/* <div id="d3Graph"></div> */}
      </div>
    );
  }
}

export default AnalysisResults;
