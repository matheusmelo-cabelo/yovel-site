import React, { useState, useMemo, useRef } from 'react';
import './App.css';

// --- Dicionário de Traduções ---
const translations = {
  pt: {
    // Hero (Seção 1)
    hero_headline: 'Desbloqueie uma Vida Sem Fronteiras. Nós Orquestramos a Estratégia Financeira. Você Vive o Upgrade.',
    hero_subheadline: 'Para Cidadãos Globais que suspeitam que sua vida internacional poderia ser mais barata e muito mais luxuosa. Nós provamos que sim, começando pelo seu dinheiro.',
    hero_cta: '➡️ Entender o Método Yovel',
    trust_text_1: 'Estratégia Personalizada',
    trust_text_2: 'Atendimento Concierge Global',

    // O Problema (Seção 2)
    problem_section_title: 'A Taxa Invisível que Você Paga por Ser um Cidadão Global.',
    problem_section_paragraph: 'Você já sentiu que paga uma "taxa de expatriado" invisível? Cada vez que seu dinheiro cruza uma fronteira, o atrito – taxas ocultas, burocracia, câmbio desfavorável – desgasta seu capital e limita seu potencial. Esta fricção não é um custo de vida. É uma falha de design. E nós a consertamos.',

    // O Método Yovel (Seção 3)
    method_section_title: 'Nosso Método: Da Otimização ao Upgrade.',
    method_step_1_paragraph: 'Primeiro, estancamos a sangria. Mapeamos cada ponto de fricção em suas finanças internacionais e aplicamos uma estratégia para colocar, em média, 15% do seu orçamento de volta no seu bolso. Este é o capital que sempre foi seu, agora de volta ao seu controle. É a prova matemática de que nosso método funciona.',
    method_step_2_paragraph: 'Nós reinvestimos essa economia em inteligência. Com o capital que recuperamos, destravamos um nível de experiência antes inacessível. O dinheiro que você deixa de perder para os bancos se torna a ferramenta para acessar Salas VIP, otimizar passagens aéreas e ter a fluidez de gastar como um local, em qualquer lugar do mundo.',

    // A Prova (Seção 4)
    proof_section_title: 'Confiança que Atravessa Fronteiras.',
    proof_highlight_dubai: 'Destaque em Dubai: Somos o parceiro de otimização financeira de confiança da [Nome da Agência de Escursão], ajudando sua clientela global a viajar de forma mais inteligente e gastar com mais sabedoria, seja de Dubai para a Europa ou da Suíça para o Brasil.',

    // O Investimento (Seção 5)
    investment_section_title: 'Um Investimento, Não um Custo.',
    engineering_fee_title: 'Taxa de Engenharia Estratégica: R$ 250',
    engineering_fee_desc: 'Este é o investimento para nos ter como seu "CFO Internacional". Com ele, mergulhamos nas suas finanças, desenhamos seu plano de otimização e abrimos a porta do Gateway.',
    upgrade_participation_title: 'Participação no Upgrade: 40% do Valor Gerado',
    upgrade_participation_desc: 'Nós só vencemos quando você vence. Nossa remuneração é uma participação sobre todo o valor que geramos para você, seja na economia direta de capital ou nos benefícios de lifestyle que destravamos.',

    // O Engenheiro (Seção 6)
    engineer_section_title: 'O Estrategista por Trás da Yovel',
    engineer_quote: '“Meu único objetivo é usar meu conhecimento para destravar um nível de liberdade financeira e de vida que meus clientes não sabiam ser possível. A Yovel é o método que criei para fazer isso acontecer.”',
    engineer_name: '- Matheus Melo, Fundador',

    // O Chamado Final (Seção 7)
    final_cta_title: 'Pronto para girar a chave?',
    final_cta_subtitle: 'Imagine sua próxima viagem sem a ansiedade de converter moedas ou o arrependimento de taxas surpresa. Esse upgrade começa com um único passo.',
    final_cta_button: '💬 Agendar Meu Diagnóstico',
  },
  en: {
    // Hero (Section 1)
    hero_headline: 'Unlock a Life Without Borders. We Orchestrate the Financial Strategy. You Live the Upgrade.',
    hero_subheadline: 'For Global Citizens who suspect their international life could be cheaper and far more luxurious. We prove that it can, starting with your money.',
    hero_cta: '➡️ Understand the Yovel Method',
    trust_text_1: 'Personalized Strategy',
    trust_text_2: 'Global Concierge Service',

    // The Problem (Section 2)
    problem_section_title: 'The Invisible Fee You Pay for Being a Global Citizen.',
    problem_section_paragraph: 'Have you ever felt like you\'re paying an invisible "expatriate tax"? Every time your money crosses a border, friction—hidden fees, bureaucracy, unfavorable exchange rates—erodes your capital and limits your potential. This friction isn\'t a cost of living. It\'s a design flaw. And we fix it.',

    // The Yovel Method (Section 3)
    method_section_title: 'Our Method: From Optimization to Upgrade.',
    method_step_1_paragraph: 'First, we stop the bleeding. We map every point of friction in your international finances and apply a strategy to put, on average, 15% of your budget back in your pocket. This is capital that has always been yours, now back under your control. It is the mathematical proof that our method works.',
    method_step_2_paragraph: 'We reinvest that savings into intelligence. With the capital we recover, we unlock a level of experience that was previously inaccessible. The money you stop losing to banks becomes the tool to access VIP Lounges, optimize airfare, and have the fluidity to spend like a local, anywhere in the world.',

    // The Proof (Section 4)
    proof_section_title: 'Trust That Crosses Borders.',
    proof_highlight_dubai: 'Highlight in Dubai: We are the trusted financial optimization partner of [Excursion Agency Name], helping their global clientele travel smarter and spend wiser, whether from Dubai to Europe or from Switzerland to Brazil.',

    // The Investment (Section 5)
    investment_section_title: 'An Investment, Not a Cost.',
    engineering_fee_title: 'Strategic Engineering Fee: BRL 250',
    engineering_fee_desc: 'This is the investment to have us as your "International CFO." With it, we dive into your finances, design your optimization plan, and open the Gateway door.',
    upgrade_participation_title: 'Upgrade Participation: 40% of Generated Value',
    upgrade_participation_desc: 'We only win when you win. Our compensation is a share of all the value we generate for you, whether in direct capital savings or the lifestyle benefits we unlock.',

    // The Engineer (Section 6)
    engineer_section_title: 'The Strategist Behind Yovel',
    engineer_quote: '"My sole purpose is to use my knowledge to unlock a level of financial and life freedom that my clients didn\'t know was possible. Yovel is the method I created to make that happen."',
    engineer_name: '- Matheus Melo, Founder',

    // The Final Call (Section 7)
    final_cta_title: 'Ready to turn the key?',
    final_cta_subtitle: 'Imagine your next trip without the anxiety of converting currencies or the regret of surprise fees. That upgrade starts with a single step.',
    final_cta_button: '💬 Schedule My Diagnosis',
  }
};

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
  const [language, setLanguage] = useState('pt');
  const [inputValue, setInputValue] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('BRL');
  const [toCurrency, setToCurrency] = useState('USD');
  const [openFaq, setOpenFaq] = useState(null);

  const methodSectionRef = useRef(null);

  const t = (key) => translations[language][key] || key;

  const handleScrollToMethod = () => {
    methodSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Taxas de Câmbio Fixas e Realistas ---
  const exchangeRates = {
    USD_TO_BRL: 5.40, 
    EUR_TO_BRL: 5.80, 
  };

  // --- Constantes de Taxas ---
  const COMPETITOR_IOF_RATE = 0.038;
  const COMPETITOR_FEE_RATE = 0.02;  
  const YOVEL_SERVICE_RATE = 0.04;   
  const YOVEL_NETWORK_FEE_USD = 1;

  const handleSwapCurrencies = () => {
    const oldFrom = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(oldFrom);
  };

  const calculations = useMemo(() => {
    const input = Number(inputValue) || 0;
    const isBrlToForeign = fromCurrency === 'BRL';

    let competitorFinalValue = 0;
    let yovelResult = { serviceFeeBRL: 0, networkFeeBRL: 0, finalValue: 0, displayRate: '', isLowValue: false, serviceRate: YOVEL_SERVICE_RATE };
    let savings = 0;

    if (isBrlToForeign) {
      const exchangeRate = toCurrency === 'USD' ? exchangeRates.USD_TO_BRL : exchangeRates.EUR_TO_BRL;
      const brlAmount = input;

      // Verifica se é uma transação de baixo valor em BRL
      if (brlAmount > 0 && brlAmount < 700) {
        yovelResult.isLowValue = true;
        yovelResult.serviceRate = 0.06; // 6%
        yovelResult.networkFeeBRL = 20; // Taxa fixa de R$20
      } else {
        yovelResult.isLowValue = false;
        yovelResult.serviceRate = YOVEL_SERVICE_RATE; // 4%
        const usdToTargetRate = toCurrency === 'USD' ? 1 : exchangeRates.USD_TO_BRL / exchangeRates.EUR_TO_BRL;
        const networkFeeInTargetCurrency = YOVEL_NETWORK_FEE_USD * usdToTargetRate;
        yovelResult.networkFeeBRL = networkFeeInTargetCurrency * exchangeRate;
      }

      // Cálculo Concorrente (para o cálculo de economia)
      const competitorTotalFeesBRL = (brlAmount * COMPETITOR_IOF_RATE) + (brlAmount * COMPETITOR_FEE_RATE);
      const netBrlCompetitor = brlAmount - competitorTotalFeesBRL;
      competitorFinalValue = netBrlCompetitor / exchangeRate;

      // Cálculo Yovel
      yovelResult.serviceFeeBRL = brlAmount * yovelResult.serviceRate;
      const totalYovelFeesBRL = yovelResult.serviceFeeBRL + yovelResult.networkFeeBRL;
      const amountToConvert = brlAmount - totalYovelFeesBRL;
      yovelResult.finalValue = amountToConvert > 0 ? amountToConvert / exchangeRate : 0;
      yovelResult.displayRate = `1 ${toCurrency} = ${exchangeRate.toFixed(2)} BRL`;

      // Cálculo da Economia
      const diffInForeign = yovelResult.finalValue - competitorFinalValue;
      savings = diffInForeign * exchangeRate;

    } else { // Foreign to BRL
        yovelResult.isLowValue = false; // Lógica de baixo valor não se aplica
        yovelResult.serviceRate = YOVEL_SERVICE_RATE;
        const exchangeRate = fromCurrency === 'USD' ? exchangeRates.USD_TO_BRL : exchangeRates.EUR_TO_BRL;
        const foreignAmount = input;

        // Cálculo Concorrente (simulação de repatriação)
        const brlEquivalentCompetitor = foreignAmount * exchangeRate;
        const competitorTotalFeesBRL = (brlEquivalentCompetitor * 0.0038) + (brlEquivalentCompetitor * COMPETITOR_FEE_RATE);
        competitorFinalValue = brlEquivalentCompetitor - competitorTotalFeesBRL;

        // Cálculo Yovel
        const usdToSourceRate = fromCurrency === 'USD' ? 1 : exchangeRates.EUR_TO_BRL / exchangeRates.USD_TO_BRL;
        const networkFeeInSourceCurrency = YOVEL_NETWORK_FEE_USD * usdToSourceRate;
        yovelResult.networkFeeBRL = networkFeeInSourceCurrency * exchangeRate;

        const netForeignAmount = foreignAmount - networkFeeInSourceCurrency;
        const brlEquivalentYovel = netForeignAmount > 0 ? netForeignAmount * exchangeRate : 0;
        yovelResult.serviceFeeBRL = brlEquivalentYovel * yovelResult.serviceRate;
        yovelResult.finalValue = brlEquivalentYovel - yovelResult.serviceFeeBRL;
        yovelResult.displayRate = `1 ${fromCurrency} = ${exchangeRate.toFixed(2)} BRL`;

        // Cálculo da Economia
        savings = yovelResult.finalValue - competitorFinalValue;
    }

    return { yovelResult, savings };

  }, [inputValue, fromCurrency, toCurrency, exchangeRates]);

  const { yovelResult, savings } = calculations;

  const formatCurrency = (value, currency) => {
      const options = { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 };
      const locale = language === 'pt' ? 'pt-BR' : (currency === 'USD' ? 'en-US' : 'de-DE');
      return (value || 0).toLocaleString(locale, options);
  }

  return (
    <div className="App">
      {/* Seção 1: O Hero (A Promessa da Chave Mestra) */}
      <header className="hero-section">
        {/* Identidade Visual: Fundo com o vídeo sutil e cinematográfico dos "frutos da liberdade". */}
        {/* Sobreposição translúcida do Azul Yovel. Logo da "Onda de Libertação" em destaque. */}
        <h1 className="brand-name">YOVEL</h1>
        <div className="language-switcher">
          <button onClick={() => setLanguage('pt')} className={language === 'pt' ? 'active' : ''}>PT</button>
          <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
        </div>
        <div className="hero-content">
          <h1 className="hero-headline">{t('hero_headline')}</h1>
          <p className="hero-subheadline">{t('hero_subheadline')}</p>
          <button onClick={handleScrollToMethod} className="hero-cta amber-button">
            {t('hero_cta')}
          </button>
          <div className="hero-trust-text">
            <span>✅ {t('trust_text_1')}</span>
            <span>✅ {t('trust_text_2')}</span>
          </div>
        </div>
      </header>

      {/* Seção 2: O Problema (A Taxa de Fricção Global) */}
      <section className="problem-section">
        {/* Identidade Visual: Fundo Branco Puro para foco total na mensagem. */}
        {/* Um elemento gráfico sutil e elegante representando "atrito" – talvez linhas finas e emaranhadas que se resolvem em uma linha reta no final da seção. */}
        <h2 className="section-title serif-font">{t('problem_section_title')}</h2>
        <p className="section-paragraph sans-serif-font">{t('problem_section_paragraph')}</p>
      </section>

      {/* Seção 3: O Método Yovel (Do Gateway ao Destination) */}
      <section className="method-section soft-gray-background" ref={methodSectionRef}>
        {/* Identidade Visual: Fundo em Cinza Suave (#F6F9FC). */}
        <h2 className="section-title serif-font">{t('method_section_title')}</h2>
        <div className="method-visual-proof">
          <span className="icon">🚪</span>
          <span className="label">DINHEIRO</span>
          <span className="arrow">➡️</span>
          <span className="icon">🔑</span>
          <span className="label">CHAVE MESTRA</span>
          <span className="arrow">➡️</span>
          <span className="icon">🚪</span>
          <span className="label">LIFESTYLE</span>
        </div>
        <div className="method-steps">
          <div className="method-step">
            <h3>Passo 1: O Gateway (A Otimização Financeira)</h3>
            <p className="sans-serif-font">{t('method_step_1_paragraph')}</p>
          </div>
          <div className="method-step">
            <h3>Passo 2: O Destino (O Upgrade de Lifestyle)</h3>
            <p className="sans-serif-font">{t('method_step_2_paragraph')}</p>
          </div>
        </div>
      </section>

      {/* Seção 4: A Prova (Case de Sucesso Global) */}
      <section className="proof-section white-background">
        {/* Identidade Visual: Fundo Branco Puro. Uma imagem de alta qualidade que represente Dubai. */}
        {/* O logo do seu parceiro (com permissão) e uma foto ou citação de destaque. */}
        <h2 className="section-title serif-font">{t('proof_section_title')}</h2>
        <div className="case-study-highlight">
          {/* Placeholder for Dubai image */}
          <img src="/assets/dubai-placeholder.jpg" alt="Dubai" className="dubai-image" />
          {/* Placeholder for partner logo */}
          <img src="/assets/partner-logo-placeholder.png" alt="Partner Logo" className="partner-logo" />
          <p className="sans-serif-font">{t('proof_highlight_dubai')}</p>
        </div>
      </section>

      {/* Seção 5: O Investimento (A Chave para o Upgrade) */}
      <section className="investment-section white-background">
        {/* Identidade Visual: Layout minimalista em duas colunas sobre fundo Branco Puro. */}
        {/* Ícones em Âmbar Sábio representando "Engenharia" e "Upgrade". */}
        <h2 className="section-title serif-font">{t('investment_section_title')}</h2>
        <div className="investment-details-container">
          <div className="investment-card">
            {/* Icone Engenharia */}
            <h3 className="investment-card-title">{t('engineering_fee_title')}</h3>
            <p className="investment-card-description">{t('engineering_fee_desc')}</p>
          </div>
          <div className="investment-card">
            {/* Icone Upgrade */}
            <h3 className="investment-card-title">{t('upgrade_participation_title')}</h3>
            <p className="investment-card-description">{t('upgrade_participation_desc')}</p>
          </div>
        </div>
      </section>

      {/* Seção 6: O Engenheiro (Humanizando a Estratégia) */}
      <section className="engineer-section soft-gray-background">
        {/* Identidade Visual: Fundo em Cinza Suave. Uma foto sua profissional, mas acessível e confiante. */}
        <img src="/assets/your-photo.jpg" alt="[Seu Nome]" className="engineer-photo" />
        <h2 className="section-title serif-font">{t('engineer_section_title')}</h2>
        <p className="engineer-quote sans-serif-font">{t('engineer_quote')}</p>
        <p className="engineer-name sans-serif-font">{t('engineer_name')}</p>
      </section>

      {/* Seção 7: O Chamado Final (O Convite para Girar a Chave) */}
      <section className="final-cta-section yovel-blue-background">
        {/* Identidade Visual: Fundo sólido no Azul Yovel (#1B365D). */}
        {/* A "Onda de Libertação" como marca d'água sutil. */}
        <h2 className="final-cta-headline serif-font">{t('final_cta_title')}</h2>
        <p className="section-subtitle sans-serif-font white-text">{t('final_cta_subtitle')}</p>
        <a href="https://wa.me/5521993765041" target="_blank" rel="noopener noreferrer" className="whatsapp-cta amber-button">
          {t('final_cta_button')}
        </a>
      </section>
    </div>
  );
}

export default App;
