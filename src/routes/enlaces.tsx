import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/enlaces")({
  head: () => ({
    meta: [
      { title: "Enlaces · Lemssaaf Abogados" },
      {
        name: "description",
        content:
          "Enlaces de Rajae Lemssaaf Echchoayby. Extranjería, nacionalidad y citas con la abogada en Murcia.",
      },
    ],
  }),
  component: EnlacesPage,
});

const LINKS: { href: string; title: string }[] = [
  { href: "/temas/razones-humanitarias", title: "MODIFICAR RAZONES HUMANITARIAS" },
  { href: "/temas/cita-colombia", title: "RESERVAR CITA OFICINA COLOMBIA" },
  { href: "/temas/cita-extranjeria", title: "RESERVAR CITA DE EXTRANJERÍA (TODO LO RELACIONADO)" },
  {
    href: "/temas/visado-estudios",
    title: "CITA VISADO ESTUDIOS EN ORIGEN ¡PACK COMPLETO!",
  },
  { href: "/temas/homologacion", title: "CITA HOMOLOGACIÓN DE ESTUDIOS" },
  { href: "/temas/nacionalidad", title: "SOLICITA LA NACIONALIDAD ESPAÑOLA" },
  { href: "/temas/derecho-laboral", title: "CITA DERECHO LABORAL (ESPAÑA)" },
  {
    href: "/temas/nomada-digital",
    title: "VISA NO LUCRATIVA, NÓMADA DIGITAL y PAC",
  },
  { href: "/temas/empleo", title: "¿BUSCAS EMPLEO? REGÍSTRATE" },
  { href: "/temas/empresas", title: "¿ERES EMPRESA? ¿QUIERES CONTRATAR TRABAJADORES?" },
  { href: "/temas/incapacidad", title: "ASESORÍA INCAPACIDAD LABORAL" },
  { href: "/temas/incidencias", title: "INCIDENCIAS" },
  {
    href: "/temas/nacionalidad",
    title: "ABOGADO EXTRANJERÍA · NACIONALIDAD ESPAÑOLA",
  },
  {
    href: "/temas/estudiar-trabajar",
    title: "INSCRIPCIÓN DIRECTO ESTUDIAR/TRABAJAR EN ESPAÑA",
  },
];

function EnlacesPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-paper px-4 py-10 text-ink">
      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        <img
          src="/portraits/retrato.jpg"
          alt="Rajae Lemssaaf Echchoayby"
          className="size-28 rounded-full border border-gold object-cover object-top shadow-card"
        />
        <p className="mt-5 text-center font-display text-sm tracking-widest text-gold">
          LEMSSAAF ABOGADOS
        </p>
        <h1 className="mt-2 text-center font-display text-4xl leading-none text-ink">Rajae Lemssaaf</h1>
        <p className="mt-4 text-center text-base leading-relaxed text-muted">
          Abogada en Murcia. Extranjería, nacionalidad y derecho administrativo, en un solo lugar.
        </p>
        <p className="mt-3 text-center text-sm tracking-wide text-gold-deep">
          Consulta jurídica · 99 €
        </p>

        <nav className="mt-8 flex w-full flex-col gap-3" aria-label="Trámites">
          {LINKS.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="card flex min-h-14 w-full items-center justify-center px-4 py-3 text-center text-sm leading-snug font-medium tracking-wide text-ink no-underline transition hover:-translate-y-0.5 hover:border-gold"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            className="grid size-12 place-items-center rounded-full border border-line bg-ivory text-ink"
            href="https://wa.me/34632333522?text=Hola%2C%20Rajae.%20Quiero%20informaci%C3%B3n%20sobre%20una%20consulta."
            aria-label="WhatsApp"
          >
            <MessageCircle className="size-5" />
          </a>
          <a
            className="grid size-12 place-items-center rounded-full border border-line bg-ivory text-ink"
            href="tel:+34632333522"
            aria-label="Teléfono"
          >
            <Phone className="size-5" />
          </a>
          <a
            className="grid size-12 place-items-center rounded-full border border-line bg-ivory text-ink"
            href="mailto:Rajaelemssaafechchoayby@gmail.com"
            aria-label="Correo"
          >
            <Mail className="size-5" />
          </a>
        </div>

        <Link to="/" className="mt-8 text-sm text-gold-deep underline">
          Ir a la web
        </Link>
      </div>
    </main>
  );
}
