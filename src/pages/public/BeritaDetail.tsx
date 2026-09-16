import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, ArrowLeft, Sparkles } from 'lucide-react';
import { dataService } from '../../services/dataService';
import type { BeritaItem } from '../../types';

export const BeritaDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BeritaItem | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    dataService.getBerita().then((list) => {
      const found = list.find((item) => item.slug === slug) || list[0];
      setArticle(found);
    });
  }, [slug]);

  const handleGenerateAISummary = () => {
    setIsSummarizing(true);
    setTimeout(() => {
      setAiSummary(
        `📌 Ringkasan AI: ${article?.judul} menguraikan peluncuran portal digital Desa Wawasan yang membawa efisiensi pengurusan surat online via QR Code, transparansi APBDes, serta promosi produk UMKM lokal secara terpadu.`
      );
      setIsSummarizing(false);
    }, 800);
  };

  if (!article) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <Link to="/berita" className="inline-flex items-center space-x-2 text-xs font-semibold text-[#040DBF] hover:text-[#05C7F2]">
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Daftar Berita</span>
      </Link>

      <div className="space-y-4">
        <span className="bg-blue-50 text-[#040DBF] border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {article.kategori_berita?.nama_kategori || 'Berita Utama'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
          {article.judul}
        </h1>
        <div className="flex items-center space-x-4 text-xs text-slate-400 border-b border-slate-200 pb-4">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(article.created_at).toLocaleDateString('id-ID', { dateStyle: 'full' })}</span>
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views_count} kali dibaca</span>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 h-80 sm:h-96 shadow-sm">
        <img src={article.thumbnail_url} alt={article.judul} className="w-full h-full object-cover" />
      </div>

      {/* AI Automated Summary Widget */}
      <div className="bg-blue-50 p-5 rounded-2xl border border-blue-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#040DBF] font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>AI Automated News Summarizer</span>
          </div>
          {!aiSummary && (
            <button
              onClick={handleGenerateAISummary}
              disabled={isSummarizing}
              className="brand-gradient text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
            >
              {isSummarizing ? 'Memproses Ringkasan...' : 'Buat Ringkasan AI'}
            </button>
          )}
        </div>
        {aiSummary && (
          <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-blue-100">
            {aiSummary}
          </p>
        )}
      </div>

      {/* Article Content */}
      <div className="prose max-w-none text-slate-600 text-sm leading-relaxed whitespace-pre-line">
        {article.konten}
      </div>

    </div>
  );
};
