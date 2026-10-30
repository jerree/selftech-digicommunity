import { Hero } from "../components/Hero";
import { Mission } from "../components/Mission";
import { Programs } from "../components/Programs";
import { Impact } from "../components/Impact";
import { Process } from "../components/Process";
import { Updates } from "../components/Updates";
import { Involved } from "../components/Involved";
import { Newsletter } from "../components/Newsletter";
import { usePageMeta } from "../lib/usePageMeta";

export default function Home() {
  usePageMeta(
    "Selftech DigiCommunity | The digital future should include everyone",
    "Selftech DigiCommunity equips churches, young people, families and underserved communities with the digital skills, resources and opportunities to thrive in a connected world."
  );

  return (
    <main id="main">
      <Hero />
      <Mission />
      <Programs />
      <Impact />
      <Process />
      <Updates />
      <Involved />
      <Newsletter />
    </main>
  );
}
