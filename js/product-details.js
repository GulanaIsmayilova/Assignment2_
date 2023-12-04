function fetchProductDetails(productId) {
    $.ajax({
        url: `https://dummyjson.com/products/${productId}`,
        method: 'GET',
        success: function (response) {
            displayProductDetails(response);
        }
    }}