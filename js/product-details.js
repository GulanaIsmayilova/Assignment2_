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
            error: function (xhr, status, error) {
                handleFetchError(error);
            }
        });
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

        var imageContainer = $('<div class="image-container"></div>');
        $.each(product.images, function (index, image) {
            imageContainer.append(`<img src="${image}" alt="${product.title}">`);
        });

        productDiv.append(imageContainer);
        productDetailsContainer.append(productDiv);
    }

    function handleFetchError(error) {
        console.error('Error fetching product details:', error);
        $('#product-details').html('<p>Error fetching product details. Please try again later.</p>');
    }
});