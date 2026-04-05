/**
 * ═══════════════════════════════════════════════════════════════
 *  CRUCE REYNOSA — ADS.JS
 *  Publicidad: slides, estilos, rotación, clicks
 *  Edita ESTE archivo para cambiar anuncios sin tocar index.html
 * ═══════════════════════════════════════════════════════════════
 *
 *  CÓMO AGREGAR / EDITAR UN ANUNCIO:
 *  1. Agrega el estilo CSS en injectAdStyles()
 *  2. Agrega el HTML del slide en adBannerHTML() o adBannerPremiumHTML()
 *  3. Actualiza AD_COUNT o AD_PREMIUM_COUNT según corresponda
 *  4. Actualiza AD_DOT_CLASS o AD_PREMIUM_DOT_THEME según el fondo del slide
 *     ('on-dark' = fondo oscuro, 'on-light' = fondo claro)
 */

// ── Configuración ──────────────────────────────────────────────

/** Número total de slides en el banner pequeño */
const AD_COUNT = 6;

/**
 * Tema de los dots indicadores para cada slide del banner pequeño.
 * 'on-dark'  → el dot se ve sobre fondo oscuro  (blanco semitransparente)
 * 'on-light' → el dot se ve sobre fondo claro   (negro semitransparente)
 * Índice 0 = primer slide, etc.
 */
const AD_DOT_CLASS = ['on-light', 'on-dark', 'on-dark', 'on-light', 'on-dark', 'on-light'];

/** Número total de slides en el banner premium */
const AD_PREMIUM_COUNT = 2;

/**
 * Tema de los dots para cada slide del banner premium.
 * 'theme-dark'  → fondo oscuro
 * 'theme-light' → fondo claro
 */
const AD_PREMIUM_DOT_THEME = ['theme-dark', 'theme-light'];

/** WhatsApp del anunciante de visas (slide premium 0) */
const VISA_WHATSAPP = '528991346597';

// ── Estado interno ─────────────────────────────────────────────
let adIndex = 0;
let adPremiumIndex = 0;

// ── CSS de los anuncios ────────────────────────────────────────
/**
 * Inyecta todos los estilos de los banners en el <head>.
 * Llamado una sola vez al cargar la página.
 */
