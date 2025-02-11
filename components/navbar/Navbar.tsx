import { auth } from "@/auth";
import React from "react";
import SignOutBtn from "../auth/SignOutBtn";
import Link from "next/link";
import Image from "next/image";
import HistoryBooking from "../booking/HistoryBooking";
import { fetchAllBooking } from "@/actions/Booking";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  const booking = await fetchAllBooking();


  return (
    <nav className="bg-primary px-4 text-white">
      <div className="max-w-[1200px] mx-auto py-6 flex items-center justify-between">
        <li className="list-none ">
          <Link href={"/"}>Serpentx Web</Link>
        </li>
        {!user ? (
          <ul className="flex space-x-4">
            <li>
              <Link href={"/auth/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/auth/register"}>Register</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4 items-center">
           
           <HistoryBooking userId={booking[0]?.userId} />
           <Link href={"/profile"}>
              <Image className="rounded-full" width={30} height={30} src={user.image || "/vercel.svg"} alt={user.name || "User"} />
            </Link>
            <SignOutBtn />
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
