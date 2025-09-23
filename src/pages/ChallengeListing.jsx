import { useNavigate } from "react-router-dom";

function ChallengeListing() {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate("/details");
  };

  return (
    <>
      <h1>SkillzCollab</h1>
      <h2>Challenge Listing Page</h2>
      <button onClick={handleDetailsClick}>Go to Details</button>
    </>
  );
}

export default ChallengeListing;
