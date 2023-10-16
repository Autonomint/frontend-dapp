"use client";
import React, { PropsWithChildren, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import showMore from "@/app/assets/arrow_circle_down.svg";

const HandleShowMore = ({ children }: PropsWithChildren) => {
  const [show, setShow] = useState(false);
  const handleShowMore = () => {
    setShow(!show);
  };
  return (
    <>
      <Button
        onClick={handleShowMore}
        variant={"showMore"}
        className="px-4 pb-4 py-0 flex flex-col gap-[10px] items-center h-full"
      >
        <Image src={showMore} alt="show more" width={35} height={35} />
        <p className="text-borderGrey text-base font-medium">Show More</p>
      </Button>
      <div className="flex px-4 py-5">
      {show && children}
      </div>
    </>
  );
};

export default HandleShowMore;
