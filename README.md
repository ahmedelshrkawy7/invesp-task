# 🪟 Quick View Feature — Pamono Furniture Page

This project enhances the user experience on the [Pamono Furniture page](https://www.pamono.com/furniture) by adding a **custom Quick View popup** using the **User JavaScript and CSS Chrome extension**.  
The feature enables users to preview product images quickly without leaving the main listing page.

---

## 🚀 Features

### 🖱️ Hover Interaction
- When hovering over any product item, a **“Quick View”** button smoothly appears on top of the item.

### 👁️ Quick View Popup
- Clicking the **Quick View** button opens a **centered popup** displaying:
  - A **carousel** (image slider) containing all images of the selected product.
  - A **close button** to dismiss the popup.

### 🖼️ Image Carousel (Powered by **Swiper.js**)
- Implemented using **[Swiper.js](https://swiperjs.com/)** for smooth, touch-friendly slide transitions.  
- The carousel dynamically loads all product images from the product’s detail page.  
- Supports responsive layout and slide navigation.

### 🧭 Closing Behavior
- The popup closes on:
  - Clicking the close (×) button  
  - Clicking anywhere outside the popup

### 🔍 Bonus: Zoom Feature
- Added an **image zoom on hover** feature within the popup as a **bonus enhancement**.  
- Users can hover over an image to zoom in and explore fine product details.

---

## 🧩 Technologies & Tools

| Category | Tool / Library |
|-----------|----------------|
| **Extension** | [User JavaScript and CSS for Chrome](https://chrome.google.com/webstore/detail/userjavascript-andcss/nbhcbdghjpllgmfilhnhkllmkecfmpld) |
| **JavaScript** | Vanilla ES6 (no jQuery) |
| **Carousel** | [Swiper.js](https://swiperjs.com/) |
| **CSS** | Custom styling for overlay, popup, transitions, and hover effects |
| **Zoom Feature** | CSS `transform: scale()` with JavaScript hover events |

---

## ⚙️ How to Use

1. **Install the Extension**  
   - Install [User JavaScript and CSS](https://chrome.google.com/webstore/detail/userjavascript-andcss/nbhcbdghjpllgmfilhnhkllmkecfmpld) from the Chrome Web Store.

2. **Open the Target Page**  
   - Visit [https://www.pamono.com/furniture](https://www.pamono.com/furniture).

3. **Add Custom Scripts**
   - Click the extension icon.
   - Add the provided **JavaScript** code under the *JavaScript* tab.
   - Add the provided **CSS** code under the *CSS* tab.

4. **Save & Refresh**
   - Click **Save** and refresh the page to activate the feature.


