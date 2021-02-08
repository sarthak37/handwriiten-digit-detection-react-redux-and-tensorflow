import * as tf from '@tensorflow/tfjs';
import Chart from 'chart.js';
import { update } from '@tensorflow/tfjs-layers/dist/variables';
import ReactDOM from "react-dom";
import { chartData } from "./chartData";

let called = false;
let chartContext;

const defData = {
    type: 'doughnut',
    data: {
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
    },
    options: {
        legend: {
            display: false
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI

    }
};



export function updateChart(ctx) {
    return function (dispatch, getState) {
        return (async () => {
            if (getState().answer && !called) {
                chartContext = ctx;
                let chart = getState().chart;
                console.log("before", chart);
                chart.destroy();
                // let index = getState().predictions.indexOf(getState().answer);
                console.log("TESTTSTSTSTS", getState().predictions, getState().answer)
                console.log(chartData);
                console.log("TESTTTT", chartData[getState().answer]);
                // chart.data.datasets.data = getState().predictions;
                called = true;
                chart = new Chart(ctx, chartData[getState().answer])
                // chart.data.datasets.data = getState().predictions;
                // chart.update();
                console.log("updated chart", chart);
                dispatch(setChart(chart));
                // console.log("chart from state", getState().chart)
                // getState().chart.update();
            }
        })();
    };
}

export function createChart(ref) {
    return function (dispatch, getState) {
        return (async () => {
            let data = [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
            let ctx = ref;
            let myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",],
                    datasets: [
                        {
                            label: 'Data',
                            data: data,
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
                },
                options: {
                    legend: {
                        display: false
                    },
                    rotation: 1 * Math.PI,
                    circumference: 1 * Math.PI

                }
            });
            dispatch(setChart(myChart))
        })();
    };
}

function setChart(chart) {
    return {
        type: "SET_CHART",
        chart
    };
}

export function createDrawPad(ref) {
    return function (dispatch, getState) {
        return (async () => {
            const canvas = ref;
            const context = canvas.getContext("2d");
            canvas.width = 200;
            canvas.height = 200;
            context.lineWidth = 10;
            context.strokeStyle = "grey";
            var mouse = { x: 0, y: 0 };

            canvas.addEventListener('mousemove', function (e) {
                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;

            }, false);

            canvas.addEventListener('mousedown', function (e) {
                context.beginPath();
                console.log("MOUSE DOWN", mouse.x, mouse.y)
                context.moveTo(mouse.x, mouse.y);
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);

            canvas.addEventListener('mouseup', function () {
                canvas.removeEventListener('mousemove', onPaint, false);
                console.log("MOUSE UP", mouse.x, mouse.y);
                const width = getState().right - getState().left;
                const height = getState().bottom - getState().top;
                context.rect(getState().left, getState().right, width, height);
                context.stroke();

                let scaled = document.createElement("canvas");
                let scaledContext = scaled.getContext("2d");
                scaled.width = 28;
                scaled.height = 28;
                scaledContext.drawImage(getState().canvas, 0, 0, 28, 28);
                let imageData = scaledContext.getImageData(0, 0, 28, 28);
                console.log(scaled.toDataURL('image/png'));
                // dispatch(setCurrentDraw(imageData))
                dispatch(predict(imageData));
                // console.log(getState().answer);
                // console.log(getState().predictions);
            }, false);

            var onPaint = function () {
                // dispatch(setCoordinates([...getState().arrayX, mouse.x], [...getState().arrayY, mouse.y]));
                context.lineTo(mouse.x, mouse.y);
                context.stroke();
            };
            dispatch(setDrawPad(canvas, context));
        })();
    };
}


function setDrawPad(canvas, context) {
    return {
        type: "SET_DRAWPAD",
        canvas, context,
    };
}

export function clearDrawPad() {
    return function (dispatch, getState) {
        return (async () => {
            console.log("TESTTESTTEST", getState().chart);
            const canvas = getState().canvas;
            const context = canvas.getContext('2d');;
            context.clearRect(0, 0, canvas.width, canvas.height);
            dispatch(setDrawPad(canvas, context));
            dispatch(setPredictions(null, null));
            let chart = getState().chart;
            chart.destroy();
            chart = new Chart(chartContext, defData);
            dispatch(setChart(chart))
            called = false;
        })();
    };
}

export function loadModel() {
    return function (dispatch) {
        return (async () => {
            // const model = await tf.loadModel("https://raw.githubusercontent.com/ixartz/handwritten-digit-recognition-tensorflowjs/master/public/classifiers/model.json");
            const model = await tf.loadModel("https://raw.githubusercontent.com/aralroca/MNIST_React_TensorFlowJS/master/public/assets/model.json");
            console.log(model);
            dispatch(setModel(model));
        })();
    }
}

function setModel(model) {
    return {
        type: "SET_MODEL",
        model,
    };
}

function predict(imageData) {
    return function (dispatch, getState) {
        return (async () => {
            let maxProb = 0;
            let result;
            let tensor = tf.fromPixels(imageData, 1).toFloat().reshape([1, 28, 28, 1])

            const output = await getState().model.predict(tensor);
            const predictions = Array.from(output.dataSync());

            predictions.forEach((prob, num) => {
                if (prob > maxProb) {
                    maxProb = prob;
                    result = num;
                }
            });
            output.print();
            dispatch(setPredictions(result, predictions));
        })();
    }
}

function setPredictions(answer, predictions) {
    return {
        type: "SET_PREDICTIONS",
        answer, predictions
    };
}
