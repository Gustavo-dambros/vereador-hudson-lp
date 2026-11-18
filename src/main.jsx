import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const officialProfile = 'https://www.camaracascavel.pr.gov.br/a-camara/vereadores/hudson-marcio-moreschi-junior/';
const whatsapp = 'https://wa.me/5545999531462';
const instagram = 'https://www.instagram.com/hudsonjrmoreschi';
const photos = {
  hudson: '/assets/img/hudson-oficial.jpg',
  working: '/assets/img/sem-legenda/imagem_trabalhando2-sem-legenda.jpg',
  book: '/assets/img/sem-legenda/visita_gabinete-sem-legenda.jpg',
  race: '/assets/img/hudson-corrida.jpg',
  campaign: '/img/vape-zero-campanha.jpg',
};

const projects = [
  {
    image: photos.campaign,
    imageAlt: 'Registro da campanha Vape Zero em escola de Cascavel',
    imageText: 'Prevenção também se faz com informação.',
    status: 'PLO 24/2025 · lei sancionada · ação realizada',
    state: 'done',
    title: 'Junho Branco e Vape Zero',
    description: 'A lei criou o mês de conscientização e prevenção ao uso de drogas. Em parceria com Everton Guimarães, a campanha Vape Zero chegou a 23 escolas estaduais de Ensino Médio em 2025.',
    links: [
      ['Sanção da lei', 'https://www.camaracascavel.pr.gov.br/comunicacao/noticias/lancamento-da-campanha-vape-zero-no-colegio-eleodoro-da-inicio-ao-junho-branco/'],
      ['Ação nas escolas', 'https://www.camaracascavel.pr.gov.br/comunicacao/noticias/campanha-vape-zero-2026-vai-conscientizar-e-combater-o-uso-de-cigarro-eletronico/'],
    ],
  },
  {
    image: photos.book,
    imageAlt: 'Hudson em encontro com uma liderança pública',
    imageText: 'Escuta e presença nos bairros.',
    status: 'PLO 217/2025 · Lei nº 7.913/2026',
    state: 'done',
    title: 'Atendimento às vítimas de trânsito',
    description: 'Institui uma política municipal de acolhimento a vítimas de acidentes e familiares, com articulação entre saúde, assistência social, segurança e mobilidade. A implementação dos serviços não foi verificada.',
    links: [
      ['Consultar lei no SAPL', 'https://sapl.cascavel.pr.leg.br/norma/557'],
      ['Sobre a proposta', 'https://www.camaracascavel.pr.gov.br/comunicacao/noticias/vereador-propoe-politica-especial-para-atendimento-a-vitimas-de-acidentes-de-transito/'],
    ],
  },
  {
    image: photos.working,
    imageAlt: 'Hudson trabalhando diante de um notebook',
    imageText: 'Ideias acompanhadas de trabalho.',
    status: 'PLO 89/2025 · Lei nº 7.889/2026',
    state: 'done',
    title: 'Mês da Indústria',
    description: 'Institui a programação anual para valorizar o setor industrial de Cascavel. A abertura de 2026 reuniu representantes da indústria e entidades locais na ACIC.',
    links: [
      ['Lei e tramitação', 'https://sapl.cascavel.pr.leg.br/materia/35917'],
      ['Relato da programação', 'https://tribunadacidade.com.br/mes-da-industria-cascavel-lanca-programacao-inedita-para-fortalecer-setor-produtivo-e-impulsionar-o-desenvolvimento-economico/'],
    ],
  },
  {
    image: photos.book,
    imageAlt: 'Hudson em atividade pública',
    imageText: 'Políticas públicas começam pelas famílias.',
    status: 'PLO 87/2025 · 2º turno aprovado · sanção não confirmada',
    state: 'vote',
    title: 'Parentalidade positiva',
    description: 'Propõe ações municipais para fortalecer vínculos familiares, incentivar práticas educativas sem violência e apoiar o desenvolvimento integral de crianças de 0 a 12 anos.',
    links: [
      ['Projeto no SAPL', 'https://sapl.cascavel.pr.leg.br/materia/35915'],
      ['Votação em 2º turno', 'https://www.camaracascavel.pr.gov.br/comunicacao/noticias/saiba-como-foram-as-votacoes-na-sessao-de-2-de-dezembro-de-2025/'],
    ],
  },
  {
    image: photos.book,
    imageAlt: 'Hudson em conversa durante um encontro institucional',
    imageText: 'Trabalho que aproxima pessoas e instituições.',
    status: 'PLO 74/2025 · 2º turno aprovado · sanção não confirmada',
    state: 'vote',
    title: 'Empresa Promotora da Saúde Mental',
    description: 'Propõe um selo municipal para reconhecer empresas que adotem ações de promoção da saúde mental e do bem-estar de seus trabalhadores.',
    links: [
      ['Projeto no SAPL', 'https://sapl.cascavel.pr.leg.br/materia/35817'],
      ['Votação em 2º turno', 'https://sapl.cascavel.pr.leg.br/sessao/1228/ordemdia'],
    ],
  },
];

