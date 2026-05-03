import { useState } from "react";
import { resolveThumbnailUrl } from "../utils/thumbnailUrls";

const ThumbnailCard = ({
  item,
  onDelete,
  onLike,
  showDelete = false,
  showLike = false,
  showAuthor = false
}) => {
  const [downloading, setDownloading] = useState(false);
  const thumbnailUrl = resolveThumbnailUrl(item.imageUrl);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(thumbnailUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${item.title || "thumbnail"}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="glass-card overflow-hidden rounded-3xl transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={thumbnailUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-white">{item.title}</h3>
          {showAuthor && item.userId?.name && (
            <p className="mt-1 text-xs text-slate-400">by {item.userId.name}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {item.style && (
            <span className="rounded-full bg-brand-purple/20 px-2.5 py-0.5 text-xs font-medium text-brand-purple">
              {item.style}
            </span>
          )}
          {item.aspectRatio && (
            <span className="rounded-full bg-brand-cyan/20 px-2.5 py-0.5 text-xs font-medium text-brand-cyan">
              {item.aspectRatio}
            </span>
          )}
          {item.mode && (
            <span className="rounded-full bg-brand-pink/20 px-2.5 py-0.5 text-xs font-medium text-brand-pink">
              {item.mode}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {downloading ? "Preparing..." : "Download"}
          </button>
          {showDelete && (
            <button
              onClick={() => onDelete?.(item._id)}
              className="rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
            >
              Delete
            </button>
          )}
          {showLike && (
            <button
              onClick={() => onLike?.(item._id)}
              className="flex items-center gap-1.5 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10"
            >
              ♥ {item.likes || 0}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCard;