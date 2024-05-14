import React from "react";

const Note = ({ note }: { note: string }) => {
  return (
    <div className="min-[1440px]:p-4 2dppx:p-2 p-2  bg-[#FFFDD7]   dark:bg-[#22210B]">
      <p className=" text-xs text-[#201F00] tracking-tighter dark:text-[#DFDC96]">
        {note}
      </p>
    </div>
  );
};

export default Note;
