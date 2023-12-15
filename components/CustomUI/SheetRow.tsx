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
    <div className="flex justify-between min-[1440px]:px-4 px-2 min-[1440px]:py-[10px] py-[5px] border-b border-lineGrey">
      <div className="flex gap-2">
        <p className="min-[1440px]:text-base text-sm text-textSecondary">
          {heading}
        </p>
        {showTooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoCircledIcon className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p className="min-[1440px]:text-base text-sm text-textHighlight font-medium ">
        {value}
      </p>
    </div>
  );
};

export default SheetRow;
