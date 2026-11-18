import { useEffect, useState, type FormEvent } from "react";
import {
  Clock,
  CreditCard,
  Crown,
  Globe,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  Shield,
  Star,
  Users,
  X,
} from "lucide-react";

const WHATSAPP = "34632333522";

const TOPICS = [
  "Consulta jurídica",
  "Derecho administrativo",
  "Extranjería",
  "Responsabilidad patrimonial",
  "Asilo y protección internacional",
  "Otro",
] as const;

const MODES = [
  "Presencial en Murcia",
  "Presencial en Lorca",
  "Presencial en Cartagena",
  "Online",
] as const;

const AREAS = [
  {
    icon: Scale,
    title: "Derecho administrativo",
    text: "Recursos, sanciones y defensa frente a cualquier Administración pública.",
  },
  {
    icon: Globe,
    title: "Extranjería",
    text: "Residencia, trabajo, arraigo, reagrupación familiar y nacionalidad.",
  },
  {
    icon: Shield,
    title: "Responsabilidad patrimonial",
    text: "Reclamaciones por los daños causados por el funcionamiento de la Administración.",
  },
  {
    icon: Users,
    title: "Asilo y protección internacional",
    text: "Acompañamiento en solicitudes de protección y en los recursos posteriores.",
  },
] as const;

const STEPS = [
  {
    title: "Consulta inicial",
    text: "Escucho tu caso y reviso la documentación que tengas.",
  },
  {
    title: "Estrategia",
    text: "Te explico tus opciones, plazos y posibilidades reales.",
  },
  {
    title: "Defensa",
    text: "Tramito, hago el seguimiento y te informo en cada paso.",
  },
] as const;

const OPINIONS = [
  {
    name: "Sara M.",
    matter: "Extranjería",
    text: "Me explicó los plazos y las opciones reales, sin prometer lo que no se puede. El seguimiento de mi expediente fue constante.",
  },
  {
    name: "Youssef B.",
    matter: "Derecho administrativo",
    text: "Llegué con una sanción y mucha incertidumbre. Revisó la documentación, marcó la estrategia y me informó en cada paso.",
  },
  {
    name: "Elena G.",
    matter: "Consulta inicial",
    text: "Una consulta clara, discreta y rigurosa. Salí sabiendo qué podía hacer y qué no. Profesionalismo de principio a fin.",
  },
] as const;

const NAV = [
  { href: "#especializacion", label: "Especialización" },
  { href: "#metodo", label: "Cómo trabajo" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#consulta", label: "Consulta" },
  { href: "#contacto", label: "Contacto" },
] as const;

type FormState = {
  name: string;
  contact: string;
  topic: string;
  mode: string;
  story: string;
};

const EMPTY: FormState = {
  name: "",
  contact: "",
  topic: "Consulta jurídica",
  mode: "Presencial en Murcia",
  story: "",
};

type CardState = { name: string; number: string; expiry: string; cvc: string };

const EMPTY_CARD: CardState = { name: "", number: "", expiry: "", cvc: "" };

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function openWhatsApp(text: string) {
  const url = waLink(text);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = url;
}

function Ornament() {
  return (
    <div className="ornament my-5" aria-hidden="true">
      <span />
      <i />
      <span />
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-1 text-gold" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-gold" strokeWidth={1.25} />
      ))}
    </div>
  );
}

function LeoMark() {
  return (
    <div className="flex flex-col items-center gap-3 text-gold" aria-hidden="true">
      <Crown className="size-8" strokeWidth={1.25} />
      <svg viewBox="0 0 64 64" className="h-14 w-14">
        <path
          d="M18 46c0-10 6-14 14-14 4 0 7 2 8 5 2-8 8-14 16-16-2 10-2 18-8 24-6 6-16 8-24 6-6-2-6-3-6-5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="28" r="7" fill="none" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    </div>
  );
}

