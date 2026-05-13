/* global React, ReactDOM */
const { useState, useEffect, useRef } = React;

/* ============================================================
   DATA
   ============================================================ */
const SERVICES = [
{
  id: "auriculo",
  num: "01",
  name: "Auriculoterapia",
  blurb: "Estímulo de pontos específicos da orelha, com sementes, para alívio de tensões, ansiedade e insônia.",
  long: "A auriculoterapia é uma técnica terapêutica que estimula pontos específicos da orelha, geralmente com sementes, para auxiliar no alívio de dores, ansiedade, insônia e outros desconfortos.",
  long2: "Costuma ser bem tolerada — pode haver uma leve sensibilidade em pontos mais reativos, mas raramente é considerada dolorosa. Pode ser usada como prática complementar para ansiedade e dificuldades de sono.",
  duration: "30–40 min",
  indication: "Ansiedade, insônia, tensão geral",
  sensation: "Leve sensibilidade pontual",
  sessions: "Avaliada a cada caso"
},
{
  id: "ventosa",
  num: "02",
  name: "Ventosaterapia",
  blurb: "Sucção controlada na pele para ativar circulação, soltar a musculatura e descomprimir costas, pescoço e ombros.",
  long: "A ventosaterapia utiliza ventosas para gerar sucção na pele. Essa pressão estimula a circulação local, relaxa a musculatura e alivia tensões — principalmente em regiões como costas, pescoço e ombros.",
  long2: "Pode deixar marcas temporárias semelhantes a manchas arroxeadas, que desaparecem com o passar dos dias. A intensidade é ajustada caso a caso conforme a tolerância e a resposta do corpo.",
  duration: "40–60 min",
  indication: "Tensão dorsal, circulação, recuperação",
  sensation: "Pressão e leve desconforto",
  sessions: "Sob avaliação"
},
{
  id: "desportiva",
  num: "03",
  name: "Massagem Desportiva",
  blurb: "Trabalho focado em recuperação muscular, flexibilidade e prevenção de lesões para quem treina.",
  long: "A massagem desportiva é indicada para atletas e praticantes de atividade física. Auxilia na recuperação muscular, alívio de tensões, melhora da circulação, flexibilidade e prevenção de lesões.",
  long2: "Para quem treina ou pratica atividade física, costuma ser uma boa opção — mas a escolha da técnica ideal depende da avaliação do Marcelo, principalmente se houver dor, lesão ou limitação de movimento.",
  duration: "50–60 min",
  indication: "Atletas e praticantes de atividade física",
  sensation: "Pressão firme e modulada",
  sessions: "Pré e pós-treino, manutenção"
},
{
  id: "terapeutica",
  num: "04",
  name: "Massagem Terapêutica",
  blurb: "Técnicas manuais profundas para dores, rigidez, mobilidade e tensões musculares persistentes.",
  long: "A massagem terapêutica utiliza técnicas manuais mais profundas para aliviar dores, tensões musculares, rigidez e desconfortos físicos. Também pode auxiliar na circulação e na melhora da mobilidade.",
  long2: "Pode promover relaxamento, mas seu foco é terapêutico — especialmente em dores, tensões e limitações musculares. Se a pessoa busca apenas relaxamento, o Marcelo pode orientar a melhor abordagem.",
  duration: "60 min",
  indication: "Dor crônica, rigidez, mobilidade",
  sensation: "Manipulação profunda controlada",
  sessions: "Sob avaliação clínica"
},
{
  id: "tens",
  num: "05",
  name: "Estimulação Elétrica · TENS",
  blurb: "Corrente de baixa intensidade, não invasiva, para auxiliar no controle de dor crônica e neuropatia.",
  long: "A TENS (estimulação elétrica nervosa transcutânea) é uma técnica não invasiva que aplica correntes de baixa intensidade na pele para auxiliar no controle da dor e estimular os nervos — especialmente em dores crônicas nos pés e pernas.",
  long2: "A sensação costuma ser de formigamento leve e controlado, ajustada conforme a tolerância. Casos de neuropatia, diabetes, problemas circulatórios ou uso de medicamentos exigem análise individual.",
  duration: "30–45 min",
  indication: "Dor crônica, neuropatia periférica",
  sensation: "Formigamento controlado",
  sessions: "Programa de acompanhamento"
},
{
  id: "seitai",
  num: "06",
  name: "New Seitai",
  blurb: "Técnica japonesa de quiropraxia suave, com ajustes manuais e ferramentas de madeira para realinhamento postural.",
  long: "O New Seitai é uma técnica japonesa de terapia manual e quiropraxia voltada ao realinhamento postural e ao alívio de dores crônicas ou agudas. Utiliza ajustes manuais e ferramentas de madeira para estimular articulações e vértebras de forma suave.",
  long2: "A proposta é trabalhar com estímulos suaves e controlados. Pode haver sensibilidade em algumas regiões, mas o atendimento é sempre ajustado conforme o conforto do cliente.",
  duration: "50–60 min",
  indication: "Postura, dores crônicas, coluna",
  sensation: "Ajustes manuais suaves",
  sessions: "Avaliação individual"
}];


