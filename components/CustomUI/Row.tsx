import React from "react";

interface Props {
  props: {
    heading: string;
    value: string;
  };
}

const Row = ({ props: { heading, value } }: Props) => {
  return (
    <div className="flex justify-between px-4 py-[10px] border-b border-lineGrey">
      <p className="text-base text-textSecondary">{heading}</p>
      <p className="text-textHighlight font-medium text-base">{value}</p>
    </div>
  );
};

export default Row;
