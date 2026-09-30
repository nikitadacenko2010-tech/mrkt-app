import React, { useState, useEffect } from 'react';

const tg = window.Telegram?.WebApp;

// Полная коллекция подарков точно по вашим скриншотам из Telegram
const BASE_COLLECTIONS = [
  // Скриншот 2:
  {
    name: 'Snoop Dogg',
    prefix: 'SnoopDogg',
    badgeIcon: '🕶️',
    baseStars: 691,
    imageUrl: 'https://nft.fragment.com/gift/SnoopDogg-1.webp'
  },
  {
    name: 'Statue of Liberty',
    prefix: 'StatueOfLiberty',
    badgeIcon: '🗽',
    baseStars: 615,
    imageUrl: 'https://nft.fragment.com/gift/StatueOfLiberty-1.webp'
  },
  {
    name: 'Coffee Cup',
    prefix: 'CoffeeCup',
    badgeIcon: '☕',
    baseStars: 515,
    imageUrl: 'https://nft.fragment.com/gift/CoffeeCup-1.webp'
  },
  {
    name: 'Noodles',
    prefix: 'Noodles',
    badgeIcon: '🍜',
    baseStars: 490,
    imageUrl: 'https://nft.fragment.com/gift/Noodles-1.webp'
  },
  {
    name: 'Lollipop',
    prefix: 'Lollipop',
    badgeIcon: '🍭',
    baseStars: 550,
    imageUrl: 'https://nft.fragment.com/gift/Lollipop-1.webp'
  },
  {
    name: 'Ice Cream',
    prefix: 'IceCream',
    badgeIcon: '🍦',
    baseStars: 515,
    imageUrl: 'https://nft.fragment.com/gift/IceCream-1.webp'
  },
  {
    name: 'Flamingo',
    prefix: 'Flamingo',
    badgeIcon: '🦩',
    baseStars: 518,
    imageUrl: 'https://nft.fragment.com/gift/Flamingo-1.webp'
  },
  {
    name: 'Backpack',
    prefix: 'Backpack',
    badgeIcon: '🎒',
    baseStars: 598,
    imageUrl: 'https://nft.fragment.com/gift/Backpack-1.webp'
  },
  {
    name: 'Christmas Sock',
    prefix: 'ChristmasSock',
    badgeIcon: '🧦',
    baseStars: 499,
    imageUrl: 'https://nft.fragment.com/gift/ChristmasSock-1.webp'
  },
  {
    name: 'Green Bag',
    prefix: 'GreenBag',
    badgeIcon: '💼',
    baseStars: 691,
    imageUrl: 'https://nft.fragment.com/gift/GreenBag-1.webp'
  },
  {
    name: 'Snake 2025',
    prefix: 'Snake2025',
    badgeIcon: '🐍',
    baseStars: 485,
    imageUrl: 'https://nft.fragment.com/gift/Snake2025-1.webp'
  },
  {
    name: 'Poop',
    prefix: 'Poop',
    badgeIcon: '💩',
    baseStars: 575,
    imageUrl: 'https://nft.fragment.com/gift/Poop-1.webp'
  },
  {
    name: 'March 8 Cupcake',
    prefix: 'March8Cupcake',
    badgeIcon: '🧁',
    baseStars: 500,
    imageUrl: 'https://nft.fragment.com/gift/March8Cupcake-1.webp'
  },
  {
    name: 'Candy Cane',
    prefix: 'CandyCane',
    badgeIcon: '🍬',
    baseStars: 500,
    imageUrl: 'https://nft.fragment.com/gift/CandyCane-1.webp'
  },
  {
    name: 'Four Leaf Clover',
    prefix: 'FourLeafClover',
    badgeIcon: '🍀',
    baseStars: 691,
    imageUrl: 'https://nft.fragment.com/gift/FourLeafClover-1.webp'
  },

  // Скриншот 1:
  {
    name: 'Pretzel',
    prefix: 'Pretzel',
    badgeIcon: '🥨',
    baseStars: 691,
    imageUrl: 'https://nft.fragment.com/gift/Pretzel-1.webp'
  },
  {
    name: 'Happy Birthday',
    prefix: 'HappyBirthday',
    badgeIcon: '🎂',
    baseStars: 690,
    imageUrl: 'https://nft.fragment.com/gift/HappyBirthday-1.webp'
  },
  {
    name: 'Cake',
    prefix: 'Cake',
    badgeIcon: '🍰',
    baseStars: 650,
    imageUrl: 'https://nft.fragment.com/gift/Cake-1.webp'
  },
  {
    name: 'Jester Hat',
    prefix: 'JesterHat',
    badgeIcon: '🃏',
    baseStars: 500,
    imageUrl: 'https://nft.fragment.com/gift/JesterHat-1.webp'
  },
  {
    name: 'Snake Gift',
    prefix: 'SnakeGift',
    badgeIcon: '🐍',
    baseStars: 499,
    imageUrl: 'https://nft.fragment.com/gift/SnakeGift-1.webp'
  },
  {
    name: 'Gold Medal',
    prefix: 'GoldMedal',
    badgeIcon: '🥇',
    baseStars: 650,
    imageUrl: 'https://nft.fragment.com/gift/GoldMedal-1.webp'
  },
  {
    name: 'Easter Bunny',
    prefix: 'EasterBunny',
    badgeIcon: '🐰',
    baseStars: 691,
    imageUrl: 'https://nft.fragment.com/gift/EasterBunny-1.webp'
  },
  {
    name: 'Cigar',
    prefix: 'Cigar',
    badgeIcon: '🚬',
    baseStars: 1528,
    imageUrl: 'https://nft.fragment.com/gift/Cigar-1.webp'
  },
  {
    name: 'Sparkler',
    prefix: 'Sparkler',
    badgeIcon: '✨',
    baseStars: 600,
    imageUrl: 'https://nft.fragment.com/gift/Sparkler-1.webp'
  },
  {
    name: 'Money Bouquet',
    prefix: 'MoneyBouquet',
    badgeIcon: '💐',
    baseStars: 687,
    imageUrl: 'https://nft.fragment.com/gift/MoneyBouquet-1.webp'
  },
  {
    name: 'Light Saber',
    prefix: 'LightSaber',
    badgeIcon: '⚔️',
    baseStars: 691,
    imageUrl: 'https://nft.fragment.com/gift/LightSaber-1.webp'
  },
  {
    name: 'Magic Book',
    prefix: 'MagicBook',
    badgeIcon: '📖',
    baseStars: 550,
    imageUrl: 'https://nft.fragment.com/gift/MagicBook-1.webp'
  }
];

