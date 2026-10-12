const ADMIN_SESSION_KEY =
    "soroshfulAdminSession";

const ADMIN_USERS_KEY =
    "soroshfulAdminUsers";

const ORDERS_KEY =
    "soroshfulOrders";

const PRODUCTS_KEY =
    "soroshfulProducts";


/* =========================
   LOGIN PROTECTION
========================= */

const adminSession =
    JSON.parse(
        localStorage.getItem(
            ADMIN_SESSION_KEY
        )
    );


if (
    !adminSession ||
    !adminSession.loggedIn
) {

    window.location.replace(
        "admin-login.html"
    );

}


/* =========================
   DEFAULT PRODUCTS
========================= */

const defaultProducts = [

    {
        id: 1,
        name: "দেশি গাওয়া ঘি",
        category: "ঘি ও তেল",
        price: 850,
        oldPrice: 950,
        stock: 40,
        status: "active",
        image: "images/product-ghee.jpg",
        shortDescription:
            "যত্নে প্রস্তুত দেশি গাওয়া ঘি।",
        description:
            "মানসম্মত দুধ থেকে প্রস্তুত প্রাকৃতিক স্বাদ ও সুগন্ধযুক্ত দেশি গাওয়া ঘি।"
    },

    {
        id: 2,
        name: "খাঁটি সরিষা ফুলের মধু",
        category: "মধু",
        price: 650,
        oldPrice: 800,
        stock: 55,
        status: "active",
        image: "images/product-honey.jpg",
        shortDescription:
            "প্রাকৃতিক সরিষা ফুলের মধু।",
        description:
            "বিশ্বস্ত উৎস থেকে সংগৃহীত খাঁটি সরিষা ফুলের মধু।"
    },

    {
        id: 3,
        name: "চিনিগুঁড়া সুগন্ধি চাল",
        category: "চাল ও শস্য",
        price: 450,
        oldPrice: 550,
        stock: 80,
        status: "active",
        image: "images/product-rice.jpg",
        shortDescription:
            "সুগন্ধি চিনিগুঁড়া চাল।",
        description:
            "পোলাও ও বিশেষ রান্নার জন্য নির্বাচিত সুগন্ধি চাল।"
    },

    {
        id: 4,
        name: "ঘানি ভাঙা সরিষার তেল",
        category: "ঘি ও তেল",
        price: 380,
        oldPrice: 450,
        stock: 65,
        status: "active",
        image: "images/product-mustard-oil.jpg",
        shortDescription:
            "ঘানি ভাঙা সরিষার তেল।",
        description:
            "প্রাকৃতিক ঘ্রাণ ও স্বাদ বজায় রেখে প্রস্তুত সরিষার তেল।"
    },

    {
        id: 5,
        name: "দেশি হলুদের গুঁড়া",
        category: "মসলা",
        price: 220,
        oldPrice: 290,
        stock: 45,
        status: "active",
        image: "images/product-turmeric.jpg",
        shortDescription:
            "নির্বাচিত হলুদ থেকে প্রস্তুত।",
        description:
            "রান্নার জন্য উপযোগী পরিষ্কার ও মান যাচাইকৃত হলুদের গুঁড়া।"
    },

    {
        id: 6,
        name: "প্রিমিয়াম খেজুর",
        category: "ড্রাই ফ্রুটস",
        price: 480,
        oldPrice: 600,
        stock: 30,
        status: "active",
        image: "images/product-dates.jpg",
        shortDescription:
            "নির্বাচিত প্রিমিয়াম খেজুর।",
        description:
            "পরিবারের জন্য নির্বাচিত ভালো মানের প্রিমিয়াম খেজুর।"
    }

];


function seedProducts() {

    const saved =
        localStorage.getItem(
            PRODUCTS_KEY
        );


    if (!saved) {

        localStorage.setItem(
            PRODUCTS_KEY,
            JSON.stringify(
                defaultProducts
            )
        );

    }

}


seedProducts();


/* =========================
   DATA
========================= */

function getOrders() {

    return JSON.parse(
        localStorage.getItem(
            ORDERS_KEY
        )
    ) || [];

}


function saveOrders(orders) {

    localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify(orders)
    );

}


