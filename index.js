(function () {
  "use strict";

  let currentSwiper = null;
  let isInitialized = false;

  // Sample product images for demonstration
  const sampleImages = {
    "https://www.pamono.com/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s":
      [
        "https://cdn20.pamono.com/p/m/1/9/1940328_v67tq02lyd/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s.png",
        "https://cdn20.pamono.com/p/z/1/9/1940328_v67tq02lyd/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s-1.jpg",
        "https://cdn20.pamono.com/p/z/1/9/1940328_v67tq02lyd/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s-2.jpg",
        "https://cdn20.pamono.com/p/z/1/9/1940328_v67tq02lyd/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s-3.jpg",
      ],
    "https://www.pamono.com/armchairs-by-guillerme-et-chambron-for-votre-maison-1950s-set-of-2":
      [
        "https://cdn20.pamono.com/p/m/2/3/2364372_q153obih1r/armchairs-by-guillerme-et-chambron-for-votre-maison-1950s-set-of-2.png",
        "https://cdn20.pamono.com/p/z/2/3/2364372_q153obih1r/armchairs-by-guillerme-et-chambron-for-votre-maison-1950s-set-of-2-1.jpg",
        "https://cdn20.pamono.com/p/z/2/3/2364372_q153obih1r/armchairs-by-guillerme-et-chambron-for-votre-maison-1950s-set-of-2-2.jpg",
      ],
    "https://www.pamono.com/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s":
      [
        "https://cdn20.pamono.com/p/m/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s.png",
        "https://cdn20.pamono.com/p/z/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s-1.jpg",
        "https://cdn20.pamono.com/p/z/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s-2.jpg",
        "https://cdn20.pamono.com/p/z/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s-3.jpg",
        "https://cdn20.pamono.com/p/z/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s-4.jpg",
      ],
  };

  // Initialize the Quick View functionality
  function init() {
    if (isInitialized) return;

    // Load required libraries
    loadLibraries().then(() => {
      createModal();
      addQuickViewButtons();
      setupEventListeners();
      observeProductChanges();
      isInitialized = true;
    });
  }

  // Load required libraries (Bootstrap, Swiper CSS and JS)
  function loadLibraries() {
    return new Promise((resolve) => {
      let loadedCount = 0;
      const totalLibraries = 2; // Bootstrap JS, Swiper JS

      function checkAllLoaded() {
        loadedCount++;
        if (loadedCount === totalLibraries) {
          resolve();
        }
      }

      // Load Bootstrap JS
      if (!window.bootstrap) {
        const bootstrapJS = document.createElement("script");
        bootstrapJS.src =
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js";
        bootstrapJS.onload = checkAllLoaded;
        document.head.appendChild(bootstrapJS);
      } else {
        checkAllLoaded();
      }

      // Load Swiper CSS
      if (!document.querySelector('link[href*="swiper"]')) {
        const swiperCSS = document.createElement("link");
        swiperCSS.rel = "stylesheet";
        swiperCSS.href = "https://unpkg.com/swiper@8/swiper-bundle.min.css";
        document.head.appendChild(swiperCSS);
      }

      // Load Swiper JS
      if (!window.Swiper) {
        const swiperJS = document.createElement("script");
        swiperJS.src = "https://unpkg.com/swiper@8/swiper-bundle.min.js";
        swiperJS.onload = checkAllLoaded;
        document.head.appendChild(swiperJS);
      } else {
        checkAllLoaded();
      }
    });
  }

  // Create the modal HTML structure
  function createModal() {
    if (document.getElementById("quickViewModal")) return;

    const modalHTML = `
      <div id="quickViewModal" class="quick-view-modal">
        <div class="quick-view-content">
          <button class="quick-view-close" id="quickViewClose" type="button">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          
          <div class="container-fluid p-0">
            <div class="row g-0">
              <div class="col-lg-7">
                <div class="quick-view-gallery">
                  <div class="quick-view-loading" id="quickViewLoading">
                    <div class="loading-spinner"></div>
                    <span>Loading images...</span>
                  </div>
                  <div class="gallery-container" id="galleryContainer" style="display: none;">
                    <div class="main-image-container">
                      <div class="swiper main-swiper" id="quickViewSwiper">
                        <div class="swiper-wrapper" id="quickViewWrapper"></div>
                      </div>
                    </div>
                    <div class="thumbnail-container">
                      <div class="swiper thumbnail-swiper" id="thumbnailSwiper">
                        <div class="swiper-wrapper" id="thumbnailWrapper"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-5">
                <div class="quick-view-info">
                  <h2 class="quick-view-title" id="quickViewTitle"></h2>
                  <p class="quick-view-description" id="quickViewDescription"></p>
                  <div class="quick-view-price-section">
                    <span class="quick-view-price" id="quickViewPrice"></span>
                  </div>
                  <div class="quick-view-availability">
                    <span class="availability-label">AVAILABILITY:</span>
                    <span class="availability-status" id="quickViewStock">IN STOCK</span>
                  </div>
                  <div class="quick-view-actions">
                    <div class="quantity-selector">
                      <button type="button" class="qty-btn minus">-</button>
                      <input type="number" class="qty-input" value="1" min="1">
                      <button type="button" class="qty-btn plus">+</button>
                    </div>
                    <button type="button" class="btn-add-to-cart">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 1H5L7 11H13L15 4H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="7.5" cy="13.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12.5" cy="13.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      ADD TO CART
                    </button>
                    <button type="button" class="btn-wishlist" title="Add to Wishlist">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 17.5L8.825 16.4C4 12.05 1 9.32501 1 6.00001C1 3.42501 3.05 1.50001 5.5 1.50001C7 1.50001 8.44 2.16001 10 3.15001C11.56 2.16001 13 1.50001 14.5 1.50001C16.95 1.50001 19 3.42501 19 6.00001C19 9.32501 16 12.05 11.175 16.4L10 17.5Z" stroke="currentColor" stroke-width="1.5"/>
                      </svg>
                    </button>
                    <button type="button" class="btn-compare" title="Compare">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M3 7V17H7V7H3ZM13 3V17H17V3H13ZM8 12V17H12V12H8Z" stroke="currentColor" stroke-width="1.5"/>
                      </svg>
                    </button>
                  </div>
                  <div class="quick-view-share">
                    <span class="share-label">Share:</span>
                    <div class="share-buttons">
                      <a href="#" class="share-btn facebook" title="Facebook">f</a>
                      <a href="#" class="share-btn twitter" title="Twitter">t</a>
                      <a href="#" class="share-btn linkedin" title="LinkedIn">in</a>
                      <a href="#" class="share-btn google" title="Google+">g+</a>
                      <a href="#" class="share-btn email" title="Email">@</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  // Mock function to simulate fetching product images
  function fetchProductImages(productUrl) {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const images =
          sampleImages[productUrl] ||
          [
            // Fallback: try to extract image from existing product card
            extractImageFromProductCard(productUrl),
          ].filter(Boolean);
        resolve(images);
      }, 800); // Simulate loading time
    });
  }

  // Extract image from product card
  function extractImageFromProductCard(productUrl) {
    const productCards = document.querySelectorAll(".product-card");
    for (const card of productCards) {
      const link = card.querySelector(".link-wrapper");
      if (link && link.getAttribute("href") === productUrl) {
        const img = card.querySelector(".image");
        if (img) {
          return (
            img.src ||
            img.getAttribute("data-lazy") ||
            img.getAttribute("data-src")
          );
        }
      }
    }
    return null;
  }

  // Initialize Swiper with thumbnail navigation and hover functionality
  function initSwiper(images) {
    const mainWrapper = document.getElementById("quickViewWrapper");
    const thumbnailWrapper = document.getElementById("thumbnailWrapper");
    const loading = document.getElementById("quickViewLoading");
    const galleryContainer = document.getElementById("galleryContainer");

    // Clear existing slides
    mainWrapper.innerHTML = "";
    thumbnailWrapper.innerHTML = "";

    // Add main slides with zoom functionality
    images.forEach((image, index) => {
      // Main slide
      const slide = document.createElement("div");
      slide.className = "swiper-slide";

      const img = document.createElement("img");
      img.src = image;
      img.alt = `Product image ${index + 1}`;
      img.onerror = function () {
        this.src =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzI0MS40MjEgMTAwIDI3NS0xMzMuNTc5IDI3NS0xNzVTMjQxLjQyMS0yNTAgMjAwLTI1MFMxMjUtMjE2LjQyMSAxMjUtMTc1UzE1OC41NzkgMTAwIDIwMCAxMDBaIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTc1IDI1MEwyMjUgMjAwTDI3NSAyNTBIMTc1WiIgZmlsbD0iI0NDQyIvPgo8L3N2Zz4K";
      };

      // Add click event for zoom
      slide.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleZoom(slide);
      });

      slide.appendChild(img);
      mainWrapper.appendChild(slide);

      // Thumbnail slide
      const thumbSlide = document.createElement("div");
      thumbSlide.className = "swiper-slide thumbnail-slide";
      thumbSlide.setAttribute("data-index", index);

      const thumbImg = document.createElement("img");
      thumbImg.src = image;
      thumbImg.alt = `Thumbnail ${index + 1}`;
      thumbImg.onerror = function () {
        this.src =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzI0MS40MjEgMTAwIDI3NS0xMzMuNTc5IDI3NS0xNzVTMjQxLjQyMS0yNTAgMjAwLTI1MFMxMjUtMjE2LjQyMSAxMjUtMTc1UzE1OC41NzkgMTAwIDIwMCAxMDBaIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTc1IDI1MEwyMjUgMjAwTDI3NSAyNTBIMTc1WiIgZmlsbD0iI0NDQyIvPgo8L3N2Zz4K";
      };

      // Add hover event to change main image
      thumbSlide.addEventListener("mouseenter", function () {
        if (currentSwiper && currentSwiper.main) {
          currentSwiper.main.slideTo(index);
        }
      });

      // Add click event to change main image
      thumbSlide.addEventListener("click", function () {
        if (currentSwiper && currentSwiper.main) {
          currentSwiper.main.slideTo(index);
        }
      });

      thumbSlide.appendChild(thumbImg);
      thumbnailWrapper.appendChild(thumbSlide);
    });

    // Show gallery and hide loading
    loading.style.display = "none";
    galleryContainer.style.display = "block";

    // Destroy existing swipers if they exist
    if (currentSwiper) {
      if (currentSwiper.main) currentSwiper.main.destroy(true, true);
      if (currentSwiper.thumbnail) currentSwiper.thumbnail.destroy(true, true);
    }

    // Initialize main swiper
    const mainSwiper = new Swiper(".main-swiper", {
      loop: false,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      keyboard: {
        enabled: true,
      },
      autoplay: false,
      speed: 300,
      effect: "slide",
      allowTouchMove: true,
      on: {
        slideChange: function () {
          // Reset zoom on slide change
          const slides = document.querySelectorAll(
            ".main-swiper .swiper-slide"
          );
          slides.forEach((slide) => {
            slide.classList.remove("zoomed");
          });

          // Update thumbnail active state
          updateThumbnailActive(this.activeIndex);
        },
      },
    });

    // Initialize thumbnail swiper
    const thumbnailSwiper = new Swiper(".thumbnail-swiper", {
      loop: false,
      spaceBetween: 10,
      slidesPerView: "auto",
      freeMode: true,
      watchSlidesProgress: true,
      direction: "horizontal",
    });

    // Store swiper instances
    currentSwiper = {
      main: mainSwiper,
      thumbnail: thumbnailSwiper,
    };

    // Set initial active thumbnail
    updateThumbnailActive(0);

    // Setup quantity controls
    setupQuantityControls();
  }

  // Update thumbnail active state
  function updateThumbnailActive(activeIndex) {
    const thumbnails = document.querySelectorAll(".thumbnail-slide");
    thumbnails.forEach((thumb, index) => {
      if (index === activeIndex) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });
  }

  // Toggle zoom functionality
  function toggleZoom(slide) {
    const isZoomed = slide.classList.contains("zoomed");

    // Remove zoom from all main slides
    const allSlides = document.querySelectorAll(".main-swiper .swiper-slide");
    allSlides.forEach((s) => s.classList.remove("zoomed"));

    // Toggle zoom on clicked slide
    if (!isZoomed) {
      slide.classList.add("zoomed");

      // Disable swiper touch/drag when zoomed
      if (currentSwiper && currentSwiper.main) {
        currentSwiper.main.allowTouchMove = false;
      }
    } else {
      // Re-enable swiper touch/drag when not zoomed
      if (currentSwiper && currentSwiper.main) {
        currentSwiper.main.allowTouchMove = true;
      }
    }
  }

  // Setup quantity controls
  function setupQuantityControls() {
    const qtyInput = document.querySelector(".qty-input");
    const minusBtn = document.querySelector(".qty-btn.minus");
    const plusBtn = document.querySelector(".qty-btn.plus");

    if (minusBtn && plusBtn && qtyInput) {
      minusBtn.addEventListener("click", function () {
        let currentValue = parseInt(qtyInput.value) || 1;
        if (currentValue > 1) {
          qtyInput.value = currentValue - 1;
        }
      });

      plusBtn.addEventListener("click", function () {
        let currentValue = parseInt(qtyInput.value) || 1;
        qtyInput.value = currentValue + 1;
      });
    }
  }

  // Show Quick View Modal
  function showQuickView(button) {
    const productUrl = button.getAttribute("data-product-url");
    const productTitle = button.getAttribute("data-product-title");
    const productPrice = button.getAttribute("data-product-price");

    const modal = document.getElementById("quickViewModal");
    const titleEl = document.getElementById("quickViewTitle");
    const priceEl = document.getElementById("quickViewPrice");
    const loading = document.getElementById("quickViewLoading");
    const galleryContainer = document.getElementById("galleryContainer");

    // Set product info
    titleEl.textContent = productTitle;
    priceEl.textContent = productPrice;

    // Reset modal state
    loading.style.display = "flex";
    galleryContainer.style.display = "none";

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    // Fetch and display images
    fetchProductImages(productUrl)
      .then((images) => {
        initSwiper(images);
      })
      .catch((error) => {
        console.error("Error loading images:", error);
        loading.innerHTML = "<div>Error loading images</div>";
      });
  }

  // Hide Quick View Modal
  function hideQuickView() {
    const modal = document.getElementById("quickViewModal");
    modal.classList.remove("active");
    document.body.style.overflow = "";

    // Reset zoom state
    const slides = document.querySelectorAll(".swiper-slide");
    slides.forEach((slide) => {
      slide.classList.remove("zoomed");
    });

    // Destroy swipers to prevent memory leaks
    if (currentSwiper) {
      if (currentSwiper.main) {
        currentSwiper.main.destroy(true, true);
      }
      if (currentSwiper.thumbnail) {
        currentSwiper.thumbnail.destroy(true, true);
      }
      currentSwiper = null;
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    // Quick View button clicks
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("quick-view-btn")) {
        e.preventDefault();
        e.stopPropagation();
        showQuickView(e.target);
      }
    });

    // Close modal events
    const closeBtn = document.getElementById("quickViewClose");
    const modal = document.getElementById("quickViewModal");

    if (closeBtn) {
      closeBtn.addEventListener("click", hideQuickView);
    }

    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          hideQuickView();
        }
      });
    }

    // Keyboard events
    document.addEventListener("keydown", function (e) {
      const modal = document.getElementById("quickViewModal");
      if (e.key === "Escape" && modal && modal.classList.contains("active")) {
        hideQuickView();
      }
    });
  }

  // Add quick view buttons to all existing product cards
  function addQuickViewButtons() {
    const productCards = document.querySelectorAll(
      ".product-card:not([data-quick-view-added])"
    );

    productCards.forEach((card) => {
      const linkWrapper = card.querySelector(".link-wrapper");
      if (linkWrapper) {
        const href = linkWrapper.getAttribute("href");
        const title = linkWrapper.getAttribute("title");
        const priceElement = card.querySelector(".price");
        const price = priceElement
          ? priceElement.textContent.trim()
          : "Price not available";

        // Check if button already exists
        if (!card.querySelector(".quick-view-btn")) {
          const quickViewBtn = document.createElement("button");
          quickViewBtn.className = "quick-view-btn";
          quickViewBtn.setAttribute("data-product-url", href);
          quickViewBtn.setAttribute("data-product-title", title);
          quickViewBtn.setAttribute("data-product-price", price);
          quickViewBtn.textContent = "Quick View";

          card.appendChild(quickViewBtn);
        }

        card.setAttribute("data-quick-view-added", "true");
      }
    });
  }

  // Observe changes for new product cards
  function observeProductChanges() {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          // Check if new product cards were added
          const hasProductCards = Array.from(mutation.addedNodes).some(
            (node) =>
              node.nodeType === 1 &&
              (node.classList.contains("product-card") ||
                node.querySelector(".product-card"))
          );

          if (hasProductCards) {
            setTimeout(addQuickViewButtons, 100); // Small delay to ensure elements are rendered
          }
        }
      });
    });

    // Observe changes to the products container
    const productsContainer = document.querySelector(".products");
    if (productsContainer) {
      observer.observe(productsContainer, {
        childList: true,
        subtree: true,
      });
    }

    // Also observe the entire body for cases where products are loaded dynamically
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
