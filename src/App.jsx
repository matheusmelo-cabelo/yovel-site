import React, { useState, useMemo } from 'react';
import './App.css';

// --- Dicionário de Traduções ---
const translations = {
  pt: {
    // Hero (Seção 1)
    hero_headline: 'Desbloqueie uma Vida Sem Fronteiras. Nós Engenheiramos a Estratégia Financeira. Você Vive o Upgrade.',
    hero_subheadline: 'Para Cidadãos Globais que suspeitam que sua vida internacional poderia ser mais barata e muito mais luxuosa. Nós provamos que sim, começando pelo seu dinheiro.',
    hero_cta: '➡️ Descobrir o Método Yovel',
    trust_text_1: 'Estratégia Personalizada',
    trust_text_2: 'Atendimento Concierge Global',

    // O Problema (Seção 2)
    problem_section_title: 'Sua vida é global. Seu sistema financeiro não é.',
    problem_section_paragraph: 'Você já sentiu que paga uma "taxa de expatriado" invisível? Cada vez que seu dinheiro cruza uma fronteira, o atrito – taxas ocultas, burocracia, câmbio desfavorável – desgasta seu capital e limita seu potencial. Esta fricção não é um custo de vida. É uma falha de design. E nós a consertamos.',

    // O Método Yovel (Seção 3)
    method_section_title: 'Nosso Método: Da Otimização ao Upgrade.',
    method_step_1_paragraph: 'Primeiro, estancamos a sangria. Mapeamos cada ponto de fricção em suas finanças internacionais e aplicamos uma estratégia para colocar, em média, 15% do seu orçamento de volta no seu bolso. Este é o seu capital recuperado. É a prova matemática de que nosso método funciona.',
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
    engineer_name: '- [Seu Nome], Fundador',

    // O Chamado Final (Seção 7)
    final_cta_title: 'Pronto para girar a chave?',
    final_cta_subtitle: 'A vida global que você quer — mais inteligente, mais luxuosa e com menos atrito — está a duas portas de distância. Mas tudo começa com um único passo.',
    final_cta_button: '💬 Agendar Meu Diagnóstico',
  },
  en: {
    // Hero
    hero_headline: 'The smartest way to use your money around the world.',
    hero_subheadline: 'A complete financial consultancy for your travels. We optimize your exchange rates, cards, and benefits so you can travel with more luxury and less cost.',
    hero_cta: '➡️ Start my quote',
    trust_text_1: 'Personalized support via WhatsApp',
    trust_text_2: 'Instant and transparent quotes',
    // Simulador
    simulator_title: 'See in practice how much you save.',
    simulator_subtitle: 'Enter the amount you want to send and see the final balance on your card, with all fees already deducted.',
    you_send: 'You send',
    recipient_gets: 'Recipient gets',
    yovel_fee: 'Yovel Service Fee',
    network_fee: 'Network Fee',
    total_fees: 'Total fees',
    exchange_rate_used: 'Exchange rate used',
    low_value_warning: 'For values below BRL 700, different rates apply.',
    savings_text: 'You save',
    savings_comparison: 'compared to other providers.',
    specialist_cta: '💬 Talk to a specialist and activate my card',
    // Como Funciona
    how_it_works_title: 'Global finances, with the simplicity of PIX.',
    step_1_title: 'You call us on WhatsApp',
    step_1_desc: 'Our concierge team understands your needs and generates your personalized quote in minutes.',
    step_2_title: 'You send a PIX',
    step_2_desc: 'Transfer the amount in Reais to Yovel\'s secure account, just like any other daily payment.',
    step_3_title: 'Your global balance is activated',
    step_3_desc: 'We take care of all the "magic". In minutes, your balance in Dollars is available on your international card, ready to use.',
    exclusive_cta: '💬 I want my exclusive quote on WhatsApp',
    // Benefícios
    benefits_title: 'A Complete Consultancy',
    benefits_subtitle: 'Beyond the best exchange rate, Yovel unlocks a world of benefits for the global citizen.',
    benefit_1_title: 'Discounted VIP Lounges',
    benefit_1_desc: 'Access VIP lounges at airports worldwide with discounts that only our partner network offers.',
    benefit_2_title: 'Smart Travel Insurance',
    benefit_2_desc: 'We help you choose the travel insurance with the best cost-benefit, avoiding pitfalls and ensuring your peace of mind.',
    benefit_3_title: 'Optimized Airfare',
    benefit_3_desc: 'Our consultancy includes searching for cheaper air tickets, using our knowledge of miles and loyalty programs.',
    // Tabela
    table_title: 'The smart choice for the global citizen.',
    feature: 'Feature',
    yovel_strategy: 'Yovel Strategy',
    other_providers: 'Other Providers',
    iof: 'IOF',
    iof_yovel: 'Zero (always)',
    personal_consulting: 'Personal Consulting',
    personal_consulting_yovel: 'Dedicated specialist to optimize your trip',
    personal_consulting_others: 'Bots, tickets, and long waits',
    speed: 'Speed',
    speed_yovel: 'Minutes',
    speed_others: 'Hours or business days',
    exchange_rate: 'Exchange Rate',
    exchange_rate_yovel: 'Optimized and 100% transparent',
    exchange_rate_others: 'Commercial + hidden fees',
    simplicity: 'Simplicity',
    simplicity_yovel: 'Call, pay, and use',
    simplicity_others: 'Registrations, approvals, and multiple apps',
    // FAQ
    faq_title: 'Frequently Asked Questions',
    faq_1_q: 'Is it safe to use Yovel?',
    faq_1_a: 'Absolutely. We use regulated partners and cutting-edge technology to ensure your money is always safe. Transparency is our pillar, and the entire process is clear and traceable.',
    faq_2_q: 'How does Yovel get a better exchange rate and no IOF?',
    faq_2_a: 'We operate with an optimized business model and strategic partnerships that give us access to more advantageous exchange rates. Unlike traditional banks, our structure is lean and focused on efficiency, passing these savings directly to you.',
    faq_3_q: 'Do I need to understand cryptocurrencies to use it?',
    faq_3_a: 'No. The complexity is on our side. For you, the experience is as simple as making a PIX and using a card. We handle all the "magic" so you don\'t have to worry about anything but enjoying your trip.',
    faq_4_q: 'Does the card work everywhere?',
    faq_4_a: 'Yes. Our partner cards are internationally branded, accepted at millions of establishments and ATMs worldwide. Wherever your traditional credit card works, your Yovel card will too.',
    // CTA Final
    final_cta_title: 'Ready to restore your money\'s freedom?',
    final_cta_subtitle: 'Click the button below and speak directly with one of our specialists. Get your no-obligation quote and discover why global citizens are swapping bureaucracy for Yovel\'s intelligence.',
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

  const t = (key) => translations[language][key] || key;

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
          <a href="https://wa.me/5521993765041" target="_blank" rel="noopener noreferrer" className="hero-cta amber-button">
            {t('hero_cta')}
          </a>
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
      <section className="method-section soft-gray-background">
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
