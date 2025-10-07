// src/components/ChatbotWidget.jsx
// Dica: se seu Vite/ViteConfig estiver sem alias "@": troque os imports das imagens por caminhos relativos.
// import logoBot from "@/assets/logo.png";
// import clienteIcon from "@/assets/cliente.png";
import logoBot from "../../assets/logo.png";
import clienteIcon from "../../assets/cliente.png";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ChatbotWidget({ defaultOpen = false, onOpenChange }) {
  const [open, setOpen] = useState(defaultOpen);
  const openerBtnRef = useRef(null);
  const panelRef = useRef(null);
  const mountRef = useRef(null); // onde o time do chatbot injeta o widget

  // estado local das mensagens (renderização visual)
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: "bot",
      text: "Olá! 😊 Sou o assistente virtual da loja. Como posso te ajudar hoje?",
    },
  ]);

  // barra de input
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]); // File[]

  // ---- eventos globais / acessibilidade ----
  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  // ESC para fechar
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // bloqueia scroll do body quando o modal está aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // foco inicial + trap de TAB dentro do painel
  useEffect(() => {
    if (!open || !panelRef.current) return;

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel.querySelectorAll(
          'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

    // foco inicial
    const first = focusables()[0];
    first?.focus();

    // trap de tab
    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const idx = els.indexOf(document.activeElement);
      if (e.shiftKey) {
        if (idx <= 0) {
          e.preventDefault();
          els[els.length - 1].focus();
        }
      } else {
        if (idx === els.length - 1) {
          e.preventDefault();
          els[0].focus();
        }
      }
    };

    panel.addEventListener("keydown", onKeyDown);
    return () => panel.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // ---- integração com time do chatbot (mount/unmount) ----
  useEffect(() => {
    if (!open || !mountRef.current) return;

    let cleanup;
    if (window.JVMChat?.mount) {
      // o time do chat pode usar esse mount para renderizar a UI deles neste container
      cleanup = window.JVMChat.mount(mountRef.current, { userId: "anon" });
    }
    return () => {
      if (typeof cleanup === "function") cleanup();
      else window.JVMChat?.unmount?.(mountRef.current);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    openerBtnRef.current?.focus();
  };

  // ---- handlers barra de input ----
  const onPickFiles = (evt) => {
    const picked = Array.from(evt.target.files || []);
    setFiles((prev) => [...prev, ...picked]);
    evt.target.value = ""; // permite escolher o mesmo arquivo novamente
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const canSend = text.trim().length > 0 || files.length > 0;

  const pushLocalMessage = (author, text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), author, text },
    ]);
  };

  const sendMessage = async () => {
    if (!canSend) return;

    const payload = {
      text: text.trim(),
      files,
    };

    // adiciona a mensagem do usuário na UI
    pushLocalMessage("user", payload.text || (files.length ? "📎 Arquivos enviados" : ""));

    try {
      // Contrato com o time do chat: eles tratam upload/processamento e devolvem/streamam a resposta.
      if (typeof window.JVMChat?.send === "function") {
        await window.JVMChat.send(payload);
      } else {
        // Fallback: se o time do chat ainda não expôs "send", responde algo só para visual
        setTimeout(() => {
          pushLocalMessage(
            "bot",
            "Recebi sua mensagem! 🤖 Assim que a integração estiver ativa, responderei de verdade."
          );
        }, 600);
      }
    } catch (err) {
      console.error("Falha ao enviar para o chatbot:", err);
      pushLocalMessage("bot", "Ops! Não consegui enviar agora. Tente novamente.");
    } finally {
      setText("");
      setFiles([]);
    }
  };

  const onKeyDownText = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // ---- painel como portal ----
  const Panel =
    open &&
    createPortal(
      <>
        {/* Fundo escurecido */}
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={close}
          aria-hidden="true"
        />

        {/* Janela do chat */}
        <div
          ref={panelRef}
          className="
            fixed bottom-5 right-5 z-50
            w-[92vw] max-w-md h-[78vh]
            rounded-2xl border border-jvm-blue bg-white shadow-2xl
            flex flex-col overflow-hidden
          "
          role="dialog"
          aria-modal="true"
          aria-label="Janela de conversa do chatbot"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-jvm-blue-dark px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <img
                src={logoBot}
                alt="Logo do Chatbot"
                className="h-7 w-7 rounded-full bg-white/90 p-0.5 border border-white/60 shadow"
              />
              <h3 className="font-semibold">Chatbot GTech</h3>
            </div>
            <button
              onClick={close}
              className="text-white/80 hover:text-white hover:bg-white/10 rounded-md px-2 py-1 transition"
              aria-label="Fechar chat"
              title="Fechar"
            >
              ✕
            </button>
          </div>

          {/* Corpo das mensagens */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.author === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar */}
                {msg.author === "bot" && (
                  <img
                    src={logoBot}
                    alt="Chatbot"
                    className="h-10 w-10 rounded-full bg-white/90 p-0.5 border border-white/60 shadow"
                  />
                )}
                {msg.author === "user" && (
                  <img
                    src={clienteIcon}
                    alt="Você"
                    className="h-10 w-10 rounded-full bg-white/90 p-0.5 border border-white/60 shadow order-2"
                  />
                )}

                {/* Balão */}
                <div
                  className={`
                    max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed shadow
                    ${
                      msg.author === "user"
                        ? "bg-jvm-orange text-white rounded-br-none"
                        : "bg-jvm-blue text-white rounded-bl-none"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Ponto de montagem real do time do chatbot (se eles quiserem renderizar dentro do fluxo) */}
            <div ref={mountRef} />
          </div>

          {/* Rodapé: preview de anexos + input maior + botões */}
          <div className="border-t bg-white p-3">
            {/* Preview de anexos */}
            {files.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <span
                    key={`${f.name}-${i}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1 text-xs"
                    title={`${f.name} • ${(f.size / 1024 / 1024).toFixed(2)} MB`}
                  >
                    <span className="max-w-[12rem] truncate">{f.name}</span>
                    <button
                      className="rounded-full bg-gray-100 px-1.5 py-0.5 hover:bg-gray-200"
                      onClick={() => removeFile(i)}
                      aria-label={`Remover ${f.name}`}
                      title="Remover arquivo"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-end gap-2">
              {/* Botão/label de anexo */}
              <label
                className="
                  inline-flex select-none items-center justify-center
                  rounded-lg border bg-white px-3 py-2 text-sm
                  border-jvm-blue-dark text-jvm-blue-dark
                  hover:bg-jvm-blue-dark hover:text-white transition
                  cursor-pointer
                "
                title="Anexar arquivos"
              >
                📎
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={onPickFiles}
                  // Ex.: restrição de tipos: accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.txt"
                />
              </label>

              {/* Caixa de texto MAIOR */}
              <textarea
                rows={2}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={onKeyDownText}
                placeholder="Escreva sua mensagem…"
                className="
                  min-h-[60px] max-h-64 flex-1 resize-y
                  rounded-xl border border-gray-300 bg-white px-3 py-2
                  text-[15px] leading-relaxed
                  focus:outline-none focus:ring-2 focus:ring-jvm-blue focus:border-jvm-blue
                  shadow-inner
                "
              />

              {/* Enviar */}
              <button
                onClick={sendMessage}
                disabled={!canSend}
                className={`
                  inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium
                  transition
                  ${canSend
                    ? "bg-jvm-orange text-white hover:brightness-110 active:scale-95"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"}
                `}
                title="Enviar mensagem"
                aria-label="Enviar"
              >
                ➤
              </button>
            </div>

            <div className="mt-1 flex justify-between text-[11px] text-gray-500">
              <span>Você pode anexar múltiplos arquivos.</span>
              <span>Atalho: Ctrl/Cmd + Enter para enviar</span>
            </div>
          </div>
        </div>
      </>,
      document.body
    );

  return (
    <>
      {/* Botão flutuante — agora com a SUA LOGO */}
      <button
        ref={openerBtnRef}
        onClick={() => setOpen(true)}
        aria-label="Abrir chat de atendimento"
        title="Abrir chat"
        className="
          fixed bottom-5 right-5 z-50
          h-14 w-14 rounded-full
          bg-white
          shadow-lg ring-2 ring-jvm-orange/30
          hover:ring-jvm-orange hover:shadow-xl
          active:scale-95 transition
          flex items-center justify-center
        "
      >
        <img
          src={logoBot}
          alt="Logo do Chatbot"
          className="h-9 w-9 object-contain select-none"
          draggable="false"
        />
        <span className="sr-only">Abrir chat de atendimento</span>
      </button>

      {Panel}
    </>
  );
}
