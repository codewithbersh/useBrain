"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return <Button onClick={() => signOut()}>singout</Button>;
};

export default SignOutBtn;
