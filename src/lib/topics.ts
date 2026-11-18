export type Topic = {
  slug: string;
  title: string;
  lead: string;
  body: string[];
};

export const topics: Topic[] = [
  {
    slug: "razones-humanitarias",
    title: "Modificar razones humanitarias",
    lead: "Revisión de la autorización de residencia por razones humanitarias y de su posible modificación.",
    body: [
      "Analizo si tu situación actual encaja en una modificación: cambio de circunstancias, documentación que ha caducado o un paso hacia otra autorización de residencia o trabajo.",
      "En la consulta vemos plazos, pruebas y si conviene presentar la solicitud o un recurso. No prometo un resultado: depende del expediente y de la Administración.",
    ],
  },
  {
    slug: "cita-colombia",
    title: "Reservar cita · asuntos con Colombia",
    lead: "No tengo oficina en Colombia. Atiendo desde España, de forma presencial u online.",
    body: [
      "Si tu trámite tiene relación con Colombia y debe gestionarse ante la Administración española, lo vemos en consulta: visados, residencia, reagrupación o recursos.",
      "La cita es en Murcia, Lorca, Cartagena u online. La consulta jurídica inicial es de 99 €, IVA no incluido.",
    ],
  },
  {
    slug: "cita-mexico",
    title: "Reservar cita · asuntos en México",
    lead: "Cita para trámites con vínculo en México, coordinada con socios en ese país.",
    body: [
      "Si tu asunto debe verse en México o desde España con efectos en México, reservo la cita y la coordino con mis socios allí. No publico sus nombres ni su dirección en esta página: te los confirmo al reservar.",
      "También puedes empezar por la consulta en Murcia, Lorca, Cartagena u online. La consulta jurídica inicial es de 99 €, IVA no incluido.",
    ],
  },
  {
    slug: "cita-brasil",
    title: "Reservar cita · asuntos en Brasil",
    lead: "Cita para trámites con vínculo en Brasil, coordinada con socios en ese país.",
    body: [
      "Si tu asunto debe verse en Brasil o desde España con efectos en Brasil, reservo la cita y la coordino con mis socios allí. No publico sus nombres ni su dirección en esta página: te los confirmo al reservar.",
      "También puedes empezar por la consulta en Murcia, Lorca, Cartagena u online. La consulta jurídica inicial es de 99 €, IVA no incluido.",
    ],
  },
  {
    slug: "cita-extranjeria",
    title: "Cita de extranjería",
    lead: "Una cita para cualquier asunto de extranjería: residencia, renovación, arraigo, reagrupación o recursos.",
    body: [
      "Reviso qué procedimiento te corresponde, qué documentos faltan y qué plazo tienes. Si el asunto sigue, el presupuesto del encargo se confirma antes de empezar.",
      "Puedes atenderme en Murcia, Lorca, Cartagena u online.",
    ],
  },
  {
    slug: "visado-estudios",
    title: "Visado de estudios en origen",
    lead: "Preparación del visado de estudios que se solicita en el consulado, antes de venir a España.",
    body: [
      "Revisamos admisión en el centro, medios económicos, seguro y el formulario consular. El llamado «pack» es el estudio completo del expediente en la consulta, no un precio cerrado distinto.",
      "La consulta inicial es de 99 €, IVA no incluido. Si hay que presentar y seguir el visado, te doy el presupuesto antes.",
    ],
  },
  {
    slug: "homologacion",
    title: "Homologación de estudios",
    lead: "Homologación o equivalencia de títulos extranjeros para estudiar o ejercer en España.",
    body: [
      "Vemos qué vía te corresponde, qué traducción y legalización pide el expediente y cómo responder si la Administración requiere documentación.",
      "La consulta sirve para ordenar el caso. El encargo posterior se presupuesta aparte.",
    ],
  },
  {
    slug: "nacionalidad",
    title: "Nacionalidad española",
    lead: "Solicitud de nacionalidad española por residencia, y revisión de denegaciones o requerimientos.",
    body: [
      "Compruebo el tiempo de residencia legal, los antecedentes, el examen si procede y el estado del expediente. Si ya te la han denegado, valoramos el recurso.",
      "Cada caso se estudia solo. La consulta inicial es de 99 €, IVA no incluido.",
    ],
  },
  {
    slug: "derecho-laboral",
    title: "Derecho laboral y autorización de trabajo",
    lead: "Autorizaciones para trabajar en España y trámites de extranjería ligados al empleo.",
    body: [
      "Puedo orientarte sobre la autorización de residencia y trabajo, la renovación cuando hay contrato y los problemas administrativos que bloquean un alta.",
      "Si el conflicto es solo laboral, entre empresa y persona trabajadora, te diré en la consulta si entra en mi encargo o si necesitas otro profesional.",
    ],
  },
  {
    slug: "nomada-digital",
    title: "No lucrativa, nómada digital y PAC",
    lead: "Tres vías distintas: residir sin trabajar, teletrabajar para fuera de España o ser contratado como profesional altamente cualificado.",
    body: [
      "La residencia no lucrativa no autoriza a trabajar. El visado de nómada digital es para quien teletrabaja para empresas o clientes de fuera. La autorización de profesional altamente cualificado (PAC) es para un contrato cualificado con empresa en España.",
      "Los medios económicos y la experiencia cambian con la norma. Los reviso con tu documentación en la consulta, sin dar por válida una cifra genérica.",
    ],
  },
  {
    slug: "empresas",
    title: "Empresas que quieren contratar",
    lead: "Asesoramiento a empresas que van a contratar a una persona extranjera.",
    body: [
      "Reviso la autorización que exige el puesto, los documentos de la empresa y de la persona candidata, y el orden del trámite para no presentar a ciegas.",
      "La consulta inicial es de 99 €, IVA no incluido. El seguimiento del expediente se presupuesta antes de empezar.",
    ],
  },
  {
    slug: "incapacidad",
    title: "Asesoría de incapacidad laboral",
    lead: "Orientación cuando una incapacidad depende de un expediente administrativo.",
    body: [
      "Reviso en qué fase está el expediente y qué plazo hay para alegar o recurrir. No sustituyo a la medicina ni prometo un grado de incapacidad.",
      "Si el asunto es solo de Seguridad Social y queda fuera de mi práctica, te lo diré en la consulta.",
    ],
  },
  {
    slug: "incidencias",
    title: "Incidencias",
    lead: "Si ya eres cliente o hay un problema con un trámite en curso, escríbeme por aquí.",
    body: [
      "Indica tu nombre, el expediente y qué ha pasado. Respondo en horario de lunes a viernes, de 10:00 a 18:00.",
      "Si todavía no hay consulta pagada, el primer paso es la consulta de 99 €.",
    ],
  },
  {
    slug: "estudiar-trabajar",
    title: "Estudiar o trabajar en España",
    lead: "Una primera orientación para quien quiere venir a España a estudiar o a trabajar.",
    body: [
      "No es un directo ni un curso. Es una consulta: vemos qué visado o autorización encaja y qué no debes presentar.",
      "Presencial en Murcia, Lorca o Cartagena, u online. Consulta jurídica: 99 €, IVA no incluido.",
    ],
  },
];

const bySlug = new Map(topics.map((topic) => [topic.slug, topic]));

export function getTopic(slug: string) {
  return bySlug.get(slug);
}
