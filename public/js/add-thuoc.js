/**
 * App eCommerce Add Product Script
 */

'use strict';


(function () {

  // ! Don't change it unless you really know what you are doing

  const previewTemplate = `<div class="dz-preview dz-file-preview">
<div class="dz-details">
  <div class="dz-thumbnail">
    <img data-dz-thumbnail>
    <span class="dz-nopreview">No preview</span>
    <div class="dz-success-mark"></div>
    <div class="dz-error-mark"></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
    <div class="progress">
      <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
    </div>
  </div>
  <div class="dz-filename" data-dz-name></div>
  <div class="dz-size" data-dz-size></div>
</div>
</div>`;

  // ? Start your code from here
  document.getElementById('submit').addEventListener('click', async () => {
    try {
        var product_name = document.getElementById('product-name');
        var product_brand = document.getElementById('product-brand');
        var price = document.getElementById('product-price');
        var qty = document.getElementById('quantity');
        var category = document.getElementById('category-org');
        product_name.value = "";
        // const response = await fetch('../../api/add-medicine/', {
		    //  	method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       product_name: product_name.value, 
        //       product_brand: product_brand.value, 
        //       price: price.value, 
        //       qty: qty.value, 
        //       category: category.value})
        // });
    } catch (error) {
        console.error('Error adding medicine:', error);
    }
	}, true);
})();

