import { useState, useEffect } from "react";

const SERVICES = [
  {
    id: "redacao", icon: "✍️", title: "Redação & Textos", tagline: "Textos que impressionam",
    desc: "Artigos, posts, cartas, discursos, emails profissionais e muito mais.",
    preco: 1500, cor: "#FF6B35", gradient: "linear-gradient(135deg,#FF6B35,#FFB347)",
    placeholder: "Ex: Escreva um artigo de 400 palavras sobre empreendedorismo em Angola para jovens.",
    usos: ["Artigos & Blogs", "Cartas formais", "Posts sociais", "Discursos"],
    system: "És um especialista em redação criativa e profissional em português angolano. Escreve textos de alta qualidade, com estrutura clara, linguagem envolvente e adequada ao contexto angolano. Entrega sempre um resultado completo e impressionante.",
  },
  {
    id: "resumo", icon: "🔍", title: "Resumos & Pesquisas", tagline: "Informação que você precisa",
    desc: "Resumos claros, análises profundas e relatórios bem estruturados.",
    preco: 1200, cor: "#00C9FF", gradient: "linear-gradient(135deg,#00C9FF,#92FE9D)",
    placeholder: "Ex: Faça um resumo detalhado sobre a história económica de Angola pós-independência.",
    usos: ["Resumos académicos", "Análises de mercado", "Relatórios", "Pesquisas"],
    system: "És um especialista em pesquisa e síntese de informação. Fornece resumos claros, bem estruturados com subtítulos e pontos principais. Usa português formal.",
  },
  {
    id: "traducao", icon: "🌍", title: "Tradução", tagline: "Sem barreiras de idioma",
    desc: "Tradução precisa entre Português, Inglês, Francês e Espanhol.",
    preco: 2000, cor: "#A8FF78", gradient: "linear-gradient(135deg,#A8FF78,#78FFD6)",
    placeholder: "Ex: Traduza para inglês: 'Angola é um país cheio de oportunidades e recursos naturais.'",
    usos: ["PT → EN", "EN → PT", "Documentos oficiais", "Textos técnicos"],
    system: "És um tradutor profissional. Traduz com precisão mantendo o estilo e contexto. Indica o idioma de origem e destino no início da resposta.",
  },
  {
    id: "ia", icon: "⚡", title: "IA Geral", tagline: "Qualquer pergunta, qualquer resposta",
    desc: "Dúvidas, ideias criativas, sugestões de negócio e muito mais.",
    preco: 800, cor: "#C77DFF", gradient: "linear-gradient(135deg,#C77DFF,#FFB347)",
    placeholder: "Ex: Quais são as 5 melhores oportunidades de negócio em Luanda com pouco capital?",
    usos: ["Ideias de negócio", "Conselhos & dicas", "Perguntas gerais", "Criatividade"],
    system: "És um assistente inteligente versátil especializado no contexto angolano. Responds de forma útil, prática e criativa. Sempre em português. Dá exemplos concretos e aplicáveis à realidade angolana.",
  },
];

const OWNER = {
  nome: "Júlio dos Santos Alberto",
  whatsapp: "244954989383",
  whatsappDisplay: "+244 954 989 383",
};

const MULTICAIXA = {
  banco: "Banco BFA",
  iban: "AO06 0006 0000 2104 9915 3013 7",
  titular: "Júlio dos Santos Alberto",
  referencia: "ZELA",
};

const TESTIMONIALS = [
  { nome: "Mariana K.", cidade: "Luanda", texto: "Usei para escrever a carta de apresentação da minha empresa. Ficou profissional demais! Recomendo a todos.", stars: 5 },
  { nome: "Pedro A.", cidade: "Benguela", texto: "Traduzi um contrato inteiro do inglês em minutos. Economizei muito tempo e dinheiro!", stars: 5 },
  { nome: "Sofia M.", cidade: "Huambo", texto: "Pedi ideias de negócio e recebi um plano completo e detalhado. Absolutamente incrível!", stars: 5 },
];

