import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { rthService } from "../services/rthService";

const ReviewForm = ({ rthId, onReviewAdded }) => {
  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [komentar, setKomentar] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!rating) {
      setError("Silakan berikan rating bintang.");
      return;
    }
    if (!nama.trim()) {
      setError("Silakan isi nama anda.");
      return;
    }

    setSubmitting(true);
    try {
      await rthService.addReview({
        rth_id: rthId,
        nama: nama,
        rating: rating,
        komentar: komentar,
      });

      // Reset form
      setNama("");
      setRating(0);
      setKomentar("");
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      console.error("Failed to submit review:", err);
      setError("Gagal mengirim ulasan via jaringan atau server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Berikan Ulasan</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating Stars */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">
            Rating Anda:
          </span>
          <div className="flex">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i} className="cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    className="hidden"
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    className="transition-colors duration-200"
                    color={
                      ratingValue <= (hover || rating) ? "#fbbf24" : "#e5e7eb"
                    }
                    size={24}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
        </div>

        {/* Input Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none font-outfit text-sm"
            placeholder="Nama Anda (Tamu)"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Komentar
          </label>
          <textarea
            value={komentar}
            onChange={(e) => setKomentar(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none font-outfit text-sm"
            placeholder="Bagaimana pengalaman anda berkunjung ke sini?"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary-dark text-white font-medium py-2.5 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Mengirim..." : "Kirim Ulasan"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
