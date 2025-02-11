"use client";
import React, { useActionState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { SubmitLogin } from "./SubmitButton";
import { loginUser } from "@/actions/User";
import { useToast } from "@/hooks/use-toast";
import SignInGoogle from "./Sign-Google";
import { useRouter } from "next/navigation";



const FormLogin = () => {
  const { toast } = useToast();
  const [prevstate, setPrevstate] = useActionState(loginUser, null);
  const router = useRouter()

  useEffect(() => {
    if (prevstate?.error) {
      toast({ title: "ล็อกอินผิดพลาด", description: prevstate.error });
    }

    if (prevstate?.success) {
      toast({ title: "ยืนดีต้อนรับ", description: prevstate.success });
      setTimeout(()=>{
        router.push("/")
      },1000)
    }
  }, [prevstate, toast,router]);


  return (
    <div className="w-full px-10">
      <Card className="p-10">
        <SignInGoogle />
        <form action={setPrevstate}>
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
            หากยังไม่มีรหัสผ่าน <Link href={"/auth/register"}>Register</Link>
          </p>
          <SubmitLogin />
        </form>
      </Card>
    </div>
  );
};

export default FormLogin;
