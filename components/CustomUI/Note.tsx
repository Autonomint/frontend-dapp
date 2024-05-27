import React from "react";

const Note = ({ note }: { note: string }) => {
  return (
    <div className="min-[1440px]:p-4 2dppx:p-2 p-2  bg-[#FFFDD7]   dark:bg-[#FFFCB5]">
      <p className=" text-xs text-[#020202] tracking-tighter dark:text-[#2E2F00]">
        {note}
      </p>
    </div>
  );
};

export default Note;
