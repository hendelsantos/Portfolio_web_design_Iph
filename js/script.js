// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const whatsappButtons = document.querySelectorAll(".whatsapp-btn");

// Número do WhatsApp da loja (substitua pelo número real)
const whatsappNumber = "5511999999999";

// Mobile Menu Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  document.body.classList.toggle("menu-open");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Product Filtering
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    // Filter products with animation
    productCards.forEach((card) => {
      card.classList.add("fade-out");

      setTimeout(() => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
          card.classList.remove("fade-out");
          card.classList.add("fade-in");
        } else {
          card.style.display = "none";
        }
      }, 200);

      setTimeout(() => {
        card.classList.remove("fade-in");
      }, 700);
    });
  });
});

// WhatsApp Integration
whatsappButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.getAttribute("data-product");
    const message = `Olá! Tenho interesse no ${productName}. Poderia me dar mais informações?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.98)";
    header.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Animate elements on scroll
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".product-card, .feature, .contact-item"
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
    observer.observe(element);
  });
});

// Image loading optimization
function handleImageLoad() {
  const images = document.querySelectorAll(".product-image img");

  images.forEach((img) => {
    if (img.complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });
}

// Call image loading function when DOM is ready
document.addEventListener("DOMContentLoaded", handleImageLoad);

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-image img");

  if (hero && heroImage) {
    const rate = scrolled * -0.5;
    heroImage.style.transform = `translateY(${rate}px) rotate(5deg)`;
  }
});

// Search functionality (if you want to add a search feature later)
function searchProducts(searchTerm) {
  const products = document.querySelectorAll(".product-card");

  products.forEach((product) => {
    const productName = product.querySelector("h3").textContent.toLowerCase();
    const productSpecs = product
      .querySelector(".product-specs")
      .textContent.toLowerCase();

    if (
      productName.includes(searchTerm.toLowerCase()) ||
      productSpecs.includes(searchTerm.toLowerCase())
    ) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// Price formatting
function formatPrice(price) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

// Loading animation for better UX
function showLoading() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = `
        <div class="loader-spinner">
            <i class="fas fa-mobile-alt"></i>
        </div>
        <p>Carregando produtos...</p>
    `;
  document.body.appendChild(loader);
}

function hideLoading() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
}

// Add loading styles
const loaderStyles = `
    .loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .loader-spinner {
        font-size: 3rem;
        color: #667eea;
        animation: bounce 1s infinite;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-30px);
        }
        60% {
            transform: translateY(-15px);
        }
    }
`;

// Add loader styles to head
const styleSheet = document.createElement("style");
styleSheet.textContent = loaderStyles;
document.head.appendChild(styleSheet);

// Simulate loading (remove this in production)
document.addEventListener("DOMContentLoaded", () => {
  showLoading();
  setTimeout(hideLoading, 1500);
});

// Form validation (if you add a contact form later)
function validateForm(form) {
  const inputs = form.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("error");
      isValid = false;
    } else {
      input.classList.remove("error");
    }
  });

  return isValid;
}

// Newsletter subscription (if you add this feature)
function subscribeNewsletter(email) {
  if (validateEmail(email)) {
    // Simulate newsletter subscription
    alert("Obrigado por se inscrever em nossa newsletter!");
    return true;
  }
  return false;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Local storage for user preferences
function saveUserPreference(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUserPreference(key, defaultValue = null) {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
}

// Theme toggle (if you want to add dark mode later)
function toggleTheme() {
  const currentTheme = getUserPreference("theme", "light");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.body.setAttribute("data-theme", newTheme);
  saveUserPreference("theme", newTheme);
}

// Initialize theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = getUserPreference("theme", "light");
  document.body.setAttribute("data-theme", savedTheme);
});

// Utility function to debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}, 10);

window.addEventListener("scroll", optimizedScrollHandler);

// Error handling for images with fallback
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");

  // URLs de fallback para cada tipo de produto
  const fallbackImages = {
    "iPhone 15 Pro Max":
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "iPhone 14 Pro":
      "https://images.unsplash.com/photo-1678911820864-e2c58b2ebc4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "iPhone 13 Pro Max":
      "https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "iPhone 12":
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "iPhone SE":
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    "iPhone 11":
      "https://images.unsplash.com/photo-1571502212342-70884a626fd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    default: "https://via.placeholder.com/400x400/667eea/ffffff?text=iPhone",
  };

  images.forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        console.log(`Failed to load image: ${img.src}`);

        // Tenta encontrar uma imagem de fallback baseada no alt text
        const altText = img.alt || "";
        let fallbackUrl = fallbackImages.default;

        // Busca por uma imagem específica baseada no modelo
        for (const [model, url] of Object.entries(fallbackImages)) {
          if (altText.includes(model)) {
            fallbackUrl = url;
            break;
          }
        }

        // Se já tentou a imagem de fallback e falhou, usa placeholder
        if (img.src === fallbackUrl) {
          img.src = fallbackImages.default;
        } else {
          img.src = fallbackUrl;
        }

        // Se até o placeholder falhar, esconde a imagem
        img.addEventListener(
          "error",
          () => {
            if (img.src === fallbackImages.default) {
              img.style.display = "none";
              // Adiciona um placeholder texto
              const placeholder = document.createElement("div");
              placeholder.className = "image-placeholder";
              placeholder.innerHTML =
                '<i class="fas fa-mobile-alt"></i><span>Imagem não disponível</span>';
              placeholder.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 250px;
            background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
            color: #999;
            font-size: 0.9rem;
          `;
              img.parentNode.appendChild(placeholder);
            }
          },
          { once: true }
        );
      },
      { once: true }
    );
  });
});

// Back to top button functionality
function createBackToTopButton() {
  const button = document.createElement("button");
  button.innerHTML = '<i class="fas fa-chevron-up"></i>';
  button.className = "back-to-top";
  button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    `;

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.scrollY > 300) {
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";
      } else {
        button.style.opacity = "0";
        button.style.pointerEvents = "none";
      }
    }, 100)
  );

  document.body.appendChild(button);
}

// Initialize back to top button
document.addEventListener("DOMContentLoaded", createBackToTopButton);

// Performance monitoring
function logPerformance() {
  if ("performance" in window) {
    const perfData = performance.getEntriesByType("navigation")[0];
    console.log(
      `Page loaded in ${perfData.loadEventEnd - perfData.fetchStart}ms`
    );
  }
}

window.addEventListener("load", logPerformance);

// Service worker registration for PWA (optional)
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
