import { useState, useEffect, useRef } from "react";

const CATEGORIAS = [
  {
    id: "escrita", label: "✍️ Escrita", cor: "#FF6B35",
    servicos: [
      { id: "redacao", icon: "✍️", title: "Redação Profissional", desc: "Artigos, posts, cartas e textos de alta qualidade", preco: 1500, cor: "#FF6B35", gradient: "linear-gradient(135deg,#FF6B35,#FFB347)", placeholder: "Ex: Escreva um artigo de 400 palavras sobre empreendedorismo em Angola para jovens universitários.", system: "És um especialista em redação criativa e profissional em português angolano. Escreve textos de alta qualidade, com estrutura clara, linguagem envolvente e contextualizada para Angola. Entrega sempre resultados completos, impressionantes e prontos a usar." },
      { id: "carta", icon: "📨", title: "Cartas & Emails", desc: "Cartas formais, emails profissionais e ofícios", preco: 1200, cor: "#FF8C55", gradient: "linear-gradient(135deg,#FF8C55,#FFD180)", placeholder: "Ex: Escreva uma carta formal a solicitar emprego na empresa X para o cargo de Y.", system: "És um especialista em comunicação escrita formal e profissional em português angolano. Escreves cartas, emails e ofícios com linguagem adequada, estrutura correcta e tom profissional." },
      { id: "cv", icon: "📄", title: "Curriculum Vitae", desc: "CV profissional que impressiona recrutadores", preco: 2500, cor: "#FF6B35", gradient: "linear-gradient(135deg,#FF6B35,#FF8C55)", placeholder: "Ex: Crie um CV para João Silva, 25 anos, formado em Gestão, com 2 anos de experiência em marketing.", system: "És um especialista em recursos humanos e criação de CVs profissionais. Crias CVs estruturados, modernos e atractivos que destacam as competências do candidato. Formato claro com secções: Perfil, Experiência, Formação, Competências e Contactos." },
      { id: "redessociais", icon: "📱", title: "Posts Redes Sociais", desc: "Conteúdo viral para Instagram, Facebook e TikTok", preco: 1000, cor: "#FF5733", gradient: "linear-gradient(135deg,#FF5733,#FF8C55)", placeholder: "Ex: Crie 5 posts para Instagram sobre uma loja de roupas em Luanda. Tom jovem e divertido.", system: "És um especialista em marketing de redes sociais com foco no mercado angolano. Crias posts envolventes, com captions apelativas, emojis adequados e hashtags relevantes para Angola." },
      { id: "discurso", icon: "🎤", title: "Discursos & Apresentações", desc: "Discursos impactantes para qualquer ocasião", preco: 2000, cor: "#FF6B35", gradient: "linear-gradient(135deg,#FF6B35,#FFB347)", placeholder: "Ex: Escreva um discurso de formatura de 5 minutos sobre o futuro dos jovens angolanos.", system: "És um especialista em oratória e escrita de discursos impactantes. Crias discursos emocionantes, bem estruturados com introdução, desenvolvimento e conclusão memorável." },
    ]
  },
  {
    id: "pesquisa", label: "🔍 Pesquisa", cor: "#00C9FF",
    servicos: [
      { id: "resumo", icon: "🔍", title: "Resumos & Sínteses", desc: "Resumos claros e bem estruturados de qualquer tema", preco: 1200, cor: "#00C9FF", gradient: "linear-gradient(135deg,#00C9FF,#92FE9D)", placeholder: "Ex: Faça um resumo detalhado sobre a história económica de Angola pós-independência.", system: "És um especialista em pesquisa e síntese de informação. Produces resumos claros, bem estruturados com títulos, subtítulos e pontos principais destacados. Usa português formal e académico." },
      { id: "analise", icon: "📊", title: "Análises & Relatórios", desc: "Análises profundas de mercado, negócio ou dados", preco: 3000, cor: "#00B4D8", gradient: "linear-gradient(135deg,#00B4D8,#00C9FF)", placeholder: "Ex: Faça uma análise do mercado de tecnologia em Angola em 2025, incluindo oportunidades e desafios.", system: "És um analista de negócios e mercados especializado em Angola e África. Produces relatórios detalhados com análise SWOT, tendências, oportunidades e recomendações estratégicas." },
      { id: "plano", icon: "🗺️", title: "Planos de Negócio", desc: "Plano completo para lançar ou crescer o seu negócio", preco: 5000, cor: "#0096C7", gradient: "linear-gradient(135deg,#0096C7,#00C9FF)", placeholder: "Ex: Crie um plano de negócio para abrir uma lavanderia em Luanda com investimento inicial de 500.000 Kz.", system: "És um consultor de negócios especializado no mercado angolano. Crias planos de negócio completos com: Sumário Executivo, Análise de Mercado, Modelo de Negócio, Plano Financeiro, Marketing e Operações." },
      { id: "pesquisaacademica", icon: "🎓", title: "Pesquisa Académica", desc: "Trabalhos, monografias e pesquisas universitárias", preco: 2000, cor: "#48CAE4", gradient: "linear-gradient(135deg,#48CAE4,#00C9FF)", placeholder: "Ex: Faça uma pesquisa sobre o impacto das redes sociais no comportamento dos jovens angolanos.", system: "És um especialista académico com vasta experiência em pesquisa universitária. Produces trabalhos académicos rigorosos, bem referenciados e estruturados segundo normas académicas." },
    ]
  },
  {
    id: "traducao", label: "🌍 Tradução", cor: "#A8FF78",
    servicos: [
      { id: "traducaopt", icon: "🇵🇹", title: "Português ↔ Inglês", desc: "Tradução precisa entre PT e EN", preco: 2000, cor: "#A8FF78", gradient: "linear-gradient(135deg,#A8FF78,#78FFD6)", placeholder: "Ex: Traduza para inglês: 'Angola é um país com enorme potencial económico e recursos naturais abundantes.'", system: "És um tradutor profissional PT/EN. Traduz com precisão absoluta mantendo estilo, tom e contexto." },
      { id: "traducaofr", icon: "🇫🇷", title: "Português ↔ Francês", desc: "Tradução precisa entre PT e FR", preco: 2500, cor: "#78FFD6", gradient: "linear-gradient(135deg,#78FFD6,#A8FF78)", placeholder: "Ex: Traduza para francês: 'Bem-vindo à nossa empresa. Temos o prazer de apresentar os nossos serviços.'", system: "És um tradutor profissional PT/FR. Traduz com precisão mantendo estilo e contexto." },
      { id: "traducaoes", icon: "🇪🇸", title: "Português ↔ Espanhol", desc: "Tradução precisa entre PT e ES", preco: 2000, cor: "#A8FF78", gradient: "linear-gradient(135deg,#A8FF78,#78FF96)", placeholder: "Ex: Traduza para espanhol: 'Angola tem uma das economias de maior crescimento em África.'", system: "És um tradutor profissional PT/ES. Traduz com precisão mantendo estilo e contexto." },
      { id: "traducaodoc", icon: "📋", title: "Tradução de Documentos", desc: "Contratos, certidões e documentos oficiais", preco: 4000, cor: "#56FFB0", gradient: "linear-gradient(135deg,#56FFB0,#A8FF78)", placeholder: "Ex: Traduza este contrato do inglês para português: [cole o texto aqui]", system: "És um tradutor jurídico especializado em documentos formais. Traduz com precisão técnica mantendo terminologia jurídica correcta." },
    ]
  },
  {
    id: "criatividade", label: "🎨 Criatividade", cor: "#C77DFF",
    servicos: [
      { id: "storytelling", icon: "📖", title: "Histórias & Contos", desc: "Histórias criativas, contos e narrativas envolventes", preco: 2000, cor: "#C77DFF", gradient: "linear-gradient(135deg,#C77DFF,#FFB347)", placeholder: "Ex: Escreva um conto angolano de 500 palavras sobre um jovem que descobre um tesouro em Luanda.", system: "És um escritor criativo especializado em literatura angolana. Crias histórias envolventes com personagens ricos e narrativas que capturam a essência de Angola." },
      { id: "nomes", icon: "💡", title: "Nomes & Slogans", desc: "Nomes criativos para empresas, produtos e marcas", preco: 1500, cor: "#E040FB", gradient: "linear-gradient(135deg,#E040FB,#C77DFF)", placeholder: "Ex: Crie 10 nomes criativos para uma empresa de entrega de comida em Luanda, com slogan para cada um.", system: "És um especialista em branding e naming criativo. Crias nomes memoráveis e adequados ao mercado angolano, com slogans impactantes." },
      { id: "poesia", icon: "🌸", title: "Poesia & Letras", desc: "Poemas, letras de músicas e textos criativos", preco: 1500, cor: "#BA68C8", gradient: "linear-gradient(135deg,#BA68C8,#C77DFF)", placeholder: "Ex: Escreva um poema sobre Luanda ao anoitecer, com 4 estrofes de 4 versos.", system: "És um poeta e escritor criativo com influência da literatura angolana. Crias poemas belos com ritmo, rima e emoção genuína." },
      { id: "roteiro", icon: "🎬", title: "Roteiros & Scripts", desc: "Roteiros para vídeos, anúncios e apresentações", preco: 3000, cor: "#9C27B0", gradient: "linear-gradient(135deg,#9C27B0,#C77DFF)", placeholder: "Ex: Crie um roteiro de 2 minutos para um anúncio publicitário de uma loja de roupa em Angola.", system: "És um roteirista profissional especializado em conteúdo digital e publicidade para o público angolano." },
    ]
  },
  {
    id: "negocios", label: "💼 Negócios", cor: "#FFD700",
    servicos: [
      { id: "ideias", icon: "💡", title: "Ideias de Negócio", desc: "Ideias lucrativas adaptadas ao mercado angolano", preco: 1000, cor: "#FFD700", gradient: "linear-gradient(135deg,#FFD700,#FFB347)", placeholder: "Ex: Dê-me 5 ideias de negócio inovadoras para começar em Luanda com menos de 200.000 Kz.", system: "És um consultor de negócios especializado no mercado angolano. Generates ideias práticas, lucrativas e adaptadas à realidade económica de Angola." },
      { id: "marketing", icon: "📣", title: "Estratégia de Marketing", desc: "Estratégias de marketing digital para o seu negócio", preco: 3500, cor: "#FFC107", gradient: "linear-gradient(135deg,#FFC107,#FFD700)", placeholder: "Ex: Crie uma estratégia de marketing digital de 3 meses para uma loja de calçado em Luanda.", system: "És um especialista em marketing digital com foco no mercado angolano. Crias estratégias completas com redes sociais, conteúdo e métricas." },
      { id: "proposta", icon: "🤝", title: "Propostas Comerciais", desc: "Propostas e orçamentos profissionais que fecham negócios", preco: 2500, cor: "#FFB300", gradient: "linear-gradient(135deg,#FFB300,#FFD700)", placeholder: "Ex: Crie uma proposta comercial para oferecer serviços de limpeza a empresas em Luanda.", system: "És um especialista em vendas e propostas comerciais. Crias propostas profissionais e persuasivas que convencem clientes." },
    ]
  },
  {
    id: "ia", label: "⚡ IA Geral", cor: "#FF6B35",
    servicos: [
      { id: "iaGeral", icon: "⚡", title: "IA Geral", desc: "Qualquer pergunta, qualquer resposta — sem limites", preco: 800, cor: "#FF6B35", gradient: "linear-gradient(135deg,#FF6B35,#FFB347)", placeholder: "Ex: Explique-me como funciona o Bitcoin de forma simples.", system: "És um assistente inteligente e versátil especializado no contexto angolano. Responds de forma útil, prática e criativa. Sempre em português." },
      { id: "conselhos", icon: "🧠", title: "Conselhos & Orientação", desc: "Orientação profissional, pessoal e académica", preco: 1000, cor: "#FF8C35", gradient: "linear-gradient(135deg,#FF8C35,#FFB347)", placeholder: "Ex: Preciso de conselhos sobre como gerir melhor o meu tempo entre o trabalho e os estudos.", system: "És um coach e mentor experiente. Ofereces conselhos práticos, equilibrados e motivadores adaptados à realidade angolana." },
      { id: "juridico", icon: "⚖️", title: "Informação Jurídica", desc: "Informações sobre leis e direitos em Angola", preco: 2000, cor: "#FF5722", gradient: "linear-gradient(135deg,#FF5722,#FF6B35)", placeholder: "Ex: Quais são os direitos de um trabalhador angolano em caso de despedimento sem justa causa?", system: "Forneces informações jurídicas gerais sobre a legislação angolana de forma clara. Nota sempre que para casos específicos deve consultar um advogado." },
    ]
  },
];

