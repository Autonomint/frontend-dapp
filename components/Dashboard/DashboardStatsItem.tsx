import React from "react";
interface Props {
  props: {
    heading: string;
    value: string;
    subheadingBefore: string;
    subheadingHighlight: string;
    subheadingAfter: string;
  };
}

const DashboardStatsItem = ({
  props: {
    heading,
    value,
    subheadingBefore,
    subheadingHighlight,
    subheadingAfter,
  },
}: Props) => {
  return (
    <div className="p-4 gap-[20px] flex flex-col">
      <p className="text-textGrey font-normal text-base">{heading}</p>
      <p className="text-textGrey font-medium text-[32px]">{value}</p>
      <p className="text-textGrey font-normal text-base">
        {subheadingBefore}{" "}
        <span className="text-[#020202] font-medium">
          {subheadingHighlight}
        </span>{" "}
        {subheadingAfter}
      </p>
    </div>
  );
};

export default DashboardStatsItem;
