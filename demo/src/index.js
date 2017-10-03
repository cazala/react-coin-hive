import React, { Component } from 'react'
import { render } from 'react-dom'

import CoinHive from '../../src'

class Demo extends Component {
  state = {
    autoThreads: true,
  }

  _handleEnableAutoThreads = () => {
    this.setState({ autoThreads: true })
  }

  _handleDisableAutoThreads = () => {
    this.setState({ autoThreads: false })
  }

  render() {
    return <div>
      <h1>react-coin-hive Demo</h1>
      <div>
        autoThreads :&nbsp;
        <input
          type="button"
          value="on"
          disabled={this.state.autoThreads}
          onClick={this._handleEnableAutoThreads}
        />
        <input
          type="button"
          value="off"
          disabled={!this.state.autoThreads}
          onClick={this._handleDisableAutoThreads}
        />
      </div>
      <CoinHive
        autoThreads={this.state.autoThreads}
        onInit={miner => setInterval(() => CoinHive.displayMiner(miner), 1000)}
        onStart={() => console.log('started')}
        onStop={() => console.log('stopped')}
        siteKey='NjBUIBfgmgqwSRGjemP5JQCNFJu5UJTx'
        startOnIdle
        timeout={1000}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
