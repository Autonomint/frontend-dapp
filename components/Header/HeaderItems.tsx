import React from "react";

interface Props {
  props: {
    textHeadline: string;
    textValue: string;
  };
}

const HeaderItems = ({ props: { textHeadline, textValue } }: Props) => {
  return (
    <>
      <div className="flex justify-between min-w-[164px] w-full">
        <div className="flex flex-col">
          <p className="text-textGrey text-base font-normal text-center">
            {textHeadline}
          </p>
          <h3 className="font-medium text-[2rem]">{textValue}</h3>
        </div>
      </div>
      <div className="w-[1px] h-full bg-lineGrey  ml-6 mr-6"></div>
    </>
  );
};

export default HeaderItems;
