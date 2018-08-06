import React, {Component} from 'react';
import BarComponent from './BarComponent';

class ProgressBar extends React.Component {
    state = {
        percent: -1,
        intervalTime: 200
    };

    setPercent = percent => () => {
        this.setState({
            percent
        });
    };

    start = () => {
        this.setState({
            percent: 0,
            intervalTime: (Math.random() * 1000)
        });
    };

    render() {
        return (

                <div>
                    <BarComponent
                        percent={this.state.percent}
                        autoIncrement
                        intervalTime={this.state.intervalTime}
                    />

                    <div className="text-center">
                        <div className="btn-group">
                            <button className="btn btn-default" onClick={this.start}>
                                Start
                            </button>
                        </div>
                    </div>
                </div>
        );
    }
}

export default ProgressBar;



