import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
// import Input from "./Input";

const Navbar = ({ count, alert }) => {
  console.log(alert);
  return (
    <>
      <div className="justify-center items-center col-span-3">
        <header className="">
          <nav className="flex flex-row justify-between p-8">
            {/* logo */}
            <div className="relative bg-green-200 p-4 w-40 h-10 flex items-center justify-center rounded-lg">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-white w-6 h-2 rounded-t-lg"></div>
              <h1 className="text-2xl z-10">Alert</h1>
            </div>
            {/* list */}
            <div className="flex flex-row justify-center">
              <div className="relative">
                <IoIosNotificationsOutline className="text-5xl text-red-600" />
                <div className="absolute left-7 top-0 text-lg h-6 w-6 justify-center items-center flex rounded-full bg-black text-neutral-100">
                  {count}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="p-8">
          {alert?.slice(0, 7).map((item) => {
            return (
              <div
                key={item.id}
                className="border-2 border-slate-700 border-opacity-50 mt-4 flex justify-center items-center rounded-lg"
              >
                {item.alert}
              </div>
            );
          })}
        </div>
        {/* <Input/> */}
      </div>
    </>
  );
};

export default Navbar;