// Генерация массива: РОВНО ПО 50 ЭКЗЕМПЛЯРОВ каждого NFT из скриншотов
const GENERATED_NFT_ITEMS = [];

BASE_COLLECTIONS.forEach((col, colIdx) => {
  for (let i = 1; i <= 50; i++) {
    const itemNumber = (colIdx + 1) * 1000 + i;
    const starsVariation = col.baseStars + (i % 15) * 5;

    GENERATED_NFT_ITEMS.push({
      id: `${col.prefix}-${itemNumber}`,
      type: col.prefix,
      name: col.name,
      number: `#${itemNumber}`,
      stars: starsVariation,
      link: `https://t.me/nft/${col.prefix}-${itemNumber}`,
      imageUrl: col.imageUrl,
      badgeIcon: col.badgeIcon,
    });
  }
});

export default function App() {
  const [activeTab, setActiveTab] = useState('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [balance, setBalance] = useState(231);
  const [selectedNft, setSelectedNft] = useState(null);
  const [visibleCount, setVisibleCount] = useState(24);

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
      {/* 1. ВЕРХНЯЯ ШАПКА КАК В TELEGRAM */}
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

      {/* 2. ПОИСК И КАТЕГОРИИ (ПО 50 ШТУК В КАЖДОЙ) */}
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

        {/* Скролл фильтра с подсчетом по 50 шт */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => { setSelectedType('all'); setVisibleCount(24); }}
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
              onClick={() => { setSelectedType(col.prefix); setVisibleCount(24); }}
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

      {/* 3. СЕТКА NFT-ПОДАРКОВ (КАК В ОРИГИНАЛЬНОМ ИНТЕРФЕЙСЕ) */}
      <main className="px-3 mt-3 grid grid-cols-3 gap-2">
        {displayedItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNft(item)}
            className="bg-[#1c1c1e] border border-neutral-800/80 rounded-2xl p-2.5 flex flex-col items-center justify-between relative active:scale-95 transition-transform cursor-pointer aspect-square"
          >
            {/* Плашка Маркет */}
            <div className="absolute top-0 right-0 bg-emerald-500/80 text-[8px] font-bold px-1.5 py-0.5 rounded-bl-lg rounded-tr-xl uppercase tracking-wider text-black">
              маркет
            </div>

            {/* Картинка NFT */}
            <div className="w-16 h-16 flex items-center justify-center my-auto">
              <img
                src={item.imageUrl}
                alt={item.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://nft.fragment.com/gift/SnoopDogg-1.webp';
                }}
                className="max-w-full max-h-full object-contain filter drop-shadow-md"
              />
            </div>

            {/* Цена в звездах */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 mt-1">
              <span>⭐</span>
              <span>{item.stars}+</span>
            </div>
          </div>
        ))}
      </main>

      {/* КНОПКА ЗАГРУЗИТЬ ЕЩЕ */}
      {visibleCount < filteredItems.length && (
        <div className="px-3 mt-4 text-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 24)}
            className="w-full py-3 bg-[#1c1c1e] hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs font-semibold text-neutral-300 transition-colors"
          >
            Загрузить еще ({filteredItems.length - visibleCount} осталось)
          </button>
        </div>
      )}

      {/* 4. МОДАЛЬНОЕ ОКНО ПРОСМОТРА ПОДАРКА */}
      {selectedNft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center p-0">
          <div className="w-full bg-[#1c1c1e] border-t border-neutral-800 rounded-t-3xl p-5 text-center">
            <div className="w-28 h-28 mx-auto rounded-2xl p-2 flex items-center justify-center mb-3 bg-neutral-900 border border-neutral-800">
              <img src={selectedNft.imageUrl} alt={selectedNft.name} className="max-h-full max-w-full object-contain" />
            </div>

            <h2 className="text-base font-bold">{selectedNft.name}</h2>
            <p className="text-xs text-neutral-500 mt-0.5">{selectedNft.number}</p>

            <div className="my-4 p-3 bg-neutral-900 rounded-2xl border border-neutral-800 flex justify-between items-center text-sm">
              <span className="text-neutral-400 text-xs">Стоимость подарка:</span>
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
                Отправить в Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
