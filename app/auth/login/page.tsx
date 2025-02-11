import { auth } from "@/auth";
import FormLogin from "@/components/auth/FormLogin";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = async() => {

    const session = await auth()

    const user = session?.user;

    if(user) redirect('/')

  return (
    <section className="mt-10">
    <div className="flex justify-center max-w-[600px] mx-auto">
      <FormLogin />
    </div>
  </section>
  );
};

export default LoginPage;
