// ==============================
// CHỨC NĂNG TÌM KIẾM SẢN PHẨM
// ==============================

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");

const products = document.querySelectorAll(".product");


// ==============================
// TÌM KIẾM
// ==============================

function searchProducts() {

    const keyword = searchInput.value.toLowerCase().trim();

    // Xóa kết quả cũ
    searchResults.innerHTML = "";


    // ==========================
    // Ô tìm kiếm trống
    // ==========================

    if (keyword === "") {

        searchResults.style.display = "none";

        // Giữ nguyên toàn bộ sản phẩm
        products.forEach(function(product) {
            product.style.display = "";
        });

        return;
    }


    let found = false;


    // ==========================
    // Kiểm tra từng sản phẩm
    // ==========================

    products.forEach(function(product) {

        const nameElement = product.querySelector("h3");

        if (!nameElement) {
            return;
        }

        const name = nameElement.textContent.toLowerCase();


        // ==========================
        // Nếu tìm thấy sản phẩm
        // ==========================

        if (name.includes(keyword)) {

            found = true;


            // Không ẩn sản phẩm gốc
            // Sản phẩm nổi bật vẫn giữ nguyên


            // Tạo khung kết quả
            const resultItem = document.createElement("div");

            resultItem.className = "search-result-item";


            // Lấy ảnh
            const image = product.querySelector("img");


            // Lấy tên
            const productName = product.querySelector("h3");


            // Lấy giá
            const price = product.querySelector(".price");


            // Tạo nội dung
            resultItem.innerHTML = `
                <img
                    src="${image ? image.src : ""}"
                    alt="${productName ? productName.textContent : ""}"
                >

                <div class="search-result-info">

                    <h3>
                        ${productName ? productName.textContent : ""}
                    </h3>

                    <p>
                        ${price ? price.textContent : ""}
                    </p>

                </div>
            `;


            // Thêm vào khung tìm kiếm
            searchResults.appendChild(resultItem);
// Bấm vào sản phẩm trong kết quả tìm kiếm
resultItem.addEventListener("click", function() {

    const image = product.querySelector("img");
    const name = product.querySelector("h3");
    const price = product.querySelector(".price");

    // Đưa thông tin vào trang chi tiết
    detailImage.src = image.src;
    detailImage.alt = image.alt;

    detailName.textContent = name.textContent;
    detailPrice.textContent = price.textContent;

    // Ẩn khung tìm kiếm
    searchResults.style.display = "none";

    // Xóa nội dung ô tìm kiếm
    searchInput.value = "";

    // Hiện chi tiết
    productDetail.style.display = "block";

    // Cuộn đến chi tiết
    productDetail.scrollIntoView({
        behavior: "smooth"
    });

});
        }

    });


    // ==========================
    // HIỂN THỊ KẾT QUẢ
    // ==========================

    if (found) {

        searchResults.style.display = "block";

    } else {

        searchResults.innerHTML = `
            <div class="no-result">
                Không tìm thấy sản phẩm
            </div>
        `;

        searchResults.style.display = "block";
    }
}


// ==============================
// GÕ TRỰC TIẾP
// ==============================

searchInput.addEventListener("input", function() {

    searchProducts();

});


// ==============================
// BẤM NÚT TÌM KIẾM
// ==============================

searchButton.addEventListener("click", function() {

    searchProducts();

});


// ==============================
// NHẤN ENTER
// ==============================

searchInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        searchProducts();

    }

});


// ==============================
// CLICK RA NGOÀI
// ==============================

document.addEventListener("click", function(event) {

    if (!event.target.closest(".search")) {

        searchResults.style.display = "none";

    }

});
// ==============================
// CHI TIẾT SẢN PHẨM
// ==============================

const productDetail = document.getElementById("productDetail");
const detailImage = document.getElementById("detailImage");
const detailName = document.getElementById("detailName");
const detailPrice = document.getElementById("detailPrice");
const backToProducts = document.getElementById("backToProducts");


// Lấy tất cả nút "Xem sản phẩm"
const productButtons = document.querySelectorAll(".product button");


// Khi bấm "Xem sản phẩm"
productButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Tìm sản phẩm đang được bấm
        const product = button.closest(".product");

        // Lấy thông tin sản phẩm
        const image = product.querySelector("img");
        const name = product.querySelector("h3");
        const price = product.querySelector(".price");
        setCurrentProduct(product);
        // Đưa thông tin vào trang chi tiết
        detailImage.src = image.src;
        detailImage.alt = image.alt;

        detailName.textContent = name.textContent;

        detailPrice.textContent = price.textContent;


        // Hiện trang chi tiết
        productDetail.style.display = "block";


        // Cuộn tới chi tiết sản phẩm
        productDetail.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// Nút quay lại
backToProducts.addEventListener("click", function() {

    productDetail.style.display = "none";

    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });

});
// ==============================
// NÚT XEM SẢN PHẨM Ở BANNER
// ==============================

const heroButton = document.querySelector(".hero-button");

heroButton.addEventListener("click", function() {

    document.querySelector(".products").scrollIntoView({
        behavior: "smooth"
    });

});
// ==============================
// CHỌN SỐ LƯỢNG SẢN PHẨM
// ==============================

const quantityElement = document.getElementById("quantity");

const decreaseQty = document.getElementById("decreaseQty");

