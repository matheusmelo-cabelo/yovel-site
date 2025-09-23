import React, { useState, useRef, useEffect } from 'react';
import { useIntersection } from './useintersection';
import './App.css';

// --- Dicionário de Traduções ---
const translations = {
  pt: {
    hero_headline: 'Desbloqueie uma Vida Sem Fronteiras. Nós Orquestramos a Estratégia Financeira. Você Vive o Upgrade.',
    hero_subheadline: 'Para Cidadãos Globais que suspeitam que sua vida internacional poderia ser mais barata e muito mais luxuosa. Nós provamos que sim, começando pelo seu dinheiro.',
    hero_cta: 'Descobrir o Método Yovel',
    trust_text_1: 'Estratégia Personalizada',
    trust_text_2: 'Atendimento Concierge Global',
    problem_section_title: 'Sua vida é global. Seu sistema financeiro não é.',
    problem_section_paragraph: 'Você já sentiu que paga uma "taxa de expatriado" invisível? Cada vez que seu dinheiro cruza uma fronteira, o atrito – taxas ocultas, burocracia, câmbio desfavorável – desgasta seu capital e limita seu potencial. Esta fricção não é um custo de vida. É uma falha de design. E nós a consertamos.',
    method_section_title: 'Nosso Método: Da Otimização ao Upgrade.',
    method_step1_title: 'Passo 1: O Gateway (A Otimização Financeira)',
    method_step1_desc: 'Primeiro, estancamos a sangria. Mapeamos cada ponto de fricção em suas finanças internacionais e aplicamos uma estratégia para colocar, em média, 15% do seu orçamento de volta no seu bolso. Este é o seu capital recuperado. É a prova matemática de que nosso método funciona.',
    method_step2_title: 'Passo 2: O Destino (O Upgrade de Lifestyle)',
    method_step2_desc: 'Nós reinvestimos essa economia em inteligência. Com o capital que recuperamos, destravamos um nível de experiência antes inacessível. O dinheiro que você deixa de perder para os bancos se torna a ferramenta para acessar Salas VIP, otimizar passagens aéreas e ter a fluidez de gastar como um local, em qualquer lugar do mundo.',
    partnership_section_title: 'Seu Upgrade de Destino: Mais Longe, por Menos.',
    partnership_body: 'Acreditamos que cada real economizado deve trabalhar para você. Por isso, a Yovel firma parcerias estratégicas para transformar o capital que recuperamos em experiências valiosas. Anunciamos nossa parceria com a Confins, que oferece aos clientes Yovel acesso a passagens aéreas com tarifas e condições especiais. Nós cuidamos da engenharia financeira; nossos parceiros cuidam do seu roteiro.',
    testimonial_section_title: 'A Confiança de Quem Vive Sem Fronteiras.',
    testimonial_quote: '“Com a consultoria da Yovel, minha conversão de Euros ficou 1,4% mais barata do que em qualquer outra plataforma do mercado. Mas a verdadeira mágica aconteceu no aeroporto. O acesso à sala VIP, que me custaria R$ 320, com a estratégia deles saiu por apenas R$ 178 – uma economia de 44%. A Yovel não entrega apenas um câmbio melhor; entrega uma experiência de viagem mais inteligente e vantajosa.”',
    testimonial_author: '- Patricia Brambila, Cidadã Global',
    investment_section_title: 'Um Investimento, Não um Custo.',
    engineering_fee_title: 'Taxa de Engenharia Estratégica: R$ 250',
    engineering_fee_desc: 'Este é o investimento para nos ter como seu "CFO Internacional". Com ele, mergulhamos nas suas finanças, desenhamos seu plano de otimização e abrimos a porta do Gateway.',
    upgrade_participation_title: 'Participação no Upgrade: 40% do Valor Gerado',
    upgrade_participation_desc: 'Nós só vencemos quando você vence. Nossa remuneração é uma participação sobre todo o valor que geramos para você, seja na economia direta de capital ou nos benefícios de lifestyle que destravamos.',
    engineer_section_title: 'O Estrategista por Trás da Yovel',
    engineer_quote: '“Meu único objetivo é usar meu conhecimento para destravar um nível de liberdade financeira e de vida que meus clientes não sabiam ser possível. A Yovel é o método que criei para fazer isso acontecer.”',
    engineer_name: '- Matheus Melo, Fundador',
    final_cta_title: 'Pronto para girar a chave?',
    final_cta_subtitle: 'A vida global que você quer — mais inteligente, mais luxuosa e com menos atrito — está a duas portas de distância. Mas tudo começa com um único passo.',
    final_cta_button: 'Agendar Meu Diagnóstico',
  },
  en: { // Simplified EN for brevity
    hero_headline: 'Unlock a Life Without Borders. We Orchestrate, You Upgrade.',
    hero_subheadline: 'For Global Citizens who suspect their international life could be cheaper and more luxurious.',
    hero_cta: 'Discover the Yovel Method',
    trust_text_1: 'Personalized Strategy',
    trust_text_2: 'Global Concierge Service',
    problem_section_title: 'The Invisible Fee of Being a Global Citizen.',
    problem_section_paragraph: 'Every time your money crosses a border, friction erodes your capital. This isn\'t a cost of living. It\'s a design flaw. We fix it.',
    method_section_title: 'The Yovel Method: Simple, Transparent, Powerful.',
    method_step1_title: 'Step 1: The Gateway',
    method_step1_desc: 'We analyze your financial and tax structure to find friction points. Then, we design a plan to open your "Gateway"—the most efficient route for your money to enter the global financial system.',
    method_step2_title: 'Step 2: The Destination',
    method_step2_desc: 'With the Gateway established, your capital now flows intelligently. The "Destination" is the application of this optimized capital: for investments, luxury travel at reduced costs, or simply living your global life with more purchasing power.',
    partnership_section_title: 'The Upgrade in Action: Confins Partnership',
    partnership_section_subtitle: 'Where savings become experience.',
    partnership_body: 'After optimizing your finances, we connect you with our travel partner, Confins. The capital we recover becomes negotiating power for better flights.',
    testimonial_section_title: 'A Global Citizen\'s Journey',
    testimonial_quote: '"I had no idea how much I was leaving on the table. Yovel not only saved me money but gave me a clarity and peace of mind that are worth so much more. It\'s like having a CFO for my international life."',
    testimonial_author: '- Yovel Client, Digital Nomad',
    investment_section_title: 'An Investment, Not a Cost.',
    engineering_fee_title: 'Strategic Engineering Fee: BRL 250',
    engineering_fee_desc: 'The investment to design your optimization plan and open the Gateway.',
    upgrade_participation_title: 'Upgrade Participation: 40% of Generated Value',
    upgrade_participation_desc: 'We only win when you win. Our fee is a share of the value we generate for you.',
    engineer_section_title: 'The Strategist Behind Yovel',
    engineer_quote: '“My sole purpose is to use my knowledge to unlock a level of financial and life freedom for my clients. Yovel is the method.”',
    engineer_name: '- Matheus Melo, Founder',
    final_cta_title: 'Ready to turn the key?',
    final_cta_subtitle: 'Imagine your next trip without the anxiety of currency conversion or surprise fees.',
    final_cta_button: 'Schedule My Diagnosis',
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
                <h1 className="hero-headline">{t('hero_headline')}</h1>
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
            <div className="investment-details-container">
                <div className="investment-card">
                    <h3 className="investment-card-title">{t('engineering_fee_title')}</h3>
                    <p className="investment-card-description">{t('engineering_fee_desc')}</p>
                </div>
                <div className="investment-card">
                    <h3 className="investment-card-title">{t('upgrade_participation_title')}</h3>
                    <p className="investment-card-description">{t('upgrade_participation_desc')}</p>
                </div>
            </div>
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
