import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useReadAbondTotalSupply, useReadUsDaTotalSupply, useReadCdsTotalCdsDepositedAmount, useReadTreasuryTotalVolumeOfBorrowersAmountinUsd } from '@/abiAndHooks';
import { formatEther } from 'viem';
import Image from 'next/image';
import left_arrow from '@/app/assets/left_arrow.svg';
import right_arrow from '@/app/assets/right_arrow.svg';

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ position: 'absolute', left: 70, top: '-4%', transform: 'translateY(-50%)', padding: '10px', cursor: 'pointer', zIndex: 2 }}
    >
      <Image src={left_arrow} alt="left_arrow" className='text-white' width={30} height={30} />
      {/* <ArrowLeftCircle size={30} color='gray' /> */}
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{ position: 'absolute', right: 70, top: '-4%', transform: 'translateY(-50%)', padding: '10px', cursor: 'pointer', zIndex: 2 }}
    >
      <Image src={right_arrow} alt="right_arrow" className='dark:text-white' width={30} height={30} />
      {/* <ArrowRightCircle size={30} color='gray' /> */}
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


const BorrowSlider = ({
  open,
  opentoggler
}: {
  open: Boolean,
  opentoggler: Function
}) => {

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-top absolute h-10 -top-8  font-bold ",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    cssEase: "linear",
    pauseOnHover: true,

  }

  const { data: totalStable } = useReadCdsTotalCdsDepositedAmount()
  const { data: ethLocked } = useReadTreasuryTotalVolumeOfBorrowersAmountinUsd()
  const { data: amintsupply } = useReadUsDaTotalSupply()
  const { data: abondSupply } = useReadAbondTotalSupply();


  return (
    <div className={`${open ? "" : "hidden"} absolute w-full h-full `}>



      <div onClick={() => opentoggler(!open)} className={` absolute z-50  h-full w-full backdrop-blur-sm  `}>
      </div>

        {
          open ? (
            <div className='absolute z-50 px-4 pt-4 pb-2 transition-all duration-500 ease-in-out border border-black dark:border-[#FFFFFF] animate-in-out left-5 top-24 '>
            <div className=" w-[300px] mt-5">
            <Slider {...settings}>

              <div   >
                <div className='mb-4  mx-auto text-xl font-bold text-center border text-white py-12 border-black bg-[linear-gradient(254.52deg,#65C578_0%,#23D1F6_100%)]'>
                  Borrow & Mint
                </div>
                <div className='min-w-200px mx-auto text-[0.75rem] text-[#0F0F0F] dark:text-white'>
                  Mint stablecoins at 80% LTV by depositing crypto collateral (currently ETH). Enhance to 100% synthetic LTV by opting for 20% downside protection on your crypto price. Surrender a percentage of your upside and pay option fees to achieve this synthetic LTV.
                </div>
                <div className='text-[0.8rem] flex flex-col  gap-2 mt-5 text-[#0F0F0F] dark:text-white'>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202] dark:border-white'> <p> Borrowing TVL</p>  <p className='font-bold'>${formatNumber(Number(formatEther((ethLocked ?? 0n) / BigInt(100))))}</p>  </div>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202] dark:border-white'> <p >USDa Supply</p>  <p className='font-bold'>{formatNumber(Number(amintsupply) / 10 ** 6)}</p>  </div>
                  <div className='flex justify-between py-1 text-md '> <p>USDa Price</p>  <p className='font-bold'>$1</p>  </div>
                </div>
              </div>


              <div >
                <div className='mb-4 mx-auto text-xl font-bold text-center border text-white py-12 border-black bg-[linear-gradient(254.52deg,#C191FE_0%,#29CEF6_100%);]'>
                  dCDS
                </div>
                <div className='mx-auto text-[0.75rem] text-[#0F0F0F] dark:text-white'>
                  Want to be on the earning side of those sweet derivative fees? Deposit USDa or TUSDT and ride the wave with potential gains of up to 200% APY. Keep in mind, it's high risk, high reward territory so risks of losing your capital are directly correlated with amount of fall in crypto collateral price.
                </div>
                <div className='text-[0.8rem] flex flex-col gap-2 mt-5 text-[#0F0F0F] dark:text-white'>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202] dark:border-white'> <p> dCDS TVL</p>  <p className='font-bold'>${formatNumber(Number(totalStable) / 10 ** 6)}</p>  </div>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202] dark:border-white'> <p>APY</p>  <p className='font-bold'>5%-200%</p>  </div>
                  <div className='flex justify-between py-1 text-md '> <p> dCDS P/L</p>  <p className='font-bold'>0%</p>  </div>
                </div>
              </div>


              <div >
                <div className='mb-4  mx-auto text-xl font-bold text-center border text-white py-12 border-black bg-[linear-gradient(254.52deg,#C191FE_0%,#2ACEF6_100%)]'>
                  Loan Repayment
                </div>
                <div className='mx-auto text-[0.75rem] text-[#0F0F0F] dark:text-white'>
                  Once you've settled your stablecoin loan, get back half of your crypto collateral upfront, and the rest after a month. Plus, snag some ABOND—redeemable at $4 and backed by half of your crypto stash. Your collateral doesn't just sit idle; it's out there, earning you yields. Ready to cash in? Head over to the "Redeem" page after one month.
                </div>
                <div className='text-[0.8rem] flex flex-col mt-5 gap-2 text-[#0F0F0F] dark:text-white'>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202] dark:border-white'> <p> Borrowing TVL</p>  <p className='font-bold'>${formatNumber(Number(formatEther((ethLocked ?? 0n) / BigInt(100))))}</p>  </div>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202] dark:border-white'> <p>ABOND Supply</p>  <p className='font-bold'>{formatNumber(Number(abondSupply) / 10 ** 18)}</p>  </div>
                  <div className='flex justify-between py-1 text-md '> <p> ABOND APY</p>  <p className='font-bold'>200%</p>  </div>
                </div>
              </div>

            </Slider>
          </div>
      </div>
          ):("")
          
        }



    </div>

  )
}


export default BorrowSlider;

