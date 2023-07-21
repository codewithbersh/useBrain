import { cn } from "@/lib/utils";

interface PageSubHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
  children: React.ReactNode;
}

const PageSubHeader = ({
  heading,
  description,
  className,
  children,
}: PageSubHeaderProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <h1 className="font-bold text-xl leading-none">{heading}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div>{children}</div>
    </div>
  );
};

export { PageSubHeader };
