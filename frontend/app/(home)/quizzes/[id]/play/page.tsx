interface PlayPageProps {
  params: {
    id: string;
  };
}

const PlayPage = ({ params }: PlayPageProps) => {
  return <div className="container">{params.id}</div>;
};

export default PlayPage;