const FAQS = [
{
  q: "Quantas sessões eu vou precisar?",
  a: "Depende do caso, da intensidade da dor, da resposta do corpo e do objetivo do atendimento. O Marcelo orienta melhor após a primeira avaliação — algumas pessoas sentem alívio já na primeira sessão, outras seguem em acompanhamento progressivo."
},
{
  q: "Faço academia — qual técnica é melhor pra mim?",
  a: "Para quem treina, a massagem desportiva costuma ser uma boa opção. Mas a escolha ideal depende da avaliação do Marcelo, principalmente se houver dor, lesão recente ou limitação de movimento."
},
{
  q: "Tenho dor lombar. O que faço?",
  a: "A dor lombar pode ter várias causas. O ideal é passar pela avaliação para definir se a melhor abordagem é massagem terapêutica, ventosaterapia, New Seitai ou outra técnica. Cada caso é único."
},
{
  q: "Ventosaterapia deixa marcas?",
  a: "Sim, pode deixar marcas temporárias na pele, semelhantes a manchas arroxeadas. Elas costumam desaparecer com o passar dos dias. A intensidade varia conforme a resposta do corpo de cada pessoa."
},
{
  q: "Gestante pode fazer atendimento?",
  a: "Gestantes precisam de avaliação específica e cuidados especiais. Recomendo enviar uma mensagem direta ao Marcelo para orientação individual e adequada ao seu momento."
},
{
  q: "Tenho marca-passo / trombose / lesão recente. Posso fazer?",
  a: "Esses casos precisam de avaliação profissional e, em geral, exigem muita cautela. Envie uma mensagem ao Marcelo e mantenha o acompanhamento médico — as técnicas não substituem tratamento ou diagnóstico médico."
},
{
  q: "A massagem substitui remédio?",
  a: "Não. As técnicas podem auxiliar no alívio de dores e bem-estar, mas não substituem medicamentos, diagnóstico ou tratamento médico. Nunca interrompa medicação sem orientação do seu médico."
},
{
  q: "Como funcionam o agendamento e o pagamento?",
  a: "O agendamento é feito por aqui, pelo formulário ao final desta página ou pelo WhatsApp. Valores, endereço e formas de pagamento (cartão, Pix) são confirmados diretamente pelo Marcelo no contato inicial."
}];


const STEPS = [
{ n: "01", t: "Mensagem inicial", d: "Você manda o seu caso — dor, objetivo, rotina. Sem compromisso." },
{ n: "02", t: "Avaliação", d: "O Marcelo avalia e indica a técnica mais adequada para o seu corpo." },
{ n: "03", t: "Sessão", d: "Atendimento individual em ambiente reservado, com técnica ajustada ao caso." },
{ n: "04", t: "Acompanhamento", d: "Plano de continuidade quando indicado, com retornos e ajustes." }];


/* ============================================================
   NAV
   ============================================================ */
