import React from 'react'
import { IoIosArrowDown } from "react-icons/io";

const Canceled = () => {
  return (
    <section className="p-5 bg-white">
      <span className="flex items-center justify-between">
        <h1
          className="text-[#9095A1]"
        >
          CANCELED
        </h1>
        <IoIosArrowDown />
      </span>
    </section>
  );
}

export default Canceled