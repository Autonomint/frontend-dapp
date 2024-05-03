import React from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import Divider from '../CustomUI/Divider/Divider';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBigLeft, ArrowBigRight, ArrowLeftCircle, ArrowRightCircle, ArrowRightLeftIcon, MoveRightIcon } from 'lucide-react';
import { useAbondTotalSupply, useAmintTotalSupply, useBorrowingContractGetUsdValue, useBorrowingContractLastCdsPoolValue, useCdsTotalCdsDepositedAmount, useTreasuryTotalVolumeOfBorrowersAmountinUsd } from '@/abiAndHooks';
import { formatEther } from 'viem';

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ position: 'absolute', left: -30, top: '50%', transform: 'translateY(-50%)', padding: '10px', cursor: 'pointer', zIndex: 2 }}
    >
      <ArrowLeftCircle size={30} color='gray' />
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ position: 'absolute', right: -30, top: '50%', transform: 'translateY(-50%)', padding: '10px', cursor: 'pointer', zIndex: 2 }}
    >
      <ArrowRightCircle size={30} color='gray' />
    </div>
  );
};

function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'k';
  } else {
    return num.toFixed(2);
  }
}


export default function BorrowSlider() {
  const settings = {

    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear"
  }


  const { data: totalStable } = useCdsTotalCdsDepositedAmount({ watch: true })
  const { data: ethPrice} = useBorrowingContractGetUsdValue({ watch: true })
  const { data: ethLocked } = useTreasuryTotalVolumeOfBorrowersAmountinUsd({ watch: true })
  const { data: amintsupply } = useAmintTotalSupply({ watch: true })
  const { data: cdsPool } = useBorrowingContractLastCdsPoolValue({ watch: true })
  const { data: abondSupply} = useAbondTotalSupply({ watch: true });

  
  return (
    <div className='flex flex-col w-[350px] h-fit items-center justify-center  bg-white dark:bg-[#141414] px-4 gap-4 pt-4 pb-2 mt-10 lg:mt-20 rounded-md shadow-sm '>
      <div className="slider-container">
        <Slider className=' w-[300px] px-3' {...settings}>

          <div className=''>
            <div className='mb-4 text-xl font-bold text-center'>
              Borrow & Mint
            </div>
            <Divider />
            <div className='text-[0.8rem] flex flex-col px-8 gap-2'>
              <div className='flex justify-between text-md'> <p> Borrowing TVL</p>  <p>${formatNumber(Number(formatEther((ethLocked ?? 0n) / BigInt(100))))}</p>  </div>
              <div className='flex justify-between text-md'> <p>USDa Supply</p>  <p>{formatNumber(Number(amintsupply) / 10 ** 6)}</p>  </div>
              <div className='flex justify-between text-md'> <p>USDa Price</p>  <p>$1</p>  </div>
            </div>
            <Divider />
            <div className='text-sm text-center shadow-md mx-auto border rounded-md bg-[linear-gradient(to_bottom,#f6f6f6_0%,white_100%)] dark:bg-[linear-gradient(to_bottom,#020202_0%,#141414_50%)] dark:border-gray-800 p-2'>
              Mint stablecoins at 80% LTV by depositing crypto collateral (currently ETH). Enhance to 100% synthetic LTV by opting for 20% downside protection on your crypto price. Surrender a percentage of your upside and pay option fees to achieve this synthetic LTV.
            </div>
          </div>
          <div className=''>
            <div className='mb-4 text-xl font-bold text-center'>
              dCDS
            </div>
            <Divider />
            <div className='text-[0.8rem] flex flex-col px-8 gap-2'>
              <div className='flex justify-between text-md'> <p> dCDS TVL</p>  <p>${formatNumber(Number(totalStable) / 10 ** 6)}</p>  </div>
              <div className='flex justify-between text-md'> <p>APY</p>  <p>200%</p>  </div>
              <div className='flex justify-between text-md'> <p> dCDS P/L</p>  <p>0%</p>  </div>
            </div>
            <Divider />
            <div className='text-sm text-center mx-auto border rounded-md bg-[linear-gradient(to_bottom,#f6f6f6_0%,white_100%)] dark:bg-[linear-gradient(to_bottom,#020202_0%,#141414_50%)] dark:border-gray-800 p-2'>
              Want to be on the earning side of those sweet derivative fees? Deposit USDa or TUSDT and ride the wave with potential gains of up to 200% APY. Keep in mind, it's high risk, high reward territory so risks of losing your capital are directly correlated with amount of fall in crypto collateral price.
            </div>
          </div>
          <div className=''>
            <div className='mb-4 text-xl font-bold text-center'>
              Loan Repayment
            </div>
            <Divider />
            <div className='text-[0.8rem] flex flex-col px-8 gap-2'>
              <div className='flex justify-between text-md'> <p> Borrowing TVL</p>  <p>${formatNumber(Number(formatEther((ethLocked ?? 0n) / BigInt(100))))}</p>  </div>
              <div className='flex justify-between text-md'> <p>ABOND Supply</p>  <p>{formatNumber(Number(abondSupply) / 10 ** 18)}</p>  </div>
              <div className='flex justify-between text-md'> <p> ABOND APY</p>  <p>200%</p>  </div>
            </div>
            <Divider />
            <div className='text-sm text-center mx-auto border rounded-md bg-[linear-gradient(to_bottom,#f6f6f6_0%,white_100%)] dark:bg-[linear-gradient(to_bottom,#020202_0%,#141414_50%)] dark:border-gray-800 p-2'>
              Once you've settled your stablecoin loan, get back half of your crypto collateral upfront, and the rest after a month. Plus, snag some ABOND—redeemable at $4 and backed by half of your crypto stash. Your collateral doesn't just sit idle; it's out there, earning you yields. Ready to cash in? Head over to the "Redeem" page after one month.
            </div>
          </div>
        </Slider>
      </div>

    </div>
  )
}
