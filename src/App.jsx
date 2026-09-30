import React, { useState, useEffect } from 'react';

const tg = window.Telegram?.WebApp;

// Уникальные виды NFT со скриншотов с индивидуальными фонами и ассетами
const BASE_COLLECTIONS = [
  {
    name: 'Snoop Dogg',
    prefix: 'SnoopDogg',
    badgeIcon: '🕶️',
    baseStars: 691,
    gradient: 'from-amber-900/60 via-amber-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/SnoopDogg-1.webp'
  },
  {
    name: 'Statue of Liberty',
    prefix: 'StatueOfLiberty',
    badgeIcon: '🗽',
    baseStars: 615,
    gradient: 'from-emerald-900/60 via-teal-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/StatueOfLiberty-1.webp'
  },
  {
    name: 'Ice Cream',
    prefix: 'IceCream',
    badgeIcon: '🍦',
    baseStars: 515,
    gradient: 'from-sky-900/60 via-cyan-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/IceCream-1.webp'
  },
  {
    name: 'Cake',
    prefix: 'Cake',
    badgeIcon: '🍰',
    baseStars: 650,
    gradient: 'from-pink-900/60 via-rose-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/Cake-1.webp'
  },
  {
    name: 'Jester Hat',
    prefix: 'JesterHat',
    badgeIcon: '🃏',
    baseStars: 500,
    gradient: 'from-purple-900/60 via-indigo-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/JesterHat-1.webp'
  },
  {
    name: 'Snake 2025',
    prefix: 'Snake2025',
    badgeIcon: '🐍',
    baseStars: 485,
    gradient: 'from-green-900/60 via-emerald-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/Snake2025-1.webp'
  },
  {
    name: 'Cigar',
    prefix: 'Cigar',
    badgeIcon: '🚬',
    baseStars: 1528,
    gradient: 'from-orange-900/60 via-amber-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/Cigar-1.webp'
  },
  {
    name: 'Sparkler',
    prefix: 'Sparkler',
    badgeIcon: '✨',
    baseStars: 600,
    gradient: 'from-yellow-900/60 via-amber-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/Sparkler-1.webp'
  },
  {
    name: 'Money Bouquet',
    prefix: 'MoneyBouquet',
    badgeIcon: '💐',
    baseStars: 687,
    gradient: 'from-lime-900/60 via-emerald-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/MoneyBouquet-1.webp'
  },
  {
    name: 'Light Saber',
    prefix: 'LightSaber',
    badgeIcon: '⚔️',
    baseStars: 691,
    gradient: 'from-blue-900/60 via-indigo-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/LightSaber-1.webp'
  },
  {
    name: 'Magic Book',
    prefix: 'MagicBook',
    badgeIcon: '📖',
    baseStars: 550,
    gradient: 'from-violet-900/60 via-purple-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/MagicBook-1.webp'
  },
  {
    name: 'Flamingo',
    prefix: 'Flamingo',
    badgeIcon: '🦩',
    baseStars: 518,
    gradient: 'from-fuchsia-900/60 via-pink-950 to-black',
    imageUrl: 'https://nft.fragment.com/gift/Flamingo-1.webp'
  }
];

// Разные типы узоров для уникальности каждого экземпляра
const PATTERNS = [
  'bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]',
  'bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px]',
  'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]',
  'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]'
];

// Генерация: 50 УНИКАЛЬНЫХ ЭКЗЕМПЛЯРОВ ДЛЯ КАЖДОГО ВИДА NFT
const GENERATED_NFT_ITEMS = [];