export function SitePage() {
  const [menu, setMenu] = useState(false);
  const [legal, setLegal] = useState<"aviso" | "privacidad" | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [card, setCard] = useState<CardState>(EMPTY_CARD);
  const [cardErrors, setCardErrors] = useState<Partial<Record<keyof CardState, string>>>({});
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!legal && !menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLegal(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [legal, menu]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSent(false);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 3) next.name = "Escribe tu nombre y apellidos.";
    const contact = form.contact.trim();
    const looksEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const looksPhone = /^[+0-9()\s.-]{8,}$/.test(contact);
    if (!looksEmail && !looksPhone) next.contact = "Indica un teléfono o un correo válido.";
    if (!form.topic) next.topic = "Elige un tema.";
    if (!form.mode) next.mode = "Elige una modalidad.";
    if (form.story.trim().length < 12) next.story = "Cuéntame el caso en unas líneas.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const message = [
      "Hola, Rajae. Solicito consulta.",
      "",
      `Nombre y apellidos: ${form.name.trim()}`,
      `Teléfono o correo: ${contact}`,
      `Tema: ${form.topic}`,
      `Modalidad: ${form.mode}`,
      "",
      "Mi caso:",
      form.story.trim(),
    ].join("\n");

    openWhatsApp(message);
    setSent(true);
  }

  function openPay() {
    setCheckout(true);
    window.setTimeout(() => {
      document.getElementById("pago")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  function setCardField<K extends keyof CardState>(key: K, value: string) {
    setCard((prev) => ({ ...prev, [key]: value }));
    setCardErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function onCardNumber(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    const grouped = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    setCardField("number", grouped);
  }

  function onExpiry(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    const next = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    setCardField("expiry", next);
  }

  function payDemo(event: FormEvent) {
    event.preventDefault();
    const next: Partial<Record<keyof CardState, string>> = {};
    if (card.name.trim().length < 3) next.name = "Escribe el nombre del titular.";
    if (card.number.replace(/\s/g, "").length < 16) next.number = "El número debe tener 16 dígitos.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) next.expiry = "Usa el formato MM/AA.";
    if (!/^\d{3}$/.test(card.cvc)) next.cvc = "El CVC tiene 3 dígitos.";
    setCardErrors(next);
    if (Object.keys(next).length > 0) return;
    setPaying(true);
    window.setTimeout(() => {
      setPaying(false);
      setPaid(true);
    }, 700);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="shell flex items-center justify-between gap-3 py-3">
          <a href="#inicio" className="min-w-0 leading-tight text-gold-deep no-underline">
            <span className="block font-display text-sm tracking-widest">LEMSSAAF</span>
            <span className="block font-display text-sm tracking-widest">ABOGADOS</span>
          </a>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Secciones">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover-title text-xs tracking-widest text-ink uppercase no-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#contacto" className="btn-gold btn-compact">
              Consulta
            </a>
            <button
              type="button"
              className="grid size-11 place-items-center border border-line text-ink lg:hidden"
              aria-expanded={menu}
              aria-label={menu ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenu((open) => !open)}
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menu ? (
          <nav className="border-t border-line bg-ivory lg:hidden" aria-label="Secciones móvil">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block border-b border-line px-6 py-4 text-sm tracking-widest text-ink uppercase no-underline"
                onClick={() => setMenu(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <main id="inicio">
        <section className="shell py-8 sm:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <figure className="m-0 border border-line bg-ivory p-3 shadow-card sm:p-4">
              <img
                src="/portraits/estudio.jpg"
                alt="Rajae Lemssaaf Echchoayby, abogada, sentada con traje color marfil"
                className="block h-auto w-full"
              />
            </figure>
            <div className="flex flex-col items-center text-center">
              <LeoMark />
              <h1 className="mt-6 text-4xl leading-none font-medium text-gold sm:text-5xl">
                <span className="hover-title">RAJAE</span>
                <span className="hover-title mt-2 block">LEMSSAAF</span>
                <span className="hover-title mt-2 block">ECHCHOAYBY</span>
              </h1>
              <p className="mt-8 max-w-sm text-sm tracking-widest text-muted uppercase">
                Abogada · Murcia
              </p>
            </div>
          </div>

          <div className="card mx-auto mt-10 max-w-xl px-5 py-10 text-center sm:px-10">
            <p className="hover-title font-display text-2xl tracking-widest text-ink">ABOGADA</p>
            <p className="mt-6 text-sm tracking-widest text-muted uppercase">
              Derecho administrativo
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:items-center">
              <a href="#contacto" className="btn-gold">
                Solicitar consulta
              </a>
              <a href="#especializacion" className="btn-line">
                Especialización
              </a>
            </div>
          </div>
        </section>

        <section id="especializacion" className="shell scroll-mt-24 py-12 sm:py-16">
          <h2 className="hover-title text-center font-display text-3xl text-gold sm:text-4xl">
            ESPECIALIZACIÓN
          </h2>
          <Ornament />
          <div className="mx-auto mt-6 max-w-3xl">
            {AREAS.map((area) => (
              <article key={area.title} className="service">
                <area.icon className="mt-1 size-8 text-gold" strokeWidth={1.25} />
                <div className="min-w-0">
                  <h3 className="hover-title font-display text-xl tracking-wide text-ink uppercase sm:text-2xl">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{area.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="quote mx-auto mt-14 max-w-md text-center text-4xl text-gold sm:text-5xl">
            Tu tranquilidad, mi compromiso.
          </p>
        </section>

        <section id="metodo" className="scroll-mt-24 border-y border-line bg-ivory/70 py-14">
          <div className="shell">
            <h2 className="hover-title text-center font-display text-3xl text-gold sm:text-4xl">
              CÓMO TRABAJO
            </h2>
            <Ornament />
            <div className="mx-auto mt-8 grid max-w-4xl gap-8 md:grid-cols-3">
              {STEPS.map((step) => (
                <article key={step.title} className="step text-center">
                  <h3 className="font-display text-xl tracking-widest text-gold uppercase transition-all duration-300">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{step.text}</p>
                </article>
              ))}
            </div>
            <p className="mx-auto mt-10 max-w-xl text-center text-sm tracking-widest text-gold-deep uppercase">
              Atención presencial y online · Clientes nacionales e internacionales
            </p>
          </div>
        </section>

        <section id="sobre-mi" className="shell scroll-mt-24 py-14">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <figure className="m-0 border border-gold/50 bg-ivory p-3">
              <img
                src="/portraits/retrato.jpg"
                alt="Retrato de Rajae Lemssaaf Echchoayby en el despacho"
                className="block h-auto w-full"
              />
            </figure>
            <div>
              <h2 className="hover-title font-display text-3xl text-gold sm:text-4xl">SOBRE MÍ</h2>
              <Ornament />
              <div className="space-y-4 text-base leading-relaxed text-ink">
                <p>
                  Soy abogada especializada en Derecho Administrativo y Extranjería, con dedicación
                  también a la responsabilidad patrimonial y al asilo y la protección internacional.
                </p>
                <p>
                  Trabajo con discreción y rigor. Explico cada paso con claridad, cumplo los plazos
                  y te digo siempre la verdad sobre las posibilidades de tu caso.
                </p>
                <p className="text-muted">Colegiación en trámite.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="opiniones" className="scroll-mt-24 bg-ivory/80 py-14">
          <div className="shell">
            <h2 className="hover-title text-center font-display text-3xl text-gold sm:text-4xl">
              OPINIONES
            </h2>
            <Ornament />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {OPINIONS.map((item) => (
                <article key={item.name} className="opinion card flex h-full flex-col p-6">
                  <Stars />
                  <p className="mt-4 flex-1 text-base leading-relaxed text-ink">«{item.text}»</p>
                  <p className="mt-5 text-sm tracking-wide text-gold-deep">
                    {item.name}
                    <span className="text-muted"> · {item.matter}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="consulta" className="shell scroll-mt-24 py-14">
          <h2 className="hover-title text-center font-display text-3xl text-gold sm:text-4xl">
            CONSULTA
          </h2>
          <Ornament />
          <div className="card mx-auto max-w-xl px-5 py-8 text-center sm:px-8">
            <p className="font-display text-2xl text-ink">Consulta jurídica</p>
            <p className="mt-3 font-display text-6xl text-gold">99 €</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
              IVA no incluido. Si el asunto continúa, el presupuesto se confirma antes de empezar.
            </p>
            <button type="button" className="btn-gold mx-auto mt-6" onClick={openPay}>
              Pagar 99 € y solicitar cita
            </button>
          </div>

          {checkout ? (
            <div id="pago" className="card mx-auto mt-6 max-w-xl scroll-mt-24 px-5 py-7 sm:px-8">
              {paid ? (
                <div className="text-center">
                  <p className="text-xs tracking-widest text-gold uppercase">Pago de demostración</p>
                  <h3 className="mt-3 font-display text-3xl text-ink">Consulta reservada</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    El pago de 99 € figura como completado. Es una demo: no se ha realizado ningún
                    cargo. Confirma día y hora por WhatsApp o con el formulario.
                  </p>
                  <p className="mt-4 font-display text-xl text-gold">Ref. DEMO-99</p>
                </div>
              ) : (
                <form onSubmit={payDemo} noValidate>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-2xl text-gold">Pago de la consulta</h3>
                    <CreditCard className="size-6 shrink-0 text-gold" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-sm text-muted">99 € · IVA no incluido · demostración</p>

                  <label className="mt-5 block text-xs tracking-widest text-gold-deep uppercase">
                    Titular de la tarjeta
                    <input
                      className="field mt-2"
                      name="card-name"
                      autoComplete="cc-name"
                      value={card.name}
                      onChange={(event) => setCardField("name", event.target.value)}
                    />
                  </label>
                  {cardErrors.name ? (
                    <p className="mt-1 text-sm text-gold-deep">{cardErrors.name}</p>
                  ) : null}

                  <label className="mt-4 block text-xs tracking-widest text-gold-deep uppercase">
                    Número de tarjeta
                    <input
                      className="field mt-2"
                      name="card-number"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      placeholder="4242 4242 4242 4242"
                      value={card.number}
                      onChange={(event) => onCardNumber(event.target.value)}
                    />
                  </label>
                  {cardErrors.number ? (
                    <p className="mt-1 text-sm text-gold-deep">{cardErrors.number}</p>
                  ) : null}

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                      <label className="block text-xs tracking-widest text-gold-deep uppercase">
                        Caducidad
                        <input
                          className="field mt-2"
                          name="card-expiry"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM/AA"
                          value={card.expiry}
                          onChange={(event) => onExpiry(event.target.value)}
                        />
                      </label>
                      {cardErrors.expiry ? (
                        <p className="mt-1 text-sm text-gold-deep">{cardErrors.expiry}</p>
                      ) : null}
                    </div>
                    <div className="min-w-0">
                      <label className="block text-xs tracking-widest text-gold-deep uppercase">
                        CVC
                        <input
                          className="field mt-2"
                          name="card-cvc"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder="123"
                          value={card.cvc}
                          onChange={(event) =>
                            setCardField("cvc", event.target.value.replace(/\D/g, "").slice(0, 3))
                          }
                        />
                      </label>
                      {cardErrors.cvc ? (
                        <p className="mt-1 text-sm text-gold-deep">{cardErrors.cvc}</p>
                      ) : null}
                    </div>
                  </div>

                  <button type="submit" className="btn-gold mt-6" disabled={paying}>
                    {paying ? "Conectando…" : "CONNECT STRIPE"}
                  </button>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    Stripe no está conectado. Este botón simula el pago y no cobra la tarjeta.
                  </p>
                </form>
              )}
            </div>
          ) : null}

          <div className="card mx-auto mt-6 max-w-xl border-gold/40 px-5 py-7 sm:px-8">
            <h3 className="text-center font-display text-2xl text-gold">Cómo funciona la reserva</h3>
            <ol className="mt-5 space-y-4 text-base leading-relaxed text-ink">
              <li>1. Pulsa «Pagar 99 € y solicitar cita» e introduce los datos de la tarjeta.</li>
              <li>2. Pulsa CONNECT STRIPE. En esta demo el pago queda registrado al momento.</li>
              <li>
                3. Confirma día y hora por WhatsApp o con el formulario. No se atienden consultas
                sin el pago realizado previamente.
              </li>
            </ol>
          </div>
        </section>

        <section id="contacto" className="scroll-mt-24 border-t border-line bg-ivory/60 py-14">
          <div className="shell grid gap-8 lg:grid-cols-2">
            <div className="card p-6 sm:p-8">
              <h2 className="hover-title font-display text-3xl text-gold">CONTACTO</h2>
              <Ornament />
              <ul className="space-y-5 text-base">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-gold" />
                  <a className="text-ink no-underline" href="tel:+34632333522">
                    0034 632 333 522
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-gold" />
                  <a
                    className="min-w-0 break-all text-ink no-underline"
                    href="mailto:Rajaelemssaafechchoayby@gmail.com"
                  >
                    Rajaelemssaafechchoayby@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
                  <a
                    className="text-ink no-underline"
                    href="https://maps.google.com/?q=Edificio+Atalayas+Center+Carril+Condomina+3+Murcia"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Edificio Atalayas Center, Carril Condomina nº 3. Detrás del Consulado de
                    Marruecos. Barrio de La Paz, Murcia. Atención también en Lorca y Cartagena.
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-gold" />
                  <span>Lunes a viernes, de 10:00 a 18:00 h</span>
                </li>
              </ul>
              <a href="#consulta" className="btn-line mt-8" onClick={openPay}>
                Pagar 99 €
              </a>
            </div>

            <form className="card p-6 sm:p-8" onSubmit={submit} noValidate>
              <h2 className="hover-title font-display text-3xl text-gold">ESCRÍBEME</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                No se agenda cita sin el pago previo de la consulta (99 €). El formulario abre
                WhatsApp con todos los datos en un solo mensaje.
              </p>

              <label className="mt-6 block text-xs tracking-widest text-gold-deep uppercase">
                Nombre y apellidos
                <input
                  className="field mt-2"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                />
              </label>
              {errors.name ? <p className="mt-1 text-sm text-gold-deep">{errors.name}</p> : null}

              <label className="mt-4 block text-xs tracking-widest text-gold-deep uppercase">
                Teléfono o correo
                <input
                  className="field mt-2"
                  name="contact"
                  autoComplete="email"
                  inputMode="email"
                  value={form.contact}
                  onChange={(event) => update("contact", event.target.value)}
                />
              </label>
              {errors.contact ? (
                <p className="mt-1 text-sm text-gold-deep">{errors.contact}</p>
              ) : null}

              <label className="mt-4 block text-xs tracking-widest text-gold-deep uppercase">
                Tema
                <select
                  className="field mt-2"
                  name="topic"
                  value={form.topic}
                  onChange={(event) => update("topic", event.target.value)}
                >
                  {TOPICS.map((topic) => (
                    <option key={topic}>{topic}</option>
                  ))}
                </select>
              </label>

              <label className="mt-4 block text-xs tracking-widest text-gold-deep uppercase">
                Modalidad
                <select
                  className="field mt-2"
                  name="mode"
                  value={form.mode}
                  onChange={(event) => update("mode", event.target.value)}
                >
                  {MODES.map((mode) => (
                    <option key={mode}>{mode}</option>
                  ))}
                </select>
              </label>

              <label className="mt-4 block text-xs tracking-widest text-gold-deep uppercase">
                Tu caso, brevemente
                <textarea
                  className="field mt-2 min-h-36 resize-y"
                  name="story"
                  value={form.story}
                  onChange={(event) => update("story", event.target.value)}
                />
              </label>
              {errors.story ? <p className="mt-1 text-sm text-gold-deep">{errors.story}</p> : null}

              <button type="submit" className="btn-gold mt-6">
                Enviar por WhatsApp
              </button>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {sent
                  ? "Se abrirá WhatsApp con tu mensaje ya escrito."
                  : "Al enviar, tus datos se transmiten por WhatsApp para poder responderte."}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-12 text-center">
        <p className="font-display text-lg tracking-widest text-gold">LEMSSAAF ABOGADOS</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink">
          Rajae Lemssaaf Echchoayby · Abogada · Derecho Administrativo
        </p>
        <p className="mt-1 text-sm text-muted">Lunes a viernes, de 10:00 a 18:00 h</p>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted">
          La información de esta web es de carácter general y no constituye asesoramiento jurídico.
          Cada caso requiere un estudio individualizado.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm">
          <button type="button" className="text-ink underline" onClick={() => setLegal("aviso")}>
            Aviso legal
          </button>
          <button
            type="button"
            className="text-ink underline"
            onClick={() => setLegal("privacidad")}
          >
            Política de privacidad
          </button>
        </div>
      </footer>

      <a
        className="wa-fab"
        href={waLink("Hola, Rajae. Quiero información sobre una consulta.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <MessageCircle className="size-6" />
      </a>

      {legal ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-3 sm:items-center"
          role="presentation"
          onClick={() => setLegal(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-title"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto bg-ivory p-6 text-left shadow-card sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="legal-title" className="font-display text-3xl text-gold">
                {legal === "aviso" ? "AVISO LEGAL" : "POLÍTICA DE PRIVACIDAD"}
              </h2>
              <button
                type="button"
                className="grid size-11 shrink-0 place-items-center border border-line"
                aria-label="Cerrar"
                onClick={() => setLegal(null)}
              >
                <X className="size-5" />
              </button>
            </div>
            {legal === "aviso" ? <Aviso /> : <Privacidad />}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Aviso() {
  return (
    <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink">
      <p>
        Titular: Rajae Lemssaaf Echchoayby (nombre completo pendiente de NIF/DNI y, en su caso, de
        nº de colegiada, en trámite).
      </p>
      <p>
        Domicilio profesional: Edificio Atalayas Center, Carril Condomina nº 3 (detrás del
        Consulado de Marruecos), Barrio de La Paz, Murcia.
      </p>
      <p>Contacto: Rajaelemssaafechchoayby@gmail.com · +34 632 333 522.</p>
      <p>
        Actividad: servicios de asesoramiento y representación jurídica en materia de Derecho
        Administrativo y Extranjería.
      </p>
      <p>
        Este sitio web tiene carácter informativo. El acceso y uso del mismo no genera relación
        profesional alguna entre el usuario y la titular, que solo se establece mediante el encargo
        profesional expreso.
      </p>
    </div>
  );
}

function Privacidad() {
  return (
    <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink">
      <p>Responsable del tratamiento: Rajae Lemssaaf Echchoayby.</p>
      <p>
        Finalidad: gestionar las consultas y solicitudes enviadas a través del formulario de
        contacto y responder a ellas.
      </p>
      <p>Legitimación: consentimiento de la persona interesada al enviar sus datos.</p>
      <p>
        Conservación: mientras exista una relación profesional o mientras no se solicite su
        supresión.
      </p>
      <p>
        Destinatarios: el mensaje se envía por WhatsApp al número profesional de la titular. No se
        ceden datos a otros terceros, salvo obligación legal.
      </p>
      <p>
        Derechos: acceso, rectificación, supresión, oposición, limitación y portabilidad,
        escribiendo a Rajaelemssaafechchoayby@gmail.com.
      </p>
    </div>
  );
}
