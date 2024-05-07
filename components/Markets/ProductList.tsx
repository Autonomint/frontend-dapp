import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import uniswap from "@/app/assets/uni.svg";
import cake from "@/app/assets/cake.svg";
import sushi from "@/app/assets/sushi.svg";
import snx from "@/app/assets/snx.svg";
import Swap from "../uniswap/Swap";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const ProductList = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  return (
    <div className="flex flex-row gap-6 min-[1440px]:gap-3 items-center 2dppx:gap-6 flex-wrap lg:flex-nowrap">
      <div className="flex flex-col md:flex-row w-full overflow-x-hidden lg:w-[100%] gap-6 min-[1440px]:gap-3 2dppx:gap-6">
        <p className="flex items-center gap-2 basis-1/5 whitespace-nowrap">
          AMINT can be bought from <ArrowRightIcon width={16} height={16} />
        </p>

        <div className="flex basis-4/5 min-w-[10rem] gap-2 overflow-x-scroll lg:overflow-auto lg:gap-5">
          
          <Button 
           variant={"secondary"}
          className="flex gap-[10px] items-center justify-center w-full min-w-[150px] dark:border dark:border-[#5B5B5B]  dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)]"
            onClick={() => window.open("https://app.uniswap.org/swap", "_blank")}
          >
            <Image src={uniswap} width={32} height={32} alt="uniswap"></Image>
            <p className="min-[1440px]:text-base 2dppx:text-sm text-sm">Uniswap</p>
          </Button>


          {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
             <Button
              variant={"secondary"}
              className="flex gap-[10px] items-center justify-center w-full min-w-[150px] "
            >
              <Image src={uniswap} width={32} height={32} alt="uniswap"></Image>
              <p className="min-[1440px]:text-base 2dppx:text-sm text-sm">Uniswap</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="">
            <div className="flex justify-end w-full ">
              <DialogClose asChild>
                <Button
                  variant={"ghostOutline"}
                  size={"primary"}
                  className="flex gap-[10px] border border-borderGrey "
                  >
                  <Cross2Icon className="w-4 h-4" />
                  <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                    Close
                  </p>
                </Button>
              </DialogClose>
            </div>
            <DialogHeader className="flex items-start">
              <DialogTitle className="text-textPrimary font-medium  min-[1440px]:text-4xl 2dppx:text-4xl min-[1280px]:text-3xl text-4xl tracking-[-1.8px]">
                SWAP TOKENS
              </DialogTitle>
            </DialogHeader>
            <Swap />
          </DialogContent>
        </Dialog> */}




          <Button
            variant={"secondary"}
            className="flex gap-[10px] items-center justify-center w-full min-w-[150px] dark:border dark:border-[#5B5B5B] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)]"
            onClick={() => setOpen2(true)}
          >
            <Image src={cake} width={32} height={32} alt="uniswap"></Image>
            <p className="min-[1440px]:text-base 2dppx:text-sm text-sm">Pancake</p>
          </Button>
          <Button
            variant={"secondary"}
            className="flex gap-[10px] items-center justify-center w-full min-w-[150px] dark:border dark:border-[#5B5B5B] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)]"
            onClick={() => setOpen2(true)}
          >
            <Image src={sushi} width={32} height={32} alt="uniswap"></Image>
            <p className="min-[1440px]:text-base 2dppx:text-sm text-sm">Sushiswap</p>
          </Button>

          <Button
            variant={"secondary"}
            className="flex gap-[10px] items-center justify-center w-full min-w-[150px] dark:border dark:border-[#5B5B5B] dark:bg-[linear-gradient(180deg,#202020_-0.23%,#0D0D0D_100%)]"
            onClick={() => setOpen2(true)}
          >
            <Image src={snx} width={32} height={32} alt="uniswap"></Image>
            <p className="min-[1440px]:text-base 2dppx:text-sm text-sm">Synthetix</p>
          </Button>

        </div>
      </div>

      <Dialog open={open2} onOpenChange={setOpen2} >
        <DialogContent className="max-w-[400px] pb-5">
          <div className="flex justify-end w-full ">
            <DialogClose asChild>
              <Button
                variant={"ghostOutline"}
                size={"primary"}
                className="flex gap-[10px] border border-borderGrey "
              >
                <Cross2Icon className="w-4 h-4" />
                <p className="text-transparent bg-clip-text bg-[linear-gradient(180deg,#808080_-0.23%,#000_100%)] font-semibold text-base">
                  Close
                </p>
              </Button>
            </DialogClose>
          </div>
          <DialogHeader className="flex items-start">
            <DialogTitle className="text-textPrimary  font-medium  min-[1440px]:text-4xl 2dppx:text-2xl min-[1280px]:text-3xl text-2xl tracking-[-1.8px]">

              Comming Soon...
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ProductList;
