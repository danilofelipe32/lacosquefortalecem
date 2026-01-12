import React, { useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const texts = [
      'Laços que <span class="text-psy-600">Fortalecem</span>',
      'Psicologia <span class="text-psy-600">Educacional</span>',
      'Acolher <span class="text-psy-600">transforma</span>',
      'Vínculos <span class="text-psy-600">educam</span>'
    ];

    const morphTime = 1.5;
    const cooldownTime = 1.5;
    let textIndex = 0;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let animationId: number;

    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    if (!text1 || !text2) return;

    text1.innerHTML = texts[textIndex % texts.length];
    text2.innerHTML = texts[(textIndex + 1) % texts.length];

    function setMorph(fraction: number) {
      if (!text1 || !text2) return;
      
      const blurVal = Math.min(8 / fraction - 8, 100);
      const opacityVal = Math.pow(fraction, 0.4) * 100;

      text2.style.filter = `blur(${blurVal}px)`;
      text2.style.opacity = `${opacityVal}%`;

      const invFraction = 1 - fraction;
      const invBlur = Math.min(8 / invFraction - 8, 100);
      const invOpacity = Math.pow(invFraction, 0.4) * 100;

      text1.style.filter = `blur(${invBlur}px)`;
      text1.style.opacity = `${invOpacity}%`;
    }

    function doCooldown() {
      if (!text1 || !text2) return;
      morph = 0;
      text2.style.filter = "";
      text2.style.opacity = "100%";
      text1.style.filter = "";
      text1.style.opacity = "0%";
    }

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    }

    function animate() {
      animationId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
          if(text1 && text2) {
             text1.innerHTML = texts[textIndex % texts.length];
             text2.innerHTML = texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden hero-pattern">
      {/* Abstract Shapes */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/40 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-psy-300/30 rounded-full mix-blend-overlay filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-white/70 backdrop-blur-sm border border-psy-200 text-psy-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
          Projeto Preventivo 2025
        </span>
        
        {/* Gooey Effect Container */}
        <div className="relative h-24 md:h-32 w-full flex justify-center items-center mb-4">
          <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
            <defs>
              <filter id="threshold">
                <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 255 -140" />
              </filter>
            </defs>
          </svg>
          
          <div className="relative w-full h-full flex items-center justify-center text-5xl md:text-7xl font-sans font-bold leading-tight tracking-tight" style={{ filter: 'url(#threshold)' }}>
            <span ref={text1Ref} className="absolute inline-block select-none text-center w-full text-slate-900"></span>
            <span ref={text2Ref} className="absolute inline-block select-none text-center w-full opacity-0 text-slate-900"></span>
          </div>
        </div>

        <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
          Uma abordagem institucional e espontânea para aproximar a psicologia do cotidiano escolar, prevenindo conflitos e promovendo saúde mental.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#sobre" className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition hover:shadow-lg hover:-translate-y-1 duration-300">
            Conhecer o Projeto
          </a>
          <a href="#resultados" className="px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 border border-white rounded-full font-medium hover:bg-white hover:text-psy-700 transition flex items-center gap-2 group shadow-sm">
            Ver Indicadores <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;