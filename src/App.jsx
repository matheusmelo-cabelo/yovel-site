import React, { useState, useMemo } from 'react';
import './App.css';

// --- Dicionário de Traduções ---
const translations = {
  pt: {
    // Hero
    hero_headline: 'Desbloqueie uma Vida Sem Fronteiras. Nós Engenheiramos a Estratégia Financeira. Você Vive o Upgrade.',
    hero_subheadline: 'Para Cidadãos Globais que suspeitam que sua vida internacional poderia ser mais barata e muito mais luxuosa. Nós provamos que sim, começando pelo seu dinheiro.',
    hero_cta: '➡️ Iniciar minha cotação',
    trust_text_1: 'Atendimento personalizado via WhatsApp',
    trust_text_2: 'Cotação instantânea e transparente',
    // Simulador
    simulator_title: 'Veja na prática quanto você economiza.',
    simulator_subtitle: 'Digite o valor que você quer enviar e veja o saldo final no seu cartão, já descontadas todas as taxas.',
    you_send: 'Você envia',
    recipient_gets: 'Beneficiário recebe',
    yovel_fee: 'Taxa de Serviço Yovel',
    network_fee: 'Taxa de Rede',
    total_fees: 'Total em taxas',
    exchange_rate_used: 'Câmbio utilizado',
    low_value_warning: 'Para valores abaixo de R$ 700, aplicam-se taxas diferenciadas.',
    savings_text: 'Você economiza',
    savings_comparison: 'em comparação com outros provedores.',
    specialist_cta: '💬 Falar com um especialista e ativar meu cartão',
    // Como Funciona
    how_it_works_title: 'Finanças globais, com a simplicidade do PIX.',
    step_1_title: 'Você nos chama no WhatsApp',
    step_1_desc: 'Nossa equipe concierge entende sua necessidade e gera sua cotação personalizada em minutos.',
    step_2_title: 'Você envia um PIX',
    step_2_desc: 'Transfira o valor em Reais para a conta segura da Yovel, como se estivesse fazendo qualquer pagamento do dia a dia.',
    step_3_title: 'Seu saldo global é ativado',
    step_3_desc: 'Nós cuidamos de toda a "mágica". Em minutos, seu saldo em Dólares fica disponível em seu cartão internacional, pronto para uso.',
    exclusive_cta: '💬 Quero minha cotação exclusiva no WhatsApp',
    // Benefícios
    benefits_title: 'Uma Consultoria Completa',
    benefits_subtitle: 'Além do melhor câmbio, a Yovel desbloqueia um mundo de benefícios para o cidadão global.',
    benefit_1_title: 'Salas VIP com Desconto',
    benefit_1_desc: 'Acesse salas VIP em aeroportos ao redor do mundo com descontos que só a nossa rede de parceiros oferece.',
    benefit_2_title: 'Seguro Viagem Inteligente',
    benefit_2_desc: 'Ajudamos você a escolher o seguro viagem com o melhor custo-benefício, evitando ciladas e garantindo sua tranquilidade.',
    benefit_3_title: 'Passagens Aéreas Otimizadas',
    benefit_3_desc: 'Nossa consultoria inclui a busca por passagens aéreas mais baratas, usando nosso conhecimento em milhas e programas de fidelidade.',
    // Tabela
    table_title: 'A escolha inteligente para o cidadão global.',
    feature: 'Funcionalidade',
    yovel_strategy: 'Estratégia Yovel',
    other_providers: 'Outros Provedores',
    iof: 'IOF',
    iof_yovel: 'Zero (sempre)',
    personal_consulting: 'Consultoria Pessoal',
    personal_consulting_yovel: 'Especialista dedicado para otimizar sua viagem',
    personal_consulting_others: 'Robôs, tickets e longas esperas',
    speed: 'Velocidade',
    speed_yovel: 'Minutos',
    speed_others: 'Horas ou dias úteis',
    exchange_rate: 'Câmbio',
    exchange_rate_yovel: 'Otimizado e 100% transparente',
    exchange_rate_others: 'Comercial + taxas embutidas',
    simplicity: 'Simplicidade',
    simplicity_yovel: 'Fale, pague e use',
    simplicity_others: 'Cadastros, aprovações e múltiplos apps',
    // FAQ
    faq_title: 'Perguntas Frequentes',
    faq_1_q: 'É seguro usar a Yovel?',
    faq_1_a: 'Absolutamente. Usamos parceiros regulamentados e tecnologia de ponta para garantir que seu dinheiro esteja sempre seguro. A transparência é nosso pilar, e todo o processo é feito de forma clara e rastreável.',
    faq_2_q: 'Como a Yovel consegue ter um câmbio melhor e sem IOF?',
    faq_2_a: 'Nós operamos com um modelo de negócio otimizado e parcerias estratégicas que nos permitem acesso a taxas de câmbio mais vantajosas. Ao contrário dos bancos tradicionais, nossa estrutura é enxuta e focada em eficiência, repassando essa economia diretamente para você.',
    faq_3_q: 'Preciso entender de criptomoedas para usar?',
    faq_3_a: 'Não. A complexidade fica do nosso lado. Para você, a experiência é tão simples quanto fazer um PIX e usar um cartão. Cuidamos de toda a "mágica" para que você não precise se preocupar com nada além de aproveitar sua viagem.',
    faq_4_q: 'O cartão funciona em qualquer lugar?',
    faq_4_a: 'Sim. Nossos cartões parceiros possuem bandeira internacional, aceita em milhões de estabelecimentos e caixas eletrônicos ao redor do mundo. Onde seu cartão de crédito tradicional funciona, o seu cartão Yovel também funcionará.',
    // CTA Final
    final_cta_title: 'Pronto para restaurar a liberdade do seu dinheiro?',
    final_cta_subtitle: 'Clique no botão abaixo e fale diretamente com um de nossos especialistas. Receba sua cotação sem compromisso e descubra por que cidadãos globais estão trocando a burocracia pela inteligência da Yovel.',
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

  const faqs = [
    { question: t('faq_1_q'), answer: t('faq_1_a') },
    { question: t('faq_2_q'), answer: t('faq_2_a') },
    { question: t('faq_3_q'), answer: t('faq_3_a') },
    { question: t('faq_4_q'), answer: t('faq_4_a') }
  ];

  return (
    <div className="App">
      <header className="hero-section">
        <h1 className="brand-name">YOVEL</h1>
        <div className="language-switcher">
          <button onClick={() => setLanguage('pt')} className={language === 'pt' ? 'active' : ''}>PT</button>
          <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
        </div>
        <div className="hero-content">
          <h1 className="hero-headline">{t('hero_headline')}</h1>
          <p className="hero-subheadline">{t('hero_subheadline')}</p>
          <a href="https://wa.me/5521993765041" target="_blank" rel="noopener noreferrer" className="hero-cta">{t('hero_cta')}</a>
          <div className="hero-trust-text">
            <span>✅ {t('trust_text_1')}</span>
            <span>✅ {t('trust_text_2')}</span>
          </div>
        </div>
      </header>

      <section id="simulator" className="simulator-section">
        <h2 className="section-title">{t('simulator_title')}</h2>
        <p className="section-subtitle">{t('simulator_subtitle')}</p>
        
        <div className="calculator-wrapper">
            {yovelResult.isLowValue && (
              <div className="low-value-warning">
                {t('low_value_warning')}
              </div>
            )}
            <div className="calculator-inputs">
                <div className="input-row">
                    <label>{t('you_send')}</label>
                    <input 
                        type="number" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        <option value="BRL">BRL</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
                <div className="swap-row">
                    <button onClick={handleSwapCurrencies} className="swap-button" title="Inverter moedas">⇅</button>
                </div>
                 <div className="input-row">
                    <label>{t('recipient_gets')}</label>
                    <input type="text" value={formatCurrency(yovelResult.finalValue, toCurrency)} readOnly />
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        <option value="BRL">BRL</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
            </div>

            <div className="calculator-breakdown">
                <div className="breakdown-row fee">
                    <span><span className="fee-dot yovel"></span>{t('yovel_fee')} ({(yovelResult.serviceRate * 100)}%)</span>
                    <span>- {formatCurrency(yovelResult.serviceFeeBRL, 'BRL')}</span>
                </div>
                <div className="breakdown-row fee">
                    <span><span className="fee-dot network"></span>{t('network_fee')}</span>
                    <span>- {formatCurrency(yovelResult.networkFeeBRL, 'BRL')}</span>
                </div>
                <div className="breakdown-row total-fees">
                    <span>{t('total_fees')}</span>
                    <span>= {formatCurrency(yovelResult.serviceFeeBRL + yovelResult.networkFeeBRL, 'BRL')}</span>
                </div>
                <div className="breakdown-row rate">
                    <span>{t('exchange_rate_used')}</span>
                    <span>{yovelResult.displayRate}</span>
                </div>
            </div>

            {savings > 0 && (
              <div className="savings-highlight">
                {t('savings_text')} <span className="savings-amount">{formatCurrency(savings, 'BRL')}</span> {t('savings_comparison')} 
              </div>
            )}

            <a href="https://wa.me/5521993765041" target="_blank" rel="noopener noreferrer" className="whatsapp-cta">
              {t('specialist_cta')}
            </a>
        </div>
      </section>

      <section className="how-it-works-section">
        <h2 className="section-title">{t('how_it_works_title')}</h2>
        <div className="steps-container">
          <div className="step-card"><div className="step-icon">1</div><h3 className="step-title">{t('step_1_title')}</h3><p className="step-description">{t('step_1_desc')}</p></div>
          <div className="step-card"><div className="step-icon">2</div><h3 className="step-title">{t('step_2_title')}</h3><p className="step-description">{t('step_2_desc')}</p></div>
          <div className="step-card"><div className="step-icon">3</div><h3 className="step-title">{t('step_3_title')}</h3><p className="step-description">{t('step_3_desc')}</p></div>
        </div>
        <a href="https://wa.me/5521993765041" target="_blank" rel="noopener noreferrer" className="whatsapp-cta">
          {t('exclusive_cta')}
        </a>
      </section>

      <section className="method-section">
        <h2 className="section-title">{t('method_title')}</h2>
        <p className="section-subtitle">{t('method_copy_1')}</p>
        <p className="section-description">{t('method_copy_2')}</p>
        <div className="method-steps-container">
          <div className="method-step">
            <h3 className="step-title">{t('gateway_step_title')}</h3>
            <p className="step-description">{t('gateway_step_desc')}</p>
          </div>
          <div className="method-step">
            <h3 className="step-title">{t('destination_step_title')}</h3>
            <p className="step-description">{t('destination_step_desc_intro')}</p>
            <ul>
              <li>{t('destination_step_benefit_1')}</li>
              <li>{t('destination_step_benefit_2')}</li>
              <li>{t('destination_step_benefit_3')}</li>
              <li>{t('destination_step_benefit_4')}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pricing-section">
        <h2 className="section-title">{t('pricing_title')}</h2>
        <p className="section-subtitle">{t('pricing_copy_intro')}</p>
        <div className="pricing-details-container">
          <div className="pricing-card">
            <h3 className="pricing-card-title">{t('engineering_fee_title')}</h3>
            <p className="pricing-card-description">{t('engineering_fee_desc')}</p>
          </div>
          <div className="pricing-card">
            <h3 className="pricing-card-title">{t('upgrade_participation_title')}</h3>
            <p className="pricing-card-description">{t('upgrade_participation_desc')}</p>
          </div>
        </div>
        <p className="pricing-guarantee">{t('guarantee_text')}</p>
      </section>

      <section className="faq-section">
        <h2 className="section-title">{t('faq_title')}</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} index={index} openFaq={openFaq} setOpenFaq={setOpenFaq} />
          ))}
        </div>
      </section>

      <section className="final-cta-section">
        <h2 className="final-cta-headline">{t('final_cta_title')}</h2>
        <p className="section-subtitle">{t('final_cta_subtitle')}</p>
        <a href="https://wa.me/5521993765041" target="_blank" rel="noopener noreferrer" className="whatsapp-cta">
              {t('final_cta_button')}
            </a>
      </section>
    </div>
  );
}

export default App;
