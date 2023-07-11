"use client";

import { useSession } from "next-auth/react";
import React from "react";

interface PlayPageProps {
  params: {
    id: string;
  };
}

const PlayPage = ({ params }: PlayPageProps) => {
  const [nickname, setNickname] = React.useState(null);
  const { data: session } = useSession();
  console.log("Session: ", session);
  return <div className="container"></div>;
};

export default PlayPage;
