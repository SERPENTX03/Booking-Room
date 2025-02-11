"use server";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { ObjectId } from "bson";


export const registerUser = async (_prevState: any,formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (!email || !password) {
      return { error: "All fields are required!" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return {success: "User create successfully!!"}

  } catch (error) {
    console.error("Register Error",error);
    return {error: " An error occurred during registration"}
  }
};

// Login Function
export const loginUser = async (_prevState: any,formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (!email || !password) {
      return { error: "All fields are required!" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { error: "Invalid Credentials" };
    }

    const isValid = await bcrypt.compare(password, user.password as string);
    if (!isValid) {
      return { error: "Invalid credentials" };
    }

    //Sign in user
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    return {success : "Logged successfully!!"}

  } catch (error) {
    console.error("Login error", error);
    return {error : "Login Error"}
  }
};
