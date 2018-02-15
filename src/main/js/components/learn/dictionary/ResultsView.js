import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import * as d3 from "d3";
import {Table, TableBody, TableRow, TableRowColumn} from "material-ui/Table";

const goodColor = [24, 137, 63];
const badColor = [163, 60, 18];

function getResultColor(res) {
    return 'rgb(' + badColor.map((c, i) => Math.round(c + (goodColor[i] - c) * res)).join(', ') + ')';
}

class ResultsView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const res = this.props.learntId.size / this.props.data.data.dictionary.entries.length;

        const angle = 2 * Math.PI * res;
        const arc = d3.arc().innerRadius(80).outerRadius(100).startAngle(0).endAngle(angle);
        const svg = d3.select('#learn-result-circle')
            .append('svg')
            .attr('width', 250)
            .attr('height', 250)
            .append('g')
            .attr("transform", "translate(125,125)")
            .style('fill', getResultColor(res));

        svg.append('path').attr('class', 'learn-result-arc').attr('d', arc);
        svg.append('text')
            .text(this.props.learntId.size)
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '.35em')
            .attr('fill', getResultColor(res))
            .attr('font-size', '80px')
            .style('text-anchor', 'middle');
    }

    handleContinue() {
        this.props.onContinue();
    }

    render() {
        const handleContinue = this.handleContinue.bind(this);

        const passed = (this.props.learntId.size === this.props.data.data.dictionary.entries.length);

        const repeatRows = (
            <TableBody displayRowCheckbox={false}>
                {this.props.data.data.dictionary.entries.map((entry, i) =>
                    !this.props.learntId.has(entry.id.toString()) && <TableRow key={i}>
                        {entry.units.map((unit, j) =>
                            <TableRowColumn key={j}>{unit.content}</TableRowColumn>
                        )}
                    </TableRow>
                )}
            </TableBody>
        );

        return (
            <div>
                <div className="text-center">
                    <h3>Test completed. Your result is:</h3>
                    <div id="learn-result-circle"/>
                </div>

                {!passed && (<div>
                    <h4>This words need to be repeated:</h4>
                    <Table selectable={false}>
                        {repeatRows}
                    </Table>
                </div>)}

                <div className="learn-continue-wrap text-right">
                    <RaisedButton primary={true} label={'Continue ' + String.fromCharCode(187)}
                                  onClick={handleContinue}/>
                </div>
            </div>
        )
    }
}

export {ResultsView};