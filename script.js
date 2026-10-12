const body = document.body;


/* =========================
   ELEMENTS
========================= */

const menuButton =
  document.getElementById("menuButton");

const closeMenuButton =
  document.getElementById("closeMenuButton");

const mobileDrawer =
  document.getElementById("mobileDrawer");

const menuOverlay =
  document.getElementById("menuOverlay");


const cartButton =
  document.getElementById("cartButton");

const bottomCartButton =
  document.getElementById("bottomCartButton");

const closeCartButton =
  document.getElementById("closeCartButton");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartOverlay =
  document.getElementById("cartOverlay");


const cartCount =
  document.getElementById("cartCount");

const bottomCartCount =
  document.getElementById("bottomCartCount");

const cartItems =
  document.getElementById("cartItems");

const cartItemCount =
  document.getElementById("cartItemCount");

const cartTotal =
  document.getElementById("cartTotal");


const wishlistCount =
  document.getElementById("wishlistCount");

const wishlistButtons =
  document.querySelectorAll(
    ".wishlist-button"
  );


const toast =
  document.getElementById("toast");


/* =========================
   LOCAL STORAGE
========================= */

let cart =
  JSON.parse(
    localStorage.getItem(
      "soroshfulCart"
    )
  ) || [];


let wishlist =
  JSON.parse(
    localStorage.getItem(
      "soroshfulWishlist"
    )
  ) || [];


/* =========================
   MENU
========================= */

function openMenu() {

  mobileDrawer.classList.add("show");

  menuOverlay.classList.add("show");

  body.classList.add("lock");

}


function closeMenu() {

  mobileDrawer.classList.remove("show");

  menuOverlay.classList.remove("show");

  body.classList.remove("lock");

}


menuButton?.addEventListener(
  "click",
  openMenu
);


closeMenuButton?.addEventListener(
  "click",
  closeMenu
);


menuOverlay?.addEventListener(
  "click",
  closeMenu
);


document
  .querySelectorAll(
    ".drawer-links a"
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


/* =========================
   CART
========================= */

function openCart() {

  cartDrawer.classList.add("show");

  cartOverlay.classList.add("show");

  body.classList.add("lock");

}


function closeCart() {

  cartDrawer.classList.remove("show");

  cartOverlay.classList.remove("show");

  body.classList.remove("lock");

}


cartButton?.addEventListener(
  "click",
  openCart
);


bottomCartButton?.addEventListener(
  "click",
  openCart
);


closeCartButton?.addEventListener(
  "click",
  closeCart
);


cartOverlay?.addEventListener(
  "click",
  closeCart
);


/* =========================
   SEARCH
========================= */

function setupSearch(
  formId,
  inputId
) {

  const form =
    document.getElementById(formId);

  const input =
    document.getElementById(inputId);


  if (!form || !input) return;


  form.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const query =
        input.value.trim();


      if (!query) return;


      window.location.href =
        "shop.html?search=" +
        encodeURIComponent(query);

    }
  );

}


setupSearch(
  "desktopSearchForm",
  "desktopSearchInput"
);


setupSearch(
  "mobileSearchForm",
  "mobileSearchInput"
);


/* =========================
   ADD TO CART
========================= */

document
  .querySelectorAll(
    ".add-cart-button"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      function () {

        const product = {

          id:
            Number(
              this.dataset.id
            ),

          name:
            this.dataset.name,

          price:
            Number(
              this.dataset.price
            ),

          quantity: 1

        };


        const existing =
          cart.find(
            (item) =>
              item.id ===
              product.id
          );


        if (existing) {

          existing.quantity += 1;

        } else {

          cart.push(product);

        }


        saveCart();

        renderCart();

        showToast(
          product.name +
          " কার্টে যোগ হয়েছে"
        );

      }
    );

  });


/* =========================
   SAVE CART
========================= */

function saveCart() {

  localStorage.setItem(
    "soroshfulCart",
    JSON.stringify(cart)
  );

}


/* =========================
   CART RENDER
========================= */

