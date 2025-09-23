import { useNavigate } from "react-router-dom";

function ChallengeDetails() {
  const navigate = useNavigate();

  const handleListingClick = () => {
    navigate("/listing");
  };
  return (
    <>
      <h1>SkillzCollab</h1>
      <h2>Challenge Details Page</h2>
      <button onClick={handleListingClick}>Go to Listing</button>
    </>
  );
}

export default ChallengeDetails;
