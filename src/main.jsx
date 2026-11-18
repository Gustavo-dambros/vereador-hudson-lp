import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const officialProfile = 'https://www.camaracascavel.pr.gov.br/a-camara/vereadores/hudson-marcio-moreschi-junior/';
const whatsapp = 'https://wa.me/5545999531462';
const instagram = 'https://www.instagram.com/hudsonjrmoreschi';
const photos = {
  hudson: '/assets/img/hudson-oficial.jpg',
  working: '/assets/img/sem-legenda/imagem_trabalhando2-sem-legenda.jpg',
  book: '/assets/img/sem-legenda/visita_gabinete-sem-legenda.jpg',
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
    image: photos.official,
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

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '→'}</span>;
}

function Brand({ footer = false }) {
  return (
    <a className={footer ? 'brand footer-brand' : 'brand'} href="#topo" aria-label="Hudson Moreschi, voltar ao início">
      <span className="brand-mark" aria-hidden="true">HM</span>
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
          <h2>Fora do <em>plenário</em></h2>
          <p>Um mandato se faz perto das pessoas: ouvindo, acompanhando demandas e trabalhando também fora do plenário.</p>
        </div>
        <div className="human-section__gallery" role="group" aria-label="Hudson em momentos fora do plenário">
          <img src={photos.working} alt="Hudson concentrado diante de um notebook" loading="lazy" />
          <img src={photos.book} alt="Hudson em encontro com uma liderança pública" loading="lazy" />
        </div>
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

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image-slot" role="img" aria-label={project.imageAlt} style={{ backgroundImage: `url("${project.image}")` }}>
        <span>{project.imageText}</span>
      </div>
      <div className="project-copy">
        <span className={`project-status project-status--${project.state}`}>{project.status}</span>
        <h3>{project.title}</h3>
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

function Projects() {
  return (
    <section className="news-home-section projects-section" id="projetos" aria-labelledby="projectsTitle">
      <div className="container">
        <div className="section-head project-section-head">
          <p className="eyebrow"><span className="eyebrow__dot" />Mandato em foco</p>
          <h2 id="projectsTitle">Projetos do Hudson <em>em destaque</em></h2>
          <p>Propostas, leis e ações com seus respectivos status e fontes para consulta.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
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
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Biography />
        <HumanMoments />
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
