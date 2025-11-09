// Funcionalidades Avançadas - Tudo Cell

// Performance Observer para monitorar performance
if ("PerformanceObserver" in window) {
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Log performance metrics
      if (entry.entryType === "navigation") {
        console.log(
          "Page load time:",
          entry.loadEventEnd - entry.fetchStart,
          "ms"
        );
      }
    });
  });

  observer.observe({ entryTypes: ["navigation", "paint"] });
}

// Lazy loading avançado para imagens
function setupAdvancedLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add("loaded");
              observer.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Preload crítico de recursos
function preloadCriticalResources() {
  const criticalImages = [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
    "https://images.unsplash.com/photo-1556656793-08538906a9f8",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505",
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  });
}

// Service Worker para cache e performance
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Analytics e tracking (GDPR compliant)
function initAnalytics() {
  // Placeholder para Google Analytics ou outra ferramenta
  // Implementar apenas com consentimento do usuário
  if (localStorage.getItem("cookieConsent") === "accepted") {
    // Código do Google Analytics aqui
    console.log("Analytics initialized");
  }
}

// Sistema de notificações toast
function createToast(message, type = "info", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas fa-${
        type === "success"
          ? "check-circle"
          : type === "error"
          ? "exclamation-circle"
          : "info-circle"
      }"></i>
      <span>${message}</span>
    </div>
    <button class="toast-close">&times;</button>
  `;

  document.body.appendChild(toast);

  // Animação de entrada
  setTimeout(() => toast.classList.add("show"), 100);

  // Auto remove
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  }, duration);

  // Botão de fechar
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 300);
  });
}

// Sistema de busca em tempo real
function setupRealTimeSearch() {
  const searchInput = document.querySelector(".search-input");
  const productCards = document.querySelectorAll(".product-card");

  if (searchInput) {
    let searchTimeout;

    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase().trim();

        productCards.forEach((card) => {
          const productName = card
            .querySelector("h3")
            .textContent.toLowerCase();
          const productSpecs = card
            .querySelector(".product-specs")
            .textContent.toLowerCase();

          if (
            productName.includes(searchTerm) ||
            productSpecs.includes(searchTerm) ||
            searchTerm === ""
          ) {
            card.style.display = "block";
            card.classList.add("fade-in-scroll");
          } else {
            card.style.display = "none";
          }
        });

        // Mostrar mensagem se nenhum resultado
        const visibleCards = Array.from(productCards).filter(
          (card) => card.style.display !== "none"
        );
        const noResults = document.querySelector(".no-results");

        if (visibleCards.length === 0 && searchTerm !== "") {
          if (!noResults) {
            const message = document.createElement("div");
            message.className = "no-results";
            message.innerHTML =
              "<p>Nenhum produto encontrado. Tente outras palavras-chave.</p>";
            document.querySelector(".products-grid").appendChild(message);
          }
        } else if (noResults) {
          noResults.remove();
        }
      }, 300);
    });
  }
}

// Sistema de favoritos
class FavoritesManager {
  constructor() {
    this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    this.init();
  }

  init() {
    this.updateUI();
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("click", (e) => {
      if (e.target.matches(".favorite-btn, .favorite-btn *")) {
        const btn = e.target.closest(".favorite-btn");
        const productId = btn.dataset.productId;
        this.toggle(productId);
      }
    });
  }

  toggle(productId) {
    if (this.favorites.includes(productId)) {
      this.remove(productId);
      createToast("Produto removido dos favoritos", "info");
    } else {
      this.add(productId);
      createToast("Produto adicionado aos favoritos", "success");
    }
  }

  add(productId) {
    if (!this.favorites.includes(productId)) {
      this.favorites.push(productId);
      this.save();
      this.updateUI();
    }
  }

  remove(productId) {
    this.favorites = this.favorites.filter((id) => id !== productId);
    this.save();
    this.updateUI();
  }

  save() {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  updateUI() {
    document.querySelectorAll(".favorite-btn").forEach((btn) => {
      const productId = btn.dataset.productId;
      const icon = btn.querySelector("i");

      if (this.favorites.includes(productId)) {
        icon.className = "fas fa-heart";
        btn.classList.add("active");
      } else {
        icon.className = "far fa-heart";
        btn.classList.remove("active");
      }
    });
  }
}

// Sistema de carrinho (básico)
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    this.init();
  }

  init() {
    this.updateUI();
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("click", (e) => {
      if (e.target.matches(".add-to-cart-btn, .add-to-cart-btn *")) {
        const btn = e.target.closest(".add-to-cart-btn");
        const productId = btn.dataset.productId;
        this.add(productId);
      }
    });
  }

  add(productId) {
    const existingItem = this.cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ id: productId, quantity: 1 });
    }

    this.save();
    this.updateUI();
    createToast("Produto adicionado ao carrinho", "success");
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  updateUI() {
    const cartCount = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const cartBadge = document.querySelector(".cart-badge");

    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = cartCount > 0 ? "block" : "none";
    }
  }
}

// PWA Installation
function setupPWAInstall() {
  let deferredPrompt;
  const installButton = document.querySelector(".install-pwa");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    if (installButton) {
      installButton.style.display = "block";
    }
  });

  if (installButton) {
    installButton.addEventListener("click", async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
          createToast("App instalado com sucesso!", "success");
        }

        deferredPrompt = null;
        installButton.style.display = "none";
      }
    });
  }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar sistemas
  setupAdvancedLazyLoading();
  preloadCriticalResources();
  setupRealTimeSearch();
  setupPWAInstall();

  // Inicializar managers
  new FavoritesManager();
  new CartManager();

  // Inicializar analytics (com consentimento)
  initAnalytics();

  console.log("✅ Tudo Cell - Sistema avançado carregado");
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  // ESC para fechar modals
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.show, .toast.show").forEach((el) => {
      el.classList.remove("show");
    });
  }

  // Tab navigation melhorado
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("user-is-tabbing");
});

// Error handling global
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
  // Não mostrar erros em produção para usuários finais
  if (location.hostname === "localhost") {
    createToast("Erro detectado. Verifique o console.", "error");
  }
});

// Unhandled promise rejection
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  e.preventDefault();
});

export { createToast, FavoritesManager, CartManager };