const TODOS_SERVICOS = CATEGORIAS.flatMap(c => c.servicos);

const OWNER = { whatsapp: "244954989383", whatsappDisplay: "+244 954 989 383" };

const MULTICAIXA = {
  banco: "Banco BFA",
  iban: "AO06 0006 0000 2104 9915 3013 7",
  titular: "Júlio dos Santos Alberto",
};

const PAGAMENTOS = [
  { id: "multicaixa", label: "Multicaixa (Transferência bancária)", icon: "🏦", cor: "#FF6B35" },
  { id: "express", label: "Multicaixa Express — 945 352 893", icon: "💳", cor: "#FF6B35" },
];

const STATS = [
  { valor: "15+", label: "Serviços" },
  { valor: "1.2K", label: "Utilizadores" },
  { valor: "98%", label: "Satisfação" },
  { valor: "24/7", label: "Disponível" },
];

const TESTEMUNHOS = [
  { nome: "Ana M.", cidade: "Luanda", texto: "O meu CV ficou incrível! Consegui emprego na semana seguinte.", stars: 5, servico: "CV Profissional" },
  { nome: "Carlos P.", cidade: "Benguela", texto: "Plano de negócio completo em minutos. Impressionante!", stars: 5, servico: "Plano de Negócio" },
  { nome: "Sofia K.", cidade: "Huambo", texto: "Traduzi um contrato importante do inglês. Perfeito!", stars: 5, servico: "Tradução" },
];

