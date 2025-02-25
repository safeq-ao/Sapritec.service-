import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

const Completed = () => {
  return (
    <section className=" bg-white p-5">
      <span className="flex items-center justify-between">
        <h1 className="text-[#0ef625]">COMPLETED</h1>
        <IoIosArrowDown />
      </span>
    </section>
  );
    
}

export default Completed