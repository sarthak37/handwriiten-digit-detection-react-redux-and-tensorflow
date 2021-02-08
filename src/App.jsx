import React, { Component } from "react";
import { DrawingPadContainer } from "./containers/DrawingPad";
import { PredictionContainer } from "./containers/Prediction";
import 'typeface-roboto';
import { Typography } from '@material-ui/core';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Typography className="text" style={{ color: 'black', fontSize: 35 }}>
                   Handwritten Digit Recognization -MADE BY SARTHAK (JAVASCRIPT  DEVELOPER) 
                </Typography>
                <DrawingPadContainer />
                <Typography className="text" style={{ color: 'black', fontSize: 25 }}>
                (Draw any number in the above from   0 to 9.)
                </Typography>
                <PredictionContainer />
            </div>

        )
    }
}

export default App;