function Header({ onHome, showBack, backLabel, onBack }) {
  return (
    <header style={st.header}>
      <div style={st.logo} onClick={onHome}>
        <div style={st.logoMark}>Z</div>
        <span style={st.logoName}>Zela <span style={{ color: "#FF6B35" }}>IA</span></span>
      </div>
      {showBack
        ? <button style={st.back} onClick={onBack}>{backLabel || "← Voltar"}</button>
        : <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={st.liveDot} />
            <span style={{ color: "#555", fontSize: 11 }}>Online</span>
          </div>
      }
    </header>
  );
}

function Spinner({ color }) {
  return <div style={{ width: 32, height: 32, border: `3px solid #1a1a2e`, borderTopColor: color, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />;
}

export default function App() {
  const [tela, setTela] = useState("landing");
  const [catAtiva, setCatAtiva] = useState("escrita");
  const [servicoId, setServicoId] = useState(null);
  const [pedido, setPedido] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pagamento, setPagamento] = useState("multicaixa");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [count, setCount] = useState(1247);
  const [codigo, setCodigo] = useState("");
  const [codigoInput, setCodigoInput] = useState("");
  const [codigoErro, setCodigoErro] = useState(false);
  const [pedidoId, setPedidoId] = useState("");
  const [busca, setBusca] = useState("");
  const [testi, setTesti] = useState(0);

  const sv = TODOS_SERVICOS.find(s => s.id === servicoId);

  useEffect(() => { const t = setInterval(() => setCount(n => n + Math.floor(Math.random() * 2)), 12000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setTesti(n => (n + 1) % 3), 4000); return () => clearInterval(t); }, []);

  const servicosFiltrados = busca.trim()
    ? TODOS_SERVICOS.filter(s => s.title.toLowerCase().includes(busca.toLowerCase()) || s.desc.toLowerCase().includes(busca.toLowerCase()))
    : CATEGORIAS.find(c => c.id === catAtiva)?.servicos || [];

  function irParaPagamento() {
    const c = Math.floor(1000 + Math.random() * 9000).toString();
    const pid = "ZL" + Date.now().toString().slice(-6);
    setCodigo(c); setPedidoId(pid); setCodigoInput(""); setCodigoErro(false);
    setTela("pagamento");
  }

  function abrirWhatsApp() {
    const pag = PAGAMENTOS.find(p => p.id === pagamento);
    const msg = `Olá! 👋 Fiz o pagamento no *Zela IA* e quero o meu código.\n\n📋 *Pedido:*\n• Nome: ${nome}\n• Serviço: ${sv?.title}\n• Valor: ${sv?.preco.toLocaleString("pt-AO")} Kz\n• Pagamento: ${pag?.label}\n• Ref: ZELA-${pedidoId}\n• Tel: ${telefone}\n\nComprovativo em anexo. Obrigado! 🙏`;
    window.open(`https://wa.me/${OWNER.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  async function verificarCodigo() {
    if (codigoInput.trim() === codigo) {
      setLoading(true); setTela("resultado"); setResposta("");
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: sv.system, messages: [{ role: "user", content: pedido }] }),
        });
        const data = await res.json();
        setResposta(data.content?.map(c => c.text || "").join("") || "Erro ao obter resposta.");
      } catch { setResposta("Erro de conexão. Tente novamente."); }
      setLoading(false);
    } else { setCodigoErro(true); setTimeout(() => setCodigoErro(false), 2500); }
  }

  function reset() { setTela("landing"); setServicoId(null); setPedido(""); setNome(""); setTelefone(""); setResposta(""); setCodigo(""); setCodigoInput(""); setPedidoId(""); setBusca(""); }
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{background:#070710;overflow-x:hidden}
    @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(255,107,53,.3)}50%{box-shadow:0 0 50px rgba(255,107,53,.6)}}
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.9)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
    @keyframes shake{0%,100%{transform:translateX(0)}25%,75%{transform:translateX(-5px)}50%{transform:translateX(5px)}}
    @keyframes bounce{0%,80%,100%{transform:scale(.5);opacity:.4}40%{transform:scale(1);opacity:1}}
    ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#070710}::-webkit-scrollbar-thumb{background:#1a1a2e;border-radius:2px}
    textarea:focus,input:focus{outline:none!important;border-color:#FF6B3566!important}
    button{cursor:pointer;border:none;background:none;font-family:inherit}
    .card{transition:transform .2s,box-shadow .2s,border-color .2s}
    .card:hover{transform:translateY(-4px);box-shadow:0 24px 48px rgba(0,0,0,.5)}
    .shine{position:relative;overflow:hidden}
    .shine::after{content:'';position:absolute;top:-50%;left:-60%;width:30%;height:200%;background:rgba(255,255,255,.1);transform:skewX(-20deg);transition:left .6s}
    .shine:hover::after{left:130%}
    .shake{animation:shake .4s ease}
    .tab-btn{transition:all .2s}
  `;

  if (tela === "landing") return (
    <div style={st.root}>
      <style>{css}</style>
      {[[280,"#FF6B35","0%","0%",6],[220,"#C77DFF","55%","60%",8],[180,"#00C9FF","70%","0%",7],[160,"#A8FF78","0%","70%",9]].map(([sz,c,t,l,dur],i)=>(
        <div key={i} style={{position:"fixed",width:sz,height:sz,borderRadius:"50%",background:c+"08",top:t,left:l,filter:"blur(80px)",animation:`float ${dur}s ${i}s ease-in-out infinite`,pointerEvents:"none",zIndex:0}}/>
      ))}
      <Header onHome={reset}/>
      <section style={{padding:"44px 22px 0",position:"relative",zIndex:1,animation:"fadeUp .5s ease both"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#FF6B3512",border:"1px solid #FF6B3528",borderRadius:20,padding:"5px 12px",fontSize:11,color:"#FF6B35",fontWeight:700,letterSpacing:.5,marginBottom:18}}>
          🚀 A PLATAFORMA Nº1 DE IA EM ANGOLA
        </div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:36,lineHeight:1.1,color:"#F0EDE8",marginBottom:14}}>
          15+ Serviços de IA<br/>
          <span style={{background:"linear-gradient(135deg,#FF6B35,#FFB347)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>em Kwanzas</span>
        </h1>
        <p style={{color:"#666",fontSize:14,lineHeight:1.65,marginBottom:24,maxWidth:340}}>CVs, planos de negócio, traduções, redação, marketing e muito mais — tudo entregue por IA avançada. Pague via Multicaixa ou Multicaixa Express.</p>
        <div style={{display:"flex",gap:10,marginBottom:28,flexWrap:"wrap"}}>
          <button className="shine" style={{...st.btnMain,padding:"13px 22px",fontSize:15,animation:"glow 3s ease infinite"}} onClick={()=>setTela("servicos")}>Ver todos os serviços →</button>
          <div style={{display:"flex",alignItems:"center",gap:6,background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:12,padding:"13px 16px"}}>
            <span style={{color:"#A8FF78",fontSize:14}}>✓</span>
            <span style={{color:"#666",fontSize:13}}>Sem cadastro</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:32}}>
          {STATS.map(s=>(
            <div key={s.label} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:10,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:"#FF6B35"}}>{s.valor}</div>
              <div style={{color:"#555",fontSize:10,marginTop:3}}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{overflow:"hidden",borderTop:"1px solid #13131f",borderBottom:"1px solid #13131f",padding:"11px 0",background:"#0a0a12",position:"relative",zIndex:1}}>
        <div style={{display:"flex",width:"max-content",animation:"marquee 25s linear infinite"}}>
          {[...Array(2)].map((_,i)=>(
            <div key={i} style={{display:"flex",gap:32,paddingRight:32,flexShrink:0}}>
              {["CV Profissional","Plano de Negócio","Tradução PT/EN","Posts Sociais","Análise de Mercado","Discursos","Cartas Formais","Roteiros","Poesia","Estratégia Marketing","Pesquisa Académica","Ideias de Negócio"].map(t=>(
                <span key={t} style={{color:"#252535",fontSize:12,whiteSpace:"nowrap",fontWeight:600}}>✦ {t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section style={{padding:"36px 22px 0",position:"relative",zIndex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div>
            <div style={{color:"#FF6B35",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Populares</div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:"#F0EDE8"}}>Serviços em destaque</h2>
          </div>
          <button style={{color:"#FF6B35",fontSize:13,fontWeight:600}} onClick={()=>setTela("servicos")}>Ver todos →</button>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[TODOS_SERVICOS[2],TODOS_SERVICOS[6],TODOS_SERVICOS[0],TODOS_SERVICOS[13]].map(s=>(
            <div key={s.id} className="card" style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",position:"relative",overflow:"hidden"}} onClick={()=>{setServicoId(s.id);setTela("pedido")}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:s.gradient}}/>
              <div style={{width:42,height:42,background:s.cor+"18",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:"#F0EDE8"}}>{s.title}</div>
                <div style={{color:"#555",fontSize:12,marginTop:2}}>{s.desc}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{color:s.cor,fontWeight:800,fontSize:15,fontFamily:"'Syne',sans-serif"}}>{s.preco.toLocaleString("pt-AO")} Kz</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"36px 22px 0",position:"relative",zIndex:1}}>
        <div style={{color:"#FF6B35",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Pagamentos</div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:"#F0EDE8",marginBottom:16}}>2 formas de pagar</h2>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {PAGAMENTOS.map(p=>(
            <div key={p.id} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:22}}>{p.icon}</span>
              <span style={{color:"#D0CCC6",fontWeight:500,fontSize:14}}>{p.label}</span>
              <span style={{marginLeft:"auto",color:"#A8FF78",fontSize:12,fontWeight:600}}>✓ Disponível</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"36px 22px 0",position:"relative",zIndex:1}}>
        <div style={{color:"#FF6B35",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Processo</div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:"#F0EDE8",marginBottom:16}}>Como funciona</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {[{n:"01",icon:"🎯",t:"Escolha",d:"Seleccione entre 15+ serviços",c:"#FF6B35"},{n:"02",icon:"💬",t:"Descreva",d:"Explique o que precisa",c:"#00C9FF"},{n:"03",icon:"💳",t:"Pague",d:"Multicaixa ou Express",c:"#A8FF78"},{n:"04",icon:"✨",t:"Receba",d:"Resultado em segundos",c:"#C77DFF"}].map(p=>(
            <div key={p.n} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:12,padding:"14px"}}>
              <span style={{color:p.c,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:9,letterSpacing:2,border:`1px solid ${p.c}30`,borderRadius:4,padding:"2px 6px"}}>{p.n}</span>
              <div style={{fontSize:20,margin:"8px 0 6px"}}>{p.icon}</div>
              <div style={{fontWeight:700,fontSize:13,color:"#F0EDE8",marginBottom:3}}>{p.t}</div>
              <div style={{color:"#555",fontSize:11,lineHeight:1.4}}>{p.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{padding:"36px 22px 0",position:"relative",zIndex:1}}>
        <div style={{color:"#FF6B35",fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>Clientes</div>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:"#F0EDE8",marginBottom:16}}>O que dizem de nós</h2>
        <div key={testi} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:16,padding:20,animation:"slideIn .4s ease both"}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
            <span style={{color:"#FFD700",fontSize:12}}>{"★".repeat(5)}</span>
            <span style={{background:"#FF6B3515",color:"#FF6B35",fontSize:10,fontWeight:600,padding:"3px 8px",borderRadius:20,border:"1px solid #FF6B3530"}}>{TESTEMUNHOS[testi].servico}</span>
          </div>
          <p style={{color:"#C0BCB6",fontSize:14,lineHeight:1.65,marginBottom:14}}>"{TESTEMUNHOS[testi].texto}"</p>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,background:"linear-gradient(135deg,#FF6B35,#FFB347)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:14}}>{TESTEMUNHOS[testi].nome[0]}</div>
            <div>
              <div style={{color:"#F0EDE8",fontWeight:600,fontSize:13}}>{TESTEMUNHOS[testi].nome}</div>
              <div style={{color:"#555",fontSize:11}}>📍 {TESTEMUNHOS[testi].cidade}</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:12}}>
          {TESTEMUNHOS.map((_,i)=><div key={i} onClick={()=>setTesti(i)} style={{width:7,height:7,borderRadius:"50%",background:i===testi?"#FF6B35":"#1a1a2e",cursor:"pointer",transition:"background .3s"}}/>)}
        </div>
      </section>

      <section style={{padding:"36px 22px 0",position:"relative",zIndex:1}}>
        <div style={{background:"linear-gradient(135deg,#FF6B3515,#C77DFF10)",border:"1px solid #FF6B3525",borderRadius:18,padding:"32px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:200,height:200,background:"radial-gradient(#FF6B3515,transparent 70%)",pointerEvents:"none"}}/>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:"#F0EDE8",marginBottom:8}}>Comece agora!</h2>
          <p style={{color:"#555",fontSize:13,marginBottom:20,lineHeight:1.6}}>Mais de {count.toLocaleString()} angolanos já usam a Zela IA.</p>
          <button className="shine" style={{...st.btnMain,animation:"glow 3s ease infinite",width:"100%",justifyContent:"center",padding:"14px"}} onClick={()=>setTela("servicos")}>Ver todos os 15+ serviços →</button>
        </div>
      </section>

      <a href={`https://wa.me/${OWNER.whatsapp}`} target="_blank" style={{position:"fixed",bottom:24,right:20,width:52,height:52,background:"linear-gradient(135deg,#25D366,#128C7E)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,textDecoration:"none",zIndex:999,boxShadow:"0 4px 20px rgba(37,211,102,.4)",animation:"float 3s ease-in-out infinite"}}>💬</a>

      <footer style={{padding:"28px 22px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,borderTop:"1px solid #13131f",marginTop:36,position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{...st.logoMark,width:24,height:24,fontSize:12}}>Z</div>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:15,color:"#F0EDE8"}}>Zela <span style={{color:"#FF6B35"}}>IA</span></span>
        </div>
        <span style={{color:"#2a2a3a",fontSize:11}}>🇦🇴 Feito para Angola · zela-ia.vercel.app</span>
      </footer>
    </div>
  );

  if (tela === "servicos") return (
    <div style={st.root}><style>{css}</style>
      <Header onHome={reset} showBack backLabel="← Início" onBack={reset}/>
      <div style={{...st.page,animation:"fadeUp .4s ease both"}}>
        <h2 style={{...st.h2,marginBottom:16}}>15+ Serviços de IA</h2>
        <div style={{position:"relative",marginBottom:20}}>
          <span style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#444",fontSize:16}}>🔎</span>
          <input value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Pesquisar serviço..." style={{...st.input,paddingLeft:42,fontSize:14}}/>
        </div>
        {!busca.trim() && (
          <div style={{display:"flex",gap:6,marginBottom:20,overflowX:"auto",paddingBottom:4}}>
            {CATEGORIAS.map(c=>(
              <button key={c.id} className="tab-btn" onClick={()=>setCatAtiva(c.id)}
                style={{background:catAtiva===c.id?c.cor+"22":"#0d0d1a",border:`1px solid ${catAtiva===c.id?c.cor+"44":"#1a1a2e"}`,borderRadius:20,padding:"7px 14px",fontSize:12,fontWeight:600,color:catAtiva===c.id?c.cor:"#555",whiteSpace:"nowrap",flexShrink:0}}>
                {c.label}
              </button>
            ))}
          </div>
        )}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {servicosFiltrados.map(s=>(
            <div key={s.id} className="card" style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",position:"relative",overflow:"hidden"}} onClick={()=>{setServicoId(s.id);setTela("pedido")}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:s.gradient}}/>
              <div style={{width:44,height:44,background:s.cor+"15",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{s.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:"#F0EDE8"}}>{s.title}</div>
                <div style={{color:"#555",fontSize:12,marginTop:2,lineHeight:1.4}}>{s.desc}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{color:s.cor,fontWeight:800,fontSize:15,fontFamily:"'Syne',sans-serif"}}>{s.preco.toLocaleString("pt-AO")} Kz</div>
                <div style={{color:"#333",fontSize:10,marginTop:2}}>/ tarefa</div>
              </div>
            </div>
          ))}
          {servicosFiltrados.length===0 && (
            <div style={{textAlign:"center",padding:"40px 0",color:"#444"}}>
              <div style={{fontSize:32,marginBottom:8}}>🔍</div>
              <div style={{fontSize:14}}>Nenhum serviço encontrado</div>
            </div>
          )}
        </div>
      </div>
      <a href={`https://wa.me/${OWNER.whatsapp}`} target="_blank" style={{position:"fixed",bottom:24,right:20,width:52,height:52,background:"linear-gradient(135deg,#25D366,#128C7E)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,textDecoration:"none",zIndex:999,boxShadow:"0 4px 20px rgba(37,211,102,.4)"}}>💬</a>
    </div>
  );if (tela === "pedido" && sv) return (
    <div style={st.root}><style>{css}</style>
      <Header onHome={reset} showBack backLabel="← Serviços" onBack={()=>setTela("servicos")}/>
      <div style={{...st.page,animation:"fadeUp .4s ease both"}}>
        <div style={{background:sv.gradient,borderRadius:14,padding:"16px",display:"flex",gap:12,alignItems:"center",marginBottom:22}}>
          <div style={{width:48,height:48,background:"rgba(255,255,255,.2)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{sv.icon}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#fff"}}>{sv.title}</div>
            <div style={{color:"rgba(255,255,255,.75)",fontSize:12}}>{sv.desc}</div>
          </div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:17,color:"#fff",flexShrink:0}}>{sv.preco.toLocaleString("pt-AO")} Kz</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <label style={st.label}>Nome completo</label>
            <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Ex: Maria da Silva" style={st.input}/>
          </div>
          <div>
            <label style={st.label}>Número WhatsApp</label>
            <input value={telefone} onChange={e=>setTelefone(e.target.value)} placeholder="Ex: 9XX XXX XXX" style={st.input}/>
          </div>
          <div>
            <label style={st.label}>Método de pagamento</label>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {PAGAMENTOS.map(p=>(
                <div key={p.id} onClick={()=>setPagamento(p.id)}
                  style={{background:pagamento===p.id?"#FF6B3512":"#0d0d1a",border:`1px solid ${pagamento===p.id?"#FF6B3544":"#1a1a2e"}`,borderRadius:10,padding:"11px 14px",display:"flex",alignItems:"center",gap:10,cursor:"pointer",transition:"all .2s"}}>
                  <span style={{fontSize:18}}>{p.icon}</span>
                  <span style={{color:pagamento===p.id?"#FF6B35":"#888",fontWeight:500,fontSize:14,flex:1}}>{p.label}</span>
                  {pagamento===p.id && <span style={{color:"#FF6B35",fontSize:16}}>●</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label style={st.label}>Descreva o pedido detalhadamente</label>
            <textarea value={pedido} onChange={e=>setPedido(e.target.value)} placeholder={sv.placeholder} style={{...st.input,resize:"vertical",minHeight:120,lineHeight:1.65}} rows={5}/>
            <div style={{color:"#333",fontSize:11,marginTop:5,textAlign:"right"}}>{pedido.length} caracteres</div>
          </div>
          <div style={{background:"#FFD70010",border:"1px solid #FFD70022",borderRadius:10,padding:"11px 13px",display:"flex",gap:8}}>
            <span>💡</span>
            <span style={{color:"#999",fontSize:12,lineHeight:1.5}}><strong style={{color:"#FFD700"}}>Dica:</strong> Quanto mais detalhar o pedido, melhor o resultado!</span>
          </div>
          <button className="shine"
            style={{...st.btnMain,background:(!pedido.trim()||!nome.trim()||!telefone.trim())?"#1a1a2e":sv.gradient,color:(!pedido.trim()||!nome.trim()||!telefone.trim())?"#444":"#fff",width:"100%",padding:"15px",fontSize:15,justifyContent:"center",cursor:(!pedido.trim()||!nome.trim()||!telefone.trim())?"not-allowed":"pointer"}}
            disabled={!pedido.trim()||!nome.trim()||!telefone.trim()} onClick={irParaPagamento}>
            Confirmar pedido →
          </button>
        </div>
      </div>
    </div>
  );

  if (tela === "pagamento" && sv) return (
    <div style={st.root}><style>{css}</style>
      <Header onHome={reset} showBack backLabel="← Editar" onBack={()=>setTela("pedido")}/>
      <div style={{...st.page,animation:"fadeUp .4s ease both"}}>
        <div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:24}}>
          {[{n:1,l:"Pague"},{n:2,l:"WhatsApp"},{n:3,l:"Código"}].map((s,i)=>(
            <div key={s.n} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B35,#FFB347)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#fff"}}>{s.n}</div>
                <span style={{color:"#FF6B35",fontSize:9,fontWeight:700}}>{s.l}</span>
              </div>
              {i<2 && <div style={{width:20,height:1,background:"#1a1a2e",marginBottom:14}}/>}
            </div>
          ))}
        </div>

        <div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:14,padding:18,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <span style={{color:"#FF6B35",fontSize:11,fontWeight:700,letterSpacing:1}}>PASSO 1 · PAGAMENTO</span>
            <span style={{color:"#A8FF78",fontSize:11}}>🔒 Seguro</span>
          </div>
          {pagamento === "multicaixa" ? (
            <>
              {[{l:"Banco",v:MULTICAIXA.banco},{l:"Titular",v:MULTICAIXA.titular},{l:"IBAN",v:MULTICAIXA.iban,mono:true},{l:"Referência",v:`ZELA-${pedidoId}`}].map(r=>(
                <div key={r.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #13131f"}}>
                  <span style={{color:"#555",fontSize:12,flexShrink:0}}>{r.l}</span>
                  <span style={{color:"#D0CCC6",fontWeight:500,fontSize:11,fontFamily:r.mono?"monospace":"inherit",letterSpacing:r.mono?.5:0,textAlign:"right",maxWidth:"60%",wordBreak:"break-all"}}>{r.v}</span>
                </div>
              ))}
            </>
          ) : (
            <>
              {[{l:"Número Express",v:"945 352 893"},{l:"Titular",v:MULTICAIXA.titular},{l:"Referência",v:`ZELA-${pedidoId}`}].map(r=>(
                <div key={r.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:"1px solid #13131f"}}>
                  <span style={{color:"#555",fontSize:12,flexShrink:0}}>{r.l}</span>
                  <span style={{color:"#D0CCC6",fontWeight:500,fontSize:13,textAlign:"right"}}>{r.v}</span>
                </div>
              ))}
            </>
          )}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,marginTop:4}}>
            <span style={{color:"#555",fontSize:12}}>Valor total</span>
            <span style={{color:sv.cor,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22}}>{sv.preco.toLocaleString("pt-AO")} Kz</span>
          </div>
        </div>

        <div style={{background:"#0d1a0d",border:"1px solid #25D36622",borderRadius:14,padding:16,marginBottom:12}}>
          <div style={{color:"#25D366",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:10}}>PASSO 2 · ENVIAR COMPROVATIVO</div>
          <p style={{color:"#aaa",fontSize:12,lineHeight:1.6,marginBottom:12}}>Após pagar, clique abaixo e envie o comprovativo. Receberá o <strong style={{color:"#fff"}}>código de 4 dígitos</strong> em resposta.</p>
          <button className="shine" style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,padding:"12px",borderRadius:10,border:"none",cursor:"pointer",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={abrirWhatsApp}>
            💬 Enviar comprovativo no WhatsApp
          </button>
          <div style={{color:"#555",fontSize:10,textAlign:"center",marginTop:6}}>{OWNER.whatsappDisplay}</div>
        </div>

        <div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:14,padding:16,marginBottom:12}}>
          <div style={{color:"#C77DFF",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:10}}>PASSO 3 · INSERIR CÓDIGO</div>
          <input value={codigoInput} onChange={e=>setCodigoInput(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="0000" maxLength={4} className={codigoErro?"shake":""} style={{...st.input,fontSize:26,fontWeight:800,textAlign:"center",letterSpacing:14,fontFamily:"'Syne',sans-serif",padding:"13px",borderColor:codigoErro?"#ff4444":"#1a1a2e",color:codigoErro?"#ff4444":"#F0EDE8"}}/>
          {codigoErro && <div style={{color:"#ff4444",fontSize:12,textAlign:"center",marginTop:6}}>❌ Código incorrecto. Tente novamente.</div>}
        </div>

        <button className="shine" style={{...st.btnMain,background:codigoInput.length===4?"linear-gradient(135deg,#C77DFF,#FFB347)":"#1a1a2e",color:codigoInput.length===4?"#fff":"#444",width:"100%",padding:"15px",fontSize:15,justifyContent:"center",cursor:codigoInput.length===4?"pointer":"not-allowed"}}
          disabled={codigoInput.length!==4} onClick={verificarCodigo}>
          ✅ Confirmar e obter resultado
        </button>
      </div>
    </div>
  );

  if (tela === "resultado" && sv) return (
    <div style={st.root}><style>{css}</style>
      <Header onHome={reset} showBack={!loading} backLabel="+ Novo pedido" onBack={reset}/>
      <div style={{...st.page,animation:"fadeUp .4s ease both"}}>
        <div style={{background:sv.gradient,borderRadius:14,padding:"13px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <span style={{fontSize:22}}>{sv.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14,color:"#fff"}}>{sv.title}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.75)"}}>{nome} · {sv.preco.toLocaleString("pt-AO")} Kz</div>
          </div>
          {!loading && resposta && (
            <button onClick={()=>{navigator.clipboard.writeText(resposta);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{background:"rgba(255,255,255,.2)",color:"#fff",borderRadius:8,padding:"5px 12px",fontSize:11,border:"none",cursor:"pointer",fontWeight:600,flexShrink:0}}>
              {copiado?"✓ Copiado!":"📋 Copiar"}
            </button>
          )}
        </div>
        <div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:10,padding:12,marginBottom:12}}>
          <span style={{color:"#444",fontSize:10,display:"block",marginBottom:4}}>Pedido:</span>
          <p style={{color:"#777",fontSize:13,lineHeight:1.5}}>{pedido}</p>
        </div>
        <div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:14,overflow:"hidden",marginBottom:18}}>
          <div style={{padding:"11px 16px",borderBottom:"1px solid #13131f",background:"#0a0a12",display:"flex",alignItems:"center",gap:8}}>
            {loading
              ? <><div style={{width:6,height:6,borderRadius:"50%",background:sv.cor,animation:"bounce 1.2s 0s infinite ease-in-out"}}/><div style={{width:6,height:6,borderRadius:"50%",background:sv.cor,animation:"bounce 1.2s .2s infinite ease-in-out"}}/><div style={{width:6,height:6,borderRadius:"50%",background:sv.cor,animation:"bounce 1.2s .4s infinite ease-in-out"}}/><span style={{color:"#555",fontSize:12,marginLeft:4}}>A IA está a trabalhar...</span></>
              : <span style={{color:"#A8FF78",fontSize:12,fontWeight:600}}>✅ Resultado gerado com sucesso</span>
            }
          </div>
          <div style={{padding:16,minHeight:140}}>
            {loading
              ? <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 0"}}><Spinner color={sv.cor}/><p style={{color:"#444",fontSize:12,marginTop:12,textAlign:"center"}}>Processando com IA avançada...</p></div>
              : <pre style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,lineHeight:1.75,color:"#C0BCB6",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{resposta}</pre>
            }
          </div>
        </div>
        {!loading && (
          <div style={{display:"flex",gap:8}}>
            <button className="shine" style={{...st.btnMain,background:sv.gradient,flex:1,padding:"13px",justifyContent:"center",fontSize:14}} onClick={reset}>+ Novo pedido</button>
            <button style={{background:"transparent",border:"1px solid #1a1a2e",color:"#666",fontSize:13,padding:"13px",borderRadius:12,cursor:"pointer",flex:1,fontFamily:"'Plus Jakarta Sans',sans-serif"}} onClick={()=>{setTela("pedido");setResposta("")}}>🔄 Refazer</button>
          </div>
        )}
      </div>
      <a href={`https://wa.me/${OWNER.whatsapp}`} target="_blank" style={{position:"fixed",bottom:24,right:20,width:52,height:52,background:"linear-gradient(135deg,#25D366,#128C7E)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,textDecoration:"none",zIndex:999,boxShadow:"0 4px 20px rgba(37,211,102,.4)"}}>💬</a>
    </div>
  );

  return null;
}

const st = {
  root:{minHeight:"100vh",background:"#070710",color:"#F0EDE8",fontFamily:"'Plus Jakarta Sans',sans-serif",maxWidth:480,margin:"0 auto",position:"relative",overflowX:"hidden"},
  header:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderBottom:"1px solid #0f0f1a",position:"sticky",top:0,background:"rgba(7,7,16,0.94)",backdropFilter:"blur(20px)",zIndex:100},
  logo:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},
  logoMark:{width:30,height:30,background:"linear-gradient(135deg,#FF6B35,#FFB347)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:800,color:"#fff",fontFamily:"'Syne',sans-serif"},
  logoName:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#F0EDE8"},
  liveDot:{width:7,height:7,borderRadius:"50%",background:"#A8FF78",animation:"pulse 2s ease infinite"},
  back:{color:"#555",fontSize:13,cursor:"pointer"},
  page:{padding:"24px 22px 80px",position:"relative",zIndex:1},
  h2:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:"#F0EDE8",lineHeight:1.2},
  btnMain:{background:"linear-gradient(135deg,#FF6B35,#FFB347)",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,padding:"12px 22px",borderRadius:12,border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,letterSpacing:.3},
  label:{color:"#888",fontSize:12,fontWeight:600,display:"block",marginBottom:6},
  input:{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:10,padding:"12px 14px",color:"#F0EDE8",fontSize:14,fontFamily:"'Plus Jakarta Sans',sans-serif",width:"100%",transition:"border-color .2s"},
};
