import React from "react";

export const User = ({ user, icon, onClick}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm p-12 border hover:border-botao gap-4 cursor-pointer" onClick={onClick}>
      <div className="border border-l-text-footer bg-white p-5">
        {icon}
    </div>
      <p className="font-bold">{user}</p>
    </div>
  );
};
