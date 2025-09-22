const PRODUTOS = [
  {
    id: 1,
    title: "CPU AMD Ryzen 7",
    subtitle: "8 núcleos, 16 threads",
    price: "R$ 1.899,00",
    img: "https://picsum.photos/seed/ryzen/600/400",
  },
  {
    id: 2,
    title: "GPU GeForce RTX 4060",
    subtitle: "8GB GDDR6, DLSS 3",
    price: "R$ 2.999,00",
    img: "https://picsum.photos/seed/rtx/600/400",
  },
  {
    id: 3,
    title: "SSD NVMe 1TB",
    subtitle: "Leitura até 3500MB/s",
    price: "R$ 449,00",
    img: "https://picsum.photos/seed/nvme/600/400",
  },
  {
    id: 4,
    title: "Memória RAM 16GB (2x8)",
    subtitle: "DDR4 3200MHz",
    price: "R$ 299,00",
    img: "https://picsum.photos/seed/ram/600/400",
  },
  {
    id: 5,
    title: "Fonte 650W 80 Plus",
    subtitle: "Alta eficiência",
    price: "R$ 379,00",
    img: "https://picsum.photos/seed/psu/600/400",
  },
  {
    id: 6,
    title: 'Monitor 27" 144Hz',
    subtitle: "1ms, painel IPS",
    price: "R$ 1.299,00",
    img: "https://picsum.photos/seed/monitor/600/400",
  },
];

function Card({ p }) {
  return (
    <div className="group rounded-2xl border border-jvm-blue bg-white/95 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <img
        src={p.img}
        alt={p.title}
        className="mb-3 h-40 w-full rounded-xl object-cover"
      />
      <h4 className="line-clamp-1 font-headline text-lg font-extrabold text-jvm-blue-dark">
        {p.title}
      </h4>
      <p className="line-clamp-2 text-sm text-gray-600">{p.subtitle}</p>
      <div className="mt-2 text-xl font-headline font-extrabold text-jvm-orange">
        {p.price}
      </div>
      <button
        className="
          mt-3 w-full rounded-xl
          bg-jvm-orange px-4 py-2
          text-white font-headline font-bold
          hover:brightness-110 active:scale-[0.98]
          transition
        "
      >
        Comprar
      </button>
    </div>
  );
}

export default function ProdutosDestaque() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-headline text-2xl font-extrabold text-white">
          Produtos em destaque
        </h2>
        <a
          href="#"
          className="text-sm font-headline text-jvm-orange hover:underline"
        >
          Ver todos
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUTOS.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
