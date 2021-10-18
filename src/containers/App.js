import { connect } from "react-redux";
import App from "../App";

const mapDispatchToProps = () => {
    return {};
};

const mapStateToProps = (state) => {
    return {
        placeholder: state.placeholder,
    };
};

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
