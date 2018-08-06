import React, {Component} from 'react';

import PropTypes from 'prop-types';
import classnames from 'classnames';

const STATUSES = [ 'disconnected', 'loading', 'connecting', 'importing', 'finishing', 'connected' ];

class BarComponent extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        percent: PropTypes.number.isRequired,
        onTop: PropTypes.bool,
        autoIncrement: PropTypes.bool,
        intervalTime: PropTypes.number,
    };

    static defaultProps = {
        className: '',
        percent: -1,
        onTop: false,
        autoIncrement: false,
        intervalTime: 200,
    };

    state = {
        percent: -1,
        message: STATUSES[0]
    };

    componentDidMount = () => {
        this.handleProps(this.props);
    };

    componentWillReceiveProps = (nextProps) => {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.handleProps(nextProps);
    };

    componentWillUnmount = () => {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    };

    increment = () => {
        let { percent } = this.state;
        percent += ((Math.random() + 1) - Math.random());
        percent = percent < 99 ? percent : 99;
        this.setState({
            percent
        });
    };



    handleProps = (props) => {
        const { autoIncrement, percent, intervalTime } = props;
        if (autoIncrement && percent >= 0 && percent < 99) {
            this.interval = setInterval(this.increment, intervalTime);
        }

        if (percent >= 100) {
            this.setState({
                percent: 99.9
            }, () => {
                this.timeout = setTimeout(() => {
                    this.setState({
                        percent: -1
                    });
                }, 400);
            });
        } else {
            this.setState({
                percent
            });
        }
    };

    start = () => {
        this.setState({
            percent: 0,
            intervalTime: (Math.random() * 1000)
        });
    };

    render() {
        const { onTop } = this.props;
        let { className } = this.props;
        const { percent } = this.state;
        className = classnames('progress-bar', className, {
            'progress-bar-on-top': onTop,
            'progress-bar-hide': percent < 0 || percent >= 100
        });
        const style = { width: `${percent < 0 ? 0 : percent}%` };
        return (
            <div className={className}>
                <div className="progress-bar-percent" style={style}/>
                <h2>Status: {this.state.message}</h2>
            </div>

        );
    }
}

export default BarComponent;