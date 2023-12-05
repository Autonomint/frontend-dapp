import React from "react";
import { Button } from "../ui/button";
import { Cross1Icon, ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { toast } from "sonner";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";
import { useChainId } from "wagmi";

interface Props {
  props: {
    t: string | number;
    headline: string;
    transactionHash?: `0x${string}` | undefined;
    linkLabel?: string;
    toastMainColor?: string;
    toastClosebuttonColor?: string;
    toastClosebuttonHoverColor?: string;
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
  },
}: Props) => {
  const chainId = useChainId();
  return (
    <div className="flex fixed rounded z-[999]">
      <div
        style={{ background: toastMainColor }}
        className={`flex gap-[10px] text-white items-center rounded`}
      >
        <div className="flex flex-col px-[10px] py-4 gap-[10px] ">
          <p className="whitespace-nowrap">{headline}</p>
          {Boolean(transactionHash) && (
            <p className=" whitespace-nowrap flex gap-1 z-[999]">
              {`Tx Hash: ${truncateWeb3WalletAddress(transactionHash)}`}
              <Link
                href={
                  chainId === 80001
                    ? `https:mumbai.polygonscan.com/tx/${transactionHash}`
                    : chainId === 11155111
                    ? `https:sepolia.etherscan.io/tx/${transactionHash}`
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
