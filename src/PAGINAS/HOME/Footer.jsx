{/* bg-jvm-orange → cor de fundo laranja vibrante */}
export default function Footer() {
  return (
    <footer 
      className="mt-12 bg-jvm-orange"   
    >
      <div className="mx-auto max-w-6xl px-4 py-6 text-center">
        
        <p 
          className="font-headline text-base font-bold text-jvm-blue-dark"
          /* text-jvm-blue-dark → cor da fonte azul-marinho escuro */
          /* font-headline + font-bold → aplica fonte Teko em negrito */
        >
          © {new Date().getFullYear()} GTECH — Todos os direitos reservados.
        </p>
        
      </div>
    </footer>
  );
}
