import { Button } from "@/components/ui/button";
import { Balancer } from "react-wrap-balancer";

const HomePage = () => {
  return (
    <div className="container">
      <section className="space-y-4 py-6 sm:py-12">
        <h1 className=" text-2xl sm:text-3xl md:text-5xl font-bold sm:text-center leading-[1.1] max-w-prose">
          <Balancer>
            Lorem ipsum dolor sit amet consectur lorem ipsum dolor
          </Balancer>
        </h1>
        <p className="sm:text-center text-foreground/60 max-w-prose mx-auto text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex sm:justify-center gap-4">
          <Button>
            Sign up — <span className="italic">it's free</span>
          </Button>
          <Button variant="outline">Explore quizzes</Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
