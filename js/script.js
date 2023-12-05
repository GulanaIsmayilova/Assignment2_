$(document).ready(function () {
    var currentPage = 1;
    var productsPerPage = 10;

    fetchData();

    function fetchData() {
        var searchQuery = getParameterByName('search');
        var categoryFilter = getParameterByName('category');
        $.ajax({
            url: 'https://dummyjson.com/products',
            method: 'GET',
            success: function (response) {
                displayProducts(response, searchQuery, categoryFilter);
                populateCategoryFilter(response);
                renderPagination(response, searchQuery, categoryFilter);
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    function displayProducts(response, searchQuery, categoryFilter) {
        var products = response.products || [];
        var filteredProducts = products.filter(function (product) {
            return (searchQuery === '' || containsSearchQuery(product, searchQuery)) &&
                (categoryFilter === '' || product.category === categoryFilter);
        });

        var totalProducts = filteredProducts.length;
        var startIndex = 0;
        var endIndex = totalProducts;

        if (totalProducts > productsPerPage) {
            startIndex = (currentPage - 1) * productsPerPage;
            endIndex = startIndex + productsPerPage;
        }

        var paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        var productList = $('#product-list').empty();

        $.each(paginatedProducts, function (index, product) {
            var productDiv = $('<div class="product"></div>');
            productDiv.html(`<h3>${product.title}</h3>
                            <p>Price: $${product.price}</p>
                            <p>Discount: ${product.discountPercentage}%</p>
                            <p>Category: ${product.category}</p>
                            <p>Stock: ${product.stock}</p>
                            <img src="${product.thumbnail}" alt="${product.title}">`);

            productDiv.click(function () {
                var productId = product.id;
                window.location.href = `product-details.html?id=${productId}`;
            });

            productList.append(productDiv);
        });
    }

    function renderPagination(response, searchQuery, categoryFilter) {
        var products = response.products || [];
        var filteredProducts = products.filter(function (product) {
            return (searchQuery === '' || containsSearchQuery(product, searchQuery)) &&
                (categoryFilter === '' || product.category === categoryFilter);
        });
        var totalProducts = filteredProducts.length;

        if (totalProducts > productsPerPage) {
            var totalPages = Math.ceil(totalProducts / productsPerPage);
            var paginationContainer = $('#pagination-container').empty();

            for (var i = 1; i <= totalPages; i++) {
                var pageLink = $('<a href="#" onclick="changePage(' + i + ')">' + i + '</a>');
                if (i === currentPage) {
                    pageLink.addClass('current-page');
                }
                paginationContainer.append(pageLink);
            }
        } else {
            $('#pagination-container').empty();
        }
    }

    window.changePage = function (page) {
        currentPage = page;
        updateURLParameters();
        fetchData();
    };

    window.applyFilters = function () {
        currentPage = 1;
        updateURLParameters();
        fetchData();
    };

    function containsSearchQuery(product, searchQuery) {
        return (product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    function populateCategoryFilter(response) {
        var categories = [...new Set(response.products.map(product => product.category))];
        var categoryFilter = $('#category-filter').empty();
        categoryFilter.append('<option value="">All Categories</option>');
        $.each(categories, function (index, category) {
            categoryFilter.append(`<option value="${category}">${category}</option>`);
        });
        var categoryParam = getParameterByName('category');
        categoryFilter.val(categoryParam);
    }

    function getParameterByName(name) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name) || '';
    }
});