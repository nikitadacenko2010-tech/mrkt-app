import React, { useState, useEffect } from 'react';

const tg = window.Telegram?.WebApp;

// Базовые типы NFT с их именами, значками и диапазонами номеров
const BASE_TYPES = [
  {
    name: 'Snow Globe',
    prefix: 'SnowGlobe',
    badgeIcon: '❄️',
    basePrice: 15.00,
    linkPrefix: 'https://t.me/nft/SnowGlobe-',
    // Функция получения URL картинки для конкретного номера
    getImageUrl: (num) => `https://nft.fragment.com/gift/SnowGlobe-${num}.webp`
  },
  {
    name: 'Party Sparkler',
    prefix: 'PartySparkler',
    badgeIcon: '✨',
    basePrice: 4.00,
    linkPrefix: 'https://t.me/nft/PartySparkler-',
    getImageUrl: (num) => `https://nft.fragment.com/gift/PartySparkler-${num}.webp`
  },
  {
    name: 'Snoop Dogg',
    prefix: 'SnoopDogg',
    badgeIcon: '🌿',
    basePrice: 85.00,
    linkPrefix: 'https://t.me/nft/SnoopDogg-',
    getImageUrl: (num) => `https://nft.fragment.com/gift/SnoopDogg-${num}.webp`
  }
];

// Генерация массива из 300+ NFT (по 100+ каждого вида)
const GENERATED_NFT_ITEMS = [];

BASE_TYPES.forEach((type, typeIdx) => {
  for (let i = 1; i <= 100; i++) {
    // Уникальный ID и случайно сгенерированный номер для каждого вида NFT
    const itemNumber = (typeIdx + 1) * 1000 + i * 12 + (i % 7);
    const priceVariation = Number((type.basePrice + (i % 15) * 0.35).toFixed(2));
    
    GENERATED_NFT_ITEMS.push({
      id: `${type.prefix}-${itemNumber}`,
      type: type.prefix,
      name: type.name,
      number: `#${itemNumber}`,
      price: priceVariation,
      link: `${type.linkPrefix}${itemNumber}`,
      imageUrl: type.getImageUrl(itemNumber),
      badgeIcon: type.badgeIcon
    });
  }
});

export default function App() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [balance, setBalance] = useState(0);
  const [selectedNft, setSelectedNft] = useState(null);
  
  // Лимит отображаемых NFT на странице для быстродействия
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor('#121212');
    }
  }, []);

  // Фильтрация NFT по поиску и типу
  const filteredItems = GENERATED_NFT_ITEMS.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
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

      {/* 2. ПОИСК И ФИЛЬТРЫ */}
      <div className="px-3 mt-3 flex flex-col gap-2">
        <div className="bg-[#1c1c1e] rounded-xl px-3 py-2 flex items-center gap-2 border border-neutral-800/80">
          <span className="text-neutral-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Поиск по номеру (#1463) или названию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
          />
        </div>

        {/* Кнопки переключения видов NFT */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => { setSelectedType('all'); setVisibleCount(20); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedType === 'all'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'bg-[#1c1c1e] text-neutral-400'
            }`}
          >
            Все (300+)
          </button>
          <button
            onClick={() => { setSelectedType('SnowGlobe'); setVisibleCount(20); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedType === 'SnowGlobe'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'bg-[#1c1c1e] text-neutral-400'
            }`}
          >
            ❄️ Snow Globe (100)
          </button>
          <button
            onClick={() => { setSelectedType('PartySparkler'); setVisibleCount(20); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedType === 'PartySparkler'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'bg-[#1c1c1e] text-neutral-400'
            }`}
          >
            ✨ Party Sparkler (100)
          </button>
          <button
            onClick={() => { setSelectedType('SnoopDogg'); setVisibleCount(20); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              selectedType === 'SnoopDogg'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'bg-[#1c1c1e] text-neutral-400'
            }`}
          >
            🌿 Snoop Dogg (100)
          </button>
        </div>
      </div>

      {/* 3. СЕТКА NFT С ФОТО НА ВЕСЬ БЛОК */}
      <main className="px-3 mt-3 grid grid-cols-2 gap-2.5">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNft(item)}
            className="relative h-64 rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-900 active:scale-95 transition-transform cursor-pointer group"
          >
            {/* Изображение на всю высоту и ширину */}
            <img
              src={item.imageUrl}
              alt={item.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://nft.fragment.com/gift/gift.png';
              }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Значок в углу */}
            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-xs z-10 border border-white/10">
              {item.badgeIcon}
            </div>

            {/* Градиентное затемнение с текстом снизу */}
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

      {/* МОДАЛЬНОЕ ОКНО ПРОСМОТРА */}
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

      {/* 4. НИЖНЯЯ НАВИГАЦИЯ */}
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