function Nav({ onBook }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#top" className="brand">
          <span className="brand-mark">M</span>
          <span className="brand-text">
            Marcelo A. A. dos Santos
            <small>MASSOTERAPIA · CURITIBA/PR</small>
          </span>
        </a>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#processo">Processo</a>
          <a href="#faq">Dúvidas</a>
          <a href="#contato">Contato</a>
        </div>
        <button className="btn btn-neon" onClick={onBook}>
          Agendar <span className="arrow">→</span>
        </button>
      </div>
    </nav>);

}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onBook }) {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-grid">
        <div className="hero-left">
          <span className="eyebrow">MASSOTERAPIA</span>
          <h1 className="hero-headline" style={{ marginTop: 28 }}>
            Mãos que <em>escutam</em><br />
            o que o <span className="neon-word">corpo</span><br />
            já cansou de dizer.
          </h1>
          <div className="hero-meta">
            <p className="hero-blurb">
              Quinze anos de prática em técnicas corporais — auriculoterapia, ventosaterapia, massagem desportiva e terapêutica, TENS e New Seitai. Atendimento individual, adaptado a cada caso.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-gold" onClick={onBook}>
                Agendar avaliação <span className="arrow">→</span>
              </button>
              <a href="#servicos" className="btn btn-ghost-light">
                Ver técnicas
              </a>
            </div>
          </div>
        </div>
        <div className="hero-side">
          <div className="hero-stat">
            <span className="hero-stat-num">15<em style={{ color: "var(--gold)", fontStyle: "italic" }}>+</em></span>
            <span className="hero-stat-label">anos de prática em técnicas corporais e quiropraxia suave</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">06</span>
            <span className="hero-stat-label">técnicas integradas, escolhidas conforme avaliação</span>
          </div>
          <div className="hero-card-image" aria-hidden="true"></div>
        </div>
      </div>
      <div className="hero-foot">
        <div className="hero-foot-inner">
          <div className="hero-foot-tags">
            <span className="hero-foot-tag"><span className="dot"></span> Atendimento de Seg a Sáb</span>
            <span className="hero-foot-tag"><span className="dot"></span> Avaliação individual</span>
            <span className="hero-foot-tag"><span className="dot"></span> Ambiente reservado</span>
          </div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            ↓ Role para explorar
          </span>
        </div>
      </div>
    </section>);

}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  return (
    <section className="about" id="sobre" data-screen-label="02 Sobre">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-portrait" aria-hidden="true">
            <span className="about-portrait-tag">Marcelo · 2026</span>
          </div>
          <div className="about-body">
            <span className="eyebrow">Quem é o Marcelo</span>
            <h2 className="h-display">
              Um terapeuta que <em>ouve</em> antes<br />
              de impor a técnica.
            </h2>
            <p className="about-lede">
              Marcelo A. A. dos Santos é massoterapeuta com mais de quinze anos de prática. Trabalha com técnicas corporais adotadas em várias partes do mundo — sempre com a mesma premissa: a melhor técnica é a que o seu corpo, hoje, está pedindo.
            </p>
            <p>
              Cada atendimento começa por uma escuta cuidadosa. Da escuta vem a leitura do quadro — dor, tensão, postura, rotina, treino, sono. Só então a técnica entra em cena: auriculoterapia, ventosaterapia, massagem desportiva ou terapêutica, TENS para neuropatia ou New Seitai.
            </p>
            <p>
              O objetivo não é prometer milagre. É restaurar o que o corpo perdeu de conforto, presença e mobilidade — respeitando o tempo de cada pessoa.
            </p>

            <div className="about-creds">
              <div className="cred">
                <div className="cred-num">15<em>+</em></div>
                <div className="cred-label">Anos de prática</div>
              </div>
              <div className="cred">
                <div className="cred-num">06</div>
                <div className="cred-label">Técnicas integradas</div>
              </div>
              <div className="cred">
                <div className="cred-num">1<em>:</em>1</div>
                <div className="cred-label">Atendimento individual</div>
              </div>
            </div>

            <div className="about-aside">
              <strong>NOTA IMPORTANTE</strong>
              O atendimento massoterápico não substitui consulta médica, diagnóstico ou tratamento. Em casos de dor intensa, trauma, gestação, marca-passo, doença cardíaca, trombose, câncer, feridas ou pós-operatório recente, procure orientação médica antes do atendimento.
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ============================================================
   SERVICES
   ============================================================ */
function Services({ onOpen, onBook }) {
  return (
    <section className="services" id="servicos" data-screen-label="03 Serviços">
      <div className="wrap">
        <div className="services-head">
          <div>
            <span className="eyebrow eyebrow-neon">Técnicas</span>
            <h2 className="h-display">Seis <em>caminhos</em><br />de cuidado.</h2>
          </div>
          <p>
            Cada técnica tem seu propósito — e seu tempo. A indicação correta depende da avaliação do caso. Abaixo, o que cada uma propõe e quando ela faz sentido.
          </p>
        </div>

        <ul className="service-list" role="list">
          {SERVICES.map((s) =>
          <li
            key={s.id}
            className="svc"
            data-screen-label={`Serviço · ${s.name}`}
            onClick={() => onOpen(s)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(s)}>
            
              <span className="svc-num">{s.num}</span>
              <h3 className="svc-name">{s.name}</h3>
              <p className="svc-blurb">{s.blurb}</p>
              <span className="svc-cta">
                Detalhes <span className="plus">+</span>
              </span>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

/* ============================================================
   SERVICE MODAL
   ============================================================ */
function ServiceModal({ svc, onClose, onBook }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  if (!svc) return null;
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <div className="modal-num">Técnica · {svc.num}</div>
            <h3 className="modal-title">{svc.name}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <div className="modal-body">
          <p>{svc.long}</p>
          <p>{svc.long2}</p>
          <div className="modal-grid">
            <div>
              <div className="modal-grid-label">Duração</div>
              <div className="modal-grid-val">{svc.duration}</div>
            </div>
            <div>
              <div className="modal-grid-label">Indicação</div>
              <div className="modal-grid-val">{svc.indication}</div>
            </div>
            <div>
              <div className="modal-grid-label">Sensação</div>
              <div className="modal-grid-val">{svc.sensation}</div>
            </div>
            <div>
              <div className="modal-grid-label">Sessões</div>
              <div className="modal-grid-val">{svc.sessions}</div>
            </div>
          </div>
          <div className="modal-foot">
            <button className="btn btn-neon" onClick={() => {onClose();onBook(svc.id);}}>
              Agendar essa técnica <span className="arrow">→</span>
            </button>
            <button className="btn btn-ghost-light" onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    </div>);

}

/* ============================================================
   PROCESS
   ============================================================ */
function Process() {
  return (
    <section className="process" id="processo" data-screen-label="04 Processo">
      <div className="wrap">
        <div className="process-head">
          <span className="eyebrow">Como funciona</span>
          <h2 className="h-display">Da primeira <em>mensagem</em><br />à última sessão.</h2>
          <p>Quatro passos simples — sem mistério, sem promessa de cura. Só método, escuta e técnica.</p>
        </div>
        <div className="steps">
          {STEPS.map((s) =>
          <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <h4 className="step-title">{s.t}</h4>
              <p className="step-body">{s.d}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ============================================================
   FAQ
   ============================================================ */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq" data-screen-label="05 Dúvidas">
      <div className="wrap">
        <div className="faq-grid">
          <div className="faq-head">
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 className="h-display">O que as pessoas<br />costumam <em>perguntar</em>.</h2>
            <div className="faq-aside">
              <strong>Não encontrou sua dúvida?</strong>
              Mande sua pergunta no formulário ao final desta página. Você recebe uma resposta direta do Marcelo, sem intermediário.
            </div>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) =>
            <div key={i} className={`qa ${open === i ? "open" : ""}`}>
                <button className="qa-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <span className="plus">+</span>
                </button>
                <div className="qa-a">
                  <div className="qa-a-inner">{f.a}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

/* ============================================================
   BOOKING
   ============================================================ */
function Booking({ initialSvc, clearInitial }) {
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState({ name: "", whatsapp: "", day: "", time: "", goal: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (initialSvc) {
      setSelected(initialSvc);
      clearInitial && clearInitial();
    }
  }, [initialSvc, clearInitial]);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section className="book" id="contato" data-screen-label="06 Agendamento">
      <div className="wrap">
        <div className="book-grid">
          <div className="book-head">
            <span className="eyebrow eyebrow-neon">Agendamento</span>
            <h2 className="h-display">
              Conta o que <em>incomoda</em>.<br />
              A gente vê <span className="neon">junto</span><br />
              o caminho.
            </h2>
            <p>
              Você manda dia, horário preferidos e o que tem incomodado. O Marcelo retorna em até 24 horas com a indicação da técnica e a confirmação da agenda.
            </p>

            <dl className="contact-list">
              <div className="contact-row">
                <dt>WhatsApp</dt>
                <dd>(41) 99189-5496</dd>
                <span className="dot"></span>
              </div>
              <div className="contact-row">
                <dt>Atendimento</dt>
                <dd>Segunda a Sábado · sob agenda</dd>
              </div>
              <div className="contact-row">
                <dt>Local</dt>
                <dd>São Paulo · confirmado no contato</dd>
              </div>
              <div className="contact-row">
                <dt>Pagamento</dt>
                <dd>Pix · cartão · dinheiro</dd>
              </div>
            </dl>
          </div>

          <div className="form-card">
            {sent ?
            <div className="form-success">
                <div className="ok">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5 9-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h4>Mensagem recebida</h4>
                <p>
                  Obrigado, {form.name || "tudo bem"}. Sua solicitação chegou ao Marcelo. Você recebe retorno em até 24 horas no WhatsApp informado.
                </p>
                <button
                className="btn btn-ghost-light"
                style={{ marginTop: 24 }}
                onClick={() => {setSent(false);setForm({ name: "", whatsapp: "", day: "", time: "", goal: "" });setSelected("");}}>
                
                  Enviar outra mensagem
                </button>
              </div> :

            <form onSubmit={submit}>
                <h3>Solicitar atendimento</h3>
                <div className="form-sub">Resposta em até 24h, direta com o Marcelo.</div>

                <div className="field">
                  <label>Técnica de interesse <span style={{ color: "rgba(255,255,255,0.3)", letterSpacing: 0 }}>(opcional)</span></label>
                  <div className="svc-pills">
                    {SERVICES.map((s) =>
                  <button
                    type="button"
                    key={s.id}
                    className={`svc-pill ${selected === s.id ? "active" : ""}`}
                    onClick={() => setSelected(selected === s.id ? "" : s.id)}>
                    
                        {s.name}
                      </button>
                  )}
                  </div>
                </div>

                <div className="field">
                  <label>Seu nome</label>
                  <input type="text" required value={form.name} onChange={update("name")} placeholder="Como podemos te chamar" />
                </div>

                <div className="field">
                  <label>WhatsApp</label>
                  <input type="tel" required value={form.whatsapp} onChange={update("whatsapp")} placeholder="(11) 9XXXX-XXXX" />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label>Melhor dia</label>
                    <input type="text" value={form.day} onChange={update("day")} placeholder="ex: ter ou qui" />
                  </div>
                  <div className="field">
                    <label>Melhor horário</label>
                    <input type="text" value={form.time} onChange={update("time")} placeholder="ex: à tarde, depois das 18h" />
                  </div>
                </div>

                <div className="field">
                  <label>O que tem incomodado / objetivo</label>
                  <textarea value={form.goal} onChange={update("goal")} placeholder="Dor lombar há 3 meses, tensão no pescoço, recuperação de treino..."></textarea>
                </div>

                <button className="form-submit" type="submit" disabled={!form.name || !form.whatsapp}>
                  Enviar solicitação <span>→</span>
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>);

}

/* ============================================================
   DISCLAIMER + FOOTER
   ============================================================ */
function Disclaimer() {
  return (
    <section className="disclaimer">
      <div className="disclaimer-inner">
        <div className="disclaimer-icon">i</div>
        <div>
          <strong>O atendimento massoterápico não substitui consulta médica.</strong> Em casos de dor intensa, trauma recente, dormência persistente, perda de força, febre, inchaço importante, gestação, doença cardíaca, marca-passo, câncer, trombose, feridas, infecções ou pós-operatório recente, procure orientação médica antes de agendar. As técnicas oferecidas auxiliam no bem-estar e não devem ser entendidas como promessa de cura.
        </div>
      </div>
    </section>);

}

function Foot() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="foot-brand">Marcelo Alves <em>dos Santos</em></div>
            <p>Massoterapeuta em São Paulo · técnicas corporais para alívio de dores, recuperação muscular e bem-estar físico e mental. Quinze anos de prática.</p>
          </div>
          <div className="foot-col">
            <h5>Navegação</h5>
            <ul>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#processo">Processo</a></li>
              <li><a href="#faq">Dúvidas</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Técnicas</h5>
            <ul>
              <li><a href="#servicos">Auriculoterapia</a></li>
              <li><a href="#servicos">Ventosaterapia</a></li>
              <li><a href="#servicos">Massagem desportiva</a></li>
              <li><a href="#servicos">New Seitai</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Contato</h5>
            <ul>
              <li><a href="#contato">Agendar</a></li>
              <li><a href="#contato">WhatsApp</a></li>
              <li><a href="#contato">Curitiba · PR</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div>© 2026 · Marcelo A. A. dos Santos · Massoterapia</div>
          <div>ATENDIMENTO DE SEGUNDA A SÁBADO · CURITIBA</div>
        </div>
      </div>
    </footer>);

}

/* ============================================================
   APP
   ============================================================ */
function App() {
  const [openSvc, setOpenSvc] = useState(null);
  const [bookingSvc, setBookingSvc] = useState("");
  const scrollToBook = (svcId) => {
    if (svcId) setBookingSvc(svcId);
    setTimeout(() => {
      const el = document.getElementById("contato");
      if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    }, 30);
  };
  return (
    <>
      <Nav onBook={() => scrollToBook()} />
      <Hero onBook={() => scrollToBook()} />
      <About />
      <Services onOpen={setOpenSvc} onBook={scrollToBook} />
      <Process />
      <FAQ />
      <Booking initialSvc={bookingSvc} clearInitial={() => setBookingSvc("")} />
      <Disclaimer />
      <Foot />
      {openSvc && <ServiceModal svc={openSvc} onClose={() => setOpenSvc(null)} onBook={scrollToBook} />}
    </>);

}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);