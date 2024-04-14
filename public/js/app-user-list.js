/**
 * Page User List
 */

"use strict";

// Datatable (jquery)
$(function () {

  //render some info
  let doctorCount = 0;
  let nurseCount = 0;
  let adminCount = 0;
  fetch('/api/getDoctor')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(person => {
      let roleLowerCase = person.role.toLowerCase();
      switch (roleLowerCase) {
          case 'doctor':
              doctorCount++;
              break;
          case 'nurse':
              nurseCount++;
              break;
          case 'admin':
              adminCount++;
              break;
          default:
              break;
      }
    });
    document.getElementById('count_doctor').textContent = doctorCount;
    document.getElementById('count_nurse').textContent = nurseCount;
    
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  //end





  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_user_table = $(".datatables-users"),
    select2 = $(".select2"),
    userView = "app-user-view-account.html",
    statusObj = {
      1: { title: "Pending", class: "bg-label-warning" },
      2: { title: "Active", class: "bg-label-success" },
      3: { title: "Inactive", class: "bg-label-secondary" },
    };

  // Users datatable
  if (dt_user_table.length) {
    var dt_user = dt_user_table.DataTable({
      processing: true,
      ajax: {
        url: "/api/getDoctor",
        dataSrc: "",
      },
      columns: [
        // columns according to JSON
        { data: "" },
        { data: "firstName" },
        { data: "role" },
        { data: "degree" },
        { data: "department" },
        { data: "email" },
        { data: "action" },
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
          // Actions
          targets: -1,
          title: "Actions",
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block text-nowrap">' +
              '<button class="btn btn-sm btn-icon"><i class="bx bx-edit"></i></button>' +
              '<button class="btn btn-sm btn-icon delete-record"><i class="bx bx-trash"></i></button>' +
              '<button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded me-2"></i></button>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="' +
              userView +
              '" class="dropdown-item">View</a>' +
              '<a href="javascript:;" class="dropdown-item">Suspend</a>' +
              "</div>" +
              "</div>"
            );
          },
        },
      ],
      order: [[1, "desc"]],
      dom:
        '<"row mx-2"' +
        '<"col-md-2"<"me-3"l>>' +
        '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
        ">t" +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        ">",
      language: {
        sLengthMenu: "_MENU_",
        search: "",
        searchPlaceholder: "Search..",
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: "collection",
          className: "btn btn-label-secondary dropdown-toggle mx-3",
          text: '<i class="bx bx-export me-1"></i>Export',
          buttons: [
            {
              extend: "print",
              text: '<i class="bx bx-printer me-2" ></i>Print',
              className: "dropdown-item",
              exportOptions: {
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be print
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
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
                //customize print view for dark
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
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
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
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
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
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
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
                columns: [1, 2, 3, 4, 5],
                // prevent avatar to be display
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = "";
                    $.each(el, function (index, item) {
                      if (
                        item.classList !== undefined &&
                        item.classList.contains("user-name")
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
        {
          text: '<i class="bx bx-plus me-0 me-lg-2"></i><span class="d-none d-lg-inline-block">Add New User</span>',
          className: "add-new btn btn-primary ms-n1",
          attr: {
            "data-bs-toggle": "offcanvas",
            "data-bs-target": "#offcanvasAddUser",
          },
        },
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return "Details of " + data["full_name"];
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
        // Adding role filter once table initialized
        this.api()
          .columns(2)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>'
            )
              .appendTo(".user_role")
              .on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val + "$" : "", true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + "</option>");
              });
          });
        // Adding plan filter once table initialized
        this.api()
          .columns(3)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="UserPlan" class="form-select text-capitalize"><option value=""> Select Degree </option></select>'
            )
              .appendTo(".user_plan")
              .on("change", function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? "^" + val + "$" : "", true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + "</option>");
              });
          });
      },
    });
  }
  // Delete Record
  $(".datatables-users tbody").on("click", ".delete-record", async function () {
    var foundId = null;
      var tempDiv = document.createElement("div");
      tempDiv.innerHTML = $(this).parents("tr")[0].innerHTML;
      var productNameToFind = $(this).parents("tr")[0].children[1].textContent;
      console.log(productNameToFind)
      $.ajax({
        url: "/api/getDoctor",
        dataType: "json",
        success: function (jsonData) {
          var cleanedData = jsonData.filter(function (item) {
            return item !== null;
          });
          for (var i = 0; i < cleanedData.length; i++) {
            if (cleanedData[i].firstName === productNameToFind) {
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
        const response = await fetch("../../api/remove-doctor/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: parseInt(foundId) - 1,
          }),
        });
      }
      dt_user.row($(this).parents("tr")).remove().draw();
  });
  document.getElementById("submit").addEventListener(
    "click",
    async () => {
      try {
        var current = {};
        var data = dt_user.rows().data();
        var check = false;
        var fullname = document.getElementById("add-user-fullname");
        var email = document.getElementById("add-user-email");
        var contact = document.getElementById("add-user-contact");
        var degree = document.getElementById("add-user-degree");
        var role = document.getElementById("role");
        var specialist = document.getElementById("user-Specialist");
        var department = document.getElementById("user-Department");
        check = true;
        const response = await fetch("../../api/add-doctor/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: fullname.value,
            degree: degree.value,
            email: email.value,
            contact: contact.value,
            specialist: specialist.value,
            department: department.value,
            role: role.value,
          }),
        });
        if (response.ok) {
          dt_user.ajax.reload();

          // var modal = document.getElementById("offcanvasAddUser");
          // var modalInstance = bootstrap.Modal.getInstance(modal);
          // modalInstance.hide();
          // product_name.value = "";
          // product_brand.value = "";
          // price.value = "";
          // pos.value = "";
          // period.value = "";
        }
        return false;
      } catch (error) {
        console.error("Error adding medicine:", error);
      }
    },
    true
  );
  
  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);
});
