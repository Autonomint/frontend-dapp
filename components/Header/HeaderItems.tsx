import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  props: {
    textHeadline: string;
    textValue: string;
    ref?: React.MutableRefObject<null>;
    width?: number;
    className: string;
    lastElement?: boolean;
    textColor?: string;
  };
}

const HeaderItems = ({
  props: { textHeadline, textValue, className, lastElement = false, textColor },
}: Props) => {
  return (
    <>
      <div
        className={cn(`flex justify-between min-w-[164px] w-full`, className)}
      >
        <div className="flex flex-col gap-[20px]">
          <p className="text-textGrey text-base font-normal leading-none whitespace-nowrap">
            {textHeadline}
          </p>
          <h3
            style={{ color: textColor ? textColor : "" }}
            className="font-medium text-[2rem] leading-none"
          >
            {textValue}
          </h3>
        </div>
      </div>

      <div
        className={cn(
          `${lastElement ? "" : "w-[1px] h-full bg-lineGrey  ml-6 mr-6"}`,
          className
        )}
      ></div>
    </>
  );
};
export default HeaderItems;