function getProducts() {

    return JSON.parse(
        localStorage.getItem(
            PRODUCTS_KEY
        )
    ) || [];

}


function saveProducts(products) {

    localStorage.setItem(
        PRODUCTS_KEY,
        JSON.stringify(products)
    );

}


function getAdminUsers() {

    return JSON.parse(
        localStorage.getItem(
            ADMIN_USERS_KEY
        )
    ) || [];

}


function saveAdminUsers(users) {

    localStorage.setItem(
        ADMIN_USERS_KEY,
        JSON.stringify(users)
    );

}


/* =========================
   USER INFO
========================= */

document
    .getElementById(
        "adminUserName"
    )
    .textContent =
        adminSession.name ||
        adminSession.id;


document
    .getElementById(
        "adminUserRole"
    )
    .textContent =
        adminSession.role ===
        "admin"
            ? "Administrator"
            : "Moderator";


if (
    adminSession.role !==
    "admin"
) {

    document
        .getElementById(
            "adminOnlyMenu"
        )
        .style.display =
            "none";

}


/* =========================
   NAVIGATION
========================= */

const navButtons =
    document.querySelectorAll(
        ".admin-nav-button[data-page]"
    );


const adminPages =
    document.querySelectorAll(
        ".admin-page"
    );


function openAdminPage(
    pageId,
    title
) {

    adminPages.forEach(
        page =>
            page.classList.remove(
                "active"
            )
    );


    navButtons.forEach(
        button =>
            button.classList.remove(
                "active"
            )
    );


    const page =
        document.getElementById(
            pageId
        );


    if (page) {

        page.classList.add(
            "active"
        );

    }


    document
        .querySelectorAll(
            `[data-page="${pageId}"]`
        )
        .forEach(
            button =>
                button.classList.add(
                    "active"
                )
        );


    document
        .getElementById(
            "adminPageTitle"
        )
        .textContent =
            title;


    closeSidebar();

}


navButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function() {

                openAdminPage(
                    this.dataset.page,
                    this.dataset.title
                );

            }
        );

    }
);


/* =========================
   SIDEBAR MOBILE
========================= */

const adminSidebar =
    document.getElementById(
        "adminSidebar"
    );


const sidebarOverlay =
    document.getElementById(
        "sidebarOverlay"
    );


function openSidebar() {

    adminSidebar.classList.add(
        "show"
    );

    sidebarOverlay.classList.add(
        "show"
    );

}


function closeSidebar() {

    adminSidebar.classList.remove(
        "show"
    );

    sidebarOverlay.classList.remove(
        "show"
    );

}


document
    .getElementById(
        "mobileSidebarButton"
    )
    .addEventListener(
        "click",
        openSidebar
    );


sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);


/* =========================
   DASHBOARD
========================= */

function renderDashboard() {

    const orders =
        getOrders();

    const products =
        getProducts();


    const revenue =
        orders
            .filter(
                order =>
                    order.status !==
                    "Cancelled"
            )
            .reduce(
                (sum, order) =>
                    sum +
                    Number(
                        order.total || 0
                    ),
                0
            );


    const pending =
        orders.filter(
            order =>
                ![
                    "Delivered",
                    "Cancelled"
                ].includes(
                    order.status
                )
        ).length;


    document
        .getElementById(
            "dashboardOrders"
        )
        .textContent =
            orders.length;


    document
        .getElementById(
            "dashboardRevenue"
        )
        .textContent =
            "৳" +
            revenue.toLocaleString(
                "en-US"
            );


    document
        .getElementById(
            "dashboardPending"
        )
        .textContent =
            pending;


    document
        .getElementById(
            "dashboardProducts"
        )
        .textContent =
            products.length;


    const recent =
        orders.slice(
            0,
            5
        );


    document
        .getElementById(
            "dashboardRecentOrders"
        )
        .innerHTML =
            recent.length
                ? recent
                    .map(
                        order => `
                            <tr>
                                <td>
                                    <strong>
                                        ${order.orderId}
                                    </strong>
                                </td>

                                <td>
                                    ${order.customer?.name || "-"}
                                </td>

                                <td>
                                    ৳${Number(order.total || 0).toLocaleString("en-US")}
                                </td>

                                <td>
                                    ${statusBadge(order.status || "Order Placed")}
                                </td>
                            </tr>
                        `
                    )
                    .join("")
                : `
                    <tr>
                        <td colspan="4">
                            কোনো order নেই।
                        </td>
                    </tr>
                `;


    renderStatusSummary(
        orders
    );

}


