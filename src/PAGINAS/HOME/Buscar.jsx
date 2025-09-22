import logo from "../../assets/logo.png";

export default function Buscar() {
  return (
    <header className="sticky top-0 z-40 border-b border-jvm-blue bg-jvm-blue-dark/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo JVM Equipamentos Eletrônicos"
            className="h-12 w-auto sm:h-14 lg:h-20" // ALTURA DA LOGO
          />
          <span className="sr-only">JVM Equipamentos Eletrônicos</span>
        </a>

        {/* Busca (dark) */}
        <div className="flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Buscar: peça, modelo, marca..."
            className="
              w-full rounded-xl border border-jvm-blue
              bg-[#0a1f4d] text-white placeholder-white/60
              px-4 py-2 text-sm outline-none
              focus:ring-2 focus:ring-jvm-orange focus:border-jvm-orange
            "
          />
        </div>

        {/* Ações */}
        <nav className="flex items-center gap-2 text-sm">
          <a
            className="rounded-lg px-3 py-2 text-white/90 hover:text-jvm-orange transition"
            href="#"
          >
            Entrar
          </a>
          <a
            className="rounded-lg px-3 py-2 text-white/90 hover:text-jvm-orange transition"
            href="#"
          >
            Meus Pedidos
          </a>
          <button
            className="
              rounded-lg border px-3 py-2
              border-jvm-orange text-jvm-orange
              hover:bg-jvm-orange hover:text-white
              transition
            "
          >
            Carrinho
          </button>
        </nav>
      </div>
    </header>
  );
}
