import React, { Component } from "react";
import Button from '@material-ui/core/Button';

class DrawingPad extends Component {

    componentDidMount() {
        this.props.createDrawPad(this.refs.canvas);
    }
    render() {
        return (
            <div className="drawingPad">
                <div className="canvas">
                    <canvas ref="canvas" width="250" height="250" style={{ border: "10px inset blue" }}></canvas>
                </div>
                <Button className="clear-btn" size="large" variant="contained" color="primary" onClick={this.props.clearDrawPad}>Test Again</Button>
            </div >
        )
    }
}

export default DrawingPad;
