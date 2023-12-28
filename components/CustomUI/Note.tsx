import React from "react";

const Note = ({ note }: { note: string }) => {
  return (
    <div className="min-[1440px]:p-4 2dppx:p-2 p-2 rounded-[6px] border-[#9F9700] border bg-[#FFFDD7]">
      <p className="min-[1440px]:text-base text-xs 2dppx:text-xs text-[#201F00]">
        {note}
      </p>
    </div>
  );
};

export default Note;
