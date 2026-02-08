document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('ProductModal');
  const closeBtn = document.getElementById('CloseModal');
  const hotspots = document.querySelectorAll('.hotspot');

  // Modal elements
  const modalTitle = document.getElementById('ModalTitle');
  const modalPrice = document.getElementById('ModalPrice');
  const modalDesc = document.getElementById('ModalDescription');
  const modalImage = document.getElementById('ModalImage');
  const modalVariants = document.getElementById('ModalVariants');
  const atcBtn = document.getElementById('ModalAddToCart');

  let currentProduct = null;
  let selectedVariant = null;

  // Open modal on hotspot click
  hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', function () {
      const handle = this.dataset.productHandle;
      fetchProductData(handle);
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  function fetchProductData(handle) {
    fetch(`/products/${handle}.js`)
      .then(response => response.json())
      .then(product => {
        currentProduct = product;
        renderModal(product);
        modal.style.display = 'flex';
      })
      .catch(error => console.error('Error fetching product:', error));
  }

  function renderModal(product) {
    modalTitle.textContent = product.title;
    modalPrice.textContent = (product.price / 100).toFixed(2).replace('.', ',') + '€';
    modalDesc.innerHTML = product.description;
    modalImage.src = product.featured_image;

    modalVariants.innerHTML = '';

    if (product.variants.length > 1) {
      product.options.forEach((option, index) => {
        const group = document.createElement('div');
        group.className = 'variant-group';

        const label = document.createElement('span');
        label.className = 'variant-label';
        label.textContent = option.name;
        group.appendChild(label);

        if (option.name.toLowerCase() === 'color' || option.name.toLowerCase() === 'colour') {
          const optionsDiv = document.createElement('div');
          optionsDiv.className = 'variant-options-buttons';

          option.values.forEach(value => {
            const opt = document.createElement('div');
            opt.className = 'variant-option-btn';
            opt.textContent = value;
            opt.dataset.optionIndex = index;
            opt.dataset.value = value;

            // Default select first 
            if (value === product.variants[0].options[index]) opt.classList.add('selected');

            opt.addEventListener('click', function () {
              optionsDiv.querySelectorAll('.variant-option-btn').forEach(el => el.classList.remove('selected'));
              this.classList.add('selected');
              updateVariantSelection();
            });
            optionsDiv.appendChild(opt);
          });
          group.appendChild(optionsDiv);
        } else {
          // Render as dropdown (likely Size)
          const selectWrapper = document.createElement('div');
          selectWrapper.className = 'select-wrapper';

          const select = document.createElement('select');
          select.className = 'variant-select';
          select.dataset.optionIndex = index;

          const defaultOpt = document.createElement('option');
          defaultOpt.textContent = `Choose your ${option.name.toLowerCase()}`;
          defaultOpt.value = "";
          select.appendChild(defaultOpt);

          option.values.forEach(value => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.textContent = value;
            select.appendChild(opt);
          });

          select.addEventListener('change', updateVariantSelection);
          selectWrapper.appendChild(select);
          group.appendChild(selectWrapper);
        }

        modalVariants.appendChild(group);
      });
    }

    updateVariantSelection();
  }

  function updateVariantSelection() {
    if (!currentProduct) return;

    if (currentProduct.variants.length === 1) {
      selectedVariant = currentProduct.variants[0];
      atcBtn.disabled = !selectedVariant.available;
      return;
    }

    const selectedOptions = [];

    // Get from buttons
    document.querySelectorAll('.variant-option-btn.selected').forEach(el => {
      selectedOptions.push({ index: parseInt(el.dataset.optionIndex), value: el.dataset.value });
    });

    // Get from selects
    document.querySelectorAll('.variant-select').forEach(el => {
      if (el.value) {
        selectedOptions.push({ index: parseInt(el.dataset.optionIndex), value: el.value });
      }
    });

    // If all options are selected
    if (selectedOptions.length === currentProduct.options.length) {
      selectedVariant = currentProduct.variants.find(variant => {
        return selectedOptions.every(opt => variant.options[opt.index] === opt.value);
      });

      if (selectedVariant) {
        modalPrice.textContent = (selectedVariant.price / 100).toFixed(2).replace('.', ',') + '€';
        atcBtn.disabled = !selectedVariant.available;
        if (selectedVariant.featured_image) {
          modalImage.src = selectedVariant.featured_image.src;
        }
      } else {
        atcBtn.disabled = true;
      }
    } else {
      selectedVariant = null;
      atcBtn.disabled = true;
    }
  }

  atcBtn.addEventListener('click', function () {
    if (!selectedVariant) return;

    let itemsToAdd = [{
      id: selectedVariant.id,
      quantity: 1
    }];

    // Special Requirement: Black and Medium -> Soft Winter Jacket
    const isBlack = selectedVariant.options.some(opt => opt.toLowerCase() === 'black');
    const isMedium = selectedVariant.options.some(opt => opt.toLowerCase() === 'medium');

    if (isBlack && isMedium) {
      // We need the variant ID for "Soft Winter Jacket". 
      // In a real scenario we'd fetch it or have it configured.
      // For this test, I'll attempt to find it or use a placeholder if not found.
      fetch('/products/soft-winter-jacket.js')
        .then(res => res.json())
        .then(swj => {
          itemsToAdd.push({
            id: swj.variants[0].id,
            quantity: 1
          });
          addToCart(itemsToAdd);
        })
        .catch(() => {
          // If jacket not found, just add the original item
          addToCart(itemsToAdd);
        });
    } else {
      addToCart(itemsToAdd);
    }
  });

  function addToCart(items) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: items })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        modal.style.display = 'none';
        // Optionally redirect to cart or show success message
        window.location.href = '/cart';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
});
