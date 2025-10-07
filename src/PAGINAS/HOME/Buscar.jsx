import logo from "../../assets/gtech.png";

export default function Buscar() {
  return (
    <header className="sticky top-0 z-40 border-b border-jvm-blue bg-jvm-blue-dark/95 backdrop-blur">
      {/* Container central com mais respiro nas laterais */}
      <div className="mx-auto w-full max-w-screen-xl px-6 md:px-10 py-5">
        {/* Layout em 3 áreas: logo | busca (flex-1) | ações */}
        <div className="flex items-center gap-6">
          {/* LOGO (não encolhe) */}
          <a href="/" className="flex shrink-0 items-center gap-3 pl-1">
            <img
              src={logo}
              alt="Logo JVM Equipamentos Eletrônicos"
              className="h-20 w-auto sm:h-24 lg:h-28"
            />
            <span className="sr-only">GTECH Equipamentos Eletrônicos</span>
          </a>

          {/* BUSCA (controlada e menor) */}
          <div className="flex-1 min-w-[320px] max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar: peça, modelo, marca..."
                className="
                  w-full rounded-xl border border-jvm-blue/70
                  bg-[#0a1f4d] text-white placeholder-white/60
                  pl-4 pr-11 py-2.5 text-sm outline-none
                  focus:ring-2 focus:ring-jvm-orange focus:border-jvm-orange
                  shadow-inner
                "
                aria-label="Campo de busca do site"
              />
              {/* Ícone de busca (decorativo) */}
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="7" />
                  <path d="m21 21-6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* AÇÕES (não encolhe) */}
          <nav className="flex shrink-0 items-center gap-5">
            {/* Login (ícone + texto) */}
            <a
              href="#"
              className="flex items-center gap-2 text-white/90 hover:text-jvm-orange transition"
              aria-label="Login"
              title="Fazer login"
            >
              {/* Ícone usuário */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="hidden sm:inline text-sm">Login</span>
            </a>

            {/* Carrinho */}
            <button
              className="
                flex items-center justify-center rounded-lg border border-jvm-orange
                px-3 py-2 text-jvm-orange hover:bg-jvm-orange hover:text-white transition
              "
              title="Carrinho de compras"
              aria-label="Carrinho de compras"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2 2h2l3.6 7.59a2 2 0 0 0 1.79 1.15h7.92a2 2 0 0 0 1.94-1.5l1.2-5H6" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
