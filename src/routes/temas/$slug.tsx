import { createFileRoute, Link } from "@tanstack/react-router";
import { getTopic } from "@/lib/topics";

export const Route = createFileRoute("/temas/$slug")({
  head: ({ params }) => {
    const topic = getTopic(params.slug);
    return {
      meta: [
        {
          title: topic
            ? `${topic.title} · Lemssaaf Abogados`
            : "No encontrado · Lemssaaf Abogados",
        },
      ],
    };
  },
  component: TopicPage,
});

function TopicPage() {
  const { slug } = Route.useParams();
  const topic = getTopic(slug);

  if (!topic) {
    return (
      <main className="shell py-16 text-center">
        <h1 className="font-display text-4xl text-gold">Página no encontrada</h1>
        <Link to="/" className="btn-gold mx-auto mt-8 max-w-xs">
          Volver al inicio
        </Link>
      </main>
    );
  }

  const whatsapp = `https://wa.me/34632333522?text=${encodeURIComponent(
    `Hola, Rajae. Quiero consulta sobre: ${topic.title}.`,
  )}`;

  return (
    <main className="min-h-screen overflow-x-clip bg-paper text-ink">
      <article className="shell max-w-2xl py-10">
        <Link to="/" className="text-sm tracking-widest text-gold-deep uppercase no-underline">
          ← Inicio
        </Link>
        <p className="mt-6 text-xs tracking-widest text-gold uppercase">Lemssaaf Abogados</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">{topic.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink">{topic.lead}</p>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
          {topic.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:max-w-sm">
          <a className="btn-gold" href={whatsapp}>
            Escribir por WhatsApp
          </a>
          <Link to="/" hash="contacto" className="btn-line">
            Formulario de contacto
          </Link>
          <Link to="/" hash="consulta" className="btn-line">
            Consulta de 99 €
          </Link>
        </div>
      </article>
    </main>
  );
}