function Spinner({ color }) {
  return <div style={{ width: 32, height: 32, border: `3px solid #1a1a2e`, borderTopColor: color, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />;
}

function Header({ onHome, showBack, backLabel, onBack }) {
  return (
    <header style={st.header}>
      <div style={st.logo} onClick={onHome}>
        <div style={st.logoMark}>Z</div>
        <span style={st.logoName}>Zela <span style={{ color: "#FF6B35" }}>IA</span></span>
      </div>
      {showBack && <button style={st.back} onClick={onBack}>{backLabel || "← Voltar"}</button>}
    </header>
  );
}

export default function App() {
  const [tela, setTela] = useState("landing");
  const [servicoId, setServicoId] = useState(null);
  const [pedido, setPedido] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [count, setCount] = useState(1247);
  const [testi, setTesti] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [codigoInput, setCodigoInput] = useState("");
  const [codigoErro, setCodigoErro] = useState(false);
  const [pedidoId, setPedidoId] = useState("");

  const sv = SERVICES.find(s => s.id === servicoId);

  useEffect(() => { const t = setInterval(() => setCount(n => n + Math.floor(Math.random() * 3)), 9000); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setTesti(n => (n + 1) % TESTIMONIALS.length), 4500); return () => clearInterval(t); }, []);

  function gerarCodigo() { return Math.floor(1000 + Math.random() * 9000).toString(); }
  function gerarPedidoId() { return "ZL" + Date.now().toString().slice(-6); }

  function irParaPagamento() {
    const c = gerarCodigo();
    const pid = gerarPedidoId();
    setCodigo(c); setPedidoId(pid); setCodigoInput(""); setCodigoErro(false);
    setTela("pagamento");
  }

  function abrirWhatsApp() {
    const ref = `${MULTICAIXA.referencia}-${pedidoId}`;
    const msg = `Olá Júlio! 👋\n\nFiz o pagamento no Zela IA e quero o meu código de confirmação.\n\n📋 *Detalhes do pedido:*\n• Nome: ${nome}\n• Serviço: ${sv?.title}\n• Valor: ${sv?.preco.toLocaleString("pt-AO")} Kz\n• Referência: ${ref}\n• Contacto: ${telefone}\n\nEnvio o comprovativo a seguir. Obrigado! 🙏`;
    window.open(`https://wa.me/${OWNER.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  }

  async function verificarCodigo() {
    if (codigoInput.trim() === codigo) {
      setLoading(true); setTela("resultado"); setResposta("");
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sv.system, messages: [{ role: "user", content: pedido }] }),
        });
        const data = await res.json();
        setResposta(data.content?.map(c => c.text || "").join("") || "Erro ao obter resposta.");
      } catch { setResposta("Erro de conexão. Tente novamente."); }
      setLoading(false);
    } else { setCodigoErro(true); setTimeout(() => setCodigoErro(false), 2500); }
  }

  function reset() {
    setTela("landing"); setServicoId(null); setPedido(""); setNome("");
    setTelefone(""); setResposta(""); setCodigo(""); setCodigoInput(""); setPedidoId("");
    }
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html,body{background:#070710;overflow-x:hidden}
    @keyframes bounce{0%,80%,100%{transform:scale(0.5);opacity:.4}40%{transform:scale(1);opacity:1}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px rgba(255,107,53,.25)}50%{box-shadow:0 0 40px rgba(255,107,53,.55)}}
    @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
    @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(.95)}}
    @keyframes slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
    @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#070710}::-webkit-scrollbar-thumb{background:#222;border-radius:2px}
    textarea:focus,input:focus{outline:none!important;border-color:#FF6B3566!important}
    button{cursor:pointer;border:none;background:none;font-family:inherit}
    .card{transition:transform .2s ease,box-shadow .2s ease}
    .card:hover{transform:translateY(-3px);box-shadow:0 20px 40px rgba(0,0,0,.4)}
    .shine{position:relative;overflow:hidden}
    .shine::after{content:'';position:absolute;top:-50%;left:-60%;width:35%;height:200%;background:rgba(255,255,255,.12);transform:skewX(-20deg);transition:left .5s}
    .shine:hover::after{left:120%}
    .shake{animation:shake .4s ease}
  `;

  if (tela === "landing") return (
    <div style={st.root}>
      <style>{css}</style>
      {[[300,"#FF6B35","5%","8%",6],[250,"#00C9FF","60%","30%",8],[200,"#C77DFF","15%","65%",7],[180,"#A8FF78","70%","70%",9]].map(([sz,c,t,l,dur],i)=>(
        <div key={i} style={{position:"fixed",width:sz,height:sz,borderRadius:"50%",background:c+"09",top:t,left:l,filter:"blur(70px)",animation:`float ${dur}s ${i*.8}s ease-in-out infinite`,pointerEvents:"none",zIndex:0}}/>
      ))}
      <header style={st.header}>
        <div style={st.logo}>
          <div style={st.logoMark}>Z</div>
          <span style={st.logoName}>Zela <span style={{color:"#FF6B35"}}>IA</span></span>
          <span style={st.aoBadge}>🇦🇴 AOA</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <div style={st.liveDot}/>
          <span style={{color:"#555",fontSize:12}}>{count.toLocaleString()} tarefas</span>
        </div>
      </header>
      <section style={{padding:"52px 24px 0",position:"relative",zIndex:1,animation:"fadeUp .6s ease both"}}>
        <div style={st.heroBadge}>🚀 A primeira plataforma de IA em Kwanzas</div>
        <h1 style={st.h1}>Inteligência<br/><span style={st.h1Grad}>Artificial</span><br/><span style={{color:"#444",fontSize:30}}>ao seu serviço</span></h1>
        <p style={st.heroP}>Redação, pesquisas, traduções e ideias — entregues por IA avançada. Pague em Kwanzas via Multicaixa. Resultados em segundos.</p>
        <button className="shine" style={st.btnMain} onClick={()=>setTela("servicos")}>Escolher serviço →</button>
        <div style={{display:"flex",gap:16,marginTop:14,marginBottom:40,flexWrap:"wrap"}}>
          {["Seguro & fiável","Resultados imediatos","Pague em Kwanzas"].map(t=>(
            <span key={t} style={{color:"#555",fontSize:11,display:"flex",alignItems:"center",gap:4}}><span style={{color:"#A8FF78"}}>✓</span>{t}</span>
          ))}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:8}}>
          {SERVICES.map(s=>(
            <div key={s.id} style={{background:"#0d0d1a",border:`1px solid ${s.cor}33`,borderRadius:10,padding:"8px 14px",display:"flex",gap:8,alignItems:"center"}}>
              <span>{s.icon}</span>
              <span style={{color:s.cor,fontWeight:700,fontSize:13}}>{s.preco.toLocaleString("pt-AO")} Kz</span>
            </div>
          ))}
        </div>
      </section>
      <div style={{overflow:"hidden",borderTop:"1px solid #13131f",borderBottom:"1px solid #13131f",padding:"13px 0",background:"#0a0a15",margin:"32px 0 0",position:"relative",zIndex:1}}>
        <div style={{display:"flex",width:"max-content",animation:"marquee 22s linear infinite"}}>
          {[...Array(2)].map((_,i)=>(
            <div key={i} style={{display:"flex",gap:36,paddingRight:36,flexShrink:0}}>
              {["Redação Profissional","Tradução Rápida","Resumos Académicos","Ideias de Negócio","Cartas Formais","Análises","Posts Sociais","Relatórios"].map(t=>(
                <span key={t} style={{color:"#2a2a3a",fontSize:13,whiteSpace:"nowrap",fontWeight:500}}>✦ {t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section style={{padding:"44px 24px 0",position:"relative",zIndex:1}}>
        <div style={st.tag}>Nossos Serviços</div>
        <h2 style={st.h2}>O que fazemos por si</h2>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {SERVICES.map((s,i)=>(
            <div key={s.id} className="card" style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:16,overflow:"hidden",cursor:"pointer",animation:`fadeUp .5s ${i*.08}s ease both`}} onClick={()=>{setServicoId(s.id);setTela("pedido")}}>
              <div style={{height:4,background:s.gradient}}/>
              <div style={{padding:"18px 18px 20px"}}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{display:"flex",gap:12,alignItems:"center"}}>
                    <span style={{fontSize:26}}>{s.icon}</span>
                    <div>
                      <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#F0EDE8"}}>{s.title}</div>
                      <div style={{color:"#666",fontSize:12,marginTop:2}}>{s.tagline}</div>
                    </div>
                  </div>
                  <div style={{color:s.cor,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:17,flexShrink:0}}>{s.preco.toLocaleString("pt-AO")} Kz</div>
                </div>
                <p style={{color:"#555",fontSize:13,lineHeight:1.5,marginBottom:12}}>{s.desc}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                  {s.usos.map(u=><span key={u} style={{color:s.cor,background:s.cor+"12",border:`1px solid ${s.cor}30`,borderRadius:6,fontSize:11,fontWeight:600,padding:"3px 8px"}}>{u}</span>)}
                </div>
                <button className="shine" style={{background:s.gradient,color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13,padding:"9px 18px",borderRadius:8,border:"none",cursor:"pointer"}}>Usar agora →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:"44px 24px 0",position:"relative",zIndex:1}}>
        <div style={st.tag}>Como Funciona</div>
        <h2 style={st.h2}>Simples e seguro</h2>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {[{n:"01",icon:"🎯",t:"Escolha",d:"Seleccione o serviço que precisa",c:"#FF6B35"},{n:"02",icon:"💬",t:"Descreva",d:"Explique o que quer com detalhes",c:"#00C9FF"},{n:"03",icon:"💳",t:"Pague",d:"Transferência Multicaixa + comprovativo WhatsApp",c:"#A8FF78"},{n:"04",icon:"✨",t:"Receba",d:"Código confirmado → resultado em segundos",c:"#C77DFF"}].map(p=>(
            <div key={p.n} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:14,padding:"16px 14px"}}>
              <span style={{color:p.c,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:10,letterSpacing:2,border:`1px solid ${p.c}33`,borderRadius:5,padding:"2px 7px"}}>{p.n}</span>
              <div style={{fontSize:22,margin:"10px 0 6px"}}>{p.icon}</div>
              <div style={{fontWeight:700,fontSize:13,color:"#F0EDE8",marginBottom:4}}>{p.t}</div>
              <div style={{color:"#555",fontSize:12,lineHeight:1.5}}>{p.d}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:"44px 24px 0",position:"relative",zIndex:1}}>
        <div style={st.tag}>Clientes Satisfeitos</div>
        <h2 style={st.h2}>O que dizem de nós</h2>
        <div key={testi} style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:18,padding:22,animation:"slideIn .4s ease both"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:50,color:"#FF6B3220",lineHeight:.7,marginBottom:12,fontWeight:800}}>"</div>
          <p style={{color:"#C0BCB6",fontSize:15,lineHeight:1.7,marginBottom:12}}>{TESTIMONIALS[testi].texto}</p>
          <div style={{color:"#FFD700",fontSize:13,marginBottom:14}}>{"★".repeat(TESTIMONIALS[testi].stars)}</div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:38,height:38,background:"linear-gradient(135deg,#FF6B35,#FFB347)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:"#fff",fontSize:15}}>{TESTIMONIALS[testi].nome[0]}</div>
            <div>
              <div style={{color:"#F0EDE8",fontWeight:600,fontSize:14}}>{TESTIMONIALS[testi].nome}</div>
              <div style={{color:"#555",fontSize:12}}>📍 {TESTIMONIALS[testi].cidade}</div>
            </div>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:14}}>
          {TESTIMONIALS.map((_,i)=><div key={i} onClick={()=>setTesti(i)} style={{width:8,height:8,borderRadius:"50%",background:i===testi?"#FF6B35":"#1a1a2e",cursor:"pointer",transition:"background .3s"}}/>)}
        </div>
      </section>
      <section style={{padding:"44px 24px 0",position:"relative",zIndex:1}}>
        <div style={{background:"#0d0d1a",border:"1px solid #FF6B3525",borderRadius:20,padding:"36px 22px",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:220,height:220,background:"radial-gradient(circle,#FF6B3512,transparent 70%)",pointerEvents:"none"}}/>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:24,color:"#F0EDE8",marginBottom:10}}>Pronto para começar?</h2>
          <p style={{color:"#555",fontSize:14,marginBottom:24,lineHeight:1.6}}>Junte-se a mais de {count.toLocaleString()} angolanos que já usam a Zela IA a seu favor.</p>
          <button className="shine" style={{...st.btnMain,animation:"glow 3s ease infinite"}} onClick={()=>setTela("servicos")}>Começar agora →</button>
        </div>
      </section>
      <footer style={{padding:"32px 24px",display:"flex",flexDirection:"column",alignItems:"center",gap:6,borderTop:"1px solid #13131f",marginTop:44,position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{...st.logoMark,width:24,height:24,fontSize:12}}>Z</div>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#F0EDE8"}}>Zela <span style={{color:"#FF6B35"}}>IA</span></span>
        </div>
        <span style={{color:"#333",fontSize:12}}>🇦🇴 Feito para Angola · Pague em Kwanzas</span>
      </footer>
    </div>
  );

  if (tela === "servicos") return (
    <div style={st.root}><style>{css}</style>
      <Header onHome={reset} showBack backLabel="← Início" onBack={reset}/>
      <div style={{...st.page,animation:"fadeUp .4s ease both"}}>
        <h2 style={{...st.h2,marginBottom:6}}>Escolha o serviço</h2>
        <p style={{color:"#555",marginBottom:28,fontSize:14}}>O que precisa hoje?</p>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {SERVICES.map(s=>(
            <div key={s.id} className="card" style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:14,padding:"16px",display:"flex",alignItems:"center",gap:14,cursor:"pointer",position:"relative",overflow:"hidden"}} onClick={()=>{setServicoId(s.id);setTela("pedido")}}>
              <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:s.gradient,borderRadius:"14px 0 0 14px"}}/>
              <span style={{fontSize:26,flexShrink:0}}>{s.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,color:"#F0EDE8"}}>{s.title}</div>
                <div style={{color:"#555",fontSize:12,marginTop:2}}>{s.tagline}</div>
              </div>
              <div style={{textAlign:"right",flexShrink:0}}>
                <div style={{color:s.cor,fontWeight:800,fontSize:16,fontFamily:"'Syne',sans-serif"}}>{s.preco.toLocaleString("pt-AO")} Kz</div>
                <div style={{color:"#444",fontSize:11}}>/ tarefa</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );if (tela === "pedido" && sv) return (
    <div style={st.root}><style>{css}</style>
      <Header onHome={reset} showBack backLabel="← Serviços" onBack={()=>setTela("servicos")}/>
      <div style={{...st.page,animation:"fadeUp .4s ease both"}}>
        <div style={{background:sv.gradient,borderRadius:14,padding:"18px 16px",display:"flex",gap:14,alignItems:"center",marginBottom:24}}>
          <span style={{fontSize:30}}>{sv.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:17,color:"#fff"}}>{sv.title}</div>
            <div style={{color:"rgba(255,255,255,.75)",fontSize:13}}>{sv.tagline}</div>
          </div>
          <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:"#fff",flexShrink:0}}>{sv.preco.toLocaleString("pt-AO")} Kz</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div>
            <label style={st.label}>O seu nome completo</label>
            <input value={nome} onChange={e=>setNome(e.target.value)} placeholder="Ex: Maria Silva" style={st.input}/>
          </div>
          <div>
            <label style={st.label}>Número de telefone (WhatsApp)</label>
            <input value={telefone} onChange={e=>setTelefone(e.target.value)} placeholder="Ex: 9XX XXX XXX" style={st.input}/>
          </div>
          <div>
            <label style={st.label}>Descreva o pedido com detalhes</label>
            <textarea value={pedido} onChange={e=>setPedido(e.target.value)} placeholder={sv.placeholder} style={{...st.input,resize:"vertical",minHeight:130,lineHeight:1.65}} rows={5}/>
            <div style={{color:"#333",fontSize:12,marginTop:6,textAlign:"right"}}>{pedido.length} caracteres</div>
          </div>
          <div style={{background:"#FFD70010",border:"1px solid #FFD70025",borderRadius:10,padding:"12px 14px",display:"flex",gap:10}}>
            <span>💡</span>
            <span style={{color:"#999",fontSize:13,lineHeight:1.5}}><strong style={{color:"#FFD700"}}>Dica:</strong> Quanto mais detalhado o pedido, melhor o resultado!</span>
          </div>
          <button className="shine" style={{...st.btnMain,background:(!pedido.trim()||!nome.trim()||!telefone.trim())?"#1a1a2e":sv.gradient,color:(!pedido.trim()||!nome.trim()||!telefone.trim())?"#444":"#fff",width:"100%",padding:"15px",fontSize:16,justifyContent:"center",cursor:(!pedido.trim()||!nome.trim()||!telefone.trim())?"not-allowed":"pointer"}} disabled={!pedido.trim()||!nome.trim()||!telefone.trim()} onClick={irParaPagamento}>
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
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginBottom:28}}>
          {[{n:1,l:"Pague"},{n:2,l:"WhatsApp"},{n:3,l:"Código"}].map((s,i)=>(
            <div key={s.n} style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B35,#FFB347)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff"}}>{s.n}</div>
                <span style={{color:"#FF6B35",fontSize:10,fontWeight:600}}>{s.l}</span>
              </div>
              {i<2 && <div style={{width:24,height:1,background:"#1a1a2e",marginBottom:14}}/>}
            </div>
          ))}
        </div>
        <div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:16,padding:20,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <span style={{color:"#FF6B35",fontSize:12,fontWeight:700,letterSpacing:1}}>PASSO 1 · TRANSFERÊNCIA</span>
            <span style={{color:"#A8FF78",fontSize:12}}>🔒 Seguro</span>
          </div>
          {[{l:"Banco",v:MULTICAIXA.banco},{l:"Titular",v:MULTICAIXA.titular},{l:"IBAN",v:MULTICAIXA.iban,mono:true},{l:"Referência",v:`${MULTICAIXA.referencia}-${pedidoId}`}].map(r=>(
            <div key={r.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #13131f"}}>
              <span style={{color:"#555",fontSize:13,flexShrink:0}}>{r.l}</span>
              <span style={{color:"#D0CCC6",fontWeight:500,fontSize:12,fontFamily:r.mono?"monospace":"inherit",letterSpacing:r.mono?.5:0,textAlign:"right",maxWidth:"62%",wordBreak:"break-all"}}>{r.v}</span>
            </div>
          ))}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,marginTop:4}}>
            <span style={{color:"#555",fontSize:13}}>Valor</span>
            <span style={{color:sv.cor,fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:24}}>{sv.preco.toLocaleString("pt-AO")} Kz</span>
          </div>
        </div>
        <div style={{background:"#0d1a0d",border:"1px solid #25D36625",borderRadius:16,padding:18,marginBottom:14}}>
          <div style={{color:"#25D366",fontSize:12,fontWeight:700,letterSpacing:1,marginBottom:10}}>PASSO 2 · ENVIAR COMPROVATIVO</div>
          <p style={{color:"#aaa",fontSize:13,lineHeight:1.6,marginBottom:14}}>Após transferir, clique no botão abaixo para enviar o comprovativo ao Júlio via WhatsApp. Ele vai responder com o seu <strong style={{color:"#fff"}}>código de 4 dígitos</strong>.</p>
          <button className="shine" style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,padding:"13px 20px",borderRadius:10,border:"none",cursor:"pointer",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",gap:8}} onClick={abrirWhatsApp}>
            <span style={{fontSize:18}}>💬</span> Enviar comprovativo no WhatsApp
          </button>
          <div style={{color:"#555",fontSize:11,textAlign:"center",marginTop:8}}>{OWNER.whatsappDisplay}</div>
        </div>
        <div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:16,padding:18,marginBottom:14}}>
          <div style={{color:"#C77DFF",fontSize:12,fontWeight:700,letterSpacing:1,marginBottom:10}}>PASSO 3 · INSERIR CÓDIGO</div>
          <p style={{color:"#aaa",fontSize:13,lineHeight:1.5,marginBottom:14}}>Após o Júlio confirmar o pagamento, insira o código de 4 dígitos que ele lhe enviou.</p>
          <input value={codigoInput} onChange={e=>setCodigoInput(e.target.value.replace(/\D/g,"").slice(0,4))} placeholder="0000" maxLength={4} className={codigoErro?"shake":""} style={{...st.input,fontSize:28,fontWeight:800,textAlign:"center",letterSpacing:12,fontFamily:"'Syne',sans-serif",padding:"14px",borderColor:codigoErro?"#ff4444":"#1a1a2e",color:codigoErro?"#ff4444":"#F0EDE8"}}/>
          {codigoErro && <div style={{color:"#ff4444",fontSize:13,textAlign:"center",marginTop:8}}>❌ Código incorrecto. Verifique e tente novamente.</div>}
        </div>
        <button className="shine" style={{...st.btnMain,background:codigoInput.length===4?"linear-gradient(135deg,#C77DFF,#FFB347)":"#1a1a2e",color:codigoInput.length===4?"#fff":"#444",width:"100%",padding:"16px",fontSize:16,justifyContent:"center",cursor:codigoInput.length===4?"pointer":"not-allowed"}} disabled={codigoInput.length!==4} onClick={verificarCodigo}>
          ✅ Confirmar código e obter resultado
        </button>
        <div style={{background:"#FF6B3510",border:"1px solid #FF6B3530",borderRadius:10,padding:"12px 14px",display:"flex",gap:10,marginTop:12}}>
          <span>⚠️</span>
          <p style={{color:"#FF6B35",fontSize:12,lineHeight:1.5}}>Use a referência <strong>{MULTICAIXA.referencia}-{pedidoId}</strong> na transferência para identificação rápida.</p>
        </div>
      </div>
    </div>
  );

  if (tela === "resultado" && sv) return (
    <div style={st.root}><style>{css}</style>
      <Header onHome={reset} showBack={!loading} backLabel="+ Novo pedido" onBack={reset}/>
      <div style={{...st.page,animation:"fadeUp .4s ease both"}}>
        <div style={{background:sv.gradient,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <span style={{fontSize:24}}>{sv.icon}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:15,color:"#fff"}}>{sv.title}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.75)"}}>{nome} · {sv.preco.toLocaleString("pt-AO")} Kz</div>
          </div>
          {!loading && resposta && (
            <button onClick={()=>{navigator.clipboard.writeText(resposta);setCopiado(true);setTimeout(()=>setCopiado(false),2000)}} style={{background:"rgba(255,255,255,.2)",color:"#fff",borderRadius:8,padding:"6px 14px",fontSize:12,border:"none",cursor:"pointer",fontWeight:600,flexShrink:0}}>
              {copiado?"✓ Copiado!":"📋 Copiar"}
            </button>
          )}
        </div>
        <div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:10,padding:14,marginBottom:14}}>
          <span style={{color:"#444",fontSize:11,display:"block",marginBottom:5}}>Seu pedido:</span>
          <p style={{color:"#777",fontSize:13,lineHeight:1.5}}>{pedido}</p>
        </div>
        <div style={{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:16,overflow:"hidden",marginBottom:20}}>
          <div style={{padding:"12px 16px",borderBottom:"1px solid #13131f",background:"#0a0a15",display:"flex",alignItems:"center",gap:8}}>
            {loading
              ? <><div style={{width:7,height:7,borderRadius:"50%",background:sv.cor,animation:"bounce 1.2s 0s infinite ease-in-out"}}/><div style={{width:7,height:7,borderRadius:"50%",background:sv.cor,animation:"bounce 1.2s .2s infinite ease-in-out"}}/><div style={{width:7,height:7,borderRadius:"50%",background:sv.cor,animation:"bounce 1.2s .4s infinite ease-in-out"}}/><span style={{color:"#555",fontSize:13,marginLeft:4}}>A IA está a trabalhar...</span></>
              : <span style={{color:"#A8FF78",fontSize:13,fontWeight:600}}>✅ Resultado gerado com sucesso</span>
            }
          </div>
          <div style={{padding:18,minHeight:160}}>
            {loading
              ? <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"28px 0"}}><Spinner color={sv.cor}/><p style={{color:"#444",fontSize:13,marginTop:14,textAlign:"center"}}>Processando com IA avançada...</p></div>
              : <pre style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontSize:14,lineHeight:1.75,color:"#C0BCB6",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{resposta}</pre>
            }
          </div>
        </div>
        {!loading && (
          <div style={{display:"flex",gap:10}}>
            <button className="shine" style={{...st.btnMain,background:sv.gradient,flex:1,padding:"14px",justifyContent:"center",fontSize:15}} onClick={reset}>+ Novo pedido</button>
            <button style={{background:"transparent",border:"1px solid #1a1a2e",color:"#666",fontSize:14,padding:"14px",borderRadius:12,cursor:"pointer",flex:1,fontFamily:"'Plus Jakarta Sans',sans-serif"}} onClick={()=>{setTela("pedido");setResposta("")}}>🔄 Refazer</button>
          </div>
        )}
      </div>
    </div>
  );

  return null;
}

