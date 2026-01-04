import React, { useEffect, useState } from "react";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { rthService } from "../services/rthService";

const ReviewList = ({ rthId, refreshTrigger }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await rthService.getReviewsByRthId(rthId);
        setReviews(data || []);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [rthId, refreshTrigger]);

  if (loading)
    return (
      <div className="text-center py-4 text-gray-500 text-sm">
        Memuat ulasan...
      </div>
    );

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
        <p className="text-gray-500 font-medium font-outfit">
          Belum ada ulasan.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Jadilah yang pertama memberikan ulasan!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        Ulasan Pengunjung ({reviews.length})
      </h3>
      <div className="grid gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <FaUserCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">
                    {review.nama}
                  </h4>
                  <span className="text-[10px] text-gray-400 block">
                    {new Date(review.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                <FaStar className="text-yellow-400 text-sm" />
                <span className="font-bold text-sm text-yellow-700">
                  {review.rating}
                </span>
              </div>
            </div>
            {review.komentar && (
              <p className="text-gray-600 text-sm leading-relaxed mt-2 pl-11">
                "{review.komentar}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
