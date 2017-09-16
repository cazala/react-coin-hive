import React, { Component } from 'react'
import { render } from 'react-dom'

import CoinHive from '../../src'

class Demo extends Component {

  render() {
    return <div>
      <h1>react-coin-hive Demo</h1>
      <CoinHive
        siteKey='NjBUIBfgmgqwSRGjemP5JQCNFJu5UJTx'
        onInit={miner => setInterval(() => console.log(miner.getHashesPerSecond()), 1000)}
        onStart={() => console.log('started')}
        onStop={() => console.log('stopped')}
      />
    </div>
  }
}

render(<Demo />, document.querySelector('#demo'))
