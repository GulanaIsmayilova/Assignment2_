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
}