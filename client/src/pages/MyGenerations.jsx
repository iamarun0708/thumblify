import { useEffect, useState } from "react";
import { api } from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ThumbnailCard from "../components/ThumbnailCard";

const MyGenerations = ({ setToast }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getMyThumbnails();
        setItems(data.thumbnails || []);
      } catch (error) {
        setToast({ type: "error", message: error.message });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.deleteThumbnail(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
      setToast({ type: "success", message: "Thumbnail deleted" });
    } catch (error) {
      setToast({ type: "error", message: error.message });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <span className="text-sm font-medium text-brand-purple">Library</span>
        <h1 className="text-3xl font-extrabold text-white">My Generations</h1>
      </div>

      {loading ? (
        <LoadingSpinner text="Loading your thumbnails..." />
      ) : items.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ThumbnailCard key={item._id} item={item} showDelete onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-20 text-center">
          <div className="mb-4 text-5xl">🎨</div>
          <p className="text-lg font-medium text-slate-400">No thumbnails yet</p>
          <p className="mt-1 text-sm text-slate-500">Head to the Generate page to create your first one!</p>
        </div>
      )}
    </div>
  );
};

export default MyGenerations;