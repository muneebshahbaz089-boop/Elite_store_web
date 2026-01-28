const BASE_URL = "http://localhost:3000";



export const CartAPI = {
  async getAll() {
    const res = await fetch(`${BASE_URL}/cart`);
    return await res.json();
  },

  async add(product) {
    const cart = await this.getAll();

    
    const existing = cart.find(item => item.productId === product.id);

    if (existing) {
      await fetch(`${BASE_URL}/cart/${existing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity: existing.quantity + 1
        })
      });
    } else {
      await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        })
      });
    }
  },

  async update(id, quantity) {
    await fetch(`${BASE_URL}/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity })
    });
  },

  async remove(id) {
    await fetch(`${BASE_URL}/cart/${id}`, {
      method: "DELETE"
    });
  }
};
