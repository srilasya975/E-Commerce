import { FaStar } from "react-icons/fa6";
const StarRating = () => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((star, index) => {
        return <FaStar key={index} />;
      })}
    </div>
  );
};
export default StarRating;
