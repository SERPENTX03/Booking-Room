"use client";
import React, { useActionState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { SubmitRegister } from "./SubmitButton";
import { registerUser } from "@/actions/User";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import SignInGoogle from "./Sign-Google";
import { auth } from "@/auth";
const FormRegister = () => {
  const { toast } = useToast();
  const [state, formAction] = useActionState(registerUser, null);

  useEffect(() => {
    if (state?.error) {
      toast({ title: "Destructive", description: state.error });
    }
    if (state?.success) {
      toast({ title: "Success", description: state.success });
      setTimeout(() => {
        redirect("/auth/login");
      }, 1000);
    }
  }, [state, toast]);

  return (
    <div className="w-full px-10">
      <Card className="p-10">
        <SignInGoogle />
        <form action={formAction}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="serpentx@example.com"
            className="w-full"
            required
          />
          <Label htmlFor="password">Pasword</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="************"
            className="w-full"
            required
          />
          <p className="my-2 text-sm">
            หากมีรหัสผ่านแล้ว <Link href={"/auth/login"}>Login</Link>
          </p>
          <SubmitRegister />
        </form>
      </Card>
    </div>
  );
};

export default FormRegister;