function renderStatusSummary(
    orders
) {

    const statuses = [
        "Order Placed",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered"
    ];


    document
        .getElementById(
            "statusSummary"
        )
        .innerHTML =
            statuses
                .map(
                    status => {

                        const count =
                            orders.filter(
                                order =>
                                    (
                                        order.status ||
                                        "Order Placed"
                                    ) ===
                                    status
                            ).length;


                        return `
                            <div
                                style="
                                    min-height:36px;
                                    display:flex;
                                    justify-content:space-between;
                                    align-items:center;
                                    border-bottom:1px solid var(--line);
                                    font-size:11px;
                                "
                            >
                                <span>
                                    ${status}
                                </span>

                                <strong
                                    style="
                                        color:var(--green-dark);
                                    "
                                >
                                    ${count}
                                </strong>
                            </div>
                        `;

                    }
                )
                .join("");

}


/* =========================
   STATUS BADGE
========================= */

function statusBadge(
    status
) {

    const classMap = {

        Processing:
            "processing",

        Shipped:
            "shipped",

        Delivered:
            "delivered",

        Cancelled:
            "cancelled"

    };


    return `
        <span
            class="status-badge ${classMap[status] || ""}"
        >
            ${status}
        </span>
    `;

}


/* =========================
   ORDERS
========================= */

function renderOrders() {

    const orders =
        getOrders();


    const search =
        document
            .getElementById(
                "orderSearch"
            )
            .value
            .trim()
            .toLowerCase();


    const statusFilter =
        document
            .getElementById(
                "orderStatusFilter"
            )
            .value;


    const filtered =
        orders.filter(
            order => {

                const status =
                    order.status ||
                    "Order Placed";


                const searchText =
                    `${order.orderId}
                    ${order.customer?.name || ""}
                    ${order.customer?.phone || ""}`
                    .toLowerCase();


                const searchMatch =
                    !search ||
                    searchText.includes(
                        search
                    );


                const statusMatch =
                    statusFilter ===
                    "all" ||
                    status ===
                    statusFilter;


                return (
                    searchMatch &&
                    statusMatch
                );

            }
        );


    document
        .getElementById(
            "ordersTableBody"
        )
        .innerHTML =
            filtered.length
                ? filtered
                    .map(
                        order => {

                            const payment =
                                {
                                    cod:
                                        "COD",
                                    bkash:
                                        "bKash",
                                    nagad:
                                        "Nagad"
                                }[
                                    order.paymentMethod
                                ] ||
                                order.paymentMethod ||
                                "-";


                            return `

                                <tr>

                                    <td>

                                        <strong>
                                            ${order.orderId}
                                        </strong>

                                        <div
                                            style="
                                                color:var(--muted);
                                                font-size:9px;
                                            "
                                        >
                                            ${order.date || ""}
                                        </div>

                                    </td>


                                    <td>

                                        ${order.customer?.name || "-"}

                                        <div
                                            style="
                                                color:var(--muted);
                                                font-size:9px;
                                            "
                                        >
                                            ${order.customer?.phone || ""}
                                        </div>

                                    </td>


                                    <td>
                                        ${payment}
                                    </td>


                                    <td>

                                        <strong>
                                            ৳${Number(order.total || 0).toLocaleString("en-US")}
                                        </strong>

                                    </td>


                                    <td>
                                        ${statusBadge(order.status || "Order Placed")}
                                    </td>


                                    <td>

                                        <div class="table-actions">

                                            <button
                                                class="icon-button"
                                                onclick="viewOrder('${order.orderId}')"
                                                title="View Order"
                                            >
                                                <i data-lucide="eye"></i>
                                            </button>


                                            <button
                                                class="icon-button"
                                                onclick="advanceOrder('${order.orderId}')"
                                                title="Next Status"
                                            >
                                                <i data-lucide="arrow-right"></i>
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            `;

                        }
                    )
                    .join("")
                : `
                    <tr>
                        <td colspan="6">
                            <div class="empty-state">
                                কোনো order পাওয়া যায়নি।
                            </div>
                        </td>
                    </tr>
                `;


    lucide.createIcons();

}


