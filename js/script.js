$(document).ready(function () {
    fetchData();

    function fetchData(searchQuery = '', categoryFilter = '') {
        $.ajax({
            url: 'https://dummyjson.com/products',
            method: 'GET',
            success: function (response) {
                displayProducts(response, searchQuery, categoryFilter);
                populateCategoryFilter(response);
            },
        });
    }
    function displayProducts(response, searchQuery, categoryFilter) {
        var products = response.products || [];
        var productList = $('#product-list').empty();

        $.each(products, function (index, product) {
            if ((searchQuery === '' || containsSearchQuery(product, searchQuery)))
             {
                var productDiv = $('<div class="product" data-id="' + product.id + '"></div>');
                productDiv.html(`<h3>${product.title}</h3>
                                <p>Price: $${product.price}</p>
                                <p>Category: ${product.category}</p>
                               `);

                productList.append(productDiv);
            }
        });
    }
    ;
});
