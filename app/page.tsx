import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Format from "@/components/Format";
import Modules from "@/components/Modules";
import Audience from "@/components/Audience";
import Speaker from "@/components/Speaker";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Format />
        <Modules />
        <Audience />
        <Speaker />
        <Gallery />
        <Pricing />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
