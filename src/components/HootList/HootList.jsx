const HootList = ({ hoots }) => {
  return (
    <main>
      {hoots.map((hoot) => (
        <p key={hoot._id}>{hoot.title}</p>
      ))}
    </main>
  );
};

export default HootList;
