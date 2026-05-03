import { useEffect, useState } from "react";
import { api } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ThumbnailCard from "../components/ThumbnailCard";

const Community = ({ setToast }) => {
  const [items, setItems] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await api.getCommunityFeed();
        setItems(data.thumbnails || []);
        setIdeas(data.trendingIdeas || []);
      } catch (error) {
        setToast({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const handleLike = async (id) => {
    try {
      const data = await api.likeThumbnail(id);
      setItems((prev) =>
        prev.map((item) => (item._id === id ? { ...item, likes: data.likes } : item))
      );
    } catch (error) {
      setToast({ type: "error", message: error.message });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr,1.2fr]">
        <div className="glass-card rounded-[32px] p-6">
          <span className="mb-3 block text-sm font-medium text-brand-purple">🔥 Trending Ideas</span>
          <div className="flex flex-wrap gap-2">
            {ideas.map((idea, i) => (
              <span key={i} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:bg-white/10">
                {idea}
              </span>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-[32px] p-6">
          <span className="mb-1 block text-sm font-medium text-brand-purple">Public Feed</span>
          <h1 className="text-3xl font-extrabold text-white">Community Gallery</h1>
          <p className="mt-2 text-slate-400">Explore thumbnails created by the community</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading community feed..." />
      ) : items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ThumbnailCard key={item._id} item={item} showLike showAuthor onLike={handleLike} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-slate-500">No thumbnails yet. Be the first to create one!</div>
      )}
    </div>
  );
};

export default Community;