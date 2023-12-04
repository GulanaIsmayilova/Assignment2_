$(document).ready(function () {
    const itemsPerPage = 10;
    let currentPage = 1;

    fetchData();

    function fetchData(searchQuery = '', categoryFilter = '') {
        const apiUrl = 'https://dummyjson.com/products';
        const startIndex = (currentPage - 1) * itemsPerPage;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (response) {
                const filteredProducts = filterAndPaginate(response.products, startIndex, itemsPerPage, searchQuery, categoryFilter);
                displayProducts(filteredProducts);
                populateCategoryFilter(response);
                displayPagination(response.products.length);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function filterAndPaginate(products, startIndex, itemsPerPage, searchQuery, categoryFilter) {
        let filteredProducts = products;

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                containsSearchQuery(product, searchQuery)
            );
        }

        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(product =>
                product.category === categoryFilter
            );
        }

        return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
    }
    function displayProducts(products) {
        const productList = $('#product-list').empty();

        $.each(products, function (index, product) {
            const productDiv = $('<div class="product" data-id="' + product.id + '"></div>');
            productDiv.html(`<h3>${product.title}</h3>
                            <p>Price: $${product.price}</p>
                            <p>Discount: ${product.discountPercentage}%</p>
                            <p>Category: ${product.category}</p>
                            <p>Stock: ${product.stock}</p>
                            <img src="${product.thumbnail}" alt="${product.title}">`);

            productDiv.click(function () {
                const productId = $(this).data('id');
                window.location.href = `product-details.html?id=${productId}`;
            });

            productList.append(productDiv);
        });
    }

    function containsSearchQuery(product, searchQuery) {
        return (
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    function populateCategoryFilter(response) {
        const categories = [...new Set(response.products.map(product => product.category))];
        const categoryFilter = $('#category-filter').empty();
        categoryFilter.append('<option value="">All Categories</option>');

        $.each(categories, function (index, category) {
            categoryFilter.append(`<option value="${category}">${category}</option>`);
        });
    }

    window.applyFilters = function () {
        const searchQuery = $('#search').val();
        const categoryFilter = $('#category-filter').val();
        fetchData(searchQuery, categoryFilter);
    };
});