import { connect } from "react-redux";
import Prediction from "../components/Prediction";
import { loadModel, createChart, updateChart } from "../actions/index";


const mapDispatchToProps = (dispatch) => {
    return {
        loadModel: () => {
            const res = loadModel();
            dispatch(res);
        },
        createChart: (ref) => {
            const res = createChart(ref);
            dispatch(res);
        },
        updateChart: (ref) => {
            const res = updateChart(ref);
            dispatch(res);
        }
    };
};

const mapStateToProps = (state) => {
    return {
        currentDraw: state.currentDraw,
        answer: state.answer,
        predictions: state.predictions,
        chart: state.chart,
    };
};

export const PredictionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Prediction);
