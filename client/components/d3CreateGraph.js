import * as d3 from 'D3';

const addGraph = (data) => {
    const svg = d3.select('svg')
                    .attr("viewbox", [0, 0, width, height]);
    const gradient = DOM.uid();
    
    // set up x axis
    svg.append("g")
        .call(xAxis);
    // set up y axis
    svg.append("g")
        .call(yAxis);
}

export default addGraph;