import React, { useState, useEffect } from 'react';

const tg = window.Telegram?.WebApp;

// Список всех ключевых коллекций Telegram NFT с надежными CDN-ассетами
const BASE_COLLECTIONS = [
  {
    name: 'Snow Globe',
    prefix: 'SnowGlobe',
    badgeIcon: '❄️️',
    basePrice: 15.00,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png',
    bgPattern: 'radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)'
  },
  {
    name: 'Party Sparkler',
    prefix: 'PartySparkler',
    badgeIcon: '✨',
    basePrice: 4.20,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/426/426833.png',
    bgPattern: 'radial-gradient(circle at center, #854d0e 0%, #1a1003 100%)'
  },
  {
    name: 'Snoop Dogg',
    prefix: 'SnoopDogg',
    badgeIcon: '🌿',
    basePrice: 88.00,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3159/3159066.png',
    bgPattern: 'radial-gradient(circle at center, #3f6212 0%, #0e1e07 100%)'
  },
  {
    name: 'Pepe',
    prefix: 'Pepe',
    badgeIcon: '🐸',
    basePrice: 45.00,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3159/3159025.png',
    bgPattern: 'radial-gradient(circle at center, #059669 0%, #064e3b 100%)'
  },
  {
    name: 'Vice Cream',
    prefix: 'ViceCream',
    badgeIcon: '🍦',
    basePrice: 3.50,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3159/3159066.png',
    bgPattern: 'radial-gradient(circle at center, #0284c7 0%, #082f49 100%)'
  },
  {
    name: 'Hot Pepper',
    prefix: 'HotPepper',
    badgeIcon: '🌶️',
    basePrice: 5.00,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png',
    bgPattern: 'radial-gradient(circle at center, #b91c1c 0%, #450a0a 100%)'
  }
];

// Генерация массива: РОВНО ПО 50 ЭКЗЕМПЛЯРОВ каждого вида NFT
const GENERATED_NFT_ITEMS = [];

BASE_COLLECTIONS.forEach((col, colIdx) => {
  for (let i = 1; i <= 50; i++) {
    const itemNumber = (colIdx + 1) * 1000 + i;
    const priceVariation = Number((col.basePrice + (i % 10) * 0.3).toFixed(2));

    GENERATED_NFT_ITEMS.push({
      id: `${col.prefix}-${itemNumber}`,
      type: col.prefix,
      name: col.name,
      number: `#${itemNumber}`,
      price: priceVariation,
      link: `https://t.me/nft/${col.prefix}-${itemNumber}`,
      imageUrl: col.imageUrl,
      badgeIcon: col.badgeIcon,
      bgPattern: col.bgPattern
    });
  }
});

export default function App() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [balance, setBalance] = useState(0);
  const [selectedNft, setSelectedNft] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#121212');
    }
  }, []);

  const filteredItems = GENERATED_NFT_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.number.includes(searchQuery);
    const matchesType = selectedType === 'all' || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const displayedItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans pb-24 select-none">
      {/* 1. ВЕРХНЯЯ ШАПКА */}
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

      {/* 2. ПОИСК И ФИЛЬТРЫ ПО ВИДАМ (ПО 50 ШТУК) */}
      <div className="px-3 mt-3 flex flex-col gap-2">
        <div className="bg-[#1c1c1e] rounded-xl px-3 py-2 flex items-center gap-2 border border-neutral-800/80">
          <span className="text-neutral-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Поиск по номеру (#1001) или названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => { setSelectedType('all'); setVisibleCount(20); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedType === 'all'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'bg-[#1c1c1e] text-neutral-400'
            }`}
          >
            Все (300)
          </button>
          {BASE_COLLECTIONS.map((col) => (
            <button
              key={col.prefix}
              onClick={() => { setSelectedType(col.prefix); setVisibleCount(20); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1 ${
                selectedType === col.prefix
                  ? 'bg-neutral-800 text-white border border-neutral-700'
                  : 'bg-[#1c1c1e] text-neutral-400'
              }`}
            >
              <span>{col.badgeIcon}</span> {col.name} (50)
            </button>
          ))}
        </div>
      </div>

      {/* 3. СЕТКА КАРТОЧЕК В НАЧАЛЬНОМ СТИЛЕ (3D ОБЪЕКТ С ПОДЛОЖКОЙ) */}
      <main className="px-3 mt-3 grid grid-cols-2 gap-2.5">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNft(item)}
            className="bg-[#1c1c1e] border border-neutral-800/80 rounded-2xl overflow-hidden flex flex-col justify-between active:scale-95 transition-transform cursor-pointer"
          >
            {/* Блок с 3D объектом и красивым градиентным фоном */}
            <div 
              className="h-44 relative flex items-center justify-center p-4 overflow-hidden"
              style={{ background: item.bgPattern }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

              <img
                src={item.imageUrl}
                alt={item.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.6)] transform hover:scale-110 transition-transform duration-300 z-10"
              />

              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-[10px] z-20">
                {item.badgeIcon}
              </div>
            </div>

            {/* Подпись снизу */}
            <div className="p-2.5">
              <h3 className="text-xs font-bold text-white leading-tight">{item.name}</h3>
              <p className="text-[10px] text-neutral-500 mt-0.5">{item.number}</p>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-bold text-white">
                  <span>💎</span> {item.price} TON
                </div>
                <button className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 transition-colors">
                  ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* КНОПКА ЗАГРУЗИТЬ ЕЩЕ */}
      {visibleCount < filteredItems.length && (
        <div className="px-3 mt-4 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 20)}
            className="w-full py-3 bg-[#1c1c1e] hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-semibold text-neutral-300 transition-colors"
          >
            Загрузить еще ({filteredItems.length - visibleCount} осталось)
          </button>
        </div>
      )}

      {/* 4. МОДАЛЬНОЕ ОКНО ПРОСМОТРА */}
      {selectedNft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center p-0">
          <div className="w-full bg-[#1c1c1e] border-t border-neutral-800 rounded-t-3xl p-5 text-center animate-slide-up">
            <div 
              className="w-40 h-40 mx-auto rounded-2xl p-4 flex items-center justify-center mb-4 shadow-2xl relative overflow-hidden"
              style={{ background: selectedNft.bgPattern }}
            >
              <img src={selectedNft.imageUrl} alt={selectedNft.name} className="max-h-full max-w-full object-contain filter drop-shadow-xl z-10" />
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

      {/* 5. НИЖНЯЯ НАВИГАЦИЯ */}
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
