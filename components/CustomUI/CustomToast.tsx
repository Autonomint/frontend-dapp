import React from "react";
import { Button } from "../ui/button";
import { Cross1Icon, ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { toast } from "sonner";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";
import { useChainId } from "wagmi";
import Spinner from "./Spinner";

interface Props {
  props: {
    t: string | number;
    headline: string;
    transactionHash?: `0x${string}` | undefined;
    linkLabel?: string;
    toastMainColor?: string;
    toastClosebuttonColor?: string;
    toastClosebuttonHoverColor?: string;
    spinner?: boolean;
    completed?: boolean;
  };
}

const CustomToast = ({
  props: {
    t,
    headline,
    transactionHash,
    linkLabel = "view",
    toastMainColor = "#268730",
    toastClosebuttonColor = "#57C262",
    toastClosebuttonHoverColor = "#90e398",
    spinner = false,
    completed = false,
  },
}: Props) => {
  const chainId = useChainId();
  return (
    <div className="fixed flex rounded pointer-events-auto z-max">
      <div
        style={{ background: toastMainColor }}
        className={`flex gap-[10px] text-white items-center rounded`}
      >
        {spinner && (
          <div className="ml-2">
            <Spinner size={24} color="white" />
          </div>
        )}
        {completed && (
          <svg
            className="ml-2 svg-icon animate-in"
            style={{
              width: "18px",
              height: "14px",
              verticalAlign: "middle",
              fill: "white",
              overflow: "hidden",
            }}
            viewBox="0 0 1301 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1265.500713 203.382684L495.859195 973.024203c-0.67495 0.635247-1.429306 1.071979-2.104256 1.707226a112.835759 112.835759 0 0 1-12.1491 14.8489 117.520706 117.520706 0 0 1-166.196513 0L33.955175 747.829119a117.520706 117.520706 0 0 1 166.196513-166.196512l188.390456 161.789486L1097.041133 34.923104a119.108824 119.108824 0 0 1 168.45958 168.45958z" />
          </svg>
        )}
        <div className="flex flex-col px-[10px] py-4 gap-[10px] min-w-[480px] max-w-[700px]">
          <p className="w-full">{headline}</p>
          {Boolean(transactionHash) && (
            <p className=" whitespace-nowrap flex gap-1 z-[999]">
              {`Tx Hash: ${truncateWeb3WalletAddress(transactionHash)}`}
              <Link
                href={
                  chainId === 5
                    ? `https://goerli.etherscan.io/tx/${transactionHash}`
                    : chainId === 80001
                    ? `https://mumbai.polygonscan.com/tx/${transactionHash}`
                    : chainId === 11155111
                    ? `https://sepolia.etherscan.io/tx/${transactionHash}`
                    : "Network Not yet Supported please switch to mumbai or sepolia"

                }
                target="_blank"
                className="flex items-center gap-1 z-[999]"
              >
                <ExternalLinkIcon />
                {linkLabel}
              </Link>
            </p>
          )}
        </div>
        <div
          style={{ background: toastClosebuttonColor }}
          className={`rounded-r h-full flex z-[999]`}
        >
          <Button
            variant={"ghost"}
            size={"toastSize"}
            onClick={() => toast.dismiss(t)}
            className={`flex items-center justify-center hover:bg-[${toastClosebuttonHoverColor}] rounded-none`}
          >
            <Cross1Icon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
