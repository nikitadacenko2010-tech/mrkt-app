import React, { useState, useEffect } from 'react';

const tg = window.Telegram?.WebApp;

// Карточки с указанными NFT подарками из Telegram (Fragment)
const INITIAL_MARKET_ITEMS = [
  {
    id: 1,
    name: 'Snow Globe',
    number: '#1463',
    price: 15.50,
    link: 'https://t.me/nft/SnowGlobe-1463',
    imageUrl: 'https://nft.fragment.com/gift/SnowGlobe-1463.webp', 
    badgeIcon: '❄️'
  },
  {
    id: 2,
    name: 'Party Sparkler',
    number: '#118452',
    price: 4.20,
    link: 'https://t.me/nft/PartySparkler-118452',
    imageUrl: 'https://nft.fragment.com/gift/PartySparkler-118452.webp', 
    badgeIcon: '✨'
  },
  {
    id: 3,
    name: 'Snoop Dogg',
    number: '#227413',
    price: 88.00,
    link: 'https://t.me/nft/SnoopDogg-227413',
    imageUrl: 'https://nft.fragment.com/gift/SnoopDogg-227413.webp', 
    badgeIcon: '🌿'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [balance, setBalance] = useState(0);
  const [selectedNft, setSelectedNft] = useState(null);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#121212');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans pb-24 select-none">
      {/* ВЕРХНЯЯ ШАПКА */}
      <header className="px-4 py-3 flex items-center justify-between border-b border-neutral-800/60 sticky top-0 bg-[#121212]/95 backdrop-blur-md z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center overflow-hidden">
            <span className="text-xs">🗿</span>
          </div>
          <div className="flex items-center gap-1 bg-[#1c1c1e] px-2.5 py-1 rounded-full border border-neutral-800">
            <span className="text-xs">💎</span>
            <span className="text-xs font-bold">{balance}</span>
            <button className="w-4 h-4 rounded-full bg-neutral-700 text-[10px] flex items-center justify-center text-neutral-300 ml-1">
              +
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-neutral-400">
          <button className="hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
          <button className="hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </header>

      {/* ПОИСК */}
      <div className="px-3 mt-3">
        <div className="bg-[#1c1c1e] rounded-xl px-3 py-2 flex items-center gap-2 border border-neutral-800/80">
          <span className="text-neutral-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Поиск по названию NFT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
          />
        </div>
      </div>

      {/* СЕТКА NFT — КАРТИНКА НА ВСЮ ПЛОЩАДЬ */}
      <main className="px-3 mt-3 grid grid-cols-2 gap-2.5">
        {INITIAL_MARKET_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNft(item)}
            className="relative h-64 rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-900 active:scale-95 transition-transform cursor-pointer group"
          >
            {/* Картинка NFT во всю ширину и высоту */}
            <img
              src={item.imageUrl}
              alt={item.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://nft.fragment.com/gift/gift.png';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Иконка в верхнем углу */}
            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-xs z-10 border border-white/10">
              {item.badgeIcon}
            </div>

            {/* Градиентное затемнение снизу для текста */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 pt-10 flex flex-col justify-end">
              <h3 className="text-xs font-bold text-white leading-tight">{item.name}</h3>
              <p className="text-[10px] text-neutral-400 mt-0.5">{item.number}</p>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <span>💎</span> {item.price} TON
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-xs text-white transition-colors"
                >
                  ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* МОДАЛЬНОЕ ОКНО С ИЗОБРАЖЕНИЕМ НА ВЕСЬ БЛОК */}
      {selectedNft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center p-0">
          <div className="w-full bg-[#1c1c1e] border-t border-neutral-800 rounded-t-3xl p-5 text-center animate-slide-up">
            <div className="w-full h-64 mx-auto rounded-2xl overflow-hidden relative mb-4 border border-neutral-800 shadow-2xl bg-neutral-900">
              <img src={selectedNft.imageUrl} alt={selectedNft.name} className="w-full h-full object-cover" />
            </div>

            <h2 className="text-lg font-bold">{selectedNft.name}</h2>
            <p className="text-xs text-neutral-500 mt-0.5">{selectedNft.number}</p>

            <div className="my-5 p-3 bg-neutral-900/90 rounded-2xl border border-neutral-800 flex justify-between items-center text-sm">
              <span className="text-neutral-400">Текущая цена:</span>
              <span className="font-bold text-white flex items-center gap-1">
                💎 {selectedNft.price} TON
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedNft(null)}
                className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs font-semibold"
              >
                Закрыть
              </button>
              <a
                href={selectedNft.link}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-center"
              >
                Открыть в Telegram
              </a>
            </div>
          </div>
        </div>
      )}

      {/* НАВИГАЦИЯ */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-lg border-t border-neutral-800 px-2 py-2 flex justify-around z-40">
        <button onClick={() => setActiveTab('market')} className={`flex flex-col items-center gap-1 ${activeTab === 'market' ? 'text-white font-bold' : 'text-neutral-500'}`}>
          <span className="text-base">░░</span>
          <span className="text-[10px]">Маркет</span>
        </button>
        <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center gap-1 ${activeTab === 'orders' ? 'text-white font-bold' : 'text-neutral-500'}`}>
          <span className="text-base">📋</span>
          <span className="text-[10px]">Ордеры</span>
        </button>
      </nav>
    </div>
  );
}
