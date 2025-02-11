"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

export const SubmitRegister = () => {
  const { pending } = useFormStatus();
  return (
    <>

      <Button type="submit" disabled={pending}>
        {pending ? "กำลังโหลด.." : "สมัครสมาชิก"}
      </Button>
    </>
  );
};

export const SubmitLogin = () => {
  const { pending } = useFormStatus();
  return (
    <>

      <Button type="submit" disabled={pending}>
        {pending ? "กำลังโหลด.." : "เข้าสู่ระบบ"}
      </Button>
    </>
  );
};

export const SubmitLogot = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button type="submit" disabled={pending}>
        {pending ? "กำลังโหลด.." : "ออกจากระบบ"}
      </Button>
    </>
  );
};