const st = {
  root:{minHeight:"100vh",background:"#070710",color:"#F0EDE8",fontFamily:"'Plus Jakarta Sans',sans-serif",maxWidth:480,margin:"0 auto",position:"relative",overflowX:"hidden"},
  header:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 20px",borderBottom:"1px solid #13131f",position:"sticky",top:0,background:"rgba(7,7,16,0.92)",backdropFilter:"blur(16px)",zIndex:100},
  logo:{display:"flex",alignItems:"center",gap:8,cursor:"pointer"},
  logoMark:{width:30,height:30,background:"linear-gradient(135deg,#FF6B35,#FFB347)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:800,color:"#fff",fontFamily:"'Syne',sans-serif"},
  logoName:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:16,color:"#F0EDE8"},
  aoBadge:{background:"#FF6B3512",color:"#FF6B35",border:"1px solid #FF6B3528",borderRadius:20,fontSize:11,padding:"3px 9px",fontWeight:700},
  liveDot:{width:8,height:8,borderRadius:"50%",background:"#A8FF78",animation:"pulse 2s ease infinite"},
  back:{color:"#555",fontSize:13,cursor:"pointer"},
  page:{padding:"28px 24px 60px",position:"relative",zIndex:1},
  h1:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:40,lineHeight:1.1,color:"#F0EDE8",marginBottom:16},
  h1Grad:{background:"linear-gradient(135deg,#FF6B35,#FFB347)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"},
  heroP:{color:"#666",fontSize:15,lineHeight:1.65,marginBottom:24,maxWidth:320},
  heroBadge:{display:"inline-flex",alignItems:"center",gap:8,background:"#FF6B3510",border:"1px solid #FF6B3528",borderRadius:20,padding:"6px 14px",fontSize:12,color:"#FF6B35",fontWeight:600,marginBottom:18,letterSpacing:.3},
  tag:{color:"#FF6B35",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:8,display:"block"},
  h2:{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:24,color:"#F0EDE8",marginBottom:24,lineHeight:1.2},
  btnMain:{background:"linear-gradient(135deg,#FF6B35,#FFB347)",color:"#fff",fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:15,padding:"13px 26px",borderRadius:12,border:"none",cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8,letterSpacing:.3},
  label:{color:"#888",fontSize:13,fontWeight:600,display:"block",marginBottom:7},
  input:{background:"#0d0d1a",border:"1px solid #1a1a2e",borderRadius:10,padding:"13px 15px",color:"#F0EDE8",fontSize:15,fontFamily:"'Plus Jakarta Sans',sans-serif",width:"100%",transition:"border-color .2s"},
};
