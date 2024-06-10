##Folder structure

dcds
    -NewDeposit
    -AmintDepositRow
    -Withdraw
        -confirmNotice

--------------------------------------------------------------------------------------------------------------------

##AmintDepositRow.tsx

##This file defines a React component AmintDepositRow that is used to display a row of deposit details in a table. Each row represents a single deposit made by a user.

#Dependencies
The component imports several dependencies:

#TableCell and TableRow from "@/components/ui/table" for structuring the table.
#React, useEffect, useRef, and useState from "react" for managing state and lifecycle.
#calculateTimeDifference from "@/app/utils/calculateTimeDifference" for calculating the time difference between the deposit time and the current time.
#Button from "../ui/button" for rendering a button in the row.

#Props
##The AmintDepositRow component accepts the following props:

##structure
The AmintDepositRow component renders a TableRow with several TableCell children. Each TableCell displays a piece of information about the deposit. The information is hardcoded in the depositDetails array for now, but it should be replaced with the actual deposit details from the details prop.

--------------------------------------------------------------------------------------------------------------------

##NewDeposit.tsx

This is a TypeScript (.tsx) file, which means it's a React component written in TypeScript. It's named NewDeposit, suggesting it's related to the functionality of creating a new deposit in the application.

##Dependencies
The file imports several dependencies, which can be categorized into three groups:

UI Components: These are components used to build the UI of the NewDeposit component. They include Button, Dialog, Image, Note, Form related components, Controller, Select related components, Input, Checkbox, and several icons from @radix-ui/react-icons.

React and Hooks: The file imports React along with several hooks - use, useEffect, useRef, and useState. However, the use import seems to be a mistake as there's no such export from react. It's likely meant to be useContext.

Form Handling and Validation: The file uses useForm from react-hook-form for form handling, and zodResolver from @hookform/resolvers/zod along with zod for form validation.

Assets: The file imports several SVG assets, likely used within the component.

##structure
The exact structure of the NewDeposit component can't be determined from the provided excerpt as it only includes the import statements. However, based on the imported components and hooks, we can infer that NewDeposit is a form with various input fields, possibly wrapped in a dialog. It likely includes form validation and handles form submission. The form might include select dropdowns, checkboxes, and standard text inputs.

##Props
The props that NewDeposit component accepts can't be determined from the provided excerpt. However, typically, a form component like this might accept props like onSubmit (a callback function that's called when the form is submitted), initialValues (to pre-fill the form), and validationSchema (to validate the form inputs).

Please refer to the actual component definition (not included in the excerpt) for the exact structure and props.

-------------------------------------------------------------------------------------------------------------------------

## Withdraw

#Overview
This file appears to define a component named AmintDepositRowCopy in React. This component seems to be used for displaying details about a deposit in a financial or cryptocurrency application.

#Dependencies
This file seems to be written in TypeScript and uses React, a popular JavaScript library for building user interfaces. It doesn't appear to have any other dependencies outside of these.

#Props
The AmintDepositRowCopy component accepts the following props:

#details: This is of type DepositDetail. The exact structure of DepositDetail is not provided in the excerpt, but it's likely to contain details about a deposit.

handleSheetOpenChange: This is a function that accepts a boolean value. It's likely used to control the visibility of a modal or a sheet.

sheetOpen: This is a boolean indicating whether a modal or a sheet is open.

handleRefetch: This is a function likely used to refetch or reload data.

##Structure
The component defines a constant depositDetails which is an array of objects. Each object represents a row of deposit details with a headline and value. The headline is a string that describes the detail, and the value is the corresponding value of that detail.

Here are the details that are currently being displayed:

USDa Deposited
USDT Deposited
ETH Price at Deposit
Deposit Time
Lock In Period
Days passed since Deposit
Each of these details is represented as an object in the depositDetails array.