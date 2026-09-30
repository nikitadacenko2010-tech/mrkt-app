import React, { useState, useEffect } from 'react';

const tg = window.Telegram?.WebApp;

const INITIAL_GIFTS = [
  {
    id: 1,
    name: 'Delicious Cake',
    price: 50,
    currency: 'STARS',
    image: '🎂',
    supply: '10,000',
    purchased: 4120,
    badge: 'Limited',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    id: 2,
    name: 'Green Star',
    price: 150,
    currency: 'STARS',
    image: '⭐',
    supply: '5,000',
    purchased: 4890,
    badge: 'Hot',
    gradient: 'from-emerald-400 to-teal-600'
  },
  {
    id: 3,
    name: 'Plush Bear',
    price: 250,
    currency: 'STARS',
    image: '🧸',
    supply: '2,500',
    purchased: 1200,
    badge: 'Rare',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: 4,
    name: 'Gold Ring',
    price: 500,
    currency: 'STARS',
    image: '💍',
    supply: '1,000',
    purchased: 980,
    badge: 'Almost Gone',
    gradient: 'from-yellow-300 to-amber-600'
  }
];

export default function App() {
  const [balance, setBalance] = useState(1000);
  const [gifts, setGifts] = useState(INITIAL_GIFTS);
  const [userInventory, setUserInventory] = useState([]);
  const [activeTab, setActiveTab] = useState('store');
  const [selectedGift, setSelectedGift] = useState(null);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.setHeaderColor(tg.themeParams?.bg_color || '#17212b');
    }
  }, []);

  const handleBuy = (gift) => {
    if (balance < gift.price) {
      if (tg?.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('error');
      }
      alert('Недостаточно звёзд / баланса!');
      return;
    }

    setBalance((prev) => prev - gift.price);
    setUserInventory((prev) => [...prev, { ...gift, purchasedAt: new Date().toLocaleTimeString() }]);
    
    setGifts((prevGifts) =>
      prevGifts.map((item) =>
        item.id === gift.id ? { ...item, purchased: item.purchased + 1 } : item
      )
    );

    if (tg?.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred('success');
    }

    setSelectedGift(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pb-20 select-none">
      <header className="p-4 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg">
            {tg?.initDataUnsafe?.user?.first_name?.[0] || 'U'}
          </div>
          <div>
            <h1 className="font-semibold text-sm leading-tight">
              {tg?.initDataUnsafe?.user?.first_name || 'Пользователь'}
            </h1>
            <p className="text-xs text-slate-400">@MRKT Collector</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-700/50">
          <span className="text-amber-400">⭐</span>
          <span className="font-bold text-sm">{balance}</span>
        </div>
      </header>

      <div className="p-4">
        <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
          <button
            onClick={() => setActiveTab('store')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'store'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Магазин Подарков
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'inventory'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Моя Коллекция ({userInventory.length})
          </button>
        </div>
      </div>

      {activeTab === 'store' && (
        <main className="px-4 grid grid-cols-2 gap-3">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              onClick={() => setSelectedGift(gift)}
              className="relative group bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-between cursor-pointer active:scale-95 transition-transform"
            >
              <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wider font-bold bg-slate-800/80 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                {gift.badge}
              </span>

              <div
                className={`w-24 h-24 my-3 rounded-2xl bg-gradient-to-tr ${gift.gradient} flex items-center justify-center text-5xl shadow-inner shadow-black/30 group-hover:scale-105 transition-transform`}
              >
                {gift.image}
              </div>

              <div className="w-full text-center">
                <h3 className="font-bold text-sm text-slate-100">{gift.name}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Куплено {gift.purchased} из {gift.supply}
                </p>

                <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-xs flex items-center justify-center gap-1 shadow-md transition-colors">
                  <span>⭐</span>
                  <span>{gift.price} STARS</span>
                </button>
              </div>
            </div>
          ))}
        </main>
      )}

      {activeTab === 'inventory' && (
        <main className="px-4">
          {userInventory.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <div className="text-5xl mb-3">🎁</div>
              <p className="text-sm font-medium">У вас пока нет купленных подарков.</p>
              <p className="text-xs text-slate-600 mt-1">Купите свой первый подарок в магазине!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {userInventory.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center"
                >
                  <div
                    className={`w-20 h-20 my-2 rounded-2xl bg-gradient-to-tr ${item.gradient} flex items-center justify-center text-4xl`}
                  >
                    {item.image}
                  </div>
                  <h3 className="font-bold text-sm text-slate-100 mt-1">{item.name}</h3>
                  <span className="text-[10px] text-slate-500 mt-1">Куплено в {item.purchasedAt}</span>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {selectedGift && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl p-6 text-center shadow-2xl">
            <div
              className={`w-28 h-28 mx-auto rounded-3xl bg-gradient-to-tr ${selectedGift.gradient} flex items-center justify-center text-6xl shadow-xl mb-4`}
            >
              {selectedGift.image}
            </div>

            <h2 className="text-xl font-bold">{selectedGift.name}</h2>
            <p className="text-xs text-slate-400 mt-1">
              Ограниченная серия: {selectedGift.supply} шт.
            </p>

            <div className="my-6 p-3 bg-slate-950/50 rounded-2xl border border-slate-800 flex justify-between items-center text-sm">
              <span className="text-slate-400">Стоимость:</span>
              <span className="font-bold text-amber-400 flex items-center gap-1">
                ⭐ {selectedGift.price} STARS
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedGift(null)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={() => handleBuy(selectedGift)}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-semibold shadow-lg transition-colors"
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}