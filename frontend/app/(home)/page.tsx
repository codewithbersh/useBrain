import { Balancer } from "react-wrap-balancer";
import { Quiz } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { QuizCard } from "@/components/quiz-card";
import Link from "next/link";
import { cn } from "@/lib/utils";

async function getQuizzesByPopularity(): Promise<Array<Quiz>> {
  const res = await fetch(
    "http://127.0.0.1:8000/api/landing-page-quizzes/?ordering=-times_played",
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

async function getQuizzesByDateCreated(): Promise<Array<Quiz>> {
  const res = await fetch(
    "http://127.0.0.1:8000/api/landing-page-quizzes/?ordering=-created",
    {
      next: { revalidate: 0 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const HomePage = async () => {
  const quizzessByPopularity = await getQuizzesByPopularity();
  const quizzesByDateCreated = await getQuizzesByDateCreated();

  return (
    <div className=" space-y-12 container">
      <section className="space-y-4 py-6">
        <div className="space-y-2">
          <h1 className=" text-2xl sm:text-3xl md:text-5xl font-bold sm:text-center leading-[1.1] max-w-[1000px] mx-auto">
            <Balancer>
              Lorem ipsum dolor sit amet consectur lorem ipsum dolor
            </Balancer>
          </h1>
          <p className="sm:text-center text-foreground/60 max-w-prose mx-auto text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex sm:justify-center gap-4">
          <Button>
            Sign up — <span className="italic">it's free</span>
          </Button>
          <Button variant="outline">Explore quizzes</Button>
        </div>
      </section>
      <section className="space-y-2">
        <div className=" flex items-center justify-between">
          <h1 className="text-xl font-bold">Most Popular</h1>
          <Link
            href="/quizzes"
            className={cn(buttonVariants({ variant: "link" }), "items-end")}
          >
            View all
          </Link>
        </div>
        <div className="grid grid-flow-col gap-8 justify-between overflow-x-auto">
          {quizzessByPopularity.map((item) => (
            <QuizCard key={item.id} quiz={item} />
          ))}
        </div>
      </section>
      <section className="space-y-2">
        <div className=" flex items-center justify-between">
          <h1 className="text-xl font-bold">Recently Uploaded</h1>
          <Link
            href="/quizzes"
            className={cn(buttonVariants({ variant: "link" }), "items-end")}
          >
            View all
          </Link>
        </div>
        <div className="grid grid-flow-col gap-8 justify-between overflow-x-auto">
          {quizzesByDateCreated.map((item) => (
            <QuizCard key={item.id} quiz={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
