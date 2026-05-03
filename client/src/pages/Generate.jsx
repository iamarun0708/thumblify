import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { aspectRatios, palettes, styles } from "../utils/constants";
import { resolveThumbnailUrl } from "../utils/thumbnailUrls";

const defaultGenerateState = { title: "", aspectRatio: "16:9", style: "Bold", colors: [], prompt: "", sourceImage: "" };
const defaultRecreateState = { title: "", aspectRatio: "16:9", style: "Bold", colors: [], sourceImage: "", changeRequest: "" };

const Generate = ({ setToast }) => {
  const { updateCredits } = useAuth();
  const [activeTab, setActiveTab] = useState("generate");
  const [generateForm, setGenerateForm] = useState(defaultGenerateState);
  const [recreateForm, setRecreateForm] = useState(defaultRecreateState);
  const [preview, setPreview] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [previewRetryCount, setPreviewRetryCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!preview?.imageUrl) { setPreviewSrc(""); setPreviewRetryCount(0); return; }
    setPreviewSrc(resolveThumbnailUrl(preview.imageUrl));
    setPreviewRetryCount(0);
  }, [preview]);

  useEffect(() => {
    if (!previewSrc || previewRetryCount < 1 || previewRetryCount > 4) return;
    const t = setTimeout(() => {
      const sep = previewSrc.includes("?") ? "&" : "?";
      setPreviewSrc(resolveThumbnailUrl(preview.imageUrl) + sep + "cb=" + Date.now());
    }, 1200 * previewRetryCount);
    return () => clearTimeout(t);
  }, [previewRetryCount]);

  const handleColorSelect = (tab, palette) => {
    if (tab === "generate") setGenerateForm((p) => ({ ...p, colors: palette }));
    else setRecreateForm((p) => ({ ...p, colors: palette }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.generateThumbnail({ ...generateForm, mode: "generate" });
      setPreview(data.thumbnail);
      updateCredits(data.credits);
      setToast({ type: "success", message: "Thumbnail generated!" });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally { setLoading(false); }
  };

  const handleRecreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await api.generateThumbnail({ ...recreateForm, mode: "recreate" });
      setPreview(data.thumbnail);
      updateCredits(data.credits);
      setToast({ type: "success", message: "Thumbnail recreated!" });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    } finally { setLoading(false); }
  };

  const form = activeTab === "generate" ? generateForm : recreateForm;
  const setForm = activeTab === "generate" ? setGenerateForm : setRecreateForm;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-brand-purple">Studio</span>
          <h1 className="text-3xl font-extrabold text-white">Create Thumbnail</h1>
        </div>
        <div className="flex rounded-xl bg-white/5 p-1">
          {["generate", "recreate"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`rounded-lg px-5 py-2 text-sm font-medium capitalize transition ${activeTab === tab ? "bg-brand-purple text-white" : "text-slate-400 hover:text-white"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <form onSubmit={activeTab === "generate" ? handleGenerate : handleRecreate} className="glass-card rounded-[32px] p-6">
          <div className="space-y-5">
            <InputBlock label="Title" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} placeholder="e.g. 10 Tips to Grow on YouTube" />
            <SelectBlock label="Style" value={form.style} onChange={(v) => setForm((p) => ({ ...p, style: v }))} options={styles} />
            <SelectBlock label="Aspect Ratio" value={form.aspectRatio} onChange={(v) => setForm((p) => ({ ...p, aspectRatio: v }))} options={aspectRatios} />
            <PaletteBlock label="Color Palette" value={form.colors} onSelect={(p) => handleColorSelect(activeTab, p)} />
            {activeTab === "generate" ? (
              <>
                <InputBlock label="Optional Prompt" value={form.prompt} onChange={(v) => setGenerateForm((p) => ({ ...p, prompt: v }))} placeholder="Extra creative direction..." />
                <InputBlock label="Optional Image Upload URL" value={form.sourceImage} onChange={(v) => setGenerateForm((p) => ({ ...p, sourceImage: v }))} placeholder="https://..." />
              </>
            ) : (
              <>
                <InputBlock label="Source Image URL" value={form.sourceImage} onChange={(v) => setRecreateForm((p) => ({ ...p, sourceImage: v }))} placeholder="Paste original thumbnail URL" />
                <InputBlock label="Change Request" value={form.changeRequest} onChange={(v) => setRecreateForm((p) => ({ ...p, changeRequest: v }))} placeholder="What to change..." />
              </>
            )}
            <SubmitButton loading={loading} text={activeTab === "generate" ? "Generate Thumbnail" : "Recreate Thumbnail"} />
          </div>
        </form>

        <div className="glass-card rounded-[32px] p-6">
          <span className="mb-4 block text-sm font-medium text-brand-purple">Preview</span>
          {preview ? (
            <div className="overflow-hidden rounded-2xl bg-slate-900">
              <img src={previewSrc} alt={preview.title} className="w-full object-cover" onError={() => { if (previewRetryCount < 4) setPreviewRetryCount((c) => c + 1); }} />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02]">
              <p className="text-sm text-slate-500">Your thumbnail will appear here</p>
            </div>
          )}
          {preview?.prompt && (
            <div className="mt-4 rounded-xl bg-white/5 p-4">
              <p className="mb-1 text-xs font-medium text-slate-400">Optimized prompt</p>
              <p className="text-sm text-slate-300">{preview.prompt}</p>
            </div>
          )}
          <div className="mt-4 rounded-xl bg-brand-purple/5 p-4">
            <p className="mb-1 text-xs font-bold text-brand-purple">💡 Tips</p>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>• Be specific about your topic for best results</li>
              <li>• Try different styles to see what clicks</li>
              <li>• Use the recreate tab to improve existing thumbnails</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputBlock = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-slate-300">{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} required={label !== "Optional Prompt" && label !== "Optional Image Upload URL"} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-brand-purple" />
  </div>
);

const SelectBlock = ({ label, value, onChange, options }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-slate-300">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-brand-purple">
      {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const PaletteBlock = ({ label, value, onSelect }) => (
  <div>
    <label className="mb-1.5 block text-sm font-medium text-slate-300">{label}</label>
    <div className="flex flex-wrap gap-3">
      {palettes.map((palette, i) => (
        <button type="button" key={i} onClick={() => onSelect(palette)} className={`flex gap-1 rounded-xl p-2 transition ${JSON.stringify(value) === JSON.stringify(palette) ? "ring-2 ring-brand-purple bg-white/10" : "bg-white/5 hover:bg-white/10"}`}>
          {palette.map((color, j) => <span key={j} className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />)}
        </button>
      ))}
    </div>
  </div>
);

const SubmitButton = ({ loading, text }) => (
  <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50">
    {loading ? "Generating..." : text}
  </button>
);

export default Generate;