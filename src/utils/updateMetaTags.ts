export const updateMetaTags = (lang: 'ru' | 'en' | 'zh') => {
  const htmlRoot = document.getElementById('html-root');
  if (htmlRoot) {
    htmlRoot.setAttribute('lang', lang);
  }

  if (lang === 'en') {
    document.title = 'TechGlobal — Special Equipment Supply from China | Direct Factory Deliveries';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'TechGlobal — direct supplies of special equipment and industrial machinery from China. Construction equipment, generators, trucks. 10 years in business. Flexible terms.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'special equipment from china, chinese construction equipment, generators from china, XCMG excavators, Sany cranes, diesel generators, FAW trucks, equipment from china');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'TechGlobal — Special Equipment Supply from China');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Direct supplies of special equipment and industrial machinery from China. 10 years in business. Flexible terms and competitive prices.');
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'TechGlobal — Special Equipment Supply from China');
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Direct supplies of special equipment and industrial machinery from China. 10 years in business.');
    }
  } else if (lang === 'zh') {
    document.title = 'TechGlobal — 中国特种设备供应 | 厂家直供';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'TechGlobal — 中国特种设备和工业机械直接供应。工程机械、发电机、卡车。运营超过10年。灵活条款。');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', '中国特种设备, 工程机械, 中国发电机, 徐工挖掘机, 三一起重机, 柴油发电机, 一汽卡车, 中国设备');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'TechGlobal — 中国特种设备供应');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', '中国特种设备和工业机械直接供应。运营超过10年。灵活条款和优惠价格。');
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'TechGlobal — 中国特种设备供应');
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', '中国特种设备和工业机械直接供应。运营超过10年。');
    }
  } else {
    document.title = 'ТехГлобал — Поставка спецтехники из Китая | Прямые поставки от производителей';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ТехГлобал — прямые поставки спецтехники и промышленного оборудования из КНР. Строительная техника, генераторы, грузовые автомобили. 10 лет на рынке. Гибкие условия.');
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'спецтехника из китая, поставка оборудования КНР, китайская строительная техника, генераторы из китая, экскаваторы XCMG, краны Sany, дизельные генераторы, грузовики FAW, техника из китая');
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'ТехГлобал — Поставка спецтехники из Китая');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Прямые поставки спецтехники и промышленного оборудования из КНР. 10 лет на рынке. Гибкие условия и конкурентные цены.');
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'ТехГлобал — Поставка спецтехники из Китая');
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Прямые поставки спецтехники и промышленного оборудования из КНР. 10 лет на рынке.');
    }
  }
};