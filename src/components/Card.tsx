import landscape from "../assets/images/night-landscape.png";

const Card = () => {
  return (
    <div className="sunrise-card">
      <img src={landscape} alt="landscape" className="" />
      <div className="card-overlay"></div>
    </div>
  );
};

export default Card;
