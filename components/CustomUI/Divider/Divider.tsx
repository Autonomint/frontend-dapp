import React, { FC, HTMLAttributes } from "react";
import {cn} from "@/lib/utils";

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Divider: FC<DividerProps> = ({ className, ...rest }) => {
  return (
    <div
      className={cn("w-full bg-lineGrey h-[1px] my-[30px]", className)}
      {...rest}
    ></div>
  );
};

export default Divider;
