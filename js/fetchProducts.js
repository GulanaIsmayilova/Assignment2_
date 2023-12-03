
let url = 'https://dummyjson.com/products';

fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching data:', error));
