import React from "react";

const RatingBarChart = ({ ratingData, averageRating }) => {
  // Example structure: { 5: 12, 4: 8, 3: 4, 2: 2, 1: 1 }
  const maxCount = Math.max(...Object.values(ratingData));

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Rating Distribution
      </h2>
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = ratingData[star] || 0;
          const barWidth = (count / maxCount) * 100;

          return (
            <div key={star} className="flex items-center gap-4">
              <div className="w-[60px] text-right font-medium">{star} ⭐</div>
              <div className="flex-1 bg-gray-200 h-6 rounded relative">
                <div
                  className="bg-blue-500 h-6 rounded"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
              <div className="w-[40px] text-left font-semibold">{count}</div>
            </div>
          );
        })}
      </div>
      <div className="my-1 p-2 text-center shadow-sm">
        Average rating: {averageRating}
      </div>
    </div>
  );
};

export default RatingBarChart;
