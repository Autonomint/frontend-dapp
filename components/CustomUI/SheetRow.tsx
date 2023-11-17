import React from "react";

interface Props {
  props: {
    heading: string;
    value: string;
  };
}

const SheetRow = ({ props: { heading, value } }: Props) => {
  return (
    <div className="flex justify-between min-[1440px]:px-4 px-2 min-[1440px]:py-[10px] py-[5px] border-b border-lineGrey">
      <p className="min-[1440px]:text-base text-sm text-textSecondary">{heading}</p>
      <p className="min-[1440px]:text-base text-sm text-textHighlight font-medium ">{value}</p>
    </div>
  );
};

export default SheetRow;
