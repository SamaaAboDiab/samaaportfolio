import React from "react";
import { error } from "../assets";

const Error = () => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen text-white bg-ink animate-fade-in">
        <img
          className="items-center object-contain object-center w-full h-full md:object-cover"
          src={error}
          alt="Error"
        />
      </div>
    </>
  );
};

export default Error;
