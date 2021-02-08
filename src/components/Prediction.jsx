import React, { Component } from "react";
import 'typeface-roboto';
import { Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

class Prediction extends Component {

    componentDidMount() {
        this.props.loadModel();
        console.log(this.refs.chart);
        this.props.createChart(this.refs.chart);
    }
    render() {
        if (this.props.answer) {
            this.props.updateChart(this.refs.chart);
        }
        return (
            <div className="prediction" style={{ position: "relative", }} >
                {/* <Typography className="text" style={{ color: 'gray' }}>
                    {this.props.answer !== null ? "Prediction: " + this.props.answer : "Enter a digit from 0 to 9."}
                </Typography> */}
                <div className="chart" style={{ position: "absolute", top: 0, left: -225, }}>
                    <canvas ref="chart" width="450" height="450" ></canvas>

                    {/* <Doughnut
                        ref="chart"
                        width="450"
                        height="450"
                        data={{
                            labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",],
                            datasets: [
                                {
                                    label: 'Data',
                                    data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                                    backgroundColor: [
                                        // colorArray[9],
                                        "black",
                                        "yellow",
                                        "red",
                                        "green",
                                        "blue",
                                        "orange",
                                        "purple",
                                        "pink",
                                        "brown",
                                        "lavender"
                                    ],
                                    borderColor: [
                                        'white',
                                    ],
                                    borderWidth: 2
                                },
                            ]
                        }}
                        options={{
                            legend: {
                                display: false
                            },
                            rotation: 1 * Math.PI,
                            circumference: 1 * Math.PI

                        }}
                    /> */}
                </div>
                <Typography className="text" style={{ color: "black", fontWeight: 'bold', fontSize: 80, textAlign: "center", position: "absolute", marginTop: 240, left: -23 }}>
                    {this.props.answer !== null ? this.props.answer : ""}
                </Typography>
            </div >
        )
    }
}

export default Prediction;