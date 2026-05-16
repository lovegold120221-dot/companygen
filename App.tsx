import React, { useState, useRef } from 'react';
import { BrandDashboard } from './components/BrandDashboard';
import { generateBrand } from './services/gemini';
import { SparklesIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/solid';

const App: React.FC = () => {
  const [brand, setBrand] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const fileToBase64 = (f: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !file) return;
    setIsGenerating(true);
    setBrand(null);
    try {
      let base64;
      let mimeType;
      
      if (file) {
          base64 = await fileToBase64(file);
          mimeType = file.type;
      }

      const data = await generateBrand(prompt, base64, mimeType);
      setBrand(data);
    } catch (error) {
      console.error("Failed to generate brand:", error);
      alert("Something went wrong while generating the brand. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (brand) {
    return <BrandDashboard brand={brand} onReset={() => setBrand(null)} />;
  }

  return (
    <div className="min-h-[100dvh] bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{
        backgroundImage: 'radial-gradient(circle at 50% -20%, rgba(212,160,23,0.15) 0%, transparent 40%)'
    }}>
        <div className="w-full max-w-2xl z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 border border-yellow-500/30 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,160,23,0.2)]">
                <SparklesIcon className="w-8 h-8 text-yellow-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
                Brand <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Generator</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-10 max-w-lg">
                Describe your company, idea, or product. We'll generate a complete branding package including logos, colors, taglines, and 12 customized HTML documents.
            </p>

            <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-2 flex flex-col focus-within:border-yellow-500/50 focus-within:ring-1 focus-within:ring-yellow-500/50 transition-all shadow-xl">
                {previewUrl && (
                    <div className="relative w-32 h-32 mx-4 mt-4 rounded-xl overflow-hidden border border-zinc-700 bg-black">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={removeFile} className="absolute top-1 right-1 bg-black/50 hover:bg-black p-1 rounded-full text-white backdrop-blur transition-all">
                            <XMarkIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
                <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. Next-gen AI automation agency based in Belgium specializing in workflow optimization..."
                    className="w-full bg-transparent p-4 text-zinc-100 placeholder:text-zinc-600 resize-none h-32 focus:outline-none"
                    disabled={isGenerating}
                />
                <div className="flex justify-between items-center p-2 border-t border-zinc-800">
                    <div>
                        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isGenerating}
                            className="p-2 text-zinc-400 hover:text-yellow-500 hover:bg-zinc-800 rounded-lg transition-all"
                            title="Upload image or file"
                        >
                            <PhotoIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <button 
                        onClick={handleGenerate}
                        disabled={(!prompt.trim() && !file) || isGenerating}
                        className="py-2.5 px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-zinc-950 font-bold rounded-lg hover:brightness-110 disabled:opacity-50 disabled:hover:brightness-100 transition-all flex items-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div>
                                Crafting Brand...
                            </>
                        ) : (
                            <>Generate Assets</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default App;
