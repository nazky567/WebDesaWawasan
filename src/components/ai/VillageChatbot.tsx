import React, { useState, useEffect } from 'react';
import { Bot, Send, X, Sparkles } from 'lucide-react';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

declare global {
  interface Window {
    chatbase?: any;
  }
}

export const VillageChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Halo! Saya Wawasan AI, Asisten Cerdas Resmi Desa Wawasan. Ada yang bisa saya bantu mengenai syarat surat, jam pelayanan balai desa, atau informasi APBDes?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const chatbotId = import.meta.env.VITE_CHATBASE_CHATBOT_ID;

  // Embed Chatbase official widget using the exact script provided by Chatbase
  useEffect(() => {
    if (chatbotId) {
      // Initialize chatbase queue proxy (exact Chatbase snippet logic)
      if (!window.chatbase || window.chatbase('getState') !== 'initialized') {
        window.chatbase = (...args: any[]) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target: any, prop: string) {
            if (prop === 'q') {
              return target.q;
            }
            return (...args: any[]) => target(prop, ...args);
          }
        });
      }

      const onLoad = () => {
        // Only inject if the script isn't already present
        if (!document.getElementById(chatbotId)) {
          const script = document.createElement('script');
          script.src = 'https://www.chatbase.co/embed.min.js';
          script.id = chatbotId;
          script.setAttribute('domain', 'www.chatbase.co');
          script.defer = true;
          document.body.appendChild(script);
        }
      };

      if (document.readyState === 'complete') {
        onLoad();
      } else {
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
      }
    }
  }, [chatbotId]);

  // If Chatbase widget is active, don't render the local fallback chatbot
  if (chatbotId) {
    return null;
  }

  // ---------- LOCAL FALLBACK CHATBOT (when Chatbase is not configured) ----------

  const quickPrompts = [
    'Syarat Surat Keterangan Usaha (SKU)?',
    'Jam operasional Balai Desa?',
    'Bagaimana alur Surat Tidak Mampu (SKTM)?',
    'Kontak Balai Desa Wawasan?',
  ];

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');

    // AI Response Engine (Local fallback)
    setTimeout(() => {
      let replyText = 'Maaf, saya tidak menemukan jawaban spesifik. Anda dapat menghubungi Sekretariat Balai Desa Wawasan di WhatsApp 0852 1555 9711 atau email desawawasan01@gmail.com.';

      const lower = textToSend.toLowerCase();
      if (lower.includes('visi') || lower.includes('misi')) {
        replyText = 'Visi Desa Wawasan:\n"BERSATU MEMBANGUN PEMERINTAHAN YANG ADIL DAN INOVATIF DEMI MEWUJUDKAN MASYARAKAT YANG MANDIRI DAN SEJAHTERA."\n\nMisi Desa Wawasan:\n1. BERUPAYA MENGOPTIMALKAN PELAYANAN PEMERINTAH DESA KEPADA MASYARAKAT\n2. BERUPAYA MENGEDEPANKAN MUSYAWARAH MUFAKAT DENGAN PEMERINTAH MAUPUN MASYARAKAT\n3. BERUPAYA MEWUJUDKAN SARANA DAN PRASARANA YANG MEMADAI\n4. BERUPAYA MEMPERTAJAM POTENSI PEMUDA & OLAHRAGA\n5. BERUPAYA MENINGKATKAN KEHIDUPAN DESA YANG DINAMIS DALAM SEGI KEAGAMAAN & KEBUDAYAAN';
      } else if (lower.includes('sku') || lower.includes('usaha')) {
        replyText = 'Untuk mengurus Surat Keterangan Usaha (SKU), persyaratannya adalah: 1. Fotocopy KTP Pemohon, 2. Fotocopy Kartu Keluarga (KK), 3. Foto lokasi/tempat usaha Anda. Pengurusan dapat dilakukan langsung di Balai Desa Wawasan pada jam pelayanan.';
      } else if (lower.includes('sktm') || lower.includes('tidak mampu')) {
        replyText = 'Persyaratan Surat Keterangan Tidak Mampu (SKTM): 1. Fotocopy KTP, 2. Fotocopy KK, 3. Surat pernyataan bermaterai 10.000. Surat ini biasa digunakan untuk pengajuan beasiswa atau jaminan kesehatan.';
      } else if (lower.includes('jam') || lower.includes('operasional') || lower.includes('buka')) {
        replyText = 'Balai Desa Wawasan buka setiap hari Senin - Jumat pukul 08.00 – 15.00 WIB.';
      } else if (lower.includes('kontak') || lower.includes('nomor') || lower.includes('telepon')) {
        replyText = 'Kontak Sekretariat Desa Wawasan: 📞 WhatsApp 0852 1555 9711 | 📧 Email: desawawasan01@gmail.com | Jam Layanan: 08.00 – 15.00 WIB';
      } else if (lower.includes('domisili')) {
        replyText = 'Persyaratan Surat Keterangan Domisili: 1. Fotocopy KTP, 2. Fotocopy KK, 3. Surat Pengantar RT/RW setempat.';
      }

      const aiMsg: Message = {
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-3 brand-gradient hover:opacity-90 text-white px-5 py-3.5 rounded-full shadow-2xl shadow-blue-500/40 group transition-all duration-300 hover:scale-105"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white animate-bounce" />
          </div>
          <span className="text-sm font-bold tracking-tight">Tanya Wawasan AI</span>
          <Sparkles className="w-4 h-4 text-blue-200" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[520px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Window Header */}
          <div className="brand-gradient p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Wawasan AI <Sparkles className="w-3.5 h-3.5 text-blue-200 fill-blue-200" />
                </h4>
                <p className="text-[10px] text-blue-100 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Asisten Cerdas SID Desa Wawasan
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-slate-50">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg brand-gradient flex items-center justify-center text-white shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'brand-gradient text-white rounded-tr-none shadow-md shadow-blue-600/20'
                      : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className="text-[9px] opacity-60 mt-1 block text-right">{m.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 border-t border-slate-200 bg-white overflow-x-auto flex space-x-1.5 scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="whitespace-nowrap bg-slate-50 hover:bg-blue-50 hover:border-blue-200 text-slate-500 hover:text-[#040DBF] text-[10px] px-2.5 py-1 rounded-full border border-slate-200 transition-all shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Tanyakan seputar layanan desa..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#040DBF]/50"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 brand-gradient text-white rounded-xl shadow-md shadow-blue-600/30 transition-all hover:opacity-90"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
