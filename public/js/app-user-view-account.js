/**
 * App User View - Account (jquery)
 */

$(function () {
  "use strict";

  let benhnhan;
  let benhnhan_full;
  fetch("/api/treatment")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      benhnhan_full = data;
      benhnhan = data.map((item) => item.name);
      console.log(benhnhan);


      
      // Variable declaration for table
      var dt_project_table = $(".datatable-project"),
        dt_invoice_table = $(".datatable-invoice");

      // Project datatable
      // --------------------------------------------------------------------
      if (dt_project_table.length) {
        var dt_project = dt_project_table.DataTable({
          ajax: "../../json/patient.json", // JSON file to add data
          columns: [
            // columns according to JSON
            { data: "fullname" },
            { data: "des" },
            { data: "contact" },
            { data: "year_old" },
          ],
          displayLength: 7,
          lengthMenu: [7, 10, 25, 50, 75, 100],
          language: {
            sLengthMenu: "Show _MENU_",
            // search: '',
            searchPlaceholder: "Search Patient",
          },
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
        });
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
  // On each datatable draw, initialize tooltip
  dt_invoice_table.on("draw.dt", function () {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        boundary: document.body,
      });
    });
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $(".dataTables_filter .form-control").removeClass("form-control-sm");
    $(".dataTables_length .form-select").removeClass("form-select-sm");
  }, 300);
});
