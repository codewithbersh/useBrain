interface PageSubHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
  children: React.ReactNode;
}

const PageSubHeader = ({
  heading,
  description,
  children,
}: PageSubHeaderProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-bold text-xl leading-none">{heading}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      <div>{children}</div>
    </div>
  );
};

export { PageSubHeader };