function injectAdStyles() {
  const style = document.createElement('style');
  style.id = 'ad-styles';
  style.textContent = `
    /* ── Small banner container ── */
    .ad-banner {
      border-radius: 12px; margin: 0 18px 16px; overflow: hidden;
      height: 148px; position: relative; cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .ad-banner:hover { transform: translateY(-2px); }
    .ad-slide {
      position: absolute; inset: 0; opacity: 0;
      transition: opacity 0.7s ease; display: flex; align-items: stretch;
    }
    .ad-slide.active { opacity: 1; }

    /* ── Slide 0: Anúnciate (fondo blanco) ── */
    .ad-slide-new {
      background: #ffffff; border: 1px solid #d4bc82;
      display: flex; align-items: stretch;
    }
    .ad-slide-new::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0;
      height: 5px; background: linear-gradient(90deg, #b8922a, #E2C46D, #C9A84C, #b8922a);
    }
    .ad-slide-new::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 5px; background: linear-gradient(90deg, #b8922a, #E2C46D, #C9A84C, #b8922a); z-index: 2;
    }
    .ad-new-left {
      flex: 1; display: flex; flex-direction: column; justify-content: center;
      padding: 12px 0 12px 18px; position: relative; z-index: 2;
    }
    .ad-new-eyebrow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 8px;
      letter-spacing: 3.5px; color: #888; text-transform: uppercase;
      margin-bottom: 4px; font-weight: 600;
    }
    .ad-new-headline {
      font-family: 'Barlow Condensed', sans-serif; font-size: 38px;
      font-weight: 900; line-height: 0.95; text-transform: uppercase;
      margin-bottom: 6px; letter-spacing: -0.5px;
    }
    .ad-new-headline .black { color: #0d0d0d; }
    .ad-new-headline .gold  { color: #C9A84C; }
    .ad-new-tagline {
      font-family: 'Barlow Condensed', sans-serif; font-size: 8.5px;
      letter-spacing: 2.5px; color: #888; text-transform: uppercase; font-weight: 600;
    }
    .ad-new-divider {
      width: 1px; margin: 14px 0;
      background: linear-gradient(to bottom, transparent, #C9A84C, transparent);
      flex-shrink: 0; align-self: stretch;
    }
    .ad-new-right {
      width: 164px; flex-shrink: 0; display: flex; flex-direction: column;
      justify-content: center; align-items: flex-start;
      padding: 10px 14px 14px; gap: 5px; position: relative; z-index: 2;
    }
    .ad-new-contact-row { display: flex; align-items: center; gap: 6px; }
    .ad-new-icon { font-size: 13px; flex-shrink: 0; line-height: 1; }
    .ad-new-contact-text {
      font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 700;
      color: #0d0d0d; letter-spacing: 0.2px; line-height: 1.2;
    }
    .ad-new-cta {
      margin-top: 6px; display: inline-block; background: #0d0d0d; color: #ffffff;
      font-family: 'Barlow Condensed', sans-serif; font-size: 8px; font-weight: 800;
      letter-spacing: 2px; text-transform: uppercase; padding: 5px 12px;
      border-radius: 2px; align-self: stretch; text-align: center; white-space: nowrap;
    }

    /* ── Slide 1: Dark gold HORUS ── */
    .ad-slide-0 {
      background: linear-gradient(135deg, #0d0b08 0%, #1c1508 55%, #0d0b08 100%);
      border: 1px solid #C9A84C50;
    }
    .ad-slide-0::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, #C9A84C, transparent);
    }
    .ad-s0-left {
      flex: 1; display: flex; flex-direction: column; justify-content: center;
      padding: 20px 0 20px 22px; position: relative; z-index: 2;
    }
    .ad-s0-eyebrow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px;
      letter-spacing: 3px; color: #8a7035; text-transform: uppercase; margin-bottom: 8px;
    }
    .ad-s0-brand {
      font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 600;
      letter-spacing: 8px; color: #C9A84C; text-transform: uppercase;
      line-height: 1; margin-bottom: 8px;
    }
    .ad-s0-sub {
      font-family: 'Barlow Condensed', sans-serif; font-size: 10px;
      letter-spacing: 2.5px; color: #777777; text-transform: uppercase;
    }
    .ad-s0-right {
      width: 110px; display: flex; align-items: center; justify-content: center; opacity: 0.07;
    }

    /* ── Slide 2: Kemper Life (dark blue) ── */
    .ad-slide-4 {
      background: linear-gradient(135deg, #0a1628 0%, #132040 60%, #0e1b36 100%);
      border: 1px solid #1e3a6e; display: flex; align-items: stretch;
    }
    .ad-slide-4::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(90deg, #c41230, #e8192c, #c41230);
    }
    .ad-kemper-left {
      flex: 1; display: flex; flex-direction: column; justify-content: center;
      padding: 14px 12px 14px 18px; border-right: 1px solid #1e3a6e;
    }
    .ad-kemper-logo {
      font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 900;
      letter-spacing: 1px; color: #ffffff; text-transform: uppercase;
      margin-bottom: 6px; line-height: 1;
    }
    .ad-kemper-logo span { color: #e8192c; font-weight: 400; font-style: italic; text-transform: none; }
    .ad-kemper-headline {
      font-family: 'Barlow Condensed', sans-serif; font-size: 17px; font-weight: 700;
      color: #ffffff; line-height: 1.2; margin-bottom: 8px;
    }
    .ad-kemper-tags { display: flex; flex-wrap: wrap; gap: 4px; }
    .ad-kemper-tag {
      border: 1px solid rgba(255,255,255,0.35); border-radius: 2px; padding: 2px 5px;
      font-family: 'Barlow Condensed', sans-serif; font-size: 8px; font-weight: 700;
      letter-spacing: 0.5px; color: rgba(255,255,255,0.8); text-transform: uppercase; white-space: nowrap;
    }
    .ad-kemper-right {
      width: 148px; flex-shrink: 0; display: flex; flex-direction: column;
      justify-content: center; padding: 12px 14px;
    }
    .ad-kemper-agent {
      font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 800;
      letter-spacing: 0.3px; color: #f0c040;
      text-decoration: underline; text-decoration-color: #f0c040; margin-bottom: 1px;
    }
    .ad-kemper-role { font-family: 'Barlow', sans-serif; font-size: 8px; color: rgba(255,255,255,0.55); margin-bottom: 6px; }
    .ad-kemper-callnow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 7px; font-weight: 700;
      letter-spacing: 1.5px; color: rgba(255,255,255,0.45); text-transform: uppercase; margin-bottom: 2px;
    }
    .ad-kemper-phone {
      font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 900;
      color: #f0c040; line-height: 1; margin-bottom: 2px; letter-spacing: 0.5px;
    }
    .ad-kemper-altphones { font-family: 'Barlow', sans-serif; font-size: 7.5px; color: rgba(255,255,255,0.5); margin-bottom: 7px; }
    .ad-kemper-divider { height: 1px; background: rgba(255,255,255,0.12); margin-bottom: 6px; }
    .ad-kemper-email { font-family: 'Barlow', sans-serif; font-size: 7.5px; color: rgba(255,255,255,0.5); margin-bottom: 2px; display: flex; align-items: center; gap: 3px; }
    .ad-kemper-address { font-family: 'Barlow', sans-serif; font-size: 7px; color: rgba(255,255,255,0.35); margin-bottom: 6px; line-height: 1.3; }
    .ad-kemper-cta {
      display: inline-block; background: #e8192c; color: #fff;
      font-family: 'Barlow Condensed', sans-serif; font-size: 8px; font-weight: 800;
      letter-spacing: 1px; text-transform: uppercase; padding: 3px 8px; border-radius: 2px; align-self: flex-start;
    }

    /* ── Slide 3: Cream automatización ── */
    .ad-slide-1 {
      background: linear-gradient(135deg, #f5f0e8 0%, #ede5d4 100%);
      border: 1px solid #d4c4a0;
    }
    .ad-s1-inner {
      flex: 1; display: flex; flex-direction: column; justify-content: center;
      padding: 18px 22px; position: relative; overflow: hidden;
    }
    .ad-s1-deco {
      position: absolute; right: -10px; top: 50%; transform: translateY(-50%);
      opacity: 0.07; pointer-events: none;
    }
    .ad-s1-eyebrow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px;
      letter-spacing: 3px; color: #8a7035; text-transform: uppercase; margin-bottom: 6px;
    }
    .ad-s1-headline {
      font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600;
      color: #1a1408; line-height: 1.25; margin-bottom: 10px;
    }
    .ad-s1-row { display: flex; align-items: center; gap: 12px; }
    .ad-pill-dark {
      display: inline-block; background: #1a1408; color: #C9A84C;
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
      letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border-radius: 3px; flex-shrink: 0;
    }
    .ad-s1-contact { font-family: 'Barlow', sans-serif; font-size: 9px; color: #8a7a5a; letter-spacing: 0.3px; }

    /* ── Slide 4: Dark blue digital ── */
    .ad-slide-2 {
      background: linear-gradient(135deg, #060a10 0%, #0b1220 55%, #060a10 100%);
      border: 1px solid #60a5fa30;
    }
    .ad-slide-2::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, #60a5fa70, transparent);
    }
    .ad-s2-inner {
      flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 18px 22px;
    }
    .ad-s2-eyebrow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px;
      letter-spacing: 3px; color: #60a5fa60; text-transform: uppercase; margin-bottom: 6px;
    }
    .ad-s2-headline {
      font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600;
      color: #ddeeff; line-height: 1.25; margin-bottom: 10px;
    }
    .ad-s2-row { display: flex; align-items: center; gap: 12px; }
    .ad-pill-blue {
      display: inline-block; background: #60a5fa18; border: 1px solid #60a5fa40;
      color: #60a5fa; font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
      letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border-radius: 3px; flex-shrink: 0;
    }
    .ad-s2-contact { font-family: 'Barlow', sans-serif; font-size: 9px; color: #60a5fa45; letter-spacing: 0.3px; }

    /* ── Slide 5: Gold anúnciate ── */
    .ad-slide-3 {
      background: linear-gradient(135deg, #C9A84C 0%, #E2C46D 50%, #C9A84C 100%);
      border: 1px solid #E2C46D; position: relative; overflow: hidden;
    }
    .ad-slide-3::before {
      content: 'HORUS'; position: absolute; right: -18px; top: 50%;
      transform: translateY(-50%) rotate(-90deg);
      font-family: 'Cormorant Garamond', serif; font-size: 58px; font-weight: 700;
      letter-spacing: 10px; color: rgba(0,0,0,0.10); pointer-events: none; white-space: nowrap;
    }
    .ad-s3-inner {
      flex: 1; display: flex; flex-direction: column; justify-content: center;
      padding: 18px 22px; position: relative; z-index: 2;
    }
    .ad-s3-eyebrow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px;
      letter-spacing: 3px; color: #7a5010; text-transform: uppercase; margin-bottom: 6px;
    }
    .ad-s3-headline {
      font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700;
      color: #0d0b08; line-height: 1.25; margin-bottom: 10px;
    }
    .ad-s3-row { display: flex; align-items: center; gap: 12px; }
    .ad-pill-black {
      display: inline-block; background: #0d0b08; color: #C9A84C;
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
      letter-spacing: 2px; text-transform: uppercase; padding: 4px 10px; border-radius: 3px; flex-shrink: 0;
    }
    .ad-s3-contact { font-family: 'Barlow', sans-serif; font-size: 9px; color: #7a5010; letter-spacing: 0.3px; }

    /* ── Small banner dots ── */
    .ad-indicators {
      position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 5px; z-index: 10;
    }
    .ad-dot { width: 5px; height: 5px; border-radius: 50%; transition: all 0.35s ease; }
    .ad-dot.on-dark  { background: rgba(255,255,255,0.25); }
    .ad-dot.on-light { background: rgba(0,0,0,0.20); }
    .ad-dot.active.on-dark  { width: 18px; border-radius: 3px; background: rgba(255,255,255,0.75); }
    .ad-dot.active.on-light { width: 18px; border-radius: 3px; background: rgba(0,0,0,0.45); }

    /* ═══ PREMIUM BANNER ═══ */
    .ad-banner-premium {
      border-radius: 14px; margin: 0 18px 16px; overflow: hidden;
      height: 210px; position: relative; cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 4px 24px rgba(201,168,76,0.18);
    }
    .ad-banner-premium:hover { transform: translateY(-3px); box-shadow: 0 8px 36px rgba(201,168,76,0.28); }
    .ad-premium-label {
      position: absolute; top: 10px; right: 10px; z-index: 20;
      background: linear-gradient(90deg, #b8922a, #E2C46D); color: #fff;
      font-family: 'Barlow Condensed', sans-serif; font-size: 7px; font-weight: 900;
      letter-spacing: 2px; text-transform: uppercase; padding: 3px 8px; border-radius: 2px;
    }
    .ad-premium-slide {
      position: absolute; inset: 0; opacity: 0; transition: opacity 0.8s ease;
      display: flex; align-items: stretch; width: 100%; height: 100%;
    }
    .ad-premium-slide.active { opacity: 1; }

    /* Premium Slide 0: Visa */
    .ad-premium-visa {
      background: linear-gradient(135deg, #0a1f3d 0%, #0d2a52 45%, #071628 100%);
      border: 2px solid #1a4a8a; position: relative; overflow: hidden;
      display: flex; align-items: stretch; width: 100%;
    }
    .ad-premium-visa::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, #bf1c2c, #e8192c, #f5a623, #e8192c, #bf1c2c); z-index: 3;
    }
    .ad-premium-visa::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, #bf1c2c, #e8192c, #f5a623, #e8192c, #bf1c2c); z-index: 3;
    }
    .ad-visa-stripe {
      position: absolute; top: -30px; right: -30px; width: 140px; height: 140px;
      background: linear-gradient(135deg, #1a4a8a30, #2563eb15); border-radius: 50%; pointer-events: none;
    }
    .ad-visa-stripe2 {
      position: absolute; bottom: -40px; left: -20px; width: 120px; height: 120px;
      background: linear-gradient(135deg, #bf1c2c15, #e8192c10); border-radius: 50%; pointer-events: none;
    }
    .ad-visa-left {
      flex: 1; display: flex; flex-direction: column; justify-content: center;
      padding: 16px 10px 16px 18px; position: relative; z-index: 2;
    }
    .ad-visa-flag-row { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
    .ad-visa-flag { font-size: 16px; line-height: 1; }
    .ad-visa-arrow { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; color: #f5a623; font-weight: 900; }
    .ad-visa-eyebrow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 8px;
      letter-spacing: 3px; color: #f5a62380; text-transform: uppercase; font-weight: 700; margin-bottom: 5px;
    }
    .ad-visa-headline {
      font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
      text-transform: uppercase; line-height: 0.92; margin-bottom: 8px;
    }
    .ad-visa-headline .line1 { font-size: 26px; color: #ffffff; display: block; letter-spacing: 1px; }
    .ad-visa-headline .line2 { font-size: 30px; color: #f5a623; display: block; letter-spacing: 0px; }
    .ad-visa-headline .line3 { font-size: 22px; color: #ffffff; display: block; letter-spacing: 2px; opacity: 0.85; }
    .ad-visa-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
    .ad-visa-chip {
      border: 1px solid rgba(245,166,35,0.4); border-radius: 2px; padding: 2px 5px;
      font-family: 'Barlow Condensed', sans-serif; font-size: 7.5px; font-weight: 700;
      letter-spacing: 0.5px; color: rgba(245,166,35,0.85); text-transform: uppercase; white-space: nowrap;
    }
    .ad-visa-divider {
      width: 1px; margin: 14px 0;
      background: linear-gradient(to bottom, transparent, #1a4a8a, transparent);
      flex-shrink: 0; align-self: stretch; z-index: 2;
    }
    .ad-visa-right {
      width: 150px; flex-shrink: 0; display: flex; flex-direction: column;
      justify-content: center; padding: 14px 16px 14px 14px; position: relative; z-index: 2;
    }
    .ad-visa-icon-row { font-size: 28px; line-height: 1; margin-bottom: 8px; letter-spacing: 2px; }
    .ad-visa-callnow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 7.5px; font-weight: 700;
      letter-spacing: 2px; color: rgba(255,255,255,0.45); text-transform: uppercase; margin-bottom: 2px;
    }
    .ad-visa-phone {
      font-family: 'Barlow Condensed', sans-serif; font-size: 21px; font-weight: 900;
      color: #f5a623; line-height: 1; margin-bottom: 4px; letter-spacing: 0.5px;
    }
    .ad-visa-whatsapp-badge {
      display: flex; align-items: center; gap: 5px;
      background: #25D36618; border: 1px solid #25D36640;
      border-radius: 3px; padding: 4px 8px; margin-bottom: 10px;
    }
    .ad-visa-wa-icon { font-size: 12px; line-height: 1; }
    .ad-visa-wa-text {
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 700;
      color: #25D366; letter-spacing: 0.5px; text-transform: uppercase;
    }
    .ad-visa-cta {
      display: flex; align-items: center; justify-content: center; gap: 5px;
      background: linear-gradient(135deg, #e8192c, #bf1c2c); color: #fff;
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
      letter-spacing: 1.5px; text-transform: uppercase; padding: 7px 10px; border-radius: 3px;
      box-shadow: 0 2px 10px #e8192c40; animation: visaCtaPulse 2.5s ease-in-out infinite;
    }
    @keyframes visaCtaPulse {
      0%, 100% { box-shadow: 0 2px 10px #e8192c40; }
      50%       { box-shadow: 0 2px 20px #e8192c70; }
    }

    /* Premium Slide 1: Anúnciate main */
    .ad-premium-slide-main {
      background: #ffffff; border: 2px solid #d4bc82;
      display: flex; flex-direction: column; overflow: hidden; width: 100%; height: 100%;
    }
    .ad-premium-slide-main::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 6px;
      background: linear-gradient(90deg, #b8922a, #E2C46D, #C9A84C, #b8922a);
    }
    .ad-premium-slide-main::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px;
      background: linear-gradient(90deg, #b8922a, #E2C46D, #C9A84C, #b8922a); z-index: 2;
    }
    .ad-pm-top {
      flex: 1; display: flex; align-items: center;
      padding: 14px 18px 8px 18px; gap: 12px; position: relative; z-index: 2; min-height: 0;
    }
    .ad-pm-headline-block { flex: 1; min-width: 0; }
    .ad-pm-eyebrow {
      font-family: 'Barlow Condensed', sans-serif; font-size: 8px;
      letter-spacing: 3px; color: #888; text-transform: uppercase; margin-bottom: 3px; font-weight: 600;
    }
    .ad-pm-headline {
      font-family: 'Barlow Condensed', sans-serif; font-size: 42px; font-weight: 900;
      line-height: 0.92; text-transform: uppercase; letter-spacing: -0.5px;
    }
    .ad-pm-headline .black { color: #0d0d0d; }
    .ad-pm-headline .gold  { color: #C9A84C; }
    .ad-pm-tagline {
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px;
      letter-spacing: 2px; color: #888; text-transform: uppercase; font-weight: 600; margin-top: 5px;
    }
    .ad-pm-eye-deco { opacity: 0.08; flex-shrink: 0; display: flex; align-items: center; }
    .ad-pm-divider-h {
      height: 1px; margin: 0 18px;
      background: linear-gradient(to right, transparent, #C9A84C80, transparent);
      position: relative; z-index: 2; flex-shrink: 0;
    }
    .ad-pm-bottom {
      display: flex; align-items: center; padding: 10px 18px 16px;
      gap: 12px; position: relative; z-index: 2; flex-shrink: 0;
    }
    .ad-pm-contact-col { display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0; }
    .ad-pm-contact-row { display: flex; align-items: center; gap: 6px; }
    .ad-pm-icon { font-size: 13px; flex-shrink: 0; line-height: 1; }
    .ad-pm-contact-text {
      font-family: 'Barlow Condensed', sans-serif; font-size: 12px; font-weight: 700;
      color: #0d0d0d; letter-spacing: 0.2px; line-height: 1.2;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .ad-pm-cta {
      display: inline-flex; align-items: center; justify-content: center;
      background: #0d0d0d; color: #ffffff;
      font-family: 'Barlow Condensed', sans-serif; font-size: 9px; font-weight: 800;
      letter-spacing: 1.5px; text-transform: uppercase; padding: 8px 14px; border-radius: 3px;
      white-space: nowrap; flex-shrink: 0;
    }

    /* Premium dots */
    .ad-premium-indicators {
      position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 5px; z-index: 20;
    }
    .ad-premium-dot { width: 5px; height: 5px; border-radius: 50%; transition: all 0.35s ease; }
    .ad-premium-dot.theme-dark  { background: rgba(255,255,255,0.30); }
    .ad-premium-dot.theme-light { background: rgba(0,0,0,0.20); }
    .ad-premium-dot.active.theme-dark  { width: 22px; border-radius: 3px; background: rgba(255,255,255,0.80); }
    .ad-premium-dot.active.theme-light { width: 22px; border-radius: 3px; background: rgba(0,0,0,0.45); }
  `;
  document.head.appendChild(style);
}

