import React from "react";

export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            countDownMinutes: 25,
            countDownSeconds: 0,
            timerState: 'Stopped',
            type: 'Session'
        };

        this.changeBreak = this.changeBreak.bind(this);
        this.changeSession = this.changeSession.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.runTimer = this.runTimer.bind(this);
        this.timerCountDown = this.timerCountDown.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => this.timerCountDown(), 1000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeBreak(event) {
        if (this.state.breakLength > 1 && this.state.breakLength < 60 && this.state.timerState === 'Stopped') {
            let _breakLength = this.state.breakLength + event;
            let _countDownMinutes = this.state.countDownMinutes;
            let _countDownSeconds = this.state.countDownSeconds;

            if (this.state.type === 'Break') {
                _countDownMinutes = _breakLength;
                _countDownSeconds = 0;

            }
            this.setState({
                breakLength: _breakLength,
                countDownMinutes: _countDownMinutes,
                countDownSeconds: _countDownSeconds
            });
        }
    }


    changeSession(event) {
        if (this.state.sessionLength > 1 && this.state.sessionLength < 60 && this.state.timerState === 'Stopped') {
            let _sessionLength = this.state.sessionLength + event;
            let _countDownMinutes = this.state.countDownMinutes;
            let _countDownSeconds = this.state.countDownSeconds;

            if (this.state.type === 'Session') {
                _countDownMinutes = _sessionLength;
                _countDownSeconds = 0;

            }
            this.setState({
                sessionLength: _sessionLength,
                countDownMinutes: _countDownMinutes,
                countDownSeconds: _countDownSeconds
            });
        }
    }


    resetTimer() {
        this.timerSignal.pause();
        this.timerSignal.currentTime = 0;
        this.setState({
            sessionLength: 25,
            breakLength: 5,
            countDownMinutes: 25,
            countDownSeconds: 0,
            timerState: 'Stopped',
            type: 'Session',

        });

    }


    runTimer() {
        if (this.state.timerState === 'Running') {
            this.setState({
                timerState: 'Stopped'
            });
        } else {
            this.setState({
                timerState: 'Running'
            });
            this.timerCountDown();
        }
    }

    timerCountDown() {
        if (this.state.timerState === 'Running') {
            if (this.state.countDownSeconds > 0) {
                this.setState({
                    countDownSeconds: this.state.countDownSeconds - 1
                });
            } else if (this.state.countDownSeconds === 0 && this.state.countDownMinutes > 0) {
                this.setState({
                    countDownMinutes: this.state.countDownMinutes - 1,
                    countDownSeconds: 59
                });
            } else if (this.state.countDownSeconds === 0 && this.state.countDownMinutes === 0) {
                this.timerSignal.play();
                if (this.state.type === 'Session') {
                    this.setState({
                        countDownMinutes: this.state.breakLength,
                        countDownSeconds: 0,
                        type: 'Break'
                    });
                } else if (this.state.type === 'Break') {
                    this.setState({
                        countDownMinutes: this.state.sessionLength,
                        countDownSeconds: 0,
                        type: 'Session'
                    });

                }
            }
        }
    }


    render() {
        const playButton = this.state.timerState === 'Stopped' ? <i className="fas fa-play text-white"/> : <i
    className="fas fa-pause text-white"/>;
        const isDisabled = this.state.timerState === 'Running';



            return (
            <div id="clock">
                <h1 id="title">25 + 5 Clock</h1>
                <div id="timer-wrapper" className="row justify-content-around">
                    <div id="break-label" className="col-4 d-flex flex-column align-items-center">
                        <p className="timer-control">Break Length</p>
                        <div className="controls-wrapper d-flex align-items-center">
                            <button id="break-decrement" className="btn btn-lg bg-orange" disabled={isDisabled}
                                    onClick={() => this.changeBreak(-1)}><i
                                className="fas fa-angle-down text-white"/></button>
                            <div id="break-length" className="length mx-4">{this.state.breakLength}</div>
                            {/*default value 5*/}
                            <button id="break-increment" className="btn btn-lg bg-orange" disabled={isDisabled}
                                    onClick={() => this.changeBreak(1)}>
                                <i className="fas fa-angle-up text-white"/>
                            </button>
                        </div>
                    </div>
                    <div id="timer" className="d-flex align-items-center justify-content-center col-auto">
                        <div id="timer-label">
                            <p className="timer-type">{this.state.type}</p>
                            <div
                                id="time-left">{this.state.countDownMinutes.toLocaleString(undefined, {minimumIntegerDigits: 2}) + ":" +
                            this.state.countDownSeconds.toLocaleString(undefined, {minimumIntegerDigits: 2})}</div>
                        </div>
                    </div>
                    <div id="session-label" className="col-4 d-flex flex-column align-items-center">
                        <p className="timer-control">Session Length</p>
                        <div className="controls-wrapper d-flex align-items-center">
                        <button id="session-decrement" className="btn btn-lg bg-orange" disabled={isDisabled}
                                onClick={() => this.changeSession(-1)}><i
                            className="fas fa-angle-down text-white"/></button>
                        <div id="session-length" className="length mx-4">{this.state.sessionLength}</div>
                        {/*default value 25*/}
                        <button id="session-increment" className="btn btn-lg bg-orange" disabled={isDisabled}
                                onClick={() => this.changeSession(1)}><i className="fas fa-angle-up text-white"/>
                        </button>
                        </div>
                    </div>
                </div>
                <div id="controls-block" className="d-flex align-items-center justify-content-center col-auto">
                <button id="start_stop" onClick={this.runTimer} className="btn btn-lg bg-orange">{playButton}</button>
                <button id="reset" onClick={this.resetTimer} className="btn btn-lg bg-orange"><i className="fas fa-sync-alt text-white"/>
                </button>
                </div>
                <p id="credits">by ElGfm</p>
                <audio id="beep" ref={(audio) => {
                    this.timerSignal = audio;
                }}
                       src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"/>

            </div>

        );
    }
}
