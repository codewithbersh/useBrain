"use client";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};

export default SignOutBtn;