// ── HTML del banner pequeño ────────────────────────────────────
/**
 * Retorna el innerHTML del banner pequeño.
 * Para agregar un slide nuevo:
 *   1. Agrega el HTML aquí
 *   2. Incrementa AD_COUNT
 *   3. Agrega el tema del dot en AD_DOT_CLASS
 */
function adBannerHTML() {
  const dots = Array.from({length: AD_COUNT}, function(_, i) {
    return '<div class="ad-dot ' + AD_DOT_CLASS[i] + (i === 0 ? ' active' : '') + '" id="adDot' + i + '"></div>';
  }).join('');

  return [
    // ─── Slide 0: Anúnciate (fondo blanco) ───────────────────────────
    '<div class="ad-slide ad-slide-new active" id="adSlide0">'
    + '<div class="ad-new-left">'
    +   '<div class="ad-new-eyebrow">Espacio Publicitario</div>'
    +   '<div class="ad-new-headline"><span class="black">¡ANÚN</span><span class="gold">CIATE</span><br><span class="black">AQUÍ!</span></div>'
    +   '<div class="ad-new-tagline">Miles de cruces diarios te ven</div>'
    + '</div>'
    + '<div class="ad-new-divider"></div>'
    + '<div class="ad-new-right">'
    +   '<div class="ad-new-contact-row"><span class="ad-new-icon">✉️</span><span class="ad-new-contact-text">info@horussystem.net</span></div>'
    +   '<div class="ad-new-contact-row"><span class="ad-new-icon">📞</span><span class="ad-new-contact-text">(956) 485-5182</span></div>'
    +   '<div class="ad-new-cta">RESERVA TU ESPACIO</div>'
    + '</div></div>',

    // ─── Slide 1: Dark gold HORUS ────────────────────────────────────
    '<div class="ad-slide ad-slide-0" id="adSlide1">'
    + '<div class="ad-s0-left">'
    +   '<div class="ad-s0-eyebrow">Tecnología de Frontera</div>'
    +   '<div class="ad-s0-brand">HORUS</div>'
    +   '<div class="ad-s0-sub">System Co. — Automatización Empresarial</div>'
    + '</div>'
    + '<div class="ad-s0-right">' + _eyeSVG(90, '#C9A84C') + '</div>'
    + '</div>',

    // ─── Slide 2: Kemper Life ────────────────────────────────────────
    '<div class="ad-slide ad-slide-4" id="adSlide2">'
    + '<div class="ad-kemper-left">'
    +   '<div class="ad-kemper-logo">KEMPER <span>Life</span></div>'
    +   '<div class="ad-kemper-headline">¿Tu familia está<br>protegida?</div>'
    +   '<div class="ad-kemper-tags">'
    +     '<span class="ad-kemper-tag">Vida</span><span class="ad-kemper-tag">Accidentes</span>'
    +     '<span class="ad-kemper-tag">Cáncer</span><span class="ad-kemper-tag">Corazón</span>'
    +     '<span class="ad-kemper-tag">Incendio</span>'
    +   '</div>'
    + '</div>'
    + '<div class="ad-kemper-right">'
    +   '<div class="ad-kemper-agent">Minerva San Miguel</div>'
    +   '<div class="ad-kemper-role">Sales Agent · Kemper Life</div>'
    +   '<div class="ad-kemper-callnow">Llámame ahora</div>'
    +   '<div class="ad-kemper-phone">956-732-3290</div>'
    +   '<div class="ad-kemper-altphones">T 956-686-4891 · F 956-686-4270</div>'
    +   '<div class="ad-kemper-divider"></div>'
    +   '<div class="ad-kemper-email">📧 msanmiguel@kemper.com</div>'
    +   '<div class="ad-kemper-address">400 W. Nolana, Suite L&amp;M · McAllen, TX 78504</div>'
    +   '<div class="ad-kemper-cta">kemper.com</div>'
    + '</div></div>',

    // ─── Slide 3: Cream automatización ──────────────────────────────
    '<div class="ad-slide ad-slide-1" id="adSlide3">'
    + '<div class="ad-s1-inner">'
    +   '<div class="ad-s1-deco">' + _eyeSVG(110, '#C9A84C') + '</div>'
    +   '<div class="ad-s1-eyebrow">Servicios Horus</div>'
    +   '<div class="ad-s1-headline">Automatiza tu negocio.<br>Vende más, trabaja menos.</div>'
    +   '<div class="ad-s1-row"><span class="ad-pill-dark">Agenda tu demo</span><span class="ad-s1-contact">info@horussystem.net &nbsp;·&nbsp; 956-556-9674</span></div>'
    + '</div></div>',

    // ─── Slide 4: Dark blue digital ─────────────────────────────────
    '<div class="ad-slide ad-slide-2" id="adSlide4">'
    + '<div class="ad-s2-inner">'
    +   '<div class="ad-s2-eyebrow">Desarrollo Digital</div>'
    +   '<div class="ad-s2-headline">Tu idea, convertida<br>en aplicación real.</div>'
    +   '<div class="ad-s2-row"><span class="ad-pill-blue">Cotiza tu proyecto</span><span class="ad-s2-contact">info@horussystem.net &nbsp;·&nbsp; 956-556-9674</span></div>'
    + '</div></div>',

    // ─── Slide 5: Gold anúnciate ─────────────────────────────────────
    '<div class="ad-slide ad-slide-3" id="adSlide5">'
    + '<div class="ad-s3-inner">'
    +   '<div class="ad-s3-eyebrow">Publicidad Fronteriza</div>'
    +   '<div class="ad-s3-headline">Llega a miles de<br>personas diarias.</div>'
    +   '<div class="ad-s3-row"><span class="ad-pill-black">Anúnciate aquí</span><span class="ad-s3-contact">info@horussystem.net &nbsp;·&nbsp; 956-556-9674</span></div>'
    + '</div></div>',

    // ─── Dots ────────────────────────────────────────────────────────
    '<div class="ad-indicators">' + dots + '</div>'

  ].join('');
}