const orderStatusFlow = [
    "Order Placed",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered"
];


window.advanceOrder =
    function(orderId) {

        const orders =
            getOrders();


        const index =
            orders.findIndex(
                order =>
                    order.orderId ===
                    orderId
            );


        if (
            index === -1
        ) {
            return;
        }


        const current =
            orders[index].status ||
            "Order Placed";


        const statusIndex =
            orderStatusFlow.indexOf(
                current
            );


        if (
            statusIndex === -1 ||
            statusIndex ===
            orderStatusFlow.length - 1
        ) {

            showAdminToast(
                "এই order-এর আর next status নেই।"
            );

            return;

        }


        orders[index].status =
            orderStatusFlow[
                statusIndex + 1
            ];


        orders[index].updatedAt =
            new Date()
                .toISOString();


        saveOrders(
            orders
        );


        renderAll();


        showAdminToast(
            `Order status: ${orders[index].status}`
        );

    };


window.viewOrder =
    function(orderId) {

        const order =
            getOrders().find(
                item =>
                    item.orderId ===
                    orderId
            );


        if (!order) {
            return;
        }


        const itemsHtml =
            (order.items || [])
                .map(
                    item => `

                        <div class="order-product-row">

                            <span>
                                ${item.name}
                                ×
                                ${item.quantity}
                            </span>


                            <strong>
                                ৳${(
                                    Number(item.price) *
                                    Number(item.quantity)
                                ).toLocaleString("en-US")}
                            </strong>

                        </div>

                    `
                )
                .join("");


        document
            .getElementById(
                "orderModalContent"
            )
            .innerHTML = `

                <div class="order-detail-grid">

                    <div class="order-info-box">

                        <h4>
                            Customer
                        </h4>

                        <div class="order-info-row">
                            <span>Name</span>
                            <strong>
                                ${order.customer?.name || "-"}
                            </strong>
                        </div>

                        <div class="order-info-row">
                            <span>Phone</span>
                            <strong>
                                ${order.customer?.phone || "-"}
                            </strong>
                        </div>

                        <div class="order-info-row">
                            <span>Address</span>
                            <strong>
                                ${order.customer?.address || "-"}
                            </strong>
                        </div>

                        <div class="order-info-row">
                            <span>Area</span>
                            <strong>
                                ${order.customer?.area || "-"}
                            </strong>
                        </div>

                    </div>


                    <div class="order-info-box">

                        <h4>
                            Order
                        </h4>

                        <div class="order-info-row">
                            <span>Order ID</span>
                            <strong>
                                ${order.orderId}
                            </strong>
                        </div>

                        <div class="order-info-row">
                            <span>Status</span>
                            <strong>
                                ${order.status || "Order Placed"}
                            </strong>
                        </div>

                        <div class="order-info-row">
                            <span>Total</span>
                            <strong>
                                ৳${Number(order.total || 0).toLocaleString("en-US")}
                            </strong>
                        </div>

                        <div class="order-info-row">
                            <span>Payment</span>
                            <strong>
                                ${order.paymentMethod || "-"}
                            </strong>
                        </div>

                    </div>

                </div>


                <div class="order-products">
                    ${itemsHtml}
                </div>


                <div
                    style="
                        margin-top:15px;
                    "
                >

                    <label
                        style="
                            display:block;
                            margin-bottom:5px;
                            color:var(--green-dark);
                            font-size:11px;
                            font-weight:700;
                        "
                    >
                        Update Status
                    </label>


                    <select
                        id="modalOrderStatus"
                        class="admin-input"
                    >

                        ${[
                            "Order Placed",
                            "Confirmed",
                            "Processing",
                            "Shipped",
                            "Delivered",
                            "Cancelled"
                        ]
                        .map(
                            status => `
                                <option
                                    value="${status}"
                                    ${
                                        (
                                            order.status ||
                                            "Order Placed"
                                        ) ===
                                        status
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    ${status}
                                </option>
                            `
                        )
                        .join("")}

                    </select>


                    <button
                        class="save-button"
                        style="
                            margin-top:10px;
                            width:100%;
                        "
                        onclick="saveOrderStatus('${order.orderId}')"
                    >
                        Update Order
                    </button>

                </div>

            `;


        openModal(
            "orderModal"
        );

    };


window.saveOrderStatus =
    function(orderId) {

        const orders =
            getOrders();


        const index =
            orders.findIndex(
                order =>
                    order.orderId ===
                    orderId
            );


        if (
            index === -1
        ) {
            return;
        }


        orders[index].status =
            document
                .getElementById(
                    "modalOrderStatus"
                )
                .value;


        orders[index].updatedAt =
            new Date()
                .toISOString();


        saveOrders(
            orders
        );


        closeModal(
            "orderModal"
        );


        renderAll();


        showAdminToast(
            "Order status updated."
        );

    };


document
    .getElementById(
        "orderSearch"
    )
    .addEventListener(
        "input",
        renderOrders
    );


document
    .getElementById(
        "orderStatusFilter"
    )
    .addEventListener(
        "change",
        renderOrders
    );


/* =========================
   PRODUCTS
========================= */

function renderProducts() {

    const products =
        getProducts();


    const search =
        document
            .getElementById(
                "productSearch"
            )
            .value
            .trim()
            .toLowerCase();


    const filtered =
        products.filter(
            product =>
                `${product.name} ${product.category}`
                    .toLowerCase()
                    .includes(
                        search
                    )
        );


    document
        .getElementById(
            "productsTableBody"
        )
        .innerHTML =
            filtered.length
                ? filtered
                    .map(
                        product => `

                            <tr>

                                <td>

                                    <div class="table-product">

                                        <div class="table-product-image">

                                            <img
                                                src="${product.image || "images/hero-organic.jpg"}"
                                                alt="${product.name}"
                                            >

                                        </div>


                                        <div>

                                            <strong>
                                                ${product.name}
                                            </strong>

                                            <small>
                                                ID: ${product.id}
                                            </small>

                                        </div>

                                    </div>

                                </td>


                                <td>
                                    ${product.category}
                                </td>


                                <td>

                                    <strong>
                                        ৳${Number(product.price || 0).toLocaleString("en-US")}
                                    </strong>

                                </td>


                                <td>
                                    ${Number(product.stock || 0)}
                                </td>


                                <td>

                                    <span class="status-badge">

                                        ${product.status}

                                    </span>

                                </td>


                                <td>

                                    <div class="table-actions">

                                        <button
                                            class="icon-button"
                                            onclick="editProduct(${product.id})"
                                        >
                                            <i data-lucide="pencil"></i>
                                        </button>


                                        ${
                                            adminSession.role ===
                                            "admin"
                                                ? `
                                                    <button
                                                        class="icon-button danger"
                                                        onclick="deleteProduct(${product.id})"
                                                    >
                                                        <i data-lucide="trash-2"></i>
                                                    </button>
                                                `
                                                : ""
                                        }

                                    </div>

                                </td>

                            </tr>

                        `
                    )
                    .join("")
                : `
                    <tr>
                        <td colspan="6">
                            <div class="empty-state">
                                কোনো product নেই।
                            </div>
                        </td>
                    </tr>
                `;


    lucide.createIcons();

}


document
    .getElementById(
        "addProductButton"
    )
    .addEventListener(
        "click",
        function() {

            resetProductForm();


            document
                .getElementById(
                    "productModalTitle"
                )
                .textContent =
                    "Add Product";


            openModal(
                "productModal"
            );

        }
    );


function resetProductForm() {

    document
        .getElementById(
            "productForm"
        )
        .reset();


    document
        .getElementById(
            "productEditId"
        )
        .value =
            "";

}


window.editProduct =
    function(productId) {

        const product =
            getProducts()
                .find(
                    item =>
                        Number(item.id) ===
                        Number(productId)
                );


        if (!product) {
            return;
        }


        document
            .getElementById(
                "productModalTitle"
            )
            .textContent =
                "Edit Product";


        document
            .getElementById(
                "productEditId"
            )
            .value =
                product.id;


        document
            .getElementById(
                "productName"
            )
            .value =
                product.name || "";


        document
            .getElementById(
                "productCategory"
            )
            .value =
                product.category || "";


        document
            .getElementById(
                "productPrice"
            )
            .value =
                product.price || "";


        document
            .getElementById(
                "productOldPrice"
            )
            .value =
                product.oldPrice || "";


        document
            .getElementById(
                "productStock"
            )
            .value =
                product.stock || 0;


        document
            .getElementById(
                "productStatus"
            )
            .value =
                product.status ||
                "active";


        document
            .getElementById(
                "productImage"
            )
            .value =
                product.image || "";


        document
            .getElementById(
                "productShortDescription"
            )
            .value =
                product.shortDescription ||
                "";


        document
            .getElementById(
                "productDescription"
            )
            .value =
                product.description ||
                "";


        openModal(
            "productModal"
        );

    };


document
    .getElementById(
        "saveProductButton"
    )
    .addEventListener(
        "click",
        function() {

            const name =
                document
                    .getElementById(
                        "productName"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "productCategory"
                    )
                    .value
                    .trim();


            const price =
                Number(
                    document
                        .getElementById(
                            "productPrice"
                        )
                        .value
                );


            if (
                !name ||
                !category ||
                !price
            ) {

                showAdminToast(
                    "Name, Category ও Price required."
                );

                return;

            }


            const products =
                getProducts();


            const editId =
                document
                    .getElementById(
                        "productEditId"
                    )
                    .value;


            const productData = {

                name:
                    name,

                category:
                    category,

                price:
                    price,

                oldPrice:
                    Number(
                        document
                            .getElementById(
                                "productOldPrice"
                            )
                            .value
                    ) || null,

                stock:
                    Number(
                        document
                            .getElementById(
                                "productStock"
                            )
                            .value
                    ) || 0,

                status:
                    document
                        .getElementById(
                            "productStatus"
                        )
                        .value,

                image:
                    document
                        .getElementById(
                            "productImage"
                        )
                        .value
                        .trim(),

                shortDescription:
                    document
                        .getElementById(
                            "productShortDescription"
                        )
                        .value
                        .trim(),

                description:
                    document
                        .getElementById(
                            "productDescription"
                        )
                        .value
                        .trim()

            };


            if (editId) {

                const index =
                    products.findIndex(
                        item =>
                            Number(item.id) ===
                            Number(editId)
                    );


                if (
                    index !== -1
                ) {

                    products[index] = {

                        ...products[index],
                        ...productData,
                        updatedAt:
                            new Date()
                                .toISOString()

                    };

                }

            } else {

                const nextId =
                    products.length
                        ? Math.max(
                            ...products.map(
                                item =>
                                    Number(item.id)
                            )
                        ) + 1
                        : 1;


                products.push({

                    id:
                        nextId,

                    ...productData,

                    createdAt:
                        new Date()
                            .toISOString()

                });

            }


            saveProducts(
                products
            );


            closeModal(
                "productModal"
            );


            renderAll();


            showAdminToast(
                "Product saved."
            );

        }
    );


window.deleteProduct =
    function(productId) {

        if (
            adminSession.role !==
            "admin"
        ) {

            showAdminToast(
                "Only admin can delete product."
            );

            return;

        }


        const products =
            getProducts()
                .filter(
                    item =>
                        Number(item.id) !==
                        Number(productId)
                );


        saveProducts(
            products
        );


        renderAll();


        showAdminToast(
            "Product deleted."
        );

    };


document
    .getElementById(
        "productSearch"
    )
    .addEventListener(
        "input",
        renderProducts
    );


/* =========================
   TEAM / MODERATOR
========================= */

function renderTeam() {

    const users =
        getAdminUsers();


    document
        .getElementById(
            "teamTableBody"
        )
        .innerHTML =
            users
                .map(
                    user => `

                        <tr>

                            <td>
                                <strong>
                                    ${user.name}
                                </strong>
                            </td>

                            <td>
                                ${user.id}
                            </td>

                            <td>
                                ${user.role}
                            </td>

                            <td>

                                <span class="status-badge">

                                    ${
                                        user.active ===
                                        false
                                            ? "Inactive"
                                            : "Active"
                                    }

                                </span>

                            </td>

                            <td>

                                <div class="table-actions">

                                    ${
                                        user.id !==
                                        "admin"
                                            ? `
                                                <button
                                                    class="icon-button"
                                                    onclick="toggleAdminUser('${user.id}')"
                                                >
                                                    <i data-lucide="power"></i>
                                                </button>

                                                <button
                                                    class="icon-button danger"
                                                    onclick="deleteAdminUser('${user.id}')"
                                                >
                                                    <i data-lucide="trash-2"></i>
                                                </button>
                                            `
                                            : ""
                                    }

                                </div>

                            </td>

                        </tr>

                    `
                )
                .join("");


    lucide.createIcons();

}


document
    .getElementById(
        "addModeratorButton"
    )
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "moderatorForm"
                )
                .reset();


            openModal(
                "moderatorModal"
            );

        }
    );


