import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import StudentInTheClassroom from "@/public/student-in-the-classroom.svg";

import { buttonVariants } from "@/components/ui/button";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="container flex flex-col-reverse">
      <div className="py-4 flex flex-col min-[413px]:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl min-[413px]:text-center font-bold  leading-[1.2] lg:leading-[1.1] max-w-[470px] min-[413px]:max-w-[700px]">
            Welcome to useBrain — Engage Your Mind with Fun Quizzes.
          </h1>
          <p className="text-muted-foreground sm:text-lg min-[413px]:text-center min-[413px]:max-w-[500px] mx-auto">
            Explore, Play, and Create Lessons. Test your knowledge or share your
            expertise with the world!
          </p>
        </div>

        {session ? (
          <Link href="/dashboard" className={cn(buttonVariants(), "w-fit")}>
            Go to dashboard
          </Link>
        ) : (
          <Link
            href="/login"
            className={cn(buttonVariants({ size: "lg" }), "w-fit")}
          >
            Sign up — <span className="italic"> it's free</span>
          </Link>
        )}
      </div>
      <div className="max-w-[250px] min-[413px]:max-w-[350px] min-[413px]:mx-auto">
        <Image src={StudentInTheClassroom} alt="Genius Image" />
      </div>
    </div>
  );
};

export default HomePage;
