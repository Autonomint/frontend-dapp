import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  props: {
    textHeadline: string;
    textValue: string;
    ref?: React.MutableRefObject<null>;
    width?: number;
    className: string;
  };
}

const HeaderItems = ({
  props: { textHeadline, textValue, className },
}: Props) => {
  return (
    <>
      <div className={cn(`flex justify-between min-w-[164px] w-full`,className)}>
        <div className="flex flex-col">
          <p className="text-textGrey text-base font-normal text-center">
            {textHeadline}
          </p>
          <h3 className="font-medium text-[2rem]">{textValue}</h3>
        </div>
      </div>
      <div className={cn("w-[1px] h-full bg-lineGrey  ml-6 mr-6",className)}></div>
    </>
  );
};
export default HeaderItems;
