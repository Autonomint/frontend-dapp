Folder Structure:-

WalletorContent
    -Create NewDeposit
    -OurTable
        -TableRows
        -Withdraw

-----------------------------------------------------------------------------------------------------------------------
##WalletorContent
Dependencies

wagmi: A library for Ethereum dApp development. It provides hooks like useAccount and useChainId to interact with the user's Ethereum account and the current chain ID.
react-query: A library for fetching, caching, synchronizing and updating server state in React applications. It provides hooks like useQuery and useQueryClient.
Backend API: The component fetches data from a backend API, the URL of which is stored in BACKEND_API_URL.
Custom components: The component uses several custom components, including CreateNewDeposit, ConnectWallet, and DepositAndWithDrawTable.
UI components: The component uses several UI components, including Dialog and DialogContent.
Props
This component doesn't seem to directly accept any props in the provided excerpt. However, it's likely that it does accept some props related to the user's account or the current chain ID.

Structure
The component maintains several pieces of state:

isConnected, address, and activeConnector: These are derived from the useAccount hook and represent the state of the user's connection to their Ethereum wallet.
chainId: This is derived from the useChainId hook and represents the ID of the current Ethereum chain.
open2 and newtxn: These are local state variables managed with useState. Their purpose is not clear from the provided excerpt.
ethPrice: This is derived from the useReadBorrowingContractGetUsdValue hook and represents the price of ETH in USD.
depositorData and depositorDataError: These are derived from the useQuery hook and represent the data and any error from fetching the depositor data.
The component defines a function getDepositorData that fetches the depositor data for a given address from the backend API.

The component conditionally renders different components based on the state of the user's connection to their wallet. If the user is connected, it renders the CreateNewDeposit and DepositAndWithDrawTable components. If the user is not connected, it renders the ConnectWallet components

--------------------------------------------------------------------------------------------------------------------------

##CreateNewDeposit
Overview
The CreateNewDeposit.tsx file is a React component that appears to be a form for creating a new deposit. It uses several components from a form library, likely react-hook-form given the use of Controller and Form related components.

##Dependencies
React
react-hook-form (or similar form library)
A UI library for the Input, Select, FormControl, FormItem, FormField components (possibly a custom library or something like Tailwind CSS for styling)

##Props
This component doesn't seem to directly accept any props in the provided excerpt. However, it's likely that it does accept some props related to form handling, such as a submit handler or initial form values.

--------------------------------------------------------------------------------------------------------------------------
##Withdraw

Dependencies
This file seems to use the following dependencies:

React (for building the component)
Some form of toast notification library (for displaying notifications)
BigInt (for handling large integer calculations)
Props
Without the full file, it's hard to determine all the props this component might be using. However, from the given excerpt, it seems like the component might be using the following props:

details: An object that contains information about the deposit or withdrawal. It seems to have properties like status and normalizedAmount.
lastCumulativeRate: A value used in the calculation of totalAmintAmnt.
calculateCumulativeRate, approveReset, cumulativeReset, borrowReset: Functions that are called within the component. Their exact purpose isn't clear from the excerpt.
Structure
The file contains several functions:

handleWithdrawalTime: This function handles the withdrawal time based on the current value of withdrawalTime. It also resets some values and calculates the cumulative rate if the details.status is "DEPOSITED".

handleDepositData: This function updates the deposit data based on the provided details. It calculates totalAmintAmnt using details.normalizedAmount and lastCumulativeRate.

There's also a React effect hook that runs when withdrawDataLog changes. This hook seems to handle a failed withdrawal scenario, showing a toast notification and resetting some values.