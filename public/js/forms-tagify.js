/**
 * Tagify
 */

'use strict';


(function () {
  // Basic
  //------------------------------------------------------
  const tagifyBasicEl = document.querySelector('#TagifyBasic');
  const TagifyBasic = new Tagify(tagifyBasicEl);

  // Read only
  //------------------------------------------------------
  const tagifyReadonlyEl = document.querySelector('#TagifyReadonly');
  const TagifyReadonly = new Tagify(tagifyReadonlyEl);

  // Custom list & inline suggestion
  //------------------------------------------------------
  const TagifyCustomInlineSuggestionEl = document.querySelector('#TagifyCustomInlineSuggestion');
  const TagifyCustomListSuggestionEl = document.querySelector('#TagifyCustomListSuggestion');
  const choose_patient = document.querySelector('#choose_patient');
  const choose_khoa = document.querySelector('#choose_khoa');
  const choose_thuoc = document.querySelector('#choose_thuoc');
  let benhnhan;
  let benhnhan_full;
  fetch('/api/treatment')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    benhnhan_full = data;
    benhnhan = data.map(item => item.name);
    //choose patient
  let choose_patient_list = new Tagify(choose_patient, {
    whitelist: benhnhan,
    maxTags: 1,
    dropdown: {
      maxItems: 20,
      classname: '',
      enabled: 0,
      closeOnSelect: true
    }
  });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  const khoa = [
    'Tim mạch',
    'Da liễu',
    'Nội tiết',
    'Tiêu hóa',
    'Huyết học',
    'Miễn dịch học',
    'Thần kinh học',
    // Các chuyên khoa khác...
];
  //choose khoa
  let choose_khoa_list = new Tagify(choose_khoa, {
    whitelist: khoa,
    maxTags: 1,
    dropdown: {
      maxItems: 20,
      classname: 'tags-inline',
      enabled: 0,
      closeOnSelect: true
    }
  });
  //chooose medicine
  let listthuoc;
  let listprice;
  fetch('/api/getAllMedicine')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    listthuoc = data.map(item => item.name);
    listprice = data.map(item => item.price)
    let choose_thuoc_list = new Tagify(choose_thuoc, {
      whitelist: listthuoc,
      maxTags: 1,
      dropdown: {
        maxItems: 20,
        classname: '',
        enabled: 0,
        closeOnSelect: true
      }
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  document.getElementById("choose_thuoc").addEventListener("change", function update_choose_thuoc() {
    try{
      var thuoc = JSON.parse(document.getElementById('choose_thuoc').value)[0].value;
      document.getElementById("thuoc-price").value = listprice[listthuoc.indexOf(thuoc)];
    } catch (error){
      console.log("Input = null!");
      document.getElementById("thuoc-price").value = "$0.00";
    }
    // console.log(listprice[listthuoc.indexOf(thuoc)]);
  });


  document.getElementById("qty").addEventListener("change", function update_qty() {
    try{
      var ttprice = parseFloat(document.getElementById("qty").value)*parseFloat(document.getElementById("thuoc-price").value.replace('$',''));
      document.getElementById("total_price").textContent = "$"+ttprice.toFixed(2);
    } catch (error){
      console.log("Input = null!");
    }
    // console.log(listprice[listthuoc.indexOf(thuoc)]);
  });

  $(document).on('click', '#choose_thuoc', function() {
    var $this = $(this)
    new Tagify(this, {
      whitelist: listthuoc,
      maxTags: 1,
      dropdown: {
        maxItems: 20,
        classname: '',
        enabled: 0,
        closeOnSelect: true
      }
    });
  });

  $(document).on('change', '#choose_thuoc', function() {
    try{
      var thuoc = JSON.parse(this.value)[0].value;
      $(this).closest('.repeater-wrapper').find('#thuoc-price').val(listprice[listthuoc.indexOf(thuoc)]);
    } catch (error){
      console.log("Input = null!");
      $(this).closest('.repeater-wrapper').find('#thuoc-price').val("$0.00");
    }
  });

  $(document).on('change', '#qty', function() {
    try{
      var ttprice = parseFloat($(this).closest('.repeater-wrapper').find("#qty").val())*parseFloat($(this).closest('.repeater-wrapper').find("#thuoc-price").val().replace('$',''));
      $(this).closest('.repeater-wrapper').find("#total_price").text("$" + ttprice.toFixed(2));
    } catch (error){
      console.log("Input = null!");
    }
  });
  let bill_data;
  document.getElementById("save").addEventListener("click", function() {
    var med = [];
    var subtotal = 0;
    $(".repeater-wrapper").each(function() {
        var form = $(this);
        var item = form.find("#choose_thuoc").val();
        var price = form.find("#thuoc-price").val();
        var qty = form.find("#qty").val();
        var total_price = form.find("#total_price").text();
        subtotal += parseFloat(total_price.replace('$',''));
        var thuoc_info = form.find("#thuoc-info").val();
        var formData = {
            "item": item.match(/"value":"([^"]+)"/)[1],
            "price": price,
            "qty": qty,
            "total_price": total_price,
            "thuoc_info": thuoc_info
        };

        med.push(formData);
    });
    var money = {
      "subtotal": document.getElementById("subtotal").textContent = "$"+subtotal.toFixed(2),
      "tax": document.getElementById("tax").textContent = "$"+(subtotal*10/100).toFixed(2),
      "total": document.getElementById("total").textContent = "$"+(subtotal.toFixed(2)+subtotal.toFixed(2)*10/100).toFixed(2)
    }
    const precription = khoa[parseInt(document.getElementById("bill_room").textContent.match(/\d+/)[0])].normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 2) + new Date().getTime();
    document.getElementById("precription_num").value = precription;
    bill_data = {
      "patient": document.getElementById("bill_name").textContent,
      "room": document.getElementById("bill_room").textContent.match(/\d+/)[0],
      "bhyt": document.getElementById("bill_bhyt").textContent.match(/\d+/)[0],
      "contact": document.getElementById("bill_contact").textContent.match(/\d+/)[0],
      "precription": precription,
      "medications": med,
      "money": money,
      "date": document.getElementById("date_bill").value,
      "note": document.getElementById("note").value
    }
    console.log(JSON.stringify(bill_data));
  })

  document.getElementById("send").addEventListener("click", function() {
    console.log(JSON.stringify(bill_data));

    const response = fetch("../../api/addBill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bill_data),
    });

  });

  document.getElementById("choose_patient").addEventListener("change", function() {
    try{
      var choosed = benhnhan_full[benhnhan.indexOf(JSON.parse(document.getElementById('choose_patient').value)[0].value)];
      document.getElementById("bill_name").textContent = choosed.name;
      document.getElementById("bill_room").textContent = "Room: "+choosed.room;
      document.getElementById("bill_bhyt").textContent = "BHYT: "+choosed.healthInsurance;
      document.getElementById("bill_contact").textContent = "Contact: "+choosed.phone;
    } catch (error){
      console.log("Input = null!");
      document.getElementById("bill_name").textContent = "Tên";
      document.getElementById("bill_room").textContent = "Phòng";
      document.getElementById("bill_bhyt").textContent = "Bảo hiểm y tế";
      document.getElementById("bill_contact").textContent = "Thông tin liên hệ";
    }
  });


  // Users List suggestion
  //------------------------------------------------------
  const TagifyUserListEl = document.querySelector('#TagifyUserList');

  function tagTemplate(tagData) {
    return `
    <tag title="${tagData.title || tagData.email}"
      contenteditable='false'
      spellcheck='false'
      tabIndex="-1"
      class="${this.settings.classNames.tag} ${tagData.class ? tagData.class : ''}"
      ${this.getAttributes(tagData)}
    >
      <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>
      <div>
        <div class='tagify__tag__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>
        <span class='tagify__tag-text'>${tagData.name}</span>
      </div>
    </tag>
  `;
  }

  function suggestionItemTemplate(tagData) {
    return `
    <div ${this.getAttributes(tagData)}
      class='tagify__dropdown__item align-items-center ${tagData.class ? tagData.class : ''}'
      tabindex="0"
      role="option"
    >
      ${
        tagData.avatar
          ? `<div class='tagify__dropdown__item__avatar-wrap'>
          <img onerror="this.style.visibility='hidden'" src="${tagData.avatar}">
        </div>`
          : ''
      }
      <div class="fw-medium">${tagData.name}</div>
      <span>${tagData.email}</span>
    </div>
  `;
  }
  function dropdownHeaderTemplate(suggestions) {
    return `
        <div class="${this.settings.classNames.dropdownItem} ${this.settings.classNames.dropdownItem}__addAll">
            <strong>${this.value.length ? `Add remaning` : 'Add All'}</strong>
            <span>${suggestions.length} members</span>
        </div>
    `;
  }



  function onSelectSuggestion(e) {
    // custom class from "dropdownHeaderTemplate"
    if (e.detail.elm.classList.contains(`${TagifyUserList.settings.classNames.dropdownItem}__addAll`))
      TagifyUserList.dropdown.selectAll();
  }

  function onEditStart({ detail: { tag, data } }) {
    TagifyUserList.setTagTextNode(tag, `${data.name} <${data.email}>`);
  }

  // Email List suggestion
  //------------------------------------------------------
  // generate random whitelist items (for the demo)
  let randomStringsArr = Array.apply(null, Array(100)).map(function () {
    return (
      Array.apply(null, Array(~~(Math.random() * 10 + 3)))
        .map(function () {
          return String.fromCharCode(Math.random() * (123 - 97) + 97);
        })
        .join('') + '@gmail.com'
    );
  });

  function addMedicine(){
    var thuoc = JSON.parse(document.getElementById('choose_thuoc').value)[0].value;
    var soluong = document.getElementById('so_luong').value;
    var chuthich = document.getElementById('chu_thich').value;
    var medicine = '<tr>'+
      '<td>'+
        '<span class="fw-medium">'+thuoc+'</span>'+
      '</td>'+
      '<td>'+chuthich+'</td>'+
      '<td>'+soluong+'</td>'+
      '<td>'+listprice[listthuoc.indexOf(thuoc)]+'</td>'+
      '<td>'+
        '<div class="dropdown">'+
          '<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">'+
            '<i class="bx bx-dots-vertical-rounded"></i>'+
          '</button>'+
          '<div class="dropdown-menu">'+
            '<a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-1"></i> Edit</a>'+
            '<a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>'+
          '</div>'+
        '</div>'+
      '</td>'+
    '</tr>';
    var formin = document.getElementById('form_thuoc');
    formin.innerHTML += medicine;

    document.getElementById('choose_thuoc').value = "";
    document.getElementById('so_luong').value = "";
    document.getElementById('chu_thich').value = "";
  }

  function submitBill() {
    const patient = JSON.parse(document.getElementById("choose_patient").value)[0].value;
    const khoa = JSON.parse(document.getElementById("choose_khoa").value)[0].value;
    const precription = khoa.normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 2) + new Date().getTime();
    const rows = document.querySelectorAll('#form_thuoc tr');
    const medications = [];
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const medication = {
            name: cells[0].querySelector('span').textContent.trim(),
            quantity: cells[2].textContent.trim(),
            description: cells[1].textContent.trim(),
            price: cells[3].textContent.trim(),
            total: "$"+parseFloat(cells[2].textContent.trim().split(" ")[0])*parseFloat(cells[3].textContent.trim().replace('$', ''))
        };
        medications.push(medication);
    });
    const billData = {
        patient: patient,
        department: khoa,
        precription: precription,
        medications: medications
    };

    const billJSON = JSON.stringify(billData, null, 2);

    console.log(billJSON);

    const response = fetch("../../api/addBill/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: billJSON,
    });

    const formThuoctable = document.getElementById('form_thuoc');
    formThuoctable.innerHTML = '';
    const patienthtml = document.getElementById('choose_patient');
    patienthtml.innerHTML = '';
    const khoahtml = document.getElementById('choose_khoa');
    khoahtml.innerHTML = '';
}

  // add.addEventListener('click', addMedicine);
  // submit.addEventListener('click', submitBill);
  
  function onAddButtonClick() {
    TagifyEmailList.addEmptyTag();
  }

  function onInvalidTag(e) {
    console.log('invalid', e.detail);
  }
})();