// ── HTML del banner premium ────────────────────────────────────
/**
 * Retorna el innerHTML del banner premium.
 * Para agregar un slide nuevo:
 *   1. Agrega el HTML aquí
 *   2. Incrementa AD_PREMIUM_COUNT
 *   3. Agrega el tema en AD_PREMIUM_DOT_THEME
 *   4. Si tiene click handler, agrégalo en attachPremiumBannerClick()
 */
function adBannerPremiumHTML() {
  const dots = Array.from({length: AD_PREMIUM_COUNT}, function(_, i) {
    return '<div class="ad-premium-dot ' + AD_PREMIUM_DOT_THEME[i] + (i === 0 ? ' active' : '') + '" id="adPremiumDot' + i + '"></div>';
  }).join('');

  return [
    '<div class="ad-premium-label">★ PREMIUM</div>',

    // ─── Premium Slide 0: Trámite de Visas ──────────────────────────
    '<div class="ad-premium-slide ad-premium-visa active" id="adPremiumSlide0">'
    + '<div class="ad-visa-stripe"></div>'
    + '<div class="ad-visa-stripe2"></div>'
    + '<div class="ad-visa-left">'
    +   '<div class="ad-visa-flag-row"><span class="ad-visa-flag">🇲🇽</span><span class="ad-visa-arrow">⇄</span><span class="ad-visa-flag">🇺🇸</span></div>'
    +   '<div class="ad-visa-eyebrow">Servicios Migratorios</div>'
    +   '<div class="ad-visa-headline"><span class="line1">TRÁMITE DE</span><span class="line2">VISAS &amp;</span><span class="line3">PASAPORTES</span></div>'
    +   '<div class="ad-visa-chips">'
    +     '<span class="ad-visa-chip">Visa B1/B2</span><span class="ad-visa-chip">Pasaporte MX</span>'
    +     '<span class="ad-visa-chip">Asesoría</span><span class="ad-visa-chip">Renovaciones</span>'
    +   '</div>'
    + '</div>'
    + '<div class="ad-visa-divider"></div>'
    + '<div class="ad-visa-right">'
    +   '<div class="ad-visa-icon-row">🛂📋</div>'
    +   '<div class="ad-visa-callnow">Contáctanos</div>'
    +   '<div class="ad-visa-phone">899·134·6597</div>'
    +   '<div class="ad-visa-whatsapp-badge"><span class="ad-visa-wa-icon">💬</span><span class="ad-visa-wa-text">WhatsApp</span></div>'
    +   '<div class="ad-visa-cta">📲 ESCRÍBENOS</div>'
    + '</div></div>',

    // ─── Premium Slide 1: Anúnciate principal ───────────────────────
    '<div class="ad-premium-slide ad-premium-slide-main" id="adPremiumSlide1">'
    + '<div class="ad-pm-top">'
    +   '<div class="ad-pm-headline-block">'
    +     '<div class="ad-pm-eyebrow">Espacio Publicitario Principal</div>'
    +     '<div class="ad-pm-headline"><span class="black">¡ANÚN</span><span class="gold">CIATE</span><br><span class="black">AQUÍ!</span></div>'
    +     '<div class="ad-pm-tagline">Miles de cruces diarios te ven · El espacio más visible</div>'
    +   '</div>'
    +   '<div class="ad-pm-eye-deco">' + _eyeSVG(80, '#C9A84C') + '</div>'
    + '</div>'
    + '<div class="ad-pm-divider-h"></div>'
    + '<div class="ad-pm-bottom">'
    +   '<div class="ad-pm-contact-col">'
    +     '<div class="ad-pm-contact-row"><span class="ad-pm-icon">✉️</span><span class="ad-pm-contact-text">info@horussystem.net</span></div>'
    +     '<div class="ad-pm-contact-row"><span class="ad-pm-icon">📞</span><span class="ad-pm-contact-text">(956) 485-5182</span></div>'
    +   '</div>'
    +   '<div class="ad-pm-cta">RESERVA TU ESPACIO</div>'
    + '</div></div>',

    '<div class="ad-premium-indicators">' + dots + '</div>'

  ].join('');
}

