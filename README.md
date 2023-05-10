# React Candlestick Chart

## Overview
Search IBM of the top 500 candle stick and pull up to date data from Alphavantage API to display in an interactive react candlestick chart.
<br />
<p align="left"><a href="https://jerrypeace.github.io/candlestick-chart/#/candleStickChart">App Demo</a></p>

## Built With

* [Create React App](https://github.com/facebook/create-react-app)
* [ApexCharts](https://apexcharts.com/)
* [MaterialUI](https://material-ui.com/)


## Data Source

* [Alphavantage](https://www.alphavantage.co/documentation/) provider time series stock data APIs.


## Development by local
ss
pull whole app from github and access root directory of app

### Run Client server

```
yarn
yarn start
open http://localhost:3000/#/candleStickChart
```

### Build and run Docker image

```
docker build -t candlestickchart .
docker run --rm -it candlestickchart:latest
open http://localhost:3000/#/candleStickChart
  ```

###  Unit Test
```
yarn test
yarn test --coverage
```
2. `react-testing-library` - Please use [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) and it's a react official recommendation solution for testing React components and hooks function.


###  Pre-commit Hooks
We set up two git pre-commit hooks:

1. `prettier` - this will check the js file and formate it automatically.
2. `@typescript-eslint` - this will check the ts file if there have any linter problems.


### Front-end File Structure
```
└── /src
  ├── /components - reusable components like navigation bar, buttons, forms
  ├── /services - all apis or services function would be here
  ├── /hooks - Contains common hook function
  ├── /providers - Contains all provider context
  ├── /utils - utilities, helpers, constants.
  ├── /views/pages - majority of the app pages would be here
  ├── index.tsx
  └── App.tsx
```
Reference: [React File structure](https://reactjs.org/docs/faq-structure.html)
