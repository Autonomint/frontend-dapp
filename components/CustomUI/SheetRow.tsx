import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface Props {
  props: {
    heading: string;
    value: string;
    showTooltip?: boolean;
    tooltipText?: string;
  };
}

const SheetRow = ({
  props: { heading, value, showTooltip = false, tooltipText },
}: Props) => {
  return (
    <div className="flex justify-between min-[1440px]:px-4 2dppx:px-2 px-4 min-[1440px]:py-[10px] 2dppx:py-[5px] py-[5px] border-b border-[#9E9E9E]">
      <div className="flex gap-2">
        <p className="min-[1440px]:text-base text-sm 2dppx:text-sm text-black dark:text-[#C4C4C4]">
          {heading}
        </p>
        {showTooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoCircledIcon className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="min-[1440px]:text-base text-sm 2dppx:text-sm text-textHighlight font-medium dark:text-[#ffff] ">
        {value}
      </p>
    </div>
  );
};

export default SheetRow;