// ── Sincronización de banners ──────────────────────────────────

/** Sincroniza visibilidad de slides y dots del banner pequeño. */
function syncAdBanner() {
  const dotClass = AD_DOT_CLASS[adIndex];
  for (let i = 0; i < AD_COUNT; i++) {
    const slide = document.getElementById('adSlide' + i);
    const dot   = document.getElementById('adDot' + i);
    if (slide) slide.classList.toggle('active', i === adIndex);
    if (dot)   dot.className = 'ad-dot ' + dotClass + (i === adIndex ? ' active' : '');
  }
}

/** Sincroniza visibilidad de slides y dots del banner premium. */
function syncAdBannerPremium() {
  const dotTheme = AD_PREMIUM_DOT_THEME[adPremiumIndex];
  for (let i = 0; i < AD_PREMIUM_COUNT; i++) {
    const slide = document.getElementById('adPremiumSlide' + i);
    const dot   = document.getElementById('adPremiumDot' + i);
    if (slide) slide.classList.toggle('active', i === adPremiumIndex);
    if (dot)   dot.className = 'ad-premium-dot ' + dotTheme + (i === adPremiumIndex ? ' active' : '');
  }
}

// ── Click handler del banner premium ──────────────────────────
/**
 * Llama esto después de cada render() para que los clicks funcionen.
 * Agrega aquí los handlers para cada slide premium por índice.
 */
