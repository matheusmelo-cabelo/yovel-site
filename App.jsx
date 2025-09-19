import React, { useState } from 'react';
import './App.css';

// --- Componente Reutilizável para FAQ ---
const FaqItem = ({ faq, index, openFaq, setOpenFaq }) => {
  const isOpen = index === openFaq;

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setOpenFaq(isOpen ? null : index)}>
        <h3>{faq.question}</h3>
        <span className="faq-icon">{isOpen ? '−' : '+'}</span>
      </div>
      <div className="faq-answer">
        <p>{faq.answer}</p>
      </div>
    </div>
  );
};


function App() {
  const [brlValue, setBrlValue] = useState(5000);
  const [openFaq, setOpenFaq] = useState(null);

  // --- Dados do FAQ ---
  const faqs = [
    {
      question: 'É seguro usar a Yovel?',
      answer: 'Absolutamente. Usamos parceiros regulamentados e tecnologia de ponta para garantir que seu dinheiro esteja sempre seguro. A transparência é nosso pilar, e todo o processo é feito de forma clara e rastreável.'
    },
    {
      question: 'Como a Yovel consegue ter um câmbio melhor e sem IOF?',
      answer: 'Nós operamos com um modelo de negócio otimizado e parcerias estratégicas que nos permitem acesso a taxas de câmbio mais vantajosas. Ao contrário dos bancos tradicionais, nossa estrutura é enxuta e focada em eficiência, repassando essa economia diretamente para você.'
    },
    {
      question: 'Preciso entender de criptomoedas para usar?',
      answer: 'Não. A complexidade fica do nosso lado. Para você, a experiência é tão simples quanto fazer um PIX e usar um cartão. Cuidamos de toda a "mágica" para que você não precise se preocupar com nada além de aproveitar sua viagem.'
    },
    {
      question: 'O cartão funciona em qualquer lugar?',
      answer: 'Sim. Nossos cartões parceiros possuem bandeira internacional, aceita em milhões de estabelecimentos e caixas eletrônicos ao redor do mundo. Onde seu cartão de crédito tradicional funciona, o seu cartão Yovel também funcionará.'
    }
  ];

  // --- Lógica de Cálculo ---
  const DOLLAR_RATE = 5.20;
  const COMPETITOR_IOF_RATE = 0.011;
  const COMPETITOR_FEE_RATE = 0.015;
  const YOVEL_FEE_RATE = 0.01;

  const competitorIof = brlValue * COMPETITOR_IOF_RATE;
  const competitorFee = brlValue * COMPETITOR_FEE_RATE;
  const totalFeesCompetitor = competitorIof + competitorFee;
  const netBrlCompetitor = brlValue - totalFeesCompetitor;
  const finalUsdCompetitor = netBrlCompetitor / DOLLAR_RATE;

  const yovelFee = brlValue * YOVEL_FEE_RATE;
  const totalFeesYovel = yovelFee;
  const netBrlYovel = brlValue - totalFeesYovel;
  const finalUsdYovel = netBrlYovel / DOLLAR_RATE;
  
  const savingsBrl = totalFeesCompetitor - totalFeesYovel;

  const formatCurrency = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formatUsd = (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <div className="App">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">A forma mais inteligente de usar seu dinheiro pelo mundo.</h1>
          <p className="hero-subheadline">Envie Reais via PIX e use seu saldo globalmente com um cartão internacional. Sem IOF, sem taxas escondidas e com um câmbio que os concorrentes não conseguem oferecer.</p>
          <button className="hero-cta">➡️ Simular minha economia agora</button>
          <div className="hero-trust-text">
            <span>✅ Atendimento personalizado via WhatsApp</span>
            <span>✅ Cotação instantânea e transparente</span>
          </div>
        </div>
      </header>

      <section className="simulator-section">
        <h2 className="section-title">Veja na prática quanto você economiza.</h2>
        <p className="section-subtitle">Digite o valor em Reais (BRL) que você quer enviar e veja o saldo final em Dólares (USD) no seu cartão, já descontadas todas as taxas.</p>
        <div className="simulator-input-container">
          <span>R$</span>
          <input type="number" className="simulator-input" value={brlValue} onChange={(e) => setBrlValue(Number(e.target.value))} placeholder="5000" />
        </div>
        <div className="comparison-container">
          <div className="comparison-card">
            <h3 className="card-title">Bancos e Concorrentes</h3>
            <div className="card-row"><span>Valor enviado</span><span>{formatCurrency(brlValue)}</span></div>
            <div className="card-row fee"><span>IOF (1.1%)</span><span>- {formatCurrency(competitorIof)}</span></div>
            <div className="card-row fee"><span>Taxa de serviço (~1.5%)</span><span>- {formatCurrency(competitorFee)}</span></div>
            <div className="card-row total"><span>Saldo final em Dólar</span><span>{formatUsd(finalUsdCompetitor)}</span></div>
          </div>
          <div className="comparison-card yovel-card">
            <h3 className="card-title">Estratégia Yovel</h3>
            <div className="card-row"><span>Valor enviado</span><span>{formatCurrency(brlValue)}</span></div>
            <div className="card-row fee"><span>IOF</span><span className="yovel-advantage">ZERO</span></div>
            <div className="card-row fee"><span>Taxa de serviço (~1.0%)</span><span>- {formatCurrency(yovelFee)}</span></div>
            <div className="card-row total"><span>Saldo final em Dólar</span><span className="yovel-total">{formatUsd(finalUsdYovel)}</span></div>
          </div>
        </div>
        <p className="savings-highlight">Neste exemplo, você economiza <span className="savings-amount">{formatCurrency(savingsBrl)}</span> com a Yovel. É mais dinheiro no seu bolso para o que realmente importa.</p>
        <button className="whatsapp-cta">💬 Falar com um especialista e ativar meu cartão</button>
      </section>

      <section className="how-it-works-section">
        <h2 className="section-title">Finanças globais, com a simplicidade do PIX.</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-icon">1</div><h3 className="step-title">Você nos chama no WhatsApp</h3><p className="step-description">Nossa equipe concierge entende sua necessidade e gera sua cotação personalizada em minutos.</p></div>
          <div className="step-card"><div className="step-icon">2</div><h3 className="step-title">Você envia um PIX</h3><p className="step-description">Transfira o valor em Reais para a conta segura da Yovel, como se estivesse fazendo qualquer pagamento do dia a dia.</p></div>
          <div className="step-card"><div className="step-icon">3</div><h3 className="step-title">Seu saldo global é ativado</h3><p className="step-description">Nós cuidamos de toda a "mágica". Em minutos, seu saldo em Dólares fica disponível em seu cartão internacional, pronto para uso.</p></div>
        </div>
      </section>

      <section className="differentiators-section">
        <h2 className="section-title">A escolha inteligente para o cidadão global.</h2>
        <div className="table-container">
          <table className="differentiators-table">
            <thead><tr><th>Funcionalidade</th><th>Estratégia Yovel</th><th>Outros Provedores</th></tr></thead>
            <tbody>
              <tr><td>IOF</td><td><span className="check-mark">✔️</span> Zero (sempre)</td><td>1.1% (na compra de moeda)</td></tr>
              <tr><td>Atendimento</td><td><span className="check-mark">✔️</span> Humano, dedicado e via WhatsApp</td><td>Robôs, tickets e longas esperas</td></tr>
              <tr><td>Velocidade</td><td><span className="check-mark">✔️</span> Minutos</td><td>Horas ou dias úteis</td></tr>
              <tr><td>Câmbio</td><td><span className="check-mark">✔️</span> Otimizado e 100% transparente</td><td>Comercial + taxas embutidas</td></tr>
              <tr><td>Simplicidade</td><td><span className="check-mark">✔️</span> Fale, pague e use</td><td>Cadastros, aprovações e múltiplos apps</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="faq-section">
        <h2 className="section-title">Perguntas Frequentes</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} index={index} openFaq={openFaq} setOpenFaq={setOpenFaq} />
          ))}
        </div>
      </section>

      {/* --- Seção 6: CTA Final --- */}
      <section className="final-cta-section">
        <h2 className="final-cta-headline">Pronto para restaurar a liberdade do seu dinheiro?</h2>
        <p className="section-subtitle">Clique no botão abaixo e fale diretamente com um de nossos especialistas. Receba sua cotação sem compromisso e descubra por que cidadãos globais estão trocando a burocracia pela inteligência da Yovel.</p>
        <button className="whatsapp-cta">💬 Quero minha cotação exclusiva no WhatsApp</button>
      </section>
    </div>
  );
}

export default App;
