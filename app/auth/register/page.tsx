import FormRegister from "@/components/auth/FormRegister";
import React from "react";

const Register = async() => {
  
  return (
    <section className="mt-10">
      <div className="flex justify-center max-w-[600px] mx-auto">
        <FormRegister />
      </div>
    </section>
  );
};

export default Register;