document
    .getElementById(
        "saveModeratorButton"
    )
    .addEventListener(
        "click",
        function() {

            if (
                adminSession.role !==
                "admin"
            ) {

                return;

            }


            const name =
                document
                    .getElementById(
                        "moderatorName"
                    )
                    .value
                    .trim();


            const id =
                document
                    .getElementById(
                        "moderatorId"
                    )
                    .value
                    .trim();


            const password =
                document
                    .getElementById(
                        "moderatorPassword"
                    )
                    .value;


            const role =
                document
                    .getElementById(
                        "moderatorRole"
                    )
                    .value;


            if (
                !name ||
                !id ||
                !password
            ) {

                showAdminToast(
                    "সব required field পূরণ করুন।"
                );

                return;

            }


            const users =
                getAdminUsers();


            if (
                users.some(
                    user =>
                        user.id === id
                )
            ) {

                showAdminToast(
                    "এই Login ID ইতোমধ্যে আছে।"
                );

                return;

            }


            users.push({

                id:
                    id,

                name:
                    name,

                password:
                    password,

                role:
                    role,

                active:
                    true,

                createdAt:
                    new Date()
                        .toISOString()

            });


            saveAdminUsers(
                users
            );


            closeModal(
                "moderatorModal"
            );


            renderTeam();


            showAdminToast(
                "User created."
            );

        }
    );


