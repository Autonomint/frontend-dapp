This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## TechStack We are using

* Next-js
* Typescript
* React/Tanstack-Query
* TailwindCSS
* Wagmi and viem for blockchain Interactions
* wagmi-cli for custom hooks for blockchain
* Recharts for charts
* Sonner for toasts
* ShadCn Ui library
* React hook form ,zod and Radix-Ui which comes inbuilt in shadcn ui library

## Setting Up

see ```.env.example``` and create a ``.env`` file with your credentials

## Setting Up Contracts Address and ABI

Go to **constants** folder and open ```Addresses.ts``` file where you can change contract addresses
and Abi of all these contracts are in the same fodler which u can change when ever there is change in your smart contracts abi

## Setting Up Custom Hooks for SmartContracts

After You have Setup the Addresses and Abi you can now setup your custom hooks for smart contracts  

Open wagmi.config.ts file and add contracts with their name of custom hooks and their abi and chain Wise addresses  

After that is done run

```bash
npx wagmi generate
```

And You will get your newly created abiAndHooks.ts file as output in root directory with all the custom hooks for blockchain interactions

For more information you can visit [Wagmi-CLI Docs](https://wagmi.sh/cli/getting-started)

## Getting Started

Now you have setup everything and we can continue with the project. We now need to first install dependencies with the command below

```bash
npm install --legacy-peer-deps
```

Then run the following

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## My Incomplete knowledge issues/Jugaad

- Read line No. 488 in `app\derivatives\NewDeposit.tsx` 

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
