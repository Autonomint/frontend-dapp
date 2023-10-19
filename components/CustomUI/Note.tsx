import React from "react";

const Note = ({ note }: { note: string }) => {
  return (
    <div className="p-4 rounded-[6px] border-[#9F9700] border bg-[#FFFDD7]">
      <p className="text-base text-[#201F00]">{note}</p>
    </div>
  );
};

export default Note;