function _handlePremiumClick() {
  if (adPremiumIndex === 0) {
    window.open('https://wa.me/' + VISA_WHATSAPP, '_blank');
  }
  // Slide 1 → (sin acción, solo muestra info de contacto)
}

function attachPremiumBannerClick() {
  const banner = document.getElementById('adBannerPremium');
  if (!banner) return;
  // removeEventListener antes de agregar — evita acumulación con cada render()
  banner.removeEventListener('click', _handlePremiumClick);
  banner.addEventListener('click', _handlePremiumClick);
}

// ── Timers de rotación ─────────────────────────────────────────
let _adRotationStarted = false;
/** Inicia los intervalos de rotación automática. Seguro contra doble llamada. */
function startAdRotation() {
  if (_adRotationStarted) return;
  _adRotationStarted = true;

  setInterval(function() {
    adIndex = (adIndex + 1) % AD_COUNT;
    syncAdBanner();
  }, 6000);

  setInterval(function() {
    adPremiumIndex = (adPremiumIndex + 1) % AD_PREMIUM_COUNT;
    syncAdBannerPremium();
  }, 7000);
}

// ── Helper interno ─────────────────────────────────────────────
/** SVG del ojo de Horus. Solo para uso interno de este archivo. */
function _eyeSVG(size, color) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="display:block">'
    + '<path d="M100 60 L160 140 L40 140 Z" fill="none" stroke="' + color + '" stroke-width="3"/>'
    + '<line x1="70" y1="100" x2="70" y2="140" stroke="' + color + '" stroke-width="2"/>'
    + '<line x1="100" y1="80" x2="100" y2="140" stroke="' + color + '" stroke-width="2"/>'
    + '<line x1="130" y1="100" x2="130" y2="140" stroke="' + color + '" stroke-width="2"/>'
    + '<circle cx="100" cy="90" r="8" fill="' + color + '"/>'
    + '</svg>';
}
