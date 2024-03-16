const HouseRule = ({ rule, idx }) => {
  return (
    <p className="black">
      {idx + 1} {rule}
    </p>
  );
};

export default HouseRule;
