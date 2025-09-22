import { useEffect, useRef, useState } from "react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const mountRef = useRef(null); // <- div onde o outro time vai injetar o chatbot

  // Acessibilidade: fecha com tecla ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 🔌 PONTO DE INTEGRAÇÃO:
  // Quando abrir, o time do chatbot pode montar o widget aqui.
  // Exemplo (combine com o time do back/chat):
  // if (open && window.JVMChat?.mount && mountRef.current) {
  //   window.JVMChat.mount(mountRef.current, { userId: "anon" });
  // }
  useEffect(() => {
    if (!open) return;
    // TODO: chamar aqui a função de "mount" que o outro time expuser
    // Ex.: window.JVMChat?.mount?.(mountRef.current)
  }, [open]);

  return (
    <>
      {/* Botão flutuante (canto inferior direito) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir chat de atendimento"
        className="
          fixed bottom-5 right-5 z-50
          h-14 w-14 rounded-full
          bg-jvm-orange                /* cor de fundo do botão (laranja vibrante) */
          text-white                   /* cor do ícone (branco) */
          shadow-lg ring-2 ring-white/20
          hover:brightness-110 active:scale-95
          transition
          flex items-center justify-center
        "
      >
        {/* Ícone robozinho (SVG inline) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* carinha de robô simples */}
          <path d="M12 2a1 1 0 0 1 1 1v1.06A8 8 0 0 1 20 12v5a3 3 0 0 1-3 3h-1a3 3 0 0 1-6 0H9a3 3 0 0 1-3-3v-5a8 8 0 0 1 7-7.94V3a1 1 0 0 1 1-1Zm5 10a6 6 0 1 0-12 0v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5ZM9 12.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm6 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
        </svg>
      </button>

      {/* Modal do chat */}
      {open && (
        <>
          {/* Fundo escurecido (clica para fechar) */}
          <div
            className="fixed inset-0 z-50 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Painel do chat (canto inferior direito) */}
          <div
            className="
              fixed bottom-5 right-5 z-50
              w-[92vw] max-w-md
              rounded-2xl border border-jvm-blue
              bg-white shadow-2xl
              overflow-hidden
            "
            role="dialog"
            aria-label="Janela de conversa do chatbot"
          >
            {/* Header do painel */}
            <div
              className="
                flex items-center justify-between
                bg-jvm-blue-dark              /* cor de fundo azul marinho escuro */
                px-4 py-3
              "
            >
              <div className="flex items-center gap-2">
                {/* bolinha/ícone pequeno no header */}
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full bg-jvm-orange"
                  title="Ativo"
                />
                <h3 className="font-headline text-white">
                  Suporte • Chatbot JVM
                </h3>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="
                  rounded-md px-2 py-1
                  text-white/80 hover:text-white
                  hover:bg-white/10 transition
                "
                aria-label="Fechar chat"
                title="Fechar"
              >
                ✕
              </button>
            </div>

            {/* Corpo: aqui o chatbot será montado/injetado */}
            <div className="h-[60vh] bg-white">
              {/* 
                🔌 PONTO DE MONTAGEM REAL DO CHATBOT
                O outro time deve injetar o widget dentro desta div.
                Exemplo de contrato (combine): window.JVMChat.mount(mountRef.current)
              */}
              <div ref={mountRef} id="jvm-chat-root" className="h-full w-full" />

              {/* Conteúdo de fallback (aparece só se o chat não montar nada) */}
              <div className="p-4 text-sm text-gray-500">
                {/* Este bloco é só um placeholder temporário */}
                <p>
                  Iniciando chatbot… Caso não carregue, tente novamente ou contate o
                  suporte.
                </p>
              </div>
            </div>

            {/* Rodapé opcional do painel */}
            <div className="border-t bg-gray-50 px-3 py-2 text-right">
              <button
                onClick={() => setOpen(false)}
                className="
                  rounded-lg border px-3 py-1.5
                  border-jvm-blue-dark text-jvm-blue-dark
                  hover:bg-jvm-blue-dark hover:text-white
                  transition
                "
              >
                Fechar
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
