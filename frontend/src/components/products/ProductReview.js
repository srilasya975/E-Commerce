import ReactStars from "react-rating-stars-component";

export default function ProductReview({ reviews }) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const monthIndex = parseInt(dateString.substring(5, 7), 10) - 1;
    const monthName = monthNames[monthIndex];
    return `${monthName} ${year}`;
  };

  return (
    <div className=" ">
      <hr />
      {reviews &&
        reviews.map((review) => {
          const reviewDate = formatDate(review.addedAt);
          return (
            <div
              key={review._id}
              class="my-4 flex bg-neutral-200  bg-opacity-70 p-5"
            >
              <div className="w-full ">
                <div className="flex items-center gap-2">
                  <p className="text-lg font-semibold capitalize">
                    {review.user.name}
                  </p>
                  <ReactStars
                    size={18}
                    value={review.rating}
                    activeColor={"#FF9529"}
                    isHalf
                    edit={false}
                  />
                </div>
                <div className="py-4">
                  <p className="capitalize">{review.comment}</p>
                </div>
              </div>
              <div className="min-w-[10%] text-gray-600 font-semibold">
                {reviewDate}
              </div>
            </div>
          );
        })}
    </div>
  );
}
