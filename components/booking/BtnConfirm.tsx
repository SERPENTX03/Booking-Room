"use client";
import React from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import Link from "next/link";

type BtnType = {
  className: string;
  roomId: string;
};

const BtnConfirm = ({ className,roomId }: BtnType) => {
  const { pending } = useFormStatus();

  return (
    <Link href={`/booking/${roomId}`}>
      <Button disabled={pending} className={className}>
        {pending ? "กำลังทำลายการ..." : "จองที่พัก"}
      </Button>
    </Link>
  );
};

export default BtnConfirm;
