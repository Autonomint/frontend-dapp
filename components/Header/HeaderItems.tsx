import { cn } from "@/lib/utils";
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
    textHeadline: string;
    textValue: string;
    ref?: React.MutableRefObject<null>;
    width?: number;
    className: string;
    lastElement?: boolean;
    textColor?: string;
    showTooltip?: boolean;
    tooltipText?: string;
    classNamediv?: string;
  };
}

const HeaderItems = ({
  props: { textHeadline, textValue, className, lastElement = false, textColor,classNamediv, showTooltip, tooltipText},
}: Props) => {
  return (
    <>
      <div
        className={cn(
          `flex justify-between min-[1440px]:min-w-[164px] sm:min-w-[90px] 2dppx:w-full w-full`,
          classNamediv
        )}
      >
        <div className="flex flex-col justify-center min-[1440px]:gap-[20px] 2dppx:gap-2 gap-2">
          <p className="text-textGrey min-[1440px]:text-base 2dppx:text-sm text-sm font-normal leading-none whitespace-nowrap">
            {textHeadline}
            {showTooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoCircledIcon className="w-4 h-4 ml-2" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tooltipText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
          </p>
          
          <h3
            style={{ color: textColor ? textColor : "" }}
            className="font-medium min-[1440px]:text-[2rem] 2dppx:text-2xl text-2xl leading-none"
          >
            {textValue}
          </h3>
        </div>
      </div>

      <div
        className={cn(
          `${
            lastElement
              ? ""
              : "w-[1px] h-full bg-lineGrey  2dppx:mx-6 mx-[2px] md:mx-1 xl:mx-3"
          }`,
          className
        )}
      ></div>
    </>
  );
};
export default HeaderItems;