function renderCart() {

  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  const totalPrice =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );


  if (cartCount) {

    cartCount.textContent =
      totalItems;

  }


  if (bottomCartCount) {

    bottomCartCount.textContent =
      totalItems;

  }


  if (cartItemCount) {

    cartItemCount.textContent =
      totalItems +
      "টি পণ্য";

  }


  if (cartTotal) {

    cartTotal.textContent =
      "৳" +
      totalPrice.toLocaleString(
        "en-US"
      );

  }


  if (!cartItems) return;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <i data-lucide="shopping-bag"></i>

        <h3>
          কার্ট এখনো খালি
        </h3>

        <p>
          পছন্দের পণ্য কার্টে যোগ করুন।
        </p>

      </div>

    `;


    lucide.createIcons();

    return;

  }


  cartItems.innerHTML =
    cart
      .map((item) => {

        return `

          <div class="cart-item">

            <div>

              <h3>
                ${item.name}
              </h3>

              <p>
                ৳${item.price.toLocaleString("en-US")}
                ×
                ${item.quantity}
              </p>

              <strong>
                ৳${(
                  item.price *
                  item.quantity
                ).toLocaleString("en-US")}
              </strong>

            </div>


            <div class="cart-controls">

              <button
                onclick="decreaseQuantity(${item.id})"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                onclick="increaseQuantity(${item.id})"
              >
                +
              </button>

              <button
                class="remove-cart"
                onclick="removeProduct(${item.id})"
              >
                Remove
              </button>

            </div>

          </div>

        `;

      })
      .join("");

}


/* =========================
   CART QUANTITY
========================= */

window.increaseQuantity =
  function (id) {

    const product =
      cart.find(
        (item) =>
          item.id === id
      );


    if (!product) return;


    product.quantity += 1;


    saveCart();

    renderCart();

  };


window.decreaseQuantity =
  function (id) {

    const product =
      cart.find(
        (item) =>
          item.id === id
      );


    if (!product) return;


    if (
      product.quantity > 1
    ) {

      product.quantity -= 1;

    } else {

      cart =
        cart.filter(
          (item) =>
            item.id !== id
        );

    }


    saveCart();

    renderCart();

  };


window.removeProduct =
  function (id) {

    cart =
      cart.filter(
        (item) =>
          item.id !== id
      );


    saveCart();

    renderCart();


    showToast(
      "পণ্য কার্ট থেকে সরানো হয়েছে"
    );

  };


/* =========================
   WISHLIST
========================= */

wishlistButtons.forEach(
  (button) => {

    const id =
      Number(
        button.dataset.id
      );


    if (
      wishlist.includes(id)
    ) {

      button.classList.add(
        "active"
      );

    }


    button.addEventListener(
      "click",
      function () {

        if (
          wishlist.includes(id)
        ) {

          wishlist =
            wishlist.filter(
              (item) =>
                item !== id
            );


          this.classList.remove(
            "active"
          );


          showToast(
            "পছন্দের তালিকা থেকে সরানো হয়েছে"
          );

        } else {

          wishlist.push(id);


          this.classList.add(
            "active"
          );


          showToast(
            "পছন্দের তালিকায় যোগ হয়েছে"
          );

        }


        saveWishlist();

        updateWishlist();

      }
    );

  }
);


function saveWishlist() {

  localStorage.setItem(
    "soroshfulWishlist",
    JSON.stringify(wishlist)
  );

}


function updateWishlist() {

  if (wishlistCount) {

    wishlistCount.textContent =
      wishlist.length;

  }

}


/* =========================
   FILTER BUTTON
========================= */

const filterButtons =
  document.querySelectorAll(
    ".filter-button"
  );


filterButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      function () {

        filterButtons.forEach(
          (item) =>
            item.classList.remove(
              "active"
            )
        );


        this.classList.add(
          "active"
        );

      }
    );

  }
);


/* =========================
   TOAST
========================= */

let toastTimer;


function showToast(message) {

  if (!toast) return;


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      function () {

        toast.classList.remove(
          "show"
        );

      },
      1800
    );

}


/* =========================
   ESC CLOSE
========================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key !==
      "Escape"
    ) {
      return;
    }


    closeMenu();

    closeCart();

  }
);


/* =========================
   INITIAL
========================= */

renderCart();

updateWishlist();

lucide.createIcons();

/* =========================
   PRODUCT CARD CLICK
========================= */

document
  .querySelectorAll(".product-card")
  .forEach((card) => {

    card.style.cursor = "pointer";

    card.addEventListener(
      "click",
      function (event) {

        /* Cart / Wishlist / Button click হলে product page open হবে না */
        if (
          event.target.closest("button") ||
          event.target.closest("a")
        ) {
          return;
        }

        const productId =
          this.dataset.id || 1;

        window.location.href =
          "product.html?id=" +
          productId;

      }
    );

  });

  /* =========================================
   SYNC CART WITH ADMIN PRODUCT DATABASE
========================================= */

function syncCartWithAdminProducts() {

    const products =
        JSON.parse(
            localStorage.getItem(
                "soroshfulProducts"
            )
        ) || [];


    if (
        !Array.isArray(cart) ||
        !Array.isArray(products)
    ) {
        return;
    }


    let changed = false;


    /* backwards loop, so removed items are safe */

    for (
        let i = cart.length - 1;
        i >= 0;
        i--
    ) {

        const cartItem =
            cart[i];


        const product =
            products.find(
                item =>
                    Number(item.id) ===
                    Number(cartItem.id)
            );


        /* Product admin থেকে delete হলে cart থেকেও remove */

        if (!product) {

            cart.splice(
                i,
                1
            );

            changed = true;

            continue;

        }


        /* Draft হলে cart থেকে remove */

        if (
            product.status ===
            "draft"
        ) {

            cart.splice(
                i,
                1
            );

            changed = true;

            continue;

        }


        /* =========================
           NAME UPDATE
        ========================= */

        if (
            cartItem.name !==
            product.name
        ) {

            cartItem.name =
                product.name;

            changed = true;

        }


        /* =========================
           PRICE UPDATE
        ========================= */

        if (
            Number(cartItem.price) !==
            Number(product.price)
        ) {

            cartItem.price =
                Number(
                    product.price
                );

            changed = true;

        }


        /* =========================
           STOCK UPDATE
        ========================= */

        const availableStock =
            Number(
                product.stock || 0
            );


        if (
            product.status ===
                "out-of-stock" ||
            availableStock <= 0
        ) {

            cart.splice(
                i,
                1
            );

            changed = true;

            continue;

        }


        if (
            Number(cartItem.quantity) >
            availableStock
        ) {

            cartItem.quantity =
                availableStock;

            changed = true;

        }

    }


    if (changed) {

        localStorage.setItem(
            "soroshfulCart",
            JSON.stringify(
                cart
            )
        );

    }

}


/* Page load হওয়ার সাথে সাথে latest price sync */

syncCartWithAdminProducts();