/**
 * Tagify
 */

'use strict';


(function () {
    let allBill;
    fetch('/api/getBill')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        allBill = data;
        console.log(allBill);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
})();
