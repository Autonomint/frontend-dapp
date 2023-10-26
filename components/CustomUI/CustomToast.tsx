import React from "react";
import { Button } from "../ui/button";
import { Cross1Icon, ExternalLinkIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { toast } from "sonner";
import truncateWeb3WalletAddress from "@/app/utils/truncateWeb3Address";

interface Props {
  props: {
    t: string | number;
    headline: string;
    transactionHash: `0x${string}` | undefined;
    transactionHashLink: string;
    linkLabel: string;
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
    transactionHashLink,
    linkLabel = "view",
    toastMainColor = "#268730",
    toastClosebuttonColor = "#57C262",
    toastClosebuttonHoverColor = "#90e398",
  },
}: Props) => {
  return (
    <div className="flex rounded">
      <div
        className={`flex gap-[10px] bg-[${toastMainColor}] text-black  items-center rounded`}
      >
        <div className="flex flex-col px-[10px] py-4 gap-[10px] ">
          <p>{headline}</p>
          <p className=" whitespace-nowrap flex gap-1">
            {`Tx Hash: ${truncateWeb3WalletAddress(transactionHash)}`}
            <Link
              href={transactionHashLink}
              target="_blank"
              className="flex items-center gap-1"
            >
              <ExternalLinkIcon />
              {linkLabel}
            </Link>
          </p>
        </div>
        <div className={`bg-[${toastClosebuttonColor}] rounded-r h-full flex`}>
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
