<script>
  const cartIcon = document.querySelector('.icon-cart');
  const cartCount = document.querySelector('.icon-cart span');
  const addButtons = document.querySelectorAll('.listproduct .item button');
  const cartList = document.querySelector('.listcart');

  let cart = [];

  function updateCartUI() {
    cartList.innerHTML = '';
    let totalQty = 0;

    cart.forEach((item, index) => {
      totalQty += item.qty;

      const div = document.createElement('div');
      div.className = 'item';

      div.innerHTML = `
        <img src="${item.img}">
        <div>${item.name}</div>
        <div>${item.price * item.qty}</div>
        <div class="quantity">
          <span onclick="changeQty(${index}, -1)">-</span>
          <span>${item.qty}</span>
          <span onclick="changeQty(${index}, 1)">+</span>
        </div>
      `;

      cartList.appendChild(div);
    });

    cartCount.textContent = totalQty;
  }

  window.changeQty = function(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    updateCartUI();
  };

  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.item');
      const name = item.querySelector('h2').innerText;
      const price = parseInt(item.querySelector('.price').innerText.replace(/\D/g, ''));
      const img = item.querySelector('img').src;

      const existing = cart.find(p => p.name === name);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, img, qty: 1 });
      }

      updateCartUI();
      document.body.classList.add('showCart');
    });
  });

  cartIcon.addEventListener('click', () => {
    document.body.classList.toggle('showCart');
  });
</script>
