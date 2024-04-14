/**
 * app-ecommerce-product-list
 */

"use strict";

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;
  // Variable declaration for table
  var dt_product_table = $(".datatables-products"),
    productAdd = "addmedicine.html",
    statusObj = {
      1: { title: "Sắp hết", class: "bg-label-warning" },
      2: { title: "Còn", class: "bg-label-success" },
      3: { title: "Hết", class: "bg-label-danger" },
    },
    categoryObj = {
      0: { title: "Analgesic" },
      1: { title: "Lam_Dep" },
      2: { title: "Inflammatory" },
      3: { title: "Antibiotic" },
      4: { title: "Poison" },
      5: { title: "Other" },
    };

  // E-commerce Products datatable

  if (dt_product_table.length) {
    var dt_products = dt_product_table.DataTable({
      processing: true,
      ajax: {
        url: "/api/getAllMedicine",
        dataSrc: "",
      },
      columns: [
        // columns according to JSON
        { data: "id" },
        { data: "id" },
        { data: "product_name" },
        { data: "category" },
        { data: "price" },
        { data: "quantity" },
        { data: "status" },
        { data: "" },
      ],
      columnDefs: [
        {
          // For Responsive
          className: "control",
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return "";
          },
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
          },
          searchable: false,
        },
        {
          // Product name and product_brand
          targets: 2,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full["product_brand"],
              $id = full["id"],
              $product_brand = full["name"],
              $image = full["image"];
            if ($image) {
              // For Product image

              var $output =
                '<img src="' +
                assetsPath +
                "img/ecommerce-images/" +
                $image +
                '" alt="Product-' +
                $id +
                '" class="rounded-2">';
            } else {
              // For Product badge
              // var stateNum = Math.floor(Math.random() * 6);
              var stateNum = full["status"] + 1;
              var states = [
                "success",
                "danger",
                "warning",
                "info",
                "danger",
                "primary",
                "secondary",
              ];
              var $state = states[stateNum],
                $name = full["product_brand"];
              var $initials = [];
              if ($name) {
                $initials = $name.match(/\b\w/g) || [];
              }
              $initials = (
                ($initials.shift() || "") + ($initials.pop() || "")
              ).toUpperCase();
              $output =
                '<span class="avatar-initial rounded-2 bg-label-' +
                $state +
                '">' +
                $initials +
                "</span>";
            }
            // Creates full output for Product name and product_brand
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center product-name">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar avatar me-2 rounded-2 bg-label-secondary">' +
              $output +
              "</div>" +
              "</div>" +
              '<div class="d-flex flex-column">' +
              '<h6 class="text-body text-nowrap mb-0">' +
              $product_brand +
              "</h6>" +
              '<small class="text-muted text-truncate d-none d-sm-block">' +
              $name +
              "</small>" +
              "</div>" +
              "</div>";
            return $row_output;
          },
        },
        {
          // Product Category
          targets: 3,
          responsivePriority: 5,
          render: function (data, type, full, meta) {
            var $category = categoryObj[full["category"]].title;
            var categoryBadgeObj = {
              Analgesic:
                '<span class="avatar-sm rounded-circle d-flex justify-content-center align-items-center bg-label-warning me-2"><i class="bx bx-home-alt"></i></span>',
              Lam_Dep:
                '<span class="avatar-sm rounded-circle d-flex justify-content-center align-items-center bg-label-success me-2"><i class="bx bx-briefcase"></i></span>',
              Inflammatory:
                '<span class="avatar-sm rounded-circle d-flex justify-content-center align-items-center bg-label-primary me-2"><i class="bx bx-mobile-alt"></i></span>',
              Antibiotic:
                '<span class="avatar-sm rounded-circle d-flex justify-content-center align-items-center bg-label-info me-2"><i class="bx bx-walk"></i></span>',
              Poison:
                '<span class="avatar-sm rounded-circle d-flex justify-content-center align-items-center bg-label-secondary me-2"><i class="bx bxs-watch"></i></span>',
              Other:
                '<span class="avatar-sm rounded-circle d-flex justify-content-center align-items-center bg-label-dark me-2"><i class="bx bx-game"></i></span>',
            };
            return (
              "<span class='text-truncate d-flex align-items-center'>" +
              categoryBadgeObj[$category] +
              $category +
              "</span>"
            );
          },
        },
        {
          // price
          targets: 4,
          render: function (data, type, full, meta) {
            var $price = full["price"];

            return "<span>" + $price + "</span>";
          },
        },
        {
          // qty
          targets: 5,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $qty = full["qty"];

            return "<span>" + $qty + "</span>";
          },
        },
        {
          // Status
          targets: -2,
          render: function (data, type, full, meta) {
            var $status = full["status"];

            return (
              '<span class="badge ' +
              statusObj[$status].class +
              '" text-capitalized>' +
              statusObj[$status].title +
              "</span>"
            );
          },
        },
        {
          // Actions
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block text-nowrap">' +
              '<button class="btn btn-sm btn-icon edit-record"><i class="bx bx-edit"></i></button>' +
              '<button class="btn btn-sm btn-icon delete-record"><i class="bx bx-trash"></i></button>' +
              '<button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded me-2"></i></button>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:0;" class="dropdown-item">View</a>' +
              '<a href="javascript:0;" class="dropdown-item">Suspend</a>' +
              "</div>" +
              "</div>"
            );
          },
        },
      ],
      order: [2, "asc"], //set any columns order asc/desc
      dom:
        '<"card-header d-flex border-top rounded-0 flex-wrap py-md-0"' +
        '<"me-5 ms-n2 pe-5"f>' +
        '<"d-flex justify-content-start justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex align-items-start align-items-md-center justify-content-sm-center mb-3 mb-sm-0"lB>>' +
        ">t" +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        ">",
      lengthMenu: [7, 10, 20, 50, 70, 100], //for length of menu
      language: {
        sLengthMenu: "_MENU_",
        search: "",
        searchPlaceholder: "Search Product",
        info: "Displaying _START_ to _END_ of _TOTAL_ entries",
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-secondary dropdown-toggle me-3",
          text: '<i class="bx bx-export me-1"></i>Export',
          buttons: [
            {
              extend: "print",
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
              customize: function (win) {
                // Customize print view for dark
                $(win.document.body)
                  .css("color", headingColor)
                  .css("border-color", borderColor)
                  .css("background-color", bodyBg);
                $(win.document.body)
                  .find("table")
                  .addClass("compact")
                  .css("color", "inherit")
                  .css("border-color", "inherit")
                  .css("background-color", "inherit");
              },
            },
            {
              extend: "csv",
              text: '<i class="bx bx-file me-2" ></i>Csv',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "excel",
              text: '<i class="bx bxs-file-export me-2"></i>Excel',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "pdf",
              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
            {
              extend: "copy",
              text: '<i class="bx bx-copy me-2" ></i>Copy',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("product-name")
                      ) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  },
                },
              },
            },
          ],
        },
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["product_name"];
            },
          }),
          type: "column",
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    "<td>" +
                    col.title +
                    ":" +
                    "</td> " +
                    "<td>" +
                    col.data +
                    "</td>" +
                    "</tr>"
                : "";
            }).join("");

            return data
              ? $('<table class="table"/><tbody />').append(data)
              : false;
          },
        },
      },
      initComplete: function () {
        // Adding status filter once table initialized
        this.api()
          .columns(-2)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="ProductStatus" class="form-select text-capitalize"><option value="">Status</option></select>'
            )
              .appendTo(".product_status")
              .on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val + "$" : "", true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append(
                  '<option value="' +
                    statusObj[d].title +
                    '">' +
                    statusObj[d].title +
                    "</option>"
                );
              });
          });
        // Adding category filter once table initialized
        this.api()
          .columns(3)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="ProductCategory" class="form-select text-capitalize"><option value="">Category</option></select>'
            )
              .appendTo(".product_category")
              .on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val + "$" : "", true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append(
                  '<option value="' +
                    categoryObj[d].title +
                    '">' +
                    categoryObj[d].title +
                    "</option>"
                );
              });
          });
      },
    });
    $(".dataTables_length").addClass("mt-0 mt-md-3 me-3");
    $(".dt-buttons").addClass("d-flex flex-wrap");
  }

  document.getElementById("submit").addEventListener(
    "click",
    async () => {
      try {
        var current = {};
        var data = dt_products.rows().data();
        var check = false;
        var product_name = document.getElementById("nameBasic");
        var product_brand = document.getElementById("brandBasic");
        var price = document.getElementById("ecommerce-product-price");
        var qty = document.getElementById("quantity");
        var category = document.getElementById("category-org");
        data.each(async function (rowData) {
          if (rowData.name === product_name.value) {
            check = true;
            current = {
              id_cr: parseInt(rowData.id),
              qty_cr: parseInt(rowData.qty) + parseInt(qty.value),
            };
            console.log(current);
            const response = await fetch("../../api/add-medicine/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id_cr: parseInt(current["id_cr"]),
                product_name: rowData.name,
                product_brand: rowData.product_brand,
                price: rowData.price,
                qty: parseInt(current["qty_cr"]),
                category: parseInt(rowData.category),
              }),
            });
            if (response.ok) {
              dt_products.ajax.reload();

              var modal = document.getElementById("basicModal");
              var modalInstance = bootstrap.Modal.getInstance(modal);
              modalInstance.hide();
              product_name.value = "";
              product_brand.value = "";
              price.value = "";
              qty.value = "";
              category.value = "";
            }
            return false;
          }
        });
        if (
          !product_name.value ||
          !product_brand.value ||
          !price.value ||
          !qty.value ||
          !category.value
        ) {
          return;
        } else {
          const response = await fetch("../../api/add-medicine/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_cr: 0,
              product_name: product_name.value,
              product_brand: product_brand.value,
              price: price.value,
              qty: parseInt(qty.value),
              category: parseInt(category.value),
            }),
          });
          if (response.ok) {
            dt_products.ajax.reload();

            var modal = document.getElementById("basicModal");
            var modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            product_name.value = "";
            product_brand.value = "";
            price.value = "";
            qty.value = "";
            category.value = "";
          }
        }
      } catch (error) {
        console.error("Error adding medicine:", error);
      }
    },
    true
  );


    //edit record
    $(".datatables-products tbody").on(
      "click",
      ".edit-record",
      async function() {
        var foundId = null;
        var tempDiv = document.createElement("div");
        tempDiv.innerHTML = $(this).parents("tr")[0].innerHTML;
        var productNameToFind = tempDiv
          .querySelector("h6.text-body")
          ?.textContent?.trim();
        console.log(productNameToFind);
        
      }
    );

  // Delete Record
  $(".datatables-products tbody").on(
    "click",
    ".delete-record",
    async function () {
      var foundId = null;
      var tempDiv = document.createElement("div");
      tempDiv.innerHTML = $(this).parents("tr")[0].innerHTML;
      var productNameToFind = tempDiv
        .querySelector("h6.text-body")
        ?.textContent?.trim();
      console.log(productNameToFind);
      $.ajax({
        url: "https://ithopital-default-rtdb.firebaseio.com/admin/medicine/data.json",
        dataType: "json",
        success: function (jsonData) {
          var cleanedData = jsonData.filter(function (item) {
            return item !== null;
          });
          for (var i = 0; i < cleanedData.length; i++) {
            if (cleanedData[i].name === productNameToFind) {
              foundId = cleanedData[i].id;
              break;
            }
          }
          console.log(
            "ID của sản phẩm '" + productNameToFind + "' là: " + foundId
          );
          performDeleteRequest(foundId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log("Lỗi khi tải JSON: " + textStatus + ": " + errorThrown);
        },
      });
      async function performDeleteRequest(foundId) {
        const response = await fetch("../../api/remove-medicine/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parseInt(foundId) - 1,
          }),
        });
      }
      dt_products.row($(this).parents("tr")).remove().draw();
    }
  );

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);
});
