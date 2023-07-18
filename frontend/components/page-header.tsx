interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  description: string;
}

const PageHeader = ({ heading, description }: PageHeaderProps) => {
  return (
    <div className="space-y-2 mb-4 md:mb-8">
      <h1 className="text-2xl md:text-4xl font-bold leading-none">{heading}</h1>
      <p className="md:text-lg text-muted-foreground">{description}</p>
    </div>
  );
};

export { PageHeader };
