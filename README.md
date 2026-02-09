# Ecomexperts Shopify Hiring Test

This repository contains a custom Shopify theme implementation built for the Ecomexperts technical assessment. The project focuses on creating a high-performance, pixel-perfect landing page using Liquid and Vanilla JavaScript.

## Features

###  Custom Hero Banner
- Fully editable text (Logo, Subtitle, Title, Description, Footer) via Shopify Customizer.
- Premium "New Page" swipe animations on action buttons.
- Mobile-responsive design with optimized asset loading.

###  Interactive Product Grid
- 6-block grid with dynamic product selection.
- Custom hotspot icons (+) that trigger a detailed product popup.
- Clean, minimal aesthetic matching Figma design.

###  Dynamic Product Modal
- **Vanilla JS Implementation**: No jQuery or external libraries used.
- **Dynamic Variants**: Color options as buttons and Size as a stylized dropdown.
- **Smart Logic**: Automatically adds a "Soft Winter Jacket" to the cart when "Black" + "Medium" variants are selected together.
- **AJAX Add to Cart**: Seamless cart additions with interactive button states (Adding... -> Added!).

## Tech Stack
- **Shopify Liquid**: For server-side templating and Customizer integration.
- **Vanilla JavaScript (ES6+)**: For all client-side logic and AJAX operations.
- **Vanilla CSS**: Custom design system without bloated frameworks.
- **Shopify AJAX API**: For real-time product data and cart management.

##  How to Push to GitHub

If you haven't pushed your code yet, run these commands in your terminal inside the `NewThem` folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit your changes
git commit -m "feat: complete ecomexperts hiring test"

# Create main branch and link to your repo
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push the code
git push -u origin main
```

## 🔄 How to Reflect GitHub Changes in Shopify

Shopify allows you to link your GitHub repository directly to a theme. Every time you `git push`, your Shopify store will update automatically.

1. **Go to Shopify Admin**: Navigate to **Online Store** > **Themes**.
2. **Add Theme**: Click the **Add theme** button and select **Connect from GitHub**.
3. **Log in to GitHub**: If prompted, authorize Shopify to access your account.
4. **Select Repository**: 
    - Choose your hiring test repository from the list.
    - Select the `main` branch.
5. **Connect**: Click **Connect**. Shopify will now create a new theme linked to your GitHub.

**Note**: Any changes you commit and push to your GitHub `main` branch will now instantly appear in this Shopify theme!

---
*Developed for the Ecomexperts Technical Assessment.*
