import Hero from "./components/hero/Hero";
import Who from "./components/who/Who";
import Portfolio from "./components/portfolio/Portfolio";
import Footer from "./components/footer/Footer";

/**
 * Composant de niveau supérieur orchestrant la mise en page du portfolio.
 * Il compose simplement les différentes sections.
 */
export default function App() {
  return (
    <>
      <Hero />
      <Who />
      <Portfolio />
      <section className="footer-reveal">
        <Footer />
      </section>
    </>
  );
}
