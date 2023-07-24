interface PageSubHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description?: string;
}

const PageSubHeader = ({ heading, description }: PageSubHeaderProps) => {
  return (
    <div>
      <h1 className="font-bold text-lg">{heading}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export { PageSubHeader };
