# Dashboard Readme

This file contains the code for the dashboard page of the Autonomint frontend dapp.

## File Path

/c:/Autonomint/frontend-dapp/app/dashboard/Readme.txt

## Description

The dashboard page displays various statistics and charts related to the Autonomint dapp. It includes information about AMINT and ABOND tokens, value locked, collateral ratio, fees, and more.

## Dependencies

- next/image
- react
- @/app/assets/toll.svg
- @/app/assets/local_atm.svg
- @/app/assets/donut_small.svg
- @/app/assets/eth.svg
- @/app/assets/mantle.svg
- @/app/assets/matic.svg
- @/app/assets/send_money.svg
- @/components/Header/HeaderItems
- ./Charts
- ./RatioPieChart
- @/abiAndHooks
- ethers
- @/constants/BackendUrl
- @/hooks/useChainId
- @/hooks/useAccount
- @/components/ConnectWallet/ConnectWallet
- @tanstack/react-query
- axios


##Flow and Logic
The code in the file represents the logic and flow of the dashboard page. Here's a breakdown of the key components and functions:

The page component is the main component for the dashboard page. It contains various hooks and state variables for managing the page's data and loading state.

The handleStatsItem function is responsible for updating the statistics values based on the fetched data. It calculates and formats the values for AMINT, locked values, ratio values, and fees values.

The FeesComp component displays the fees information, including borrowing fees, option fees, total collateral protected, total upside gained, and total ABOND yield.

The CollateralRatio component displays the ratio of collaterals, including the current ratio, total dCDS pool value, net dCDS pool value, and dCDS profit/loss.

The ValueLocked component displays the value locked information, including the total value locked, total stablecoins locked, and total assets locked.

The DashboardCard component displays a card with specific statistics and a corresponding chart.

The Charts component is used to render various charts on the dashboard page.

The RatioPieChart component is used to render a pie chart for the collateral ratio.

The HeaderItems component is used to display individual statistics values in the dashboard cards.

The ConnectWallet component is rendered if the user is not connected to a wallet.


-------------------------------------------------------------------------------------------------------------------------------------------------------------



### RatioPieChart Component
File Path
/c:/Autonomint/frontend-dapp/app/dashboard/RatioPieChart.tsx

##Description
The RatioPieChart component is a React functional component that renders a pie chart using the recharts library. This pie chart is used to display the ratio of collaterals in the Autonomint dapp.

##Dependencies
react
recharts
Flow and Logic


The RatioPieChart component takes two props: collaterals and dcds. These props represent the values that will be displayed in the pie chart.

The component defines two color arrays, COLORS and COLORS2, which are used to color the pie chart.

The data array is initialized with two objects, each representing a slice of the pie chart. The value property of these objects will be updated with the collaterals and dcds props.

In the useEffect hook, the value properties of the data array are updated with the collaterals and dcds props. This hook runs whenever the collaterals or dcds props change.

The component renders a PieChart inside a ResponsiveContainer. The PieChart contains a Pie component, which takes the data array as its data prop.

The Pie component renders a Cell for each object in the data array. The fill prop of the Cell is set to a linear gradient color defined in the defs section of the PieChart.

The component renders a second PieChart with a different set of colors and radii. This creates a layered effect in the pie chart.

The RatioPieChart component is exported as a default export.

Overall, the RatioPieChart component is responsible for rendering a pie chart that displays the ratio of collaterals in the Autonomint dapp. It updates the chart whenever the collaterals or dcds props change.


-------------------------------------------------------------------------------------------------------------------------------------------------------------



# Charts Component

This is a React component for displaying a line chart with data fetched from a backend API. The chart can be customized to display data for different time periods.

## Props

- `height` (optional): The height of the chart. Defaults to 400.
- `title` (required): The title of the chart. Used to determine the type of data to fetch and display.

## State Variables

- `time`: The current time period for the chart. Can be "720" (All Time), "365" (1 Year), "180" (6 Months), "30" (1 Month), or "10" (10 Days).
- `chartData`: The data for the chart. Fetched from the backend API.

## Functions

- `changeTime`: Fetches the data from the backend API and updates the `chartData` state variable.

## Usage

Import the component and include it in your JSX:

```jsx
import Charts from './Charts';

// ...

<Charts title="My Chart" />

-------------------------------------------------------------------------------------------------------------------------------------------------------------
