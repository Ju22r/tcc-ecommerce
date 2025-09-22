const DEPARTAMENTOS = [
  "Hardware",
  "Software",
  "Periféricos",
  "Computadores",
  "Games",
  "Armazenamento",
  "Monitores",
  "Redes",
];
 {/* justify-center → centraliza os departamentos */}
export default function Departamentos() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      {/* Faixa com fundo azul-marinho escuro */}
      <div className="rounded-2xl bg-jvm-blue-dark px-3 py-3 shadow-sm">
        <div className="flex flex-wrap justify-center  gap-2"> 
          {DEPARTAMENTOS.map((dep) => (
            <a
              key={dep}
              href="#"
              className="
                font-headline font-extrabold   /* Fonte Teko + grossa */
                rounded-full
                px-4 py-1.5
                text-base                     /* letras um pouco maiores */
                text-[#ff5e00]               /* texto laranja vibrante */
                bg-jvm-blue                   /* fundo azul vibrante */
                border border-jvm-blue-dark
                transition
                hover:bg-jvm-blue-hover       /* hover: azul mais claro */
                active:scale-[0.98]
              "
            >
              {dep}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

