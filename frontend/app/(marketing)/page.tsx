import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Balancer } from "react-wrap-balancer";
import StudentInTheClassroom from "@/public/student-in-the-classroom.svg";

import { buttonVariants } from "@/components/ui/button";

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="container flex flex-col-reverse">
      <div className="py-4 flex flex-col min-[431px]:items-center gap-4">
        <div className="space-y-4">
          <h1 className="text-2xl min-[431px]:text-4xl min-[431px]:text-center font-bold  leading-[1.2] lg:leading-[1.1]">
            <Balancer>
              Welcome to useBrain — Engage Your Mind with Fun Quizzes.
            </Balancer>
          </h1>
          <p className="text-muted-foreground min-[431px]:text-lg min-[431px]:text-center max-w-[500px] mx-auto">
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
      <div className="max-w-[250px] min-[431px]:max-w-[400px] min-[431px]:mx-auto">
        <Image src={StudentInTheClassroom} alt="Genius Image" />
      </div>
    </div>
  );
};

export default HomePage;
