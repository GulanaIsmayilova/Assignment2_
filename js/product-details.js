$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var productId = urlParams.get('id');

    fetchProductDetails(productId);

function fetchProductDetails(productId) {
    $.ajax({
        url: `https://dummyjson.com/products/${productId}`,
        method: 'GET',
        success: function (response) {
            displayProductDetails(response);
        },
    }};
}
function displayProductDetails(product) {
    var productDetailsContainer = $('#product-details');
    var productDiv = $('<div class="product-details"></div>');
    productDiv.html(`<h2>${product.title}</h2>
                    <p>Description: ${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Discount: ${product.discountPercentage}%</p>
                    <p>Category: ${product.category}</p>
                    <p>Stock: ${product.stock}</p>`);
                }        