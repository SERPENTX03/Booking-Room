"use client";
import { MenuSquare } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillCloseSquare } from "react-icons/ai";

const Sidebar = () => {
  const [ham, setHam] = useState(false);

  const handleOpen = () => {
    setHam(!ham);
  };
  return (
    <nav className="w-full">
      <div className="hidden md:block">
        <h1 className=" p-4 font-bold text-base md:text-2xl"> ADMIN WEBPAGE</h1>
        <ul className=" w-full">
          <li className="px-4 py-2 hover:bg-gray-300 mb-2  ">
            <Link href={"/admin/admindashboard"}>แดชบอร์ด</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 mb-2  ">
            <Link href={"/admin/menagement"}>เพิ่มห้องพัก</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 mb-2  ">
            <Link href={"/admin/booking"}>สถานะการจอง</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 mb-2">
            <Link href={"/admin/rooms"}>จัดการสถานะห้อง</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 mb-2">
            <Link href={"/admin/payment"}>ระบบชำระเงิน & การเงิน</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-300 mb-2">
            <Link href={"/admin/user"}>จัดการผู้ใช้</Link>
          </li>
        </ul>
      </div>
      {/* Mobile */}
      <div className="md:hidden mt-4 flex flex-col items-center justify-center">
        <h1 className="font-bold">Admin Menu</h1>
        <MenuSquare onClick={handleOpen} className="" size={30} />

          <ul
            className={`fixed top-0 left-0 w-[30%] h-full bg-white border ease-in-out duration-500 backdrop-blur-md ${
              ham ? "left-0" : "left-[-100%]"
            }`}
          >
            <div className="flex">
              <h1 className=" font-bold m-4">Admin Menu</h1>
              <button onClick={handleOpen} className="ml-6">
                <AiFillCloseSquare size={30} />
              </button>
            </div>
            <li className="px-4 py-2 hover:bg-gray-300 mb-2  ">
              <Link href={"/admin/admindashboard"}>แดชบอร์ด</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-300 mb-2  ">
              <Link href={"/admin/menagement"}>เพิ่มห้องพัก</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-300 mb-2  ">
              <Link href={"/admin/booking"}>สถานะการจอง</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-300 mb-2">
              <Link href={"/admin/rooms"}>จัดการสถานะห้อง</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-300 mb-2">
              <Link href={"/admin/payment"}>ระบบชำระเงิน & การเงิน</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-300 mb-2">
              <Link href={"/admin/user"}>จัดการผู้ใช้</Link>
            </li>{" "}
          </ul>
      
      </div>
    </nav>
  );
};

export default Sidebar;
