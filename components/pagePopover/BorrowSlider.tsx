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
      <Image src={left_arrow} alt="left_arrow" width={30} height={30} />
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
      <Image src={right_arrow} alt="right_arrow" width={30} height={30} />
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
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-top absolute -top-8  font-bold ",
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",

  }

  const { data: totalStable } = useCdsTotalCdsDepositedAmount({ watch: true })
  const { data: ethLocked } = useTreasuryTotalVolumeOfBorrowersAmountinUsd({ watch: true })
  const { data: amintsupply } = useAmintTotalSupply({ watch: true })
  const { data: abondSupply } = useAbondTotalSupply({ watch: true });


  return (
    <div className={`${open ? "" : "hidden"} absolute left-0 w-[300px] h-[84vh]`}>

      <div onClick={() => opentoggler(!open)} className={`${open ? "" : "hidden"} fixed left-10 z-50  w-full h-[80vh] backdrop-blur-sm  `}>
      </div>
      <div className='absolute z-50 border border-black left-5 top-24'>

        <div className='flex  flex-col h-auto items-center justify-center  bg-white dark:bg-[#141414] px-4 gap-4 pt-4 pb-2  rounded-md shadow-sm '>
        {isLoaded?(
          <div className="slider-container transition-all duration-300 ease-in-out w-[300px] mt-5">
            <Slider className='w-[300px]'  {...settings}>

              <div className='w-full' >
                <div className='mb-4  mx-auto text-xl font-bold text-center border text-white py-12 border-black bg-[linear-gradient(254.52deg,#65C578_0%,#23D1F6_100%)]'>
                  Borrow & Mint
                </div>
                <div className='mx-auto text-[0.75rem] text-[#0F0F0F] '>
                  Mint stablecoins at 80% LTV by depositing crypto collateral (currently ETH). Enhance to 100% synthetic LTV by opting for 20% downside protection on your crypto price. Surrender a percentage of your upside and pay option fees to achieve this synthetic LTV.
                </div>
                <div className='text-[0.8rem] flex flex-col  gap-2 mt-5 text-[#0F0F0F]'>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202]'> <p> Borrowing TVL</p>  <p className='font-bold'>${formatNumber(Number(formatEther((ethLocked ?? 0n) / BigInt(100))))}</p>  </div>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202]'> <p >USDa Supply</p>  <p className='font-bold'>{formatNumber(Number(amintsupply) / 10 ** 6)}</p>  </div>
                  <div className='flex justify-between py-1 text-md '> <p>USDa Price</p>  <p className='font-bold'>$1</p>  </div>
                </div>

              </div>
              <div >
                <div className='mb-4 mx-auto text-xl font-bold text-center border text-white py-12 border-black bg-[linear-gradient(254.52deg,#C191FE_0%,#29CEF6_100%);]'>
                  dCDS
                </div>
                <div className='mx-auto text-[0.75rem] text-[#0F0F0F]'>
                  Want to be on the earning side of those sweet derivative fees? Deposit USDa or TUSDT and ride the wave with potential gains of up to 200% APY. Keep in mind, it's high risk, high reward territory so risks of losing your capital are directly correlated with amount of fall in crypto collateral price.
                </div>
                <div className='text-[0.8rem] flex flex-col gap-2 mt-5 text-[#0F0F0F]'>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202]'> <p> dCDS TVL</p>  <p className='font-bold'>${formatNumber(Number(totalStable) / 10 ** 6)}</p>  </div>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202]'> <p>APY</p>  <p className='font-bold'>5%-200%</p>  </div>
                  <div className='flex justify-between py-1 text-md '> <p> dCDS P/L</p>  <p className='font-bold'>0%</p>  </div>
                </div>

              </div>
              <div >
                <div className='mb-4  mx-auto text-xl font-bold text-center border text-white py-12 border-black bg-[linear-gradient(254.52deg,#C191FE_0%,#2ACEF6_100%)]'>
                  Loan Repayment
                </div>
                <div className='mx-auto text-[0.75rem] text-[#0F0F0F]'>
                  Once you've settled your stablecoin loan, get back half of your crypto collateral upfront, and the rest after a month. Plus, snag some ABOND—redeemable at $4 and backed by half of your crypto stash. Your collateral doesn't just sit idle; it's out there, earning you yields. Ready to cash in? Head over to the "Redeem" page after one month.
                </div>
                <div className='text-[0.8rem] flex flex-col mt-5 gap-2 text-[#0F0F0F]'>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202]'> <p> Borrowing TVL</p>  <p className='font-bold'>${formatNumber(Number(formatEther((ethLocked ?? 0n) / BigInt(100))))}</p>  </div>
                  <div className='flex justify-between text-md py-1 border-b border-[#020202]'> <p>ABOND Supply</p>  <p className='font-bold'>{formatNumber(Number(abondSupply) / 10 ** 18)}</p>  </div>
                  <div className='flex justify-between py-1 text-md '> <p> ABOND APY</p>  <p className='font-bold'>200%</p>  </div>
                </div>
              </div>
            </Slider>
          </div>
        ):("")}
          

        </div>
      </div>
    </div>

  )
}


export default BorrowSlider;