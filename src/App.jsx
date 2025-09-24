import React, { useState, useRef, useEffect } from 'react';
import { useIntersection } from './useintersection';
import './App.css';

// --- Dicionário de Traduções ---
const translations = {
  pt: {
    hero_headline: 'Desbloqueie uma Vida Sem Fronteiras.<br />Nós Orquestramos a Estratégia Financeira.<br />Você Vive o Upgrade.',
    hero_subheadline: 'Somos um concierge financeiro que primeiro otimiza seu câmbio para eliminar taxas e, além disso, te entrega as estratégias para destravar benefícios de viagem como acesso a Salas VIP e passagens otimizadas.',
    hero_cta: 'Descobrir o Método Yovel',
    trust_text_1: 'Estratégia Personalizada',
    trust_text_2: 'Atendimento Concierge Global',
    problem_section_title: 'Sua vida é global. Seu sistema financeiro não é.',
    problem_section_paragraph: 'Você já sentiu que paga uma "taxa de fricção global"? Cada vez que seu dinheiro cruza uma fronteira, o atrito — taxas ocultas, burocracia, câmbio desfavorável — desgasta seu capital. Esta fricção não é um custo de vida. É uma falha de design do sistema financeiro tradicional. E nós a consertamos.',
    method_section_title: 'O Método Yovel: Dois Pilares de Otimização.',
    method_step1_title: '1. Liberte seu dinheiro do sistema.',
    method_step1_desc: 'Na prática, analisamos suas necessidades de câmbio e executamos a conversão de moeda da forma mais inteligente do mercado, eliminando o IOF e taxas de spread abusivas. É assim que estancamos a sangria, colocando em média 15% do seu orçamento de volta no seu bolso. Este é o seu capital recuperado.',
    method_step2_title: '2. Transforme Economia em Poder de Compra.',
    method_step2_desc: 'Nossa otimização não para no câmbio. A economia de capital que geramos é apenas o começo. Como seus estrategistas, nós também te entregamos o conhecimento para destravar um novo patamar de conforto e economia. Mostramos a você os caminhos para acessar Salas VIP por uma fração do preço, encontrar passagens aéreas com melhor custo-benefício e aproveitar vantagens que o sistema de viagens tradicional não revela.',
    partnership_section_title: 'Transformando Economia em Experiência.',
    partnership_body: 'Acreditamos que cada real economizado na sua transferência deve trabalhar para você. Por isso, a Yovel firma parcerias estratégicas para transformar o capital que recuperamos em experiências valiosas. Anunciamos nossa parceria com a Confins, que oferece aos clientes Yovel acesso a passagens aéreas com tarifas e condições especiais. Nós cuidamos da engenharia financeira; nossos parceiros cuidam do seu roteiro.',
    testimonial_section_title: 'A Confiança de Quem Vive Sem Fronteiras.',
    testimonial_quote: '“Com a consultoria da Yovel, minha conversão de Euros ficou 1,4% mais barata do que em qualquer outra plataforma do mercado. Mas a verdadeira mágica aconteceu no aeroporto. O acesso à sala VIP, que me custaria R$ 320, com a estratégia deles saiu por apenas R$ 178 – uma economia de 44%. A Yovel não entrega apenas um câmbio melhor; entrega uma experiência de viagem mais inteligente e vantajosa.”',
    testimonial_author: '- Patricia Brambila, Cidadã Global',
    investment_section_title: 'Um Investimento em Estratégia, Não um Custo.',
    investment_section_subtitle: 'A Yovel não cobra pelo que fazemos, mas pelo valor que geramos.',
    investment_section_body: 'Nosso compromisso é com o seu sucesso. Por isso, a nossa remuneração é uma <strong>participação sobre o valor que geramos para você</strong>, não sobre o que você gasta. Isso significa que só somos remunerados quando conseguimos gerar economia ou destravar benefícios. Se não há ganho para você, não há custo para você. É um compromisso total com a sua vitória.',
    engineer_section_title: 'O Estrategista por Trás da Yovel',
    engineer_quote: '“Meu único objetivo é usar meu conhecimento para destravar um nível de liberdade financeira e de vida que meus clientes não sabiam ser possível. A Yovel é o método que criei para fazer isso acontecer.”',
    engineer_name: '- Matheus Melo, Fundador',
    faq_section_paragraph: 'Você pode usar a Yovel apenas para otimizar suas transferências ou pode aproveitar a nossa consultoria para otimizar suas viagens. A escolha é sua.',
    final_cta_title: 'Pronto para girar a chave?',
    final_cta_subtitle: 'A vida global que você quer — mais inteligente, mais luxuosa e com menos atrito — está a um clique de distância. Tudo começa com um único passo.',
    final_cta_button: 'Agendar Meu Diagnóstico Gratuito',
  },
  en: {
    hero_headline: 'Unlock a Life Without Borders.<br />We Orchestrate the Financial Strategy.<br />You Live the Upgrade.',
    hero_subheadline: 'We are a financial concierge that first optimizes your currency exchange to eliminate fees and then delivers strategies to unlock travel benefits like VIP lounge access and optimized airfare.',
    hero_cta: 'Discover the Yovel Method',
    trust_text_1: 'Personalized Strategy',
    trust_text_2: 'Global Concierge Service',
    problem_section_title: 'Your life is global. Your financial system is not.',
    problem_section_paragraph: 'Have you ever felt like you\'re paying a "global friction tax"? Every time your money crosses a border, friction—hidden fees, bureaucracy, unfavorable exchange rates—erodes your capital. This friction isn\'t a cost of living. It\'s a design flaw in the traditional financial system. And we fix it.',
    method_section_title: 'The Yovel Method: Two Pillars of Optimization.',
    method_step1_title: '1. Free Your Money from the System.',
    method_step1_desc: 'In practice, we analyze your currency exchange needs and execute the conversion in the most intelligent way on the market, eliminating IOF and abusive spread fees. This is how we stop the bleeding, putting an average of 15% of your budget back in your pocket. This is your recovered capital.',
    method_step2_title: '2. Turn Savings into Purchasing Power.',
    method_step2_desc: 'Our optimization doesn\'t stop at exchange rates. The capital savings we generate are just the beginning. As your strategists, we also provide the knowledge to unlock a new level of comfort and savings. We show you the paths to access VIP lounges for a fraction of the price, find more cost-effective airline tickets, and take advantage of perks the traditional travel system doesn\'t reveal.',
    partnership_section_title: 'Turning Savings into Experience.',
    partnership_body: 'We believe every dollar saved on your transfer should work for you. That\'s why Yovel forms strategic partnerships to turn the capital we recover into valuable experiences. We are announcing our partnership with Confins, which offers Yovel clients access to airline tickets with special rates and conditions. We handle the financial engineering; our partners handle your itinerary.',
    testimonial_section_title: 'The Trust of Those Who Live Without Borders.',
    testimonial_quote: '“With Yovel\'s consulting, my Euro conversion was 1.4% cheaper than on any other platform on the market. But the real magic happened at the airport. Access to the VIP lounge, which would have cost me BRL 320, was only BRL 178 with their strategy – a 44% savings. Yovel doesn\'t just deliver a better exchange rate; it delivers a smarter, more advantageous travel experience.”',
    testimonial_author: '- Patricia Brambila, Global Citizen',
    investment_section_title: 'An Investment in Strategy, Not a Cost.',
    investment_section_subtitle: 'Yovel doesn\'t charge for what we do, but for the value we generate.',
    investment_section_body: 'Our commitment is to your success. Therefore, our compensation is a <strong>share of the value we generate for you</strong>, not what you spend. This means we only get paid when we manage to generate savings or unlock benefits. If there is no gain for you, there is no cost to you. It is a total commitment to your victory.',
    engineer_section_title: 'The Strategist Behind Yovel',
    engineer_quote: '“My sole objective is to use my knowledge to unlock a level of financial and life freedom that my clients didn\'t know was possible. Yovel is the method I created to make that happen.”',
    engineer_name: '- Matheus Melo, Founder',
    faq_section_paragraph: 'You can use Yovel just to optimize your transfers, or you can take advantage of our consulting to optimize your travels. The choice is yours.',
    final_cta_title: 'Ready to turn the key?',
    final_cta_subtitle: 'The global life you want—smarter, more luxurious, and with less friction—is just a click away. It all starts with a single step.',
    final_cta_button: 'Schedule My Free Diagnosis',
  }
};