BASE_COLLECTIONS.forEach((col, colIdx) => {
  for (let i = 1; i <= 50; i++) {
    const itemNumber = (colIdx + 1) * 1000 + i;
    const starsVariation = col.baseStars + (i % 20) * 12;
    const pattern = PATTERNS[i % PATTERNS.length];

    GENERATED_NFT_ITEMS.push({
      id: `${col.prefix}-${itemNumber}`,
      type: col.prefix,
      name: col.name,
      number: `#${itemNumber}`,
      stars: starsVariation,
      link: `https://t.me/nft/${col.prefix}-${itemNumber}`,
      imageUrl: col.imageUrl,
      badgeIcon: col.badgeIcon,
      gradient: col.gradient,
      pattern: pattern,
      modelIndex: (i % 5) + 1 // Вариация модели
    });
  }
});

export default function App() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [balance, setBalance] = useState(231);
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
          <button className="text-neutral-400 text-lg">✕</button>
          <span className="font-bold text-sm">Отправить подарок</span>
        </div>

        <div className="flex items-center gap-1 bg-[#1c1c1e] px-3 py-1 rounded-full border border-neutral-800">
          <span className="text-xs text-neutral-400">Баланс</span>
          <span className="text-xs font-bold flex items-center gap-0.5">
            ⭐ {balance}
          </span>
        </div>
      </header>

      {/* 2. ПОИСК И ФИЛЬТРЫ */}
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
            Все ({GENERATED_NFT_ITEMS.length})
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

      {/* 3. СЕТКА КАРТОЧЕК: ФОТО ВО ВЕСЬ БЛОК И РАЗНЫЕ ФОНЫ */}
      <main className="px-3 mt-3 grid grid-cols-2 gap-2.5">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNft(item)}
            className="relative h-64 rounded-2xl overflow-hidden border border-neutral-800/80 active:scale-95 transition-transform cursor-pointer group flex flex-col justify-between"
          >
            {/* Градиентный индивидуальный фон + паттерн */}
            <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient}`} />
            <div className={`absolute inset-0 opacity-20 ${item.pattern}`} />

            {/* Плашка Маркет */}
            <div className="absolute top-2 left-2 bg-emerald-500/90 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-black z-10 backdrop-blur-sm">
              маркет
            </div>

            {/* Иконка визитка */}
            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-xs z-10 border border-white/10">
              {item.badgeIcon}
            </div>

            {/* NFT Модель во весь центр карточки */}
            <div className="relative w-full h-full flex items-center justify-center p-4 z-0">
              <img
                src={item.imageUrl}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://nft.fragment.com/gift/SnoopDogg-1.webp';
                }}
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Информация внизу на затемненном фоне */}
            <div className="relative z-10 p-3 bg-gradient-to-t from-black via-black/80 to-transparent pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white leading-tight">{item.name}</h3>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{item.number} • Model #{item.modelIndex}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <span>⭐</span> {item.stars}+
                  </div>
                </div>
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

      {/* 4. МОДАЛЬНОЕ ОКНО */}
      {selectedNft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center p-0">
          <div className="w-full bg-[#1c1c1e] border-t border-neutral-800 rounded-t-3xl p-5 text-center">
            <div className={`w-full h-64 mx-auto rounded-2xl relative overflow-hidden mb-4 border border-neutral-800 flex items-center justify-center bg-gradient-to-b ${selectedNft.gradient}`}>
              <div className={`absolute inset-0 opacity-20 ${selectedNft.pattern}`} />
              <img src={selectedNft.imageUrl} alt={selectedNft.name} className="max-h-48 max-w-full object-contain filter drop-shadow-2xl z-10" />
            </div>

            <h2 className="text-lg font-bold">{selectedNft.name}</h2>
            <p className="text-xs text-neutral-400 mt-0.5">{selectedNft.number} (Разновидность #{selectedNft.modelIndex})</p>

            <div className="my-4 p-3 bg-neutral-900 rounded-2xl border border-neutral-800 flex justify-between items-center text-sm">
              <span className="text-neutral-400 text-xs">Цена предложения:</span>
              <span className="font-bold text-amber-400 flex items-center gap-1 text-xs">
                ⭐ {selectedNft.stars} Stars
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
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-1"
              >
                Купить на маркете
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
