import React, { useState, useEffect } from 'react';

const tg = window.Telegram?.WebApp;

// Карточки NFT-подарков с качественными PNG-изображениями
const INITIAL_MARKET_ITEMS = [
  {
    id: 1,
    name: 'Chill Flame',
    number: '#362097',
    price: 3.37,
    // Используем качественные 3D-иллюстрации NFT
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/426/426833.png', 
    bgGradient: 'from-sky-500/80 via-blue-600/60 to-indigo-900/90',
    badgeIcon: '☘️'
  },
  {
    id: 2,
    name: 'Vice Cream',
    number: '#311925',
    price: 3.46,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3159/3159066.png', 
    bgGradient: 'from-emerald-500/80 via-teal-600/60 to-slate-900/90',
    badgeIcon: '☘️'
  },
  {
    id: 3,
    name: 'Orange Ice',
    number: '#102941',
    price: 2.80,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png', 
    bgGradient: 'from-amber-500/80 via-orange-600/60 to-zinc-900/90',
    badgeIcon: '☘️'
  },
  {
    id: 4,
    name: 'Berry Delight',
    number: '#882103',
    price: 4.10,
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3159/3159025.png', 
    bgGradient: 'from-rose-500/80 via-pink-600/60 to-neutral-900/90',
    badgeIcon: '☘️'
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('market');
  const [category, setCategory] = useState('gifts');
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
          <button className="hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* 2. БАННЕР ПЕНАЛЬТИ */}
      <div className="p-3">
        <div className="bg-gradient-to-r from-emerald-950 via-green-900 to-neutral-900 border border-emerald-800/40 rounded-2xl p-3 flex items-center justify-between relative overflow-hidden">
          <div>
            <div className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
              PENALTY УЖЕ В PLAYHUB
            </div>
            <div className="text-xs text-neutral-300 mt-0.5">10 ударов до финала!</div>
          </div>
          <div className="text-3xl">⚽</div>
        </div>
      </div>

      {/* 3. КАТЕГОРИИ */}
      <div className="px-3 flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setCategory('gifts')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
            category === 'gifts'
              ? 'bg-neutral-800 text-white border border-neutral-700'
              : 'bg-[#1c1c1e] text-neutral-400'
          }`}
        >
          <span>🎛️</span> Подарки
        </button>
        <button className="p-2 bg-[#1c1c1e] text-neutral-400 rounded-xl text-xs">🚶</button>
        <button className="p-2 bg-[#1c1c1e] text-neutral-400 rounded-xl text-xs">⭐</button>
        <button className="p-2 bg-[#1c1c1e] text-neutral-400 rounded-xl text-xs">🖥️</button>
        <button className="p-2 bg-[#1c1c1e] text-neutral-400 rounded-xl text-xs">📣</button>
        <button className="p-2 bg-[#1c1c1e] text-neutral-400 rounded-xl ml-auto text-xs">🛒</button>
      </div>

      {/* 4. ПОИСК И FEED */}
      <div className="px-3 mt-3 flex gap-2">
        <div className="flex-1 bg-[#1c1c1e] rounded-xl px-3 py-2 flex items-center gap-2 border border-neutral-800/80">
          <span className="text-neutral-500 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Поиск по названию NFT / номеру"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
          />
        </div>
        <button className="bg-[#1c1c1e] border border-neutral-800/80 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-neutral-300">
          <span>📋</span> Feed
        </button>
      </div>

      {/* 5. ФИЛЬТРЫ */}
      <div className="px-3 mt-2 flex gap-1.5 overflow-x-auto no-scrollbar">
        <button className="p-2 bg-[#1c1c1e] rounded-lg text-neutral-400 text-xs">⚡</button>
        <button className="px-2.5 py-1.5 bg-[#1c1c1e] rounded-lg text-neutral-300 text-[11px] flex items-center gap-1">
          NFT <span className="text-[9px]">▼</span>
        </button>
        <button className="px-2.5 py-1.5 bg-[#1c1c1e] rounded-lg text-neutral-300 text-[11px] flex items-center gap-1">
          Модель <span className="text-[9px]">▼</span>
        </button>
        <button className="px-2.5 py-1.5 bg-[#1c1c1e] rounded-lg text-neutral-300 text-[11px] flex items-center gap-1">
          Фон <span className="text-[9px]">▼</span>
        </button>
        <button className="px-2.5 py-1.5 bg-[#1c1c1e] rounded-lg text-neutral-300 text-[11px] flex items-center gap-1">
          Символ <span className="text-[9px]">▼</span>
        </button>
      </div>

      {/* 6. СЕТКА NFT С РЕАЛЬНЫМИ ИЗОБРАЖЕНИЯМИ */}
      <main className="px-3 mt-3 grid grid-cols-2 gap-2.5">
        {INITIAL_MARKET_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedNft(item)}
            className="bg-[#1c1c1e] border border-neutral-800/80 rounded-2xl overflow-hidden flex flex-col justify-between active:scale-95 transition-transform cursor-pointer"
          >
            {/* Отрисовка NFT с градиентным фоном и тенью */}
            <div className={`h-40 bg-gradient-to-tr ${item.bgGradient} relative flex items-center justify-center p-4`}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transform hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-[10px]">
                {item.badgeIcon}
              </div>
            </div>

            <div className="p-2.5">
              <h3 className="text-xs font-bold text-white leading-tight">{item.name}</h3>
              <p className="text-[10px] text-neutral-500 mt-0.5">{item.number}</p>

              {item.id === 4 ? (
                <button className="mt-2 w-full py-2 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 text-neutral-200 transition-colors">
                  <span>🛒</span> Купить оптом
                </button>
              ) : (
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-bold text-white">
                    <span>💎</span> {item.price}
                  </div>
                  <button className="p-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* МОДАЛЬНОЕ ОКНО ДЕТАЛЬНОГО ПРОСМОТРА NFT */}
      {selectedNft && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center p-0">
          <div className="w-full bg-[#1c1c1e] border-t border-neutral-800 rounded-t-3xl p-5 text-center animate-slide-up">
            <div className={`w-36 h-36 mx-auto rounded-2xl bg-gradient-to-tr ${selectedNft.bgGradient} p-4 flex items-center justify-center mb-4 shadow-2xl`}>
              <img src={selectedNft.imageUrl} alt={selectedNft.name} className="max-h-full max-w-full object-contain filter drop-shadow-xl" />
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
                className="flex-1 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Закрыть
              </button>
              <button
                onClick={() => {
                  alert(`Запрос на покупку ${selectedNft.name} отправлен`);
                  setSelectedNft(null);
                }}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold shadow-lg transition-colors"
              >
                Купить сейчас
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. НИЖНЯЯ НАВИГАЦИЯ */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#121212]/95 backdrop-blur-lg border-t border-neutral-800 px-2 py-2 flex justify-around z-40">
        <button onClick={() => setActiveTab('market')} className={`flex flex-col items-center gap-1 ${activeTab === 'market' ? 'text-white font-bold' : 'text-neutral-500'}`}>
          <span className="text-base">░░</span>
          <span className="text-[10px]">Маркет</span>
        </button>
        <button onClick={() => setActiveTab('orders')} className={`flex flex-col items-center gap-1 ${activeTab === 'orders' ? 'text-white font-bold' : 'text-neutral-500'}`}>
          <span className="text-base">📋</span>
          <span className="text-[10px]">Ордеры</span>
        </button>
        <button onClick={() => setActiveTab('hub')} className={`flex flex-col items-center gap-1 ${activeTab === 'hub' ? 'text-white font-bold' : 'text-neutral-500'}`}>
          <span className="text-base">🎮</span>
          <span className="text-[10px]">Игровой хаб</span>
        </button>
        <button onClick={() => setActiveTab('tasks')} className={`flex flex-col items-center gap-1 ${activeTab === 'tasks' ? 'text-white font-bold' : 'text-neutral-500'}`}>
          <span className="text-base">🤖</span>
          <span className="text-[10px]">Задания</span>
        </button>
        <button onClick={() => setActiveTab('storage')} className={`flex flex-col items-center gap-1 ${activeTab === 'storage' ? 'text-white font-bold' : 'text-neutral-500'}`}>
          <span className="text-base">📦</span>
          <span className="text-[10px]">Хранилище</span>
        </button>
      </nav>
    </div>
  );
}