window.toggleAdminUser =
    function(id) {

        const users =
            getAdminUsers();


        const index =
            users.findIndex(
                user =>
                    user.id === id
            );


        if (
            index === -1
        ) {
            return;
        }


        users[index].active =
            users[index].active ===
            false;


        saveAdminUsers(
            users
        );


        renderTeam();

    };


window.deleteAdminUser =
    function(id) {

        if (
            id === "admin"
        ) {
            return;
        }


        const users =
            getAdminUsers()
                .filter(
                    user =>
                        user.id !== id
                );


        saveAdminUsers(
            users
        );


        renderTeam();


        showAdminToast(
            "User removed."
        );

    };


/* =========================
   MODALS
========================= */

function openModal(
    modalId
) {

    document
        .getElementById(
            modalId
        )
        .classList.add(
            "show"
        );

}


function closeModal(
    modalId
) {

    document
        .getElementById(
            modalId
        )
        .classList.remove(
            "show"
        );

}


document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function() {

                    closeModal(
                        this.dataset.close
                    );

                }
            );

        }
    );


document
    .querySelectorAll(
        ".modal-overlay"
    )
    .forEach(
        overlay => {

            overlay.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target ===
                        this
                    ) {

                        this.classList.remove(
                            "show"
                        );

                    }

                }
            );

        }
    );


/* =========================
   LOGOUT
========================= */

document
    .getElementById(
        "adminLogoutButton"
    )
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                ADMIN_SESSION_KEY
            );


            window.location.replace(
                "admin-login.html"
            );

        }
    );


/* =========================
   TOAST
========================= */

let adminToastTimer;


function showAdminToast(
    message
) {

    const toast =
        document.getElementById(
            "adminToast"
        );


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        adminToastTimer
    );


    adminToastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================
   RENDER ALL
========================= */

function renderAll() {

    renderDashboard();

    renderOrders();

    renderProducts();


    if (
        adminSession.role ===
        "admin"
    ) {

        renderTeam();

    }


    lucide.createIcons();

}


renderAll();

lucide.createIcons();