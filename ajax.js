$(document).ready(function() {
    function loadBalance() {
        $.get("info/balance.txt", function(data) {
            $("#balance").text(data.trim());
        });
    }

    function loadProducts() {
        $.get("info/products.txt", function(data) {
            let products = data.split("\n");
            let output = "";
            products.forEach(function(product) {
                let p = product.split(",");
                if (p.length === 4) {
                    output += `<div class="product">
                        <h4>${p[0]}</h4>
                        <p>মূল্য: ${p[1]} টাকা</p>
                        <p>মেয়াদ: ${p[2]} দিন</p>
                        <p>দৈনিক লাভ: ${p[3]} টাকা</p>
                        <button onclick="buyProduct('${p[0]}', ${p[1]}, ${p[2]}, ${p[3]})">Buy</button>
                    </div>`;
                }
            });
            $("#products").html(output);
        });
    }

    function loadMyProducts() {
        $.get("info/my_products.txt", function(data) {
            let products = data.split("\n");
            let output = "";
            products.forEach(function(product) {
                let p = product.split(",");
                if (p.length === 5) {
                    output += `<div class="product">
                        <h4>${p[0]}</h4>
                        <p>মূল্য: ${p[1]} টাকা</p>
                        <p>মেয়াদ: ${p[2]} দিন</p>
                        <p>দৈনিক লাভ: ${p[3]} টাকা</p>
                        <p>কেনার তারিখ: ${p[4]}</p>
                    </div>`;
                }
            });
            $("#myProducts").html(output);
        });
    }

    window.buyProduct = function(name, price, duration, profit) {
        $.post("buy.php", { product: name, price: price, duration: duration, profit: profit }, function(response) {
            alert(response);
            loadBalance();
            loadMyProducts();
        });
    };

    loadBalance();
    loadProducts();
    loadMyProducts();

    setInterval(loadBalance, 1000);
    setInterval(loadProducts, 1000);
    setInterval(loadMyProducts, 1000);
});

/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
