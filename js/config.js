// Configurações da loja - Personalize aqui
const STORE_CONFIG = {
  // Informações da Loja
  store: {
    name: "Tudo Cell",
    subtitle: "iPhone Store",
    description: "Sua loja especializada em iPhones novos e seminovos",
    slogan: "Os Melhores iPhones com Qualidade Garantida",
  },

  // Contato
  contact: {
    whatsapp: "5511999999999", // Substitua pelo número real
    email: "contato@tudocell.com.br",
    phone: "(11) 99999-9999",
    address: {
      street: "Rua das Flores, 123",
      district: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
  },

  // Horário de Funcionamento
  schedule: {
    weekdays: "Seg à Sex: 9h às 18h",
    saturday: "Sáb: 9h às 14h",
    sunday: "Fechado",
  },

  // Redes Sociais
  social: {
    facebook: "https://facebook.com/tudocell",
    instagram: "https://instagram.com/tudocell",
    twitter: "https://twitter.com/tudocell",
    youtube: "https://youtube.com/tudocell",
  },

  // Configurações do Site
  site: {
    title: "Tudo Cell - iPhone Novos e Usados",
    description:
      "Loja especializada em iPhones novos e seminovos com qualidade garantida e os melhores preços do mercado.",
    keywords:
      "iphone, celular, smartphone, apple, novos, seminovos, usados, loja",
  },

  // Produtos em Destaque
  featuredProducts: [
    {
      id: "iphone-15-pro-max",
      name: "iPhone 15 Pro Max",
      specs: "256GB - Titânio Natural",
      price: 9999.0,
      originalPrice: null,
      category: "new",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
      features: ["48MP", "A17 Pro", "29h vídeo"],
      condition: 10,
    },
    {
      id: "iphone-14-pro",
      name: "iPhone 14 Pro",
      specs: "128GB - Roxo Profundo",
      price: 7999.0,
      originalPrice: null,
      category: "new",
      image: "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07",
      features: ["48MP", "A16 Bionic", "23h vídeo"],
      condition: 10,
    },
    {
      id: "iphone-13-pro-max-used",
      name: "iPhone 13 Pro Max",
      specs: "256GB - Azul Sierra",
      price: 5499.0,
      originalPrice: 7999.0,
      category: "used",
      image: "https://images.unsplash.com/photo-1611791483153-26842095b5bb",
      features: ["12MP", "A15 Bionic", "9/10"],
      condition: 9,
    },
  ],

  // Mensagens WhatsApp
  whatsappMessages: {
    product:
      "Olá! Tenho interesse no {PRODUCT_NAME}. Poderia me dar mais informações?",
    general: "Olá! Gostaria de saber mais sobre os produtos da Tudo Cell.",
    support: "Olá! Preciso de suporte técnico para meu iPhone.",
  },

  // Configurações de Aparência
  theme: {
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
    accentColor: "#25D366",
    textColor: "#333",
    backgroundColor: "#f8f9fa",
  },

  // Funcionalidades
  features: {
    enableDarkMode: false,
    enableSearch: true,
    enableNewsletter: false,
    enableChatbot: false,
    enablePWA: false,
  },

  // Garantias e Políticas
  policies: {
    warranty: "6 meses de garantia",
    return: "7 dias para troca",
    shipping: "Entrega grátis para a região metropolitana",
    payment: "Parcelamento em até 12x sem juros",
  },
};

// Função para aplicar configurações
function applyConfig() {
  // Atualizar título da página
  document.title = STORE_CONFIG.site.title;

  // Atualizar meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = STORE_CONFIG.site.description;
  }

  // Atualizar nome da loja no header
  const logoName = document.querySelector(".logo h2");
  const logoSubtitle = document.querySelector(".logo span");
  if (logoName) logoName.textContent = STORE_CONFIG.store.name;
  if (logoSubtitle) logoSubtitle.textContent = STORE_CONFIG.store.subtitle;

  // Atualizar informações de contato
  updateContactInfo();

  // Aplicar tema
  applyTheme();
}

// Atualizar informações de contato
function updateContactInfo() {
  const phoneElements = document.querySelectorAll("[data-phone]");
  const emailElements = document.querySelectorAll("[data-email]");
  const addressElements = document.querySelectorAll("[data-address]");

  phoneElements.forEach((el) => {
    el.textContent = STORE_CONFIG.contact.phone;
  });

  emailElements.forEach((el) => {
    el.textContent = STORE_CONFIG.contact.email;
  });

  addressElements.forEach((el) => {
    const address = STORE_CONFIG.contact.address;
    el.innerHTML = `${address.street} - ${address.district}<br>${address.city} - ${address.state}, ${address.zipCode}`;
  });
}

// Aplicar tema personalizado
function applyTheme() {
  const root = document.documentElement;
  root.style.setProperty("--primary-color", STORE_CONFIG.theme.primaryColor);
  root.style.setProperty(
    "--secondary-color",
    STORE_CONFIG.theme.secondaryColor
  );
  root.style.setProperty("--accent-color", STORE_CONFIG.theme.accentColor);
  root.style.setProperty("--text-color", STORE_CONFIG.theme.textColor);
  root.style.setProperty(
    "--background-color",
    STORE_CONFIG.theme.backgroundColor
  );
}

// Gerar produtos dinamicamente (opcional)
function generateProducts() {
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return;

  // Limpar produtos existentes se necessário
  // productsGrid.innerHTML = '';

  STORE_CONFIG.featuredProducts.forEach((product) => {
    const productCard = createProductCard(product);
    // productsGrid.appendChild(productCard);
  });
}

// Criar card de produto
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-category", product.category);

  const originalPriceHTML = product.originalPrice
    ? `<span class="original-price">R$ ${product.originalPrice
        .toFixed(2)
        .replace(".", ",")}</span>`
    : "";

  const badgeClass = product.category === "new" ? "new" : "used";
  const badgeText = product.category === "new" ? "Novo" : "Seminovo";

  card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-badge ${badgeClass}">${badgeText}</div>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-specs">${product.specs}</p>
            <div class="product-features">
                ${product.features
                  .map(
                    (feature) =>
                      `<span><i class="fas fa-star"></i> ${feature}</span>`
                  )
                  .join("")}
            </div>
            <div class="product-price">
                ${originalPriceHTML}
                <span class="current-price">R$ ${product.price
                  .toFixed(2)
                  .replace(".", ",")}</span>
            </div>
            <button class="whatsapp-btn" data-product="${product.name} ${
    product.specs
  }">
                <i class="fab fa-whatsapp"></i> Conversar no WhatsApp
            </button>
        </div>
    `;

  return card;
}

// Função para atualizar número do WhatsApp
function updateWhatsAppNumber() {
  const whatsappButtons = document.querySelectorAll(".whatsapp-btn");
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

  whatsappButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.getAttribute("data-product");
      const message = STORE_CONFIG.whatsappMessages.product.replace(
        "{PRODUCT_NAME}",
        productName
      );
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${STORE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    });
  });

  whatsappLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href.includes("wa.me")) {
      link.href = href.replace(
        /wa\.me\/\d+/,
        `wa.me/${STORE_CONFIG.contact.whatsapp}`
      );
    }
  });
}

// Aplicar configurações quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  updateWhatsAppNumber();

  // Se você quiser gerar produtos dinamicamente, descomente a linha abaixo
  // generateProducts();
});

// Exportar configurações para uso em outros arquivos
window.STORE_CONFIG = STORE_CONFIG;
