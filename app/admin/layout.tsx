import { auth } from "@/auth";
import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async({ children }: { children: React.ReactNode }) => {
  const sesstion =  await auth()
  const user = sesstion?.user
  if(user?.role !== "ADMIN"){
    redirect('/')
  }
  return (
    <section className="flex ">
      <div className="h-screen flex w-[25%] border">
        <Sidebar />
      </div>
      <div className="w-full">

      {children}{" "}
      </div>
    </section>
  );
};

export default Layout;
