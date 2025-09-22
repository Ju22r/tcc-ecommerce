import { useEffect, useState } from "react";

const BANNERS = [
  {
    id: 1,
    title: "Ofertas em GPUs",
    subtitle: "Placas de vídeo com Ray Tracing",
    img: "https://picsum.photos/seed/gpu/1200/420",
  },
  {
    id: 2,
    title: "Upgrade de Processadores",
    subtitle: "Ryzen e Intel Core em promoção",
    img: "https://picsum.photos/seed/cpu/1200/420",
  },
  {
    id: 3,
    title: "Armazenamento NVMe",
    subtitle: "SSDs rápidos para jogos e edição",
    img: "https://picsum.photos/seed/ssd/1200/420",
  },
];

export default function Carousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx((i) => (i - 1 + BANNERS.length) % BANNERS.length);
  const next = () => setIdx((i) => (i + 1) % BANNERS.length);

  const banner = BANNERS[idx];

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
      <img
        src={banner.img}
        alt={banner.title}
        className="h-64 w-full object-cover sm:h-[420px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-2xl font-bold drop-shadow">{banner.title}</h3>
        <p className="text-sm opacity-90">{banner.subtitle}</p>
      </div>

      {/* Botões */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-sm shadow hover:bg-white"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 text-sm shadow hover:bg-white"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {BANNERS.map((b, i) => (
          <span
            key={b.id}
            className={
              "h-2 w-2 rounded-full " + (i === idx ? "bg-white" : "bg-white/50")
            }
          />
        ))}
      </div>
    </div>
  );
}