// --- Componente de Animação ---
const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const isVisible = useIntersection(ref, '-100px');
  return (
    <div ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

// --- Componente Principal ---
function App() {
  const [language, setLanguage] = useState('pt');
  const problemSectionRef = useRef(null);
  const [heroScroll, setHeroScroll] = useState(0);

  const t = (key) => translations[language][key] || key;

  const handleScrollToProblem = () => {
    problemSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Lógica do Parallax
  useEffect(() => {
    const handleScroll = () => {
        setHeroScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">

      {/* Seção 1: Hero */}
      <section className="hero-section">
        <div 
            className="hero-background-image" 
            style={{ 
                backgroundImage: `url(/assets/yovel-cup.png)`,
                transform: `translateY(${heroScroll * 0.3}px)` // Efeito Parallax
            }}
        ></div>
        <h1 className="brand-name">
            YOVEL
        </h1>
        <div className="language-switcher">
          <button onClick={() => setLanguage('pt')} className={language === 'pt' ? 'active' : ''}>PT</button>
          <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</button>
        </div>
        <div className="hero-content">
            <FadeInSection>
                <h1 className="hero-headline" dangerouslySetInnerHTML={{ __html: t('hero_headline') }}></h1>
            </FadeInSection>
            <FadeInSection>
                <p className="hero-subheadline">{t('hero_subheadline')}</p>
            </FadeInSection>
            <FadeInSection>
                <div className="hero-trust-text">
                    <span>✅ {t('trust_text_1')}</span>
                    <span>✅ {t('trust_text_2')}</span>
                </div>
            </FadeInSection>
            <FadeInSection>
                <button onClick={handleScrollToProblem} className="amber-button">
                    <span className="arrow">➡️</span>
                    {t('hero_cta')}
                </button>
            </FadeInSection>
        </div>
      </section>

      {/* Seção 2: O Problema */}
      <section className="problem-section white-background" ref={problemSectionRef}>
        <FadeInSection>
          <h2 className="section-title serif-font">{t('problem_section_title')}</h2>
          <p className="section-paragraph sans-serif-font">{t('problem_section_paragraph')}</p>
        </FadeInSection>
      </section>

      {/* Seção 3: O Método Yovel */}
      <section className="method-section soft-gray-background">
        <FadeInSection>
            <h2 className="section-title serif-font">{t('method_section_title')}</h2>
        </FadeInSection>
        <FadeInSection>
            <div className="method-visual-proof">
                <div className="method-step-container">
                    <span className="icon gateway-icon">💰</span>
                    <span className="label">Dinheiro</span>
                </div>
                <span className="arrow-long">••••►</span>
                <div className="method-step-container">
                    <span className="icon key-icon">🔑</span>
                    <span className="label">Yovel</span>
                </div>
                <span className="arrow-long">••••►</span>
                <div className="method-step-container">
                     <span className="icon destination-icon">✈️</span>
                    <span className="label">Lifestyle</span>
                </div>
            </div>
        </FadeInSection>
        <div className="method-steps">
            <FadeInSection>
                <div className="method-step">
                    <h3>{t('method_step1_title')}</h3>
                    <p>{t('method_step1_desc')}</p>
                </div>
            </FadeInSection>
            <FadeInSection>
                <div className="method-step">
                    <h3>{t('method_step2_title')}</h3>
                    <p>{t('method_step2_desc')}</p>
                </div>
            </FadeInSection>
        </div>
      </section>

      {/* Seção 4: Parceria */}
      <section className="partnership-section white-background">
        <div className="partnership-container">
            <FadeInSection>
                <div className="partnership-content">
                    <h2 className="section-title serif-font">{t('partnership_section_title')}</h2>
                    <p>{t('partnership_body')}</p>
                </div>
            </FadeInSection>
            <FadeInSection>
                <div className="partnership-visual">
                    <img src="/assets/partner-logo.jpg" alt="Logo Parceiro"/>
                </div>
            </FadeInSection>
        </div>
      </section>

      {/* Seção 5: Depoimento */}
      <section className="testimonial-section soft-gray-background">
          <FadeInSection>
              <h2 className="section-title serif-font">{t('testimonial_section_title')}</h2>
              <div className="testimonial-content-container">
                  <div className="testimonial-image-container">
                      <img src="/assets/testimonial-client.jpeg" alt="Patricia Brambila" className="testimonial-client-photo" />
                  </div>
                  <div className="testimonial-text-container">
                      <div className="testimonial-quote-container">
                          <span className="quote-mark open">“</span>
                          <p className="testimonial-quote">{t('testimonial_quote')}</p>
                          <span className="quote-mark close">”</span>
                      </div>
                      <p className="testimonial-author">{t('testimonial_author')}</p>
                  </div>
              </div>
          </FadeInSection>
      </section>

      {/* Seção 6: Investimento */}
      <section className="investment-section white-background">
        <FadeInSection>
            <h2 className="section-title serif-font">{t('investment_section_title')}</h2>
            <h3 className="section-subtitle sans-serif-font">{t('investment_section_subtitle')}</h3>
            <p className="section-paragraph sans-serif-font" dangerouslySetInnerHTML={{ __html: t('investment_section_body').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
        </FadeInSection>
      </section>

      {/* Seção 7: O Engenheiro */}
      <section className="engineer-section soft-gray-background">
        <FadeInSection>
            <div className="engineer-photo-container">
                <img src="/assets/your-photo.JPG" alt="Fundador" className="engineer-photo" />
            </div>
            <h2 className="section-title serif-font">{t('engineer_section_title')}</h2>
            <p className="engineer-quote sans-serif-font">{t('engineer_quote')}</p>
            <p className="engineer-name sans-serif-font">{t('engineer_name')}</p>
        </FadeInSection>
      </section>

      {/* Seção de FAQ */}
      <section className="faq-section soft-gray-background">
        <FadeInSection>
          <p className="section-paragraph sans-serif-font">{t('faq_section_paragraph')}</p>
        </FadeInSection>
      </section>

      {/* Seção 8: CTA Final */}
      <section className="final-cta-section yovel-blue-background">
        <FadeInSection>
            <h2 className="final-cta-headline serif-font">{t('final_cta_title')}</h2>
            <p className="section-subtitle white-text">{t('final_cta_subtitle')}</p>
            <a href="https://wa.me/5521993765041" target="_blank" rel="noopener noreferrer" className="amber-button">
                <span className="button-icon" aria-label="chat">💬</span>
                {t('final_cta_button')}
            </a>
        </FadeInSection>
      </section>
    </div>
  );
}

export default App;
