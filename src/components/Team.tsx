const Team = ({ name, imageUrl }: { name: string; imageUrl: string }) => {
  return (
    <div>
      <img className="team--logo" src={imageUrl} alt={name} />
      <h2>{name}</h2>
    </div>
  );
};

export default Team;
