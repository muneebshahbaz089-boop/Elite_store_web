import { CartAPI } from "./cart-api.js";

const container = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const totalBox = document.getElementById("cart-total");

async function renderCart() {
  const cart = await CartAPI.getAll();

  if (cart.length === 0) {
    container.innerHTML = `
      <p class="text-center text-muted py-5">
        Your cart is empty
      </p>
    `;
    if (cartCount) cartCount.textContent = 0;
    if (totalBox) totalBox.textContent = "Rs. 0";
    return;
  }

  let totalItems = 0;
  let grandTotal = 0;

  container.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;

    totalItems += item.quantity;
    grandTotal += itemTotal;

    return `
      <div class="card mb-3 shadow-sm">
        <div class="row align-items-center p-2">
          
          <div class="col-md-2 text-center">
            <img src="${item.image}" style="height:80px;object-fit:cover">
          </div>

          <div class="col-md-3">
            <h6>${item.name}</h6>
            <small class="text-muted">
              Rs. ${item.price} × ${item.quantity}
            </small>
          </div>

          <div class="col-md-2 fw-bold text-success">
            Rs. ${itemTotal}
          </div>

          <div class="col-md-2">
            <input 
              type="number" 
              min="1"
              value="${item.quantity}"
              class="form-control qty"
              data-id="${item.id}"
            >
          </div>

          <div class="col-md-2">
            <button class="btn btn-danger btn-sm remove"
              data-id="${item.id}">
              Remove
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (cartCount) cartCount.textContent = totalItems;
  if (totalBox) totalBox.textContent = `Rs. ${grandTotal}`;

  
  document.querySelectorAll(".qty").forEach(input => {
    input.addEventListener("change", async e => {
      await CartAPI.update(
        e.target.dataset.id,
        parseInt(e.target.value)
      );
      renderCart();
    });
  });

  
  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", async () => {
      await CartAPI.remove(btn.dataset.id);
      renderCart();
    });
  });
}

renderCart();
