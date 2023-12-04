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
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }
    function displayProducts(response, searchQuery, categoryFilter) {
        var products = response.products || [];
        var productList = $('#product-list').empty();

        $.each(products, function (index, product) {
            if ((searchQuery === '' || containsSearchQuery(product, searchQuery)) &&
                (categoryFilter === '' || product.category === categoryFilter)) {
                var productDiv = $('<div class="product" data-id="' + product.id + '"></div>');

                productDiv.html(`<h3>${product.title}</h3>
                                <p>Price: $${product.price}</p>
                                <p>Discount: ${product.discountPercentage}%</p>
                                <p>Category: ${product.category}</p>
                                <p>Stock: ${product.stock}</p>
                                <img src="${product.thumbnail}" alt="${product.title}">`);
                               productDiv.click(function () {
                                var productId = $(this).data('id');
                                window.location.href = `product-details.html?id=${productId}`;
                            });
                            productDiv.click(function () {
                                var productId = $(this).data('id');
                                window.location.href = `product-details.html?id=${productId}`;
                            });            
                productList.append(productDiv);
            }
        });
    }
    function populateCategoryFilter(response) {
        var categories = [...new Set(response.products.map(product => product.category))];
        var categoryFilter = $('#category-filter').empty();
        categoryFilter.append('<option value="">All Categories</option>');
    ;
});
