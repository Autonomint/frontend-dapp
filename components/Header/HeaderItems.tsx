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
        className={cn(
          `flex justify-between min-[1440px]:min-w-[164px] w-full`,
          className
        )}
      >
        <div className="flex flex-col justify-center min-[1440px]:gap-[20px] gap-2">
          <p className="text-textGrey min-[1440px]:text-base text-sm font-normal leading-none whitespace-nowrap">
            {textHeadline}
          </p>
          <h3
            style={{ color: textColor ? textColor : "" }}
            className="font-medium min-[1440px]:text-[2rem] text-2xl leading-none"
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
              : "w-[1px] h-full bg-lineGrey  mx-6 max-[1000px]:mx-3"
          }`,
          className
        )}
      ></div>
    </>
  );
};
export default HeaderItems;