const increaseQty = document.getElementById("increaseQty");


// NÚT +

increaseQty.addEventListener("click", function() {

    let quantity = Number(quantityElement.textContent);

    quantity = quantity + 1;

    quantityElement.textContent = quantity;

});


// NÚT -

decreaseQty.addEventListener("click", function() {

    let quantity = Number(quantityElement.textContent);

    if (quantity > 1) {

        quantity = quantity - 1;

    }

    quantityElement.textContent = quantity;

});
// ==============================
// GIỎ HÀNG
// ==============================

let cart = [];

let currentProduct = null;
const addToCart = document.getElementById("addToCart");

const cartCount = document.getElementById("cartCount");
function setCurrentProduct(product) {

    const image = product.querySelector("img");

    const name = product.querySelector("h3");

    const price = product.querySelector(".price");


    currentProduct = {

        name: name.textContent,

        price: price.textContent,

        image: image.src

    };

}
addToCart.addEventListener("click", function() {

    if (!currentProduct) {

        return;

    }


    const quantity = Number(
        document.getElementById("quantity").textContent
    );


    const existingProduct = cart.find(function(item) {

        return item.name === currentProduct.name;

    });


    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            name: currentProduct.name,

            price: currentProduct.price,

            image: currentProduct.image,

            quantity: quantity

        });

    }


    updateCartCount();


    alert("Đã thêm sản phẩm vào giỏ hàng!");

});
function updateCartCount() {
    // ==============================
// HIỂN THỊ SẢN PHẨM TRONG GIỎ
// ==============================

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");


function displayCart() {

    // Xóa nội dung cũ
    cartItems.innerHTML = "";

    let total = 0;


    // Nếu giỏ hàng trống
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center; color:#777;">
                Giỏ hàng đang trống
            </p>
        `;

        cartTotal.textContent = "0đ";

        return;
    }


    // Hiển thị từng sản phẩm
    cart.forEach(function(item) {

        // Lấy giá và bỏ chữ "đ"
        const price = parseInt(
            item.price.replace(/\./g, "").replace("đ", "")
        );


        // Tính thành tiền
        const itemTotal = price * item.quantity;

        total += itemTotal;


        // Tạo sản phẩm
        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

    <img
        src="${item.image}"
        alt="${item.name}"
    >

    <div class="cart-item-info">

        <h3>${item.name}</h3>

        <p>${item.price}</p>

        <div class="cart-quantity">

            <button class="minus-btn">−</button>

            <span>${item.quantity}</span>

            <button class="plus-btn">+</button>

        </div>

        <button class="remove-btn">
            🗑️ Xóa
        </button>

    </div>

`;

// NÚT GIẢM SỐ LƯỢNG
cartItem.querySelector(".minus-btn").addEventListener("click", function () {

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(function (product) {
            return product !== item;
        });
    }

    updateCartCount();
    displayCart();

});


// NÚT TĂNG SỐ LƯỢNG
cartItem.querySelector(".plus-btn").addEventListener("click", function () {

    item.quantity++;

    updateCartCount();
    displayCart();

});


// NÚT XÓA
cartItem.querySelector(".remove-btn").addEventListener("click", function () {

    cart = cart.filter(function (product) {
        return product !== item;
    });

    updateCartCount();
    displayCart();

});
        cartItems.appendChild(cartItem);


    });


    // Hiển thị tổng tiền
    cartTotal.textContent =
        total.toLocaleString("vi-VN") + "đ";

}
// ==============================
// MỞ / ĐÓNG GIỎ HÀNG
// ==============================

const cartPanel = document.getElementById("cartPanel");

const closeCart = document.getElementById("closeCart");


// Bấm vào nút giỏ hàng trên Header
cartButton.addEventListener("click", function() {

    cartPanel.style.display = "flex";

    displayCart();

});


// Bấm X để đóng giỏ hàng
closeCart.addEventListener("click", function() {

    cartPanel.style.display = "none";

});
    let total = 0;


    cart.forEach(function(item) {
       

        total += item.quantity;

    });


    cartCount.textContent = total;

}
// ==============================
// HIỆN FORM ĐẶT HÀNG
// ==============================

const checkoutButton = document.getElementById("checkoutButton");
const checkoutForm = document.getElementById("checkoutForm");

checkoutButton.addEventListener("click", function() {

    checkoutForm.style.display = "block";

});
const backToCart = document.getElementById("backToCart");

backToCart.addEventListener("click", function() {

    checkoutForm.style.display = "none";

});
// ==============================
// XÁC NHẬN ĐẶT HÀNG
// ==============================

const confirmOrder = document.getElementById("confirmOrder");

confirmOrder.addEventListener("click", function() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    // Kiểm tra thông tin
    if (name === "") {
        alert("Vui lòng nhập họ và tên.");
        return;
    }

    if (phone === "") {
        alert("Vui lòng nhập số điện thoại.");
        return;
    }

    if (address === "") {
        alert("Vui lòng nhập địa chỉ nhận hàng.");
        return;
    }

    // Đặt hàng thành công
    alert(
        "Đặt hàng thành công!\n\n" +
        "Cảm ơn " + name + " đã mua hàng tại QUINNA."
    );

});
// XÓA GIỎ HÀNG SAU KHI ĐẶT HÀNG
cart = [];

updateCartCount();
displayCart();

checkoutForm.style.display = "none";