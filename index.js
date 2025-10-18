(function() {
  'use strict';
  
  let currentSwiper = null;
  let isInitialized = false;
  
  // Sample product images for demonstration
  const sampleImages = {
    'https://www.pamono.com/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s': [
      'https://cdn20.pamono.com/p/m/1/9/1940328_v67tq02lyd/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s.png',
      'https://cdn20.pamono.com/p/z/1/9/1940328_v67tq02lyd/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s-1.jpg',
      'https://cdn20.pamono.com/p/z/1/9/1940328_v67tq02lyd/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s-2.jpg',
      'https://cdn20.pamono.com/p/z/1/9/1940328_v67tq02lyd/set-of-vintage-leather-kashima-seater-and-ottoman-by-michel-ducaroy-for-ligne-roset-1980s-3.jpg'
    ],
    'https://www.pamono.com/armchairs-by-guillerme-et-chambron-for-votre-maison-1950s-set-of-2': [
      'https://cdn20.pamono.com/p/m/2/3/2364372_q153obih1r/armchairs-by-guillerme-et-chambron-for-votre-maison-1950s-set-of-2.png',
      'https://cdn20.pamono.com/p/z/2/3/2364372_q153obih1r/armchairs-by-guillerme-et-chambron-for-votre-maison-1950s-set-of-2-1.jpg',
      'https://cdn20.pamono.com/p/z/2/3/2364372_q153obih1r/armchairs-by-guillerme-et-chambron-for-votre-maison-1950s-set-of-2-2.jpg'
    ],
    'https://www.pamono.com/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s': [
      'https://cdn20.pamono.com/p/m/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s.png',
      'https://cdn20.pamono.com/p/z/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s-1.jpg',
      'https://cdn20.pamono.com/p/z/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s-2.jpg',
      'https://cdn20.pamono.com/p/z/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s-3.jpg',
      'https://cdn20.pamono.com/p/z/2/0/2093516_7ljzd187nv/set-of-senator-hijack-lounge-chair-and-ottoman-by-ole-wanscher-for-cado-1960s-4.jpg'
    ]
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
  
  // Load Swiper CSS and JS
  function loadLibraries() {
    return new Promise((resolve) => {
      // Load Swiper CSS
      if (!document.querySelector('link[href*="swiper"]')) {
        const swiperCSS = document.createElement('link');
        swiperCSS.rel = 'stylesheet';
        swiperCSS.href = 'https://unpkg.com/swiper@8/swiper-bundle.min.css';
        document.head.appendChild(swiperCSS);
      }
      
      // Load Swiper JS
      if (!window.Swiper) {
        const swiperJS = document.createElement('script');
        swiperJS.src = 'https://unpkg.com/swiper@8/swiper-bundle.min.js';
        swiperJS.onload = resolve;
        document.head.appendChild(swiperJS);
      } else {
        resolve();
      }
    });
  }
  
  // Create the modal HTML structure
  function createModal() {
    if (document.getElementById('quickViewModal')) return;
    
    
    const modalHTML =`<div class="product-essential row">
    <div class="product-img-box col-md-6 mb-0">
      <div class="product-img-list">
        

<div class="product-image product-image-zoom zoom-available"><div class="product-image-gallery">
    <img id="product-featured-image" class="gallery-image visible lazyloaded" data-src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes1_e3564837-87e1-476f-b89b-9cbec7cf941d_600x_crop_center.jpg?v=1597401858" data-zoom-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes1_e3564837-87e1-476f-b89b-9cbec7cf941d.jpg?v=1597401858" style="" src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes1_e3564837-87e1-476f-b89b-9cbec7cf941d_600x_crop_center.jpg?v=1597401858">
  </div>
</div>


<div class="more-views-horizontal">
  <div class="row">
    <div class="data-carousel" data-items="4" data-plus="false" data-auto="" data-320="3" data-480="3" data-640="4" data-768="3" data-992="4" data-1200="4" data-margin="0" data-paging="false" data-loop="false" data-nav="true" data-prev="&lt;i class=&quot;icon-angle-left&quot;&gt;&lt;/i&gt;" data-next="&lt;i class=&quot;icon-angle-right&quot;&gt;&lt;/i&gt;" style="display: none;"></div>
    <div id="more-slides" class="product-image-thumbs owl-carousel carousel-init owl-loaded owl-drag">
      
      
      
      
      
      
      
      
      
    <div class="owl-stage-outer"><div class="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all; width: 445px; padding-left: 0px; padding-right: 0px;"><div class="owl-item active" style="width: 111.25px;"><div class="item">
        <a class="thumb-link" href="javascript:void(0);" data-image-index="1" data-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes1_e3564837-87e1-476f-b89b-9cbec7cf941d_600x_crop_center.jpg?v=1597401858" data-zoom-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes1_e3564837-87e1-476f-b89b-9cbec7cf941d.jpg?v=1597401858">
          <img class="img-responsive current lazyloaded" data-src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes1_e3564837-87e1-476f-b89b-9cbec7cf941d_150x150.jpg?v=1597401858" src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes1_e3564837-87e1-476f-b89b-9cbec7cf941d_150x150.jpg?v=1597401858">
        </a>
      </div></div><div class="owl-item active" style="width: 111.25px;"><div class="item">
        <a class="thumb-link" href="javascript:void(0);" data-image-index="2" data-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes2_a3fad7cf-ebd6-476b-b48e-fb31f27fa741_600x_crop_center.jpg?v=1597401858" data-zoom-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes2_a3fad7cf-ebd6-476b-b48e-fb31f27fa741.jpg?v=1597401858">
          <img class="img-responsive lazyloaded" data-src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes2_a3fad7cf-ebd6-476b-b48e-fb31f27fa741_150x150.jpg?v=1597401858" src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes2_a3fad7cf-ebd6-476b-b48e-fb31f27fa741_150x150.jpg?v=1597401858">
        </a>
      </div></div><div class="owl-item active" style="width: 111.25px;"><div class="item">
        <a class="thumb-link" href="javascript:void(0);" data-image-index="3" data-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes_99829fd4-3b25-4c34-be04-108a1aa2250f_600x_crop_center.jpg?v=1597401858" data-zoom-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes_99829fd4-3b25-4c34-be04-108a1aa2250f.jpg?v=1597401858">
          <img class="img-responsive lazyloaded" data-src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes_99829fd4-3b25-4c34-be04-108a1aa2250f_150x150.jpg?v=1597401858" src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes_99829fd4-3b25-4c34-be04-108a1aa2250f_150x150.jpg?v=1597401858">
        </a>
      </div></div><div class="owl-item active" style="width: 111.25px;"><div class="item">
        <a class="thumb-link" href="javascript:void(0);" data-image-index="4" data-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes3_32c0a93a-1430-40aa-9e66-7407aba1c524_600x_crop_center.jpg?v=1597401858" data-zoom-image="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes3_32c0a93a-1430-40aa-9e66-7407aba1c524.jpg?v=1597401858">
          <img class="img-responsive lazyloaded" data-src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes3_32c0a93a-1430-40aa-9e66-7407aba1c524_150x150.jpg?v=1597401858" src="//porto-demo1.myshopify.com/cdn/shop/products/BlueGentleShoes3_32c0a93a-1430-40aa-9e66-7407aba1c524_150x150.jpg?v=1597401858">
        </a>
      </div></div></div></div><div class="owl-nav disabled"><button type="button" role="presentation" class="owl-prev"><i class="icon-angle-left"></i></button><button type="button" role="presentation" class="owl-next"><i class="icon-angle-right"></i></button></div><div class="owl-dots disabled"></div><div class="owl-thumbs"></div></div>
  </div>
</div>

      </div>
    </div>
    <div class="product-shop col-md-6 mb-0">
      <div class="product-shop-wrapper">
        <div class="product-name top-product-detail">
          <h1>
            <a href="/products/casual-blue-shoes">
              Casual Blue Shoes
            </a>
          </h1>
        </div>
        <div class="review-product-details">
          <span class="shopify-product-reviews-badge" data-id="4611505291298"></span>
        </div>
        
        <div class="short-description-detail">
          <div class="short-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi...
          </div>
        </div>
        
        <div class="middle-product-detail">
          <div class="product-type-data">
            <div class="price-box">
              <div id="price" class="detail-price" itemprop="price"><div class="price"><span class="money">$101.00</span></div></div>
              <meta itemprop="priceCurrency" content="USD">
              
              <link itemprop="availability" href="http://schema.org/InStock">
              
            </div>
          </div>
          
          <div class="product-inventory">
            <span>Availability: </span>
            <span class="in-stock">In Stock</span>
          </div>
          
          
          
        </div>
        <div class="product-type-main">
          <form class="product-form" action="/cart/add" method="post" enctype="multipart/form-data" data-product-id="4611505291298" data-id="casual-blue-shoes">
            <div class="product-options">
              <div class="selector-wrapper size"><label for="quick-product-selectors-option-0">Size</label><select class="single-option-selector" data-option="option1" id="quick-product-selectors-option-0"><option value="S">S</option><option value="M">M</option><option value="L">L</option></select></div><div class="selector-wrapper color"><label for="quick-product-selectors-option-1">Color</label><select class="single-option-selector" data-option="option2" id="quick-product-selectors-option-1"><option value="blue">blue</option><option value="black">black</option></select></div><select id="quick-product-selectors" name="id" style="display: none;">
                
                
                <option selected="selected" value="32265607020578">S / blue - $101.00 USD</option>
                
                
                
                <option disabled="disabled">
                  S / black - Sold Out
                </option>
                
                
                
                <option disabled="disabled">
                  M / blue - Sold Out
                </option>
                
                
                
                <option disabled="disabled">
                  M / black - Sold Out
                </option>
                
                
                
                <option disabled="disabled">
                  L / blue - Sold Out
                </option>
                
                
                
                <option disabled="disabled">
                  L / black - Sold Out
                </option>
                
                
              </select><div class="swatch clearfix" data-option-index="0"><div class="header">Size:</div><div class="variant-items"><div data-value="S" class="swatch-element square size-small  s available"><input id="swatch-4611505291298-0-s" type="radio" name="option-0" value="S"><label for="swatch-4611505291298-0-s">S<img class="crossed-out" src="//porto-demo1.myshopify.com/cdn/shop/t/51/assets/soldout.png"></label></div><div data-value="M" class="swatch-element square size-small  m"><input id="swatch-4611505291298-0-m" type="radio" name="option-0" value="M"><label for="swatch-4611505291298-0-m">M<img class="crossed-out" src="//porto-demo1.myshopify.com/cdn/shop/t/51/assets/soldout.png"></label></div><div data-value="L" class="swatch-element square size-small  l"><input id="swatch-4611505291298-0-l" type="radio" name="option-0" value="L"><label for="swatch-4611505291298-0-l">L<img class="crossed-out" src="//porto-demo1.myshopify.com/cdn/shop/t/51/assets/soldout.png"></label></div></div></div><div class="swatch clearfix" data-option-index="1"><div class="header">Color:</div><div class="variant-items"><div data-value="blue" class="swatch-element square size-small color colorblue available"><div class="tooltip">blue</div><input id="swatch-4611505291298-1-blue" type="radio" name="option-1" value="blue"><label for="swatch-4611505291298-1-blue" style="background-color: blue; background-image: url(//porto-demo1.myshopify.com/cdn/shop/t/51/assets/blue.png)"><img class="crossed-out" src="//porto-demo1.myshopify.com/cdn/shop/t/51/assets/soldout.png"></label></div><div data-value="black" class="swatch-element square size-small color colorblack"><div class="tooltip">black</div><input id="swatch-4611505291298-1-black" type="radio" name="option-1" value="black"><label for="swatch-4611505291298-1-black" style="background-color: black; background-image: url(//porto-demo1.myshopify.com/cdn/shop/t/51/assets/black.png)"><img class="crossed-out" src="//porto-demo1.myshopify.com/cdn/shop/t/51/assets/soldout.png"></label></div></div></div>
            </div>
            <div class="product-options-bottom">
              <div class="add-to-cart-box">
                <div class="input-box">
                  <input type="text" id="qty" name="quantity" value="1" min="1" class="quantity-selector">
                  <div class="plus-minus">
                    <div class="increase items" onclick="var result = document.getElementById('qty'); var qty = result.value; if( !isNaN( qty )) result.value++;return false;">
                      <i class="icon-up-dir"></i>
                    </div>
                    <div class="reduced items" onclick="var result = document.getElementById('qty'); var qty = result.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) result.value--;return false;">
                      <i class="icon-down-dir"></i>
                    </div>
                  </div>
                </div>
                <div class="actions">
                  <div class="action-list addtocart">
                    <div class="button-wrapper">
                      
                      <div class="button-wrapper-content">
                        <button type="submit" name="add" class="btn-cart add-to-cart bordered uppercase">
                          <i class="icon-cart"></i>
                          <span>Add to Cart</span>
                        </button>
                      </div>
                      
                    </div>
                  </div>
                  
                  <div class="action-list wishlist">
                    <ul class="add-to-links">
  <li><a href="javascript:;" data-product-handle="casual-blue-shoes" data-product-title="Casual Blue Shoes" class="link-wishlist" title="Add to wishlist"><i class="icon-heart"></i><span>Add to wishlist</span></a></li>
  <li><a href="javascript:;" data-product-handle="casual-blue-shoes" data-product-title="Casual Blue Shoes" class="link-compare" title="Add to compare"><i class="icon-compare"></i><span>Add to compare</span></a></li>
</ul>
                  </div>
                  
                </div>
              </div>
            </div>
          </form>
        </div><div class="product-share">
  <div class="share-links">
    <a href="https://www.facebook.com/sharer.php?u=https://porto-demo1.myshopify.com/products/casual-blue-shoes" target="_blank" rel="nofollow" title="Casual Blue Shoes" class="share-facebook">Facebook</a>
    <a href="https://twitter.com/intent/tweet?text=Casual Blue Shoes&amp;url=https://porto-demo1.myshopify.com/products/casual-blue-shoes" target="_blank" rel="nofollow" title="Casual Blue Shoes" class="share-twitter">Twitter</a>
    <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=https://porto-demo1.myshopify.com/products/casual-blue-shoes&amp;title=Casual Blue Shoes" target="_blank" rel="nofollow" class="share-linkedin" title="Casual Blue Shoes">LinkedIn</a>
    <a href="https://plus.google.com/share?url=https://porto-demo1.myshopify.com/products/casual-blue-shoes" target="_blank" rel="nofollow" title="Casual Blue Shoes" class="share-googleplus">Google +</a>
    <a href="mailto:?subject=Casual Blue Shoes&amp;body=https://porto-demo1.myshopify.com/products/casual-blue-shoes" target="_blank" rel="nofollow" title="Casual Blue Shoes" class="share-email">Email</a>
  </div>
</div>
</div>
    </div>
  </div>`
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  
  // Mock function to simulate fetching product images
  function fetchProductImages(productUrl) {
    return new Promise((resolve) => {
      // Simulate API delay
      setTimeout(() => {
        const images = sampleImages[productUrl] || [
          // Fallback: try to extract image from existing product card
          extractImageFromProductCard(productUrl)
        ].filter(Boolean);
        resolve(images);
      }, 800); // Simulate loading time
    });
  }
  
  // Extract image from product card
  function extractImageFromProductCard(productUrl) {
    const productCards = document.querySelectorAll('.product-card');
    for (const card of productCards) {
      const link = card.querySelector('.link-wrapper');
      if (link && link.getAttribute('href') === productUrl) {
        const img = card.querySelector('.image');
        if (img) {
          return img.src || img.getAttribute('data-lazy') || img.getAttribute('data-src');
        }
      }
    }
    return null;
  }
  
  // Initialize Swiper
  function initSwiper(images) {
    const swiperWrapper = document.getElementById('quickViewWrapper');
    const loading = document.getElementById('quickViewLoading');
    const swiperContainer = document.getElementById('quickViewSwiper');
    
    // Clear existing slides
    swiperWrapper.innerHTML = '';
    
    // Add slides
    images.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `<img src="${image}" alt="Product image ${index + 1}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzI0MS40MjEgMTAwIDI3NS0xMzMuNTc5IDI3NS0xNzVTMjQxLjQyMS0yNTAgMjAwLTI1MFMxMjUtMjE2LjQyMSAxMjUtMTc1UzE1OC41NzkgMTAwIDIwMCAxMDBaIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iMiIvPgo8cGF0aCBkPSJNMTc1IDI1MEwyMjUgMjAwTDI3NSAyNTBIMTc1WiIgZmlsbD0iI0NDQyIvPgo8L3N2Zz4K'" />`;
      swiperWrapper.appendChild(slide);
    });
    
    // Show swiper and hide loading
    loading.style.display = 'none';
    swiperContainer.style.display = 'block';
    
    // Destroy existing swiper if it exists
    if (currentSwiper) {
      currentSwiper.destroy(true, true);
    }
    
    // Initialize new swiper
    currentSwiper = new Swiper('#quickViewSwiper', {
      loop: images.length > 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      keyboard: {
        enabled: true,
      },
      autoplay: false,
      speed: 300,
      effect: 'slide'
    });
  }
  
  // Show Quick View Modal
  function showQuickView(button) {
    const productUrl = button.getAttribute('data-product-url');
    const productTitle = button.getAttribute('data-product-title');
    const productPrice = button.getAttribute('data-product-price');
    
    const modal = document.getElementById('quickViewModal');
    const titleEl = document.getElementById('quickViewTitle');
    const priceEl = document.getElementById('quickViewPrice');
    const loading = document.getElementById('quickViewLoading');
    const swiperContainer = document.getElementById('quickViewSwiper');
    
    // Set product info
    titleEl.textContent = productTitle;
    priceEl.textContent = productPrice;
    
    // Reset modal state
    loading.style.display = 'flex';
    swiperContainer.style.display = 'none';
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Fetch and display images
    fetchProductImages(productUrl)
      .then(images => {
        initSwiper(images);
      })
      .catch(error => {
        console.error('Error loading images:', error);
        loading.innerHTML = '<div>Error loading images</div>';
      });
  }
  
  // Hide Quick View Modal
  function hideQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Destroy swiper to prevent memory leaks
    if (currentSwiper) {
      currentSwiper.destroy(true, true);
      currentSwiper = null;
    }
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Quick View button clicks
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('quick-view-btn')) {
        e.preventDefault();
        e.stopPropagation();
        showQuickView(e.target);
      }
    });
    
    // Close modal events
    const closeBtn = document.getElementById('quickViewClose');
    const modal = document.getElementById('quickViewModal');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', hideQuickView);
    }
    
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          hideQuickView();
        }
      });
    }
    
    // Keyboard events
    document.addEventListener('keydown', function(e) {
      const modal = document.getElementById('quickViewModal');
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        hideQuickView();
      }
    });
  }
  
  // Add quick view buttons to all existing product cards
  function addQuickViewButtons() {
    const productCards = document.querySelectorAll('.product-card:not([data-quick-view-added])');
    
    productCards.forEach(card => {
      const linkWrapper = card.querySelector('.link-wrapper');
      if (linkWrapper) {
        const href = linkWrapper.getAttribute('href');
        const title = linkWrapper.getAttribute('title');
        const priceElement = card.querySelector('.price');
        const price = priceElement ? priceElement.textContent.trim() : 'Price not available';
        
        // Check if button already exists
        if (!card.querySelector('.quick-view-btn')) {
          const quickViewBtn = document.createElement('button');
          quickViewBtn.className = 'quick-view-btn';
          quickViewBtn.setAttribute('data-product-url', href);
          quickViewBtn.setAttribute('data-product-title', title);
          quickViewBtn.setAttribute('data-product-price', price);
          quickViewBtn.textContent = 'Quick View';
          
          card.appendChild(quickViewBtn);
        }
        
        card.setAttribute('data-quick-view-added', 'true');
      }
    });
  }
  
  // Observe changes for new product cards
  function observeProductChanges() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Check if new product cards were added
          const hasProductCards = Array.from(mutation.addedNodes).some(node => 
            node.nodeType === 1 && (node.classList.contains('product-card') || node.querySelector('.product-card'))
          );
          
          if (hasProductCards) {
            setTimeout(addQuickViewButtons, 100); // Small delay to ensure elements are rendered
          }
        }
      });
    });
    
    // Observe changes to the products container
    const productsContainer = document.querySelector('.products');
    if (productsContainer) {
      observer.observe(productsContainer, {
        childList: true,
        subtree: true
      });
    }
    
    // Also observe the entire body for cases where products are loaded dynamically
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();