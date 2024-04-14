function myFunction(){
    let input, filter, table, tr, td, txtValue
    input = document.getElementById('mySearch')
    filter = input.value.toUpperCase()
    table = document.getElementById("myTable")
    tr = table.getElementsByTagName("tr")

    //Loop through all table rows, and hide those who don't match the search query
    let i
    for(i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[1]
        if(td){
            txtValue = td.textContent || td.innerText
            if(txtValue.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = ""
            }else{
                tr[i].style.display = "none"
            }
        }
    }
}