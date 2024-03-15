// Developer README

## File: /c:/Autonomint/frontend-dapp/app/redeem/page.tsx

This file contains the implementation of the Redeem page component.

### Dependencies

- `@/components/ConnectWallet/ConnectWallet`: A component for connecting the wallet.
- `constants`: A module for constants.
- `react`: The React library.
- `wagmi`: A library for interacting with the account.
- `./PoolInfo`: A custom component for displaying pool information.
- `./Redeem`: A custom component for redeeming.
- `@/components/CustomUI/Divider/Divider`: A custom UI component for a divider.
- `@/abiAndHooks`: A module containing ABI and hooks.
- `ethers`: A library for interacting with Ethereum.
- `./StateItems`: A custom component for displaying state items.

### Usage

The `page` component is exported as the default export of this file. 


-------------------------------------------------------------------------------------------------------------------------------------------------------------

### PoolInfo Component
This is a React component named PoolInfo that is used to display information about a pool. The component uses a RatioPieChart to visually represent the pool's Total Value Locked (TVL) and the remaining limit.

Props
type (required): The type of the pool. This could be any string value, such as "usdt".
value (required): The total value of the pool. This should be a number.
Components

import PoolInfo from './PoolInfo';

RatioPieChart: This is a component that displays a pie chart. It takes two props: collaterals and dcds. collaterals represents the TVL and dcds represents the remaining limit of the pool.
Usage
First, import the PoolInfo component:
<PoolInfo type="usdt" value={1000000} />

Then, you can use it inside your component's render method:

-------------------------------------------------------------------------------------------------------------------------------------------------------------


##RatioPieChart Component
File Path
/c:/Autonomint/frontend-dapp/app/Redeem/RatioPieChart.tsx

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


### Redeem Component
This is a React component named Redeem that is used to handle the redeeming process in a DeFi application. The component uses a form to get the necessary inputs from the user.

useForm Hook
The useForm hook from the react-hook-form library is used to manage the form state. The form schema is validated using the zodResolver from @hookform/resolvers/zod.

The form has three fields:

inputCollateral: The type of collateral the user wants to redeem.
collateralAmount: The amount of collateral the user wants to redeem.
outputCollateral: The type of collateral the user will receive after redeeming.
onSubmit Function
The onSubmit function is an asynchronous function that will be called when the form is submitted. The function receives the form values as its argument. The implementation of this function is not shown in the provided code.

Form Component
The Form component is used to render the form. The form has a FormField for the inputCollateral field. The inputCollateral field uses a Select component to allow the user to choose the type of collateral they want to redeem.

When the value of the Select component changes, the onValueChange function is called. This function updates the outputCollateral field based on the selected inputCollateral value.

Usage
First, import the Redeem component:

import Redeem from './Redeem';

Then, you can use it inside your component's render method:

<Redeem />

-------------------------------------------------------------------------------------------------------------------------------------------------------------
