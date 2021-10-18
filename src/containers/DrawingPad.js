import { connect } from "react-redux";
import DrawingPad from "../components/DrawingPad";
import { createDrawPad, clearDrawPad, createChart } from "../actions/index";


const mapDispatchToProps = (dispatch) => {
    return {
        createDrawPad: (ref) => {
            const res = createDrawPad(ref);
            dispatch(res);
        },
        clearDrawPad: () => {
            const res = clearDrawPad();
            dispatch(res);
        },
        createChart: (ref) => {
            const res = createChart(ref);
            dispatch(res);
        },
    };
};

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas,
        context: state.context,
        chart: state.chart,
    };
};

export const DrawingPadContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingPad);
