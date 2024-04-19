"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";

const accordinContentBorrow = [
  {
    headline: "What is USDa? ",
    content: `<p> A Delta-neutral Colored stablecoin soft pegged to US dollar, allowing minting $1 in USDa for every $1 crypto collateral. The Delta-neutral mechanism hedges crypto collateral volatility, ensuring each stablecoin is backed by $1 crypto asset.</p> 
    <br>
    `,
  },
  {
    headline: "Why USDa design a big deal in the decentralized stablecoin space?",
    content: `
    <p>
    Presently, decentralized stablecoin protocols require >= 200% collateralization i.e. you deposit $2 in crypto assets as collateral for every $1 in stablecoin minted which is a net negative in terms of liquidity for the entire space. Autonomint USDa has solved this issue with its 100% capital efficiency.
    </p>`,
  },
  {
    headline: "How is USDa stabilized by derivatives?",
    content: `Whenever a user mints USDa through collateralization with a crypto asset, a derivative position is automatically initiated to safeguard the user's crypto asset from market fluctuations. Users incur "Option Fees," deducted from the total USDa borrowed, which are then distributed to dCDS users who serve as counterparts in this transaction. 
    `,
  },
  {
    headline:
      " How users are offered volatility protection on their crypto assets?",
    content: `When minting and borrowing USDa, you enjoy 20% downside protection on your crypto assets. For instance, if you deposit $1000 worth of stETH, the protocol safeguards $200 of stETH against a decline. When repaying USDa, even if stETH's price falls to $800, you'll receive the full $1000 value, thanks to the attached derivative position provided by dCDS
    `,
  },
  {
    headline:
      " What does “Surrender your Upside” means?",
    content: `Users sacrifice a percentage of their gains, like 5% or 10%, to dCDS users. This affects the "option fees" for derivatives. For instance, if you deposit $1000 in stETH to mint USDa and stETH rises to $1500, surrendering $50 of your gains leaves you with $1450 in stETH value. With the ability to mint up to 1000 USDa, there's effectively no loss, enabling you to buy more stETH than with other protocols.`,
  },
  {
    headline: "How is USDa a yield bearing stablecoin?",
    content: `User-deposited crypto collateral earns yields across protocols. For example, stETH can be lent or used in a Perp solution, generating yields for USDa minters. These yields cover staking, lending, and Perp funding, helping users recover fees paid to the protocol.`,
  },
  {
    headline:
      "What is the role of ABOND?",
    content: `A Colored redeemable yield asset minted upon returning a stablecoin loan. Backed by deposited crypto collateral, each ABOND is worth >1.2 ETH and redeemable for at least $4. Every ABOND token is uniquely colored, capturing its applicable yield, which evolves as it circulates. This uniqueness doesn’t affect it’s fungible nature. Holders can trade or redeem ABOND to reclaim both yield and backing crypto collateral (ETH/stETH)`,
  },
];

const accordinContentCDS = [
    {
      headline: "What is dCDS? ",
      content: `<p> dCDS stands for decentralized credit default swaps, enabling users to collectively manage the credit risk of multiple USDa minters. dCDS users offer volatility and credit risk protection by hedging downside crypto collateral and participating in liquidations if borrowers default.

      `,
    },
    {
      headline: "What assets can be deposited in dCDS?",
      content: `
      <p>
      Currently, USDa or USDT can be deposited, with plans to include volatile crypto assets like COMP, AAVE etc. in the future
      </p>`,
    },
    {
      headline: "What's the Lock-in Period?      ",
      content: `Presently, users must lock their deposits for a minimum of 1 month. Once the protocol surpasses a $10 million TVL milestone on the mainnet, this requirement will be reduced to less than a week.

      `,
    },
    {
      headline:
        "What APY is offered for dCDS users?",
      content: `dCDS users receive derivatives fees from multiple USDa borrowers, potentially yielding up to 200% APY. However, this position carries high risk, with the possibility of losses exceeding 50% if borrowing activity is low.

      `,
    },
    {
      headline:
        " What are Liquidation Gains?        ",
      content: `Users can opt for Liquidation Gains, where their deposits cover defaulted borrower amounts. Since the borrower defaults, any accrued 20% downside protection returns to the dCDS user, potentially mitigating losses.
      `,
    },
  ];

const Faq = () => {
  const [allFaqVisible, setFaqVisible] = useState(false);
const [accordinContent, setAccordinContent] = useState(accordinContentBorrow);
const [accordintype, setAccordintype] = useState("borrow");
  return (
    <div className="mx-auto max-w-[1440px] w-full px-4">
      <div className="">
        <div className="mb-[15px]">
          <p className=" font-semibold text-[20px] text-[#808080]">
            <button className={`mr-2 tracking-[2px] ${accordintype=="borrow"?'underline':""} `} onClick={()=>{setAccordinContent(accordinContentBorrow); setAccordintype("borrow")}}> Borrow & Mint FAQs </button> / <button onClick={()=>{setAccordinContent(accordinContentCDS); setAccordintype("dcds")}} className={`ml-2 tracking-[2px] ${accordintype=="dcds"?'underline':""} `}>dCDS FAQs </button>
          </p>
        </div>
        {!allFaqVisible ? (
          <div className="flex flex-col w-full">
            <Accordion type="single" collapsible>
              {accordinContent.slice(0, 5).map((content, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="max-sm:justify-center max-sm:gap-5">
                    {content.headline}
                  </AccordionTrigger>
                  <AccordionContent>{parse(content.content)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button
              variant={"ghost"}
              className="self-end "
              onClick={() => setFaqVisible(true)}
            >
              Read More...
            </Button>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <Accordion type="single" collapsible>
              {accordinContent.map((content, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="max-sm:justify-center max-sm:gap-5">
                    {content.headline}
                  </AccordionTrigger>
                  <AccordionContent>{parse(content.content)}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button
              variant={"ghost"}
              className="self-end "
              onClick={() => setFaqVisible(false)}
            >
              Hide
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Faq;
