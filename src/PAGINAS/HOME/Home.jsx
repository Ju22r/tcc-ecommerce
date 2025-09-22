import Buscar from "./Buscar";
import Departamentos from "./Departamentos";
import Carousel from "./Carousel";
import ProdutosDestaque from "./ProdutosDestaque";
import Footer from "./Footer";
import ChatbotWidget from "./ChatbotWidget";  // <-- import do robozinho

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a4d] via-[#001a4d] to-[#ff5e00]">
      <Buscar />
      <main>
        <Departamentos />
        <section className="mx-auto max-w-6xl px-4 py-6">
          <Carousel />
        </section>
        <ProdutosDestaque />
      </main>

      {/* Robozinho flutuante do Chatbot */}
      <ChatbotWidget />

      <Footer />
    </div>
  );
}

