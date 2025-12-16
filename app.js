const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartCount = document.getElementById('cartCount');
const cartList = document.querySelector('.listcart');
const addBtns = document.querySelectorAll('.listproduct button');

let cart = [];

function updateCart() {
  cartList.innerHTML = '';
  let count = 0;

  cart.forEach((item, i) => {
    count += item.qty;
    cartList.innerHTML += `
      <div class="item">
        <img src="${item.img}">
        <div>${item.name}</div>
        <div>${item.price * item.qty}</div>
        <div class="quantity">
          <span onclick="changeQty(${i}, -1)">-</span>
          <span>${item.qty}</span>
          <span onclick="changeQty(${i}, 1)">+</span>
        </div>
      </div>`;
  });

  cartCount.innerText = count;
}

window.changeQty = function(i, c) {
  cart[i].qty += c;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  updateCart();
};

addBtns.forEach(btn => {
  btn.onclick = () => {
    const item = btn.closest('.item');
    const name = item.querySelector('h2').innerText;
    const price = parseInt(item.querySelector('.price').innerText.replace(/\D/g, ''));
    const img = item.querySelector('img').src;

    const found = cart.find(p => p.name === name);
    if (found) found.qty++;
    else cart.push({ name, price, img, qty: 1 });

    updateCart();
    document.body.classList.add('showCart');
  };
});

cartBtn.onclick = () => document.body.classList.add('showCart');
closeCart.onclick = () => document.body.classList.remove('showCart');