const areas = [
  ['Assistência Social', 'Fiscalização e defesa das políticas de assistência, do berçário à terceira idade.'],
  ['Desenvolvimento urbano', 'Infraestrutura, mobilidade e planejamento para Cascavel.'],
  ['Famílias', 'Apoio a programas e projetos que fortalecem as famílias.'],
  ['Agroindústria', 'Contribuição técnica ao setor regional, ligada à formação de Hudson em Produção Agroindustrial.'],
  ['Serviço público', 'Defesa dos servidores municipais, área em que Hudson também tem experiência profissional.'],
  ['Participação dos moradores', 'Escuta de bairros, entidades, comércio e moradores pelo gabinete.'],
];

const impactNumbers = [
  { value: '2.346', label: 'votos recebidos', detail: 'Eleição municipal de 2024' },
  { value: '18', label: 'anos no serviço público', detail: 'Atuação municipal em Cascavel' },
  { value: '23', label: 'escolas alcançadas', detail: 'Ações realizadas em 2025' },
  { value: '7', label: 'anos como secretário', detail: 'Assistência Social · 2017–2024' },
  { value: '+20', label: 'projetos apresentados*', detail: 'Número declarado em entrevista · 2025' },
  { value: '+1.000', label: 'reuniões realizadas*', detail: 'Número declarado em entrevista · 2025' },
];
function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function Brand({ footer = false }) {
  return (
    <a className={footer ? 'brand footer-brand' : 'brand'} href="#topo" aria-label="Hudson Moreschi, voltar ao início">
      <img className="brand-logo" src="/favicon.svg" alt="" aria-hidden="true" />
      <span className="brand-copy">
        <span className="brand-name">Hudson <strong>Moreschi</strong></span>
        <span className="brand-role">Vereador · Cascavel/PR</span>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const links = [
    ['Propostas', '#propostas'],
    ['Projetos', '#projetos'],
    ['Trajetória', '#sobre'],
    ['Jornada', '#jornada'],
    ['Gabinete', '#gabinete'],
    ['Participe', '#participe'],
  ];

  return (
    <header className="site-header" id="topo">
      <div className="container header-inner">
        <Brand />
        <nav className={`nav-links${open ? ' open' : ''}`} id="navLinks" aria-label="Navegação principal">
          {links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="btn header-cta" href={whatsapp} target="_blank" rel="noopener noreferrer">Fale com o Hudson</a>
        </nav>
        <button
          className="menu-toggle"
          id="menuToggle"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-static" id="inicio" aria-labelledby="heroTitle">
      <div className="hero-static__media" aria-hidden="true">
        <picture>
          <source media="(max-width: 760px)" srcSet={photos.hudson} />
          <img src={photos.hudson} alt="" fetchPriority="high" />
        </picture>
        <div className="hero-static__tint" />
      </div>
      <div className="container hero-static__layout">
        <div className="hero-static__copy">
          <p className="hero-kicker">Vereador de Cascavel · Mandato 2025–2028</p>
          <h1 id="heroTitle"><span>Presença que</span><span>vira trabalho.</span></h1>
          <p>Hudson Moreschi é servidor público municipal há 18 anos e foi secretário de Assistência Social de Cascavel entre 2017 e 2024.</p>
          <div className="hero-static__actions">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn hero-static__primary">Falar com o gabinete <Arrow /></a>
            <a href="#projetos" className="hero-static__donate">Conheça os projetos <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Biography() {
  return (
    <section className="trajectory" id="sobre">
      <div className="container trajectory__grid">
        <div className="section-copy">
          <h2>Uma trajetória ligada à <em>Assistência Social</em></h2>
          <p>Hudson Moreschi é engenheiro de Produção Agroindustrial e servidor público municipal há 18 anos, com atuação na política de Assistência Social.</p>
          <p>De 2017 a 2024, foi secretário municipal de Assistência Social de Cascavel. Hoje, exerce mandato como vereador na 18ª Legislatura (2025–2028).</p>
          <a className="text-link" href={officialProfile} target="_blank" rel="noopener noreferrer">Consultar perfil oficial na Câmara <Arrow diagonal /></a>
        </div>
        <figure className="photo-card">
          <img src={photos.hudson} alt="Hudson Moreschi durante uma sessão na Câmara Municipal de Cascavel" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

function HumanMoments() {
  return (
    <section className="human-section" id="alem-do-gabinete">
      <div className="container human-section__grid">
        <div className="human-section__copy">
          <p className="eyebrow"><span className="eyebrow__dot" />Além da vida pública</p>
          <h2>Antes do cargo, existe <em>a pessoa</em></h2>
          <p>Fora da rotina do gabinete, Hudson cultiva a corrida de rua como hobby. Na Cascavel Run, realizada em comemoração aos 75 anos de Cascavel, ele celebrou mais uma conquista pessoal em sua cidade.</p>
          <p>Um momento fora das sessões e das reuniões, mostrando um pouco da pessoa por trás da vida pública.</p>
        </div>
        <figure className="human-section__portrait">
          <img src={photos.race} alt="Hudson sorrindo e segurando a placa de colocação após uma corrida" loading="lazy" />
          <figcaption>Um momento de conquista fora do plenário.</figcaption>
        </figure>
      </div>
    </section>
  );
}

function SectionHeading({ children, id }) {
  return <div className="section-head"><h2 id={id}>{children}</h2></div>;
}

function Proposals() {
  return (
    <section className="proposals" id="propostas">
      <div className="container">
        <SectionHeading>Áreas de atuação em <em>Cascavel</em></SectionHeading>
        <div className="proposal-list">
          {areas.map(([title, text]) => (
            <article className="proposal-item" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <div className="project-image-slot" role="img" aria-label={project.imageAlt} style={{ backgroundImage: `url("${project.image}")` }}>
        <span className="project-card-number" aria-hidden="true">{index + 1}</span>
        <span className="project-image-title">{project.title}</span>
        <a className="project-card-open" href={project.links[0][1]} target="_blank" rel="noopener noreferrer" aria-label={`Consultar fonte oficial: ${project.title}`}>
          <span aria-hidden="true">+</span>
        </a>
      </div>
      <div className="project-copy">
        <span className={`project-status project-status--${project.state}`}>{project.status}</span>
        <p>{project.description}</p>
        <div className="project-sources">
          {project.links.map(([label, href]) => (
            <a href={href} key={href} target="_blank" rel="noopener noreferrer">{label} <Arrow /></a>
          ))}
        </div>
      </div>
    </article>
  );
}

function ImpactNumbers() {
  const cards = (isDuplicate = false) => impactNumbers.map((item) => (
    <article className="number-card" key={`${isDuplicate ? 'duplicate-' : ''}${item.value}-${item.label}`}>
      <strong>{item.value}</strong>
      <h3>{item.label}</h3>
      <p>{item.detail}</p>
    </article>
  ));

  return (
    <section className="impact-section" aria-labelledby="impact-title">
      <div className="container">
        <div className="impact-heading">
          <div>
            <p className="eyebrow"><span className="eyebrow__dot" />Números do mandato</p>
            <h2 id="impact-title">Uma trajetória <em>em números</em></h2>
          </div>
        </div>
      </div>
      <div className="numbers-track" role="region" aria-label="Carrossel infinito de números importantes">
        <div className="numbers-track__group">{cards()}</div>
        <div className="numbers-track__group" aria-hidden="true">{cards(true)}</div>
      </div>
      <div className="container">
        <p className="impact-note">* Projetos apresentados e reuniões: números declarados por Hudson em entrevista, referentes a 2025.</p>
      </div>
    </section>
  );
}

function Projects() {
  const trackRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const updateActiveCard = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.querySelectorAll('.project-card')];
    if (!cards.length) return;
    const trackCenter = track.getBoundingClientRect().left + track.clientWidth / 2;
    const nearest = cards.reduce((best, card, index) => {
      const bounds = card.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      return Math.abs(center - trackCenter) < best.distance ? { index, distance: Math.abs(center - trackCenter) } : best;
    }, { index: 0, distance: Infinity });
    setActiveCard(nearest.index);
  };

  const goToCard = (index) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll('.project-card')[index];
    if (!track || !card) return;
    const trackBounds = track.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    const offset = cardBounds.left + cardBounds.width / 2 - (trackBounds.left + track.clientWidth / 2);
    track.scrollTo({ left: track.scrollLeft + offset, behavior: 'smooth' });
    setActiveCard(index);
  };

  return (
    <section className="news-home-section projects-section" id="projetos" aria-labelledby="projectsTitle">
      <div className="container">
        <div className="section-head project-section-head">
          <p className="eyebrow"><span className="eyebrow__dot" />Mandato em foco</p>
          <h2 id="projectsTitle">MEUS <em>PROJETOS</em></h2>
          <h3 className="project-section-subtitle">Propostas que refletem a voz da população</h3>
          <p>Conheça projetos apresentados por Hudson, seus status e as fontes para acompanhar cada proposta.</p>
        </div>
      </div>
      <div className="container projects-container">
        <div className="projects-grid" ref={trackRef} onScroll={updateActiveCard} aria-label="Projetos do mandato">
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>
        <div className="projects-carousel-dots" role="group" aria-label="Navegar pelos projetos">
          {projects.map((project, index) => (
            <button key={project.title} type="button" className={`carousel-dot${activeCard === index ? ' active' : ''}`} aria-label={`Mostrar projeto ${index + 1}: ${project.title}`} aria-current={activeCard === index ? 'true' : undefined} onClick={() => goToCard(index)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FollowMandate() {
  return (
    <section className="news-home-section">
      <div className="container news-follow">
        <div className="section-head">
          <h2>Acompanhe o <em>mandato</em></h2>
          <p className="section-head__note">Consulte os canais oficiais para ver a atividade parlamentar e as atualizações do gabinete.</p>
        </div>
        <div className="follow-links">
          <a href={officialProfile} target="_blank" rel="noopener noreferrer">
            <span><strong>Câmara Municipal de Cascavel</strong><small>Perfil e atividade parlamentar</small></span><Arrow diagonal />
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <span><strong>Instagram</strong><small>@hudsonjrmoreschi</small></span><Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="journey-section" id="jornada">
      <div className="container">
        <SectionHeading>Trajetória e <em>contato</em></SectionHeading>
        <div className="journey-grid">
          <div className="journey-social">
            <h3>Experiência pública</h3>
            <ol className="career-list">
              <li><strong>18 anos</strong><span>Servidor público municipal com atuação em Assistência Social</span></li>
              <li><strong>2017–2024</strong><span>Secretário Municipal de Assistência Social de Cascavel</span></li>
              <li><strong>2025–2028</strong><span>Vereador · 18ª Legislatura</span></li>
            </ol>
          </div>
          <div className="jingle-list">
            <h3>Contato do gabinete</h3>
            <a className="jingle-row" href="tel:+554533218800"><strong>(45) 3321-8800</strong><small>Telefone do gabinete</small></a>
            <a className="jingle-row" href={whatsapp} target="_blank" rel="noopener noreferrer"><strong>(45) 9 9953-1462</strong><small>WhatsApp do gabinete</small></a>
            <a className="jingle-row" href="mailto:gabinetehudsonmoreschi@gmail.com"><strong>gabinetehudsonmoreschi@gmail.com</strong><small>E-mail do gabinete</small></a>
            <a className="jingle-row" href={instagram} target="_blank" rel="noopener noreferrer"><strong>@hudsonjrmoreschi</strong><small>Instagram</small></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Office() {
  return (
    <section className="gabinete-section" id="gabinete">
      <div className="container">
        <SectionHeading>Visite o <em>gabinete</em></SectionHeading>
        <div className="gabinete-grid">
          <div className="office-card">
            <dl className="office-card__facts">
              <div><dt>Nome</dt><dd>Hudson Márcio Moreschi Júnior</dd></div>
              <div><dt>Nascimento</dt><dd>22/01/1988</dd></div>
              <div><dt>Profissão</dt><dd>Servidor público municipal</dd></div>
              <div><dt>Partido</dt><dd>PODEMOS</dd></div>
              <div><dt>Mandato</dt><dd>2025–2028</dd></div>
              <div><dt>Legislatura</dt><dd>18ª Legislatura</dd></div>
              <div><dt>Endereço</dt><dd>Rua Pernambuco · Centro · Cascavel/PR</dd></div>
            </dl>
          </div>
          <div className="gabinete-map">
            <div className="map-card">
              <span className="map-card__pin" aria-hidden="true" />
              <strong>Rua Pernambuco</strong>
              <span>Centro · Cascavel/PR</span>
              <a className="btn" href="https://maps.google.com/?q=Rua+Pernambuco,+Centro,+Cascavel,+PR" target="_blank" rel="noopener noreferrer">Ver localização <Arrow diagonal /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="bolsozap-section" id="participe">
      <div className="container bolsozap-grid">
        <div>
          <h2>Fale com o <em>gabinete</em></h2>
          <p>Envie uma sugestão, dúvida ou demanda do seu bairro pelos canais de atendimento.</p>
        </div>
        <div className="bolsozap-action">
          <a className="btn btn--big" href={whatsapp} target="_blank" rel="noopener noreferrer">Abrir conversa no WhatsApp <Arrow diagonal /></a>
          <a className="contact-email" href="mailto:gabinetehudsonmoreschi@gmail.com">Enviar e-mail ao gabinete</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-main">
          <div className="footer-identity">
            <Brand footer />
            <p className="footer-signoff">Cascavel pra frente.</p>
          </div>
          <nav className="footer-nav" aria-label="Navegação do rodapé">
            <h2 className="footer-label">Explore o site</h2>
            <a href="#sobre">Trajetória</a><a href="#propostas">Propostas</a><a href="#projetos">Projetos</a><a href="#gabinete">Gabinete</a>
          </nav>
          <div className="footer-contact">
            <h2 className="footer-label">Fale com o gabinete</h2>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp do gabinete</a>
            <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram <span>@hudsonjrmoreschi</span></a>
            <a href={officialProfile} target="_blank" rel="noopener noreferrer">Página oficial na Câmara</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-note">Mandato 2025–2028 · 18ª Legislatura · Cascavel/PR · Foto: Flávio Olsenheimer (Câmara Municipal de Cascavel)</p>
          <a className="footer-top-link" href="#topo">Voltar ao início <Arrow /></a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const loader = document.getElementById('boot-loader');
    const start = performance.now();
    let hideTimer;
    let removeTimer;
    let cancelled = false;

    const revealSite = () => {
      if (cancelled) return;
      document.body.classList.remove('is-loading');
      if (!loader) return;
      loader.classList.add('is-leaving');
      removeTimer = window.setTimeout(() => loader.remove(), 400);
    };

    const minimumDuration = new Promise((resolve) => {
      hideTimer = window.setTimeout(resolve, Math.max(0, 1600 - (performance.now() - start)));
    });
    const fontRequest = document.fonts?.load('48px Birthstone').catch(() => []) ?? Promise.resolve();
    const fontReady = Promise.race([
      fontRequest,
      new Promise((resolve) => window.setTimeout(resolve, 350)),
    ]);

    Promise.all([minimumDuration, fontReady]).then(revealSite);

    return () => {
      cancelled = true;
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Biography />
        <HumanMoments />
        <ImpactNumbers />
        <Proposals />
        <Projects />
        <FollowMandate />
        <Journey />
        <Office />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
