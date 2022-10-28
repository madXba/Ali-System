let title = document.getElementById("title");
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'Create';
let tmp;
function getTotal()
{
          if(price.value != '') {
                    let result = (price.value) - discount.value;
                    total.innerHTML = result;
                    total.style.background = '#040';
          }
          else {
                    total.innerHTML = '';
                    total.style.background ='#a00d02'
          }
}
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product)
} else {
  dataPro = [];
}

submit.onclick = function() {
  let newPro = {
    title:title.value,
    price:price.value,
    discount:discount.value,
    total: total.innerHTML,
    category: category.value,
    count:count.value
  }
  if (title.value != '') {
      if (mood === "Create") {
        if (newPro.count > 1) {
          for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
          }
        } else {
          dataPro.push(newPro);
        }
      } else {
        dataPro[tmp] = newPro;
        mood = "Create";
        submit.innerHTML = "Create";
        count.style.display = "block";
      }
  
  }

  
  localStorage.setItem('product', JSON.stringify(dataPro));
  ClearData()
  showData()
}

  function ClearData() {
    title.value = "";
    price.value = "";
    discount.value = "";
    category.value = "";
    count.value = "";
    total.innerHTML = "";
  }


function showData() {
  getTotal()
  let table = '';
  for (let i = 0; i < dataPro.length;i++){
    table += `
              <tr>
                  <td> ${dataPro[i].title}</td>
                  <td>${dataPro[i].category}</td>
                  <td>${dataPro[i].count}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>
          
                
    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()">delete All</button>
    `;
  } else {
    btnDelete.innerHTML = '';
  }
}

showData();

function deleteData(i) {
  dataPro.splice(i, 1)
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

function deleteAll() {
  localStorage.clear()
  dataPro.splice(0)
  showData()
}

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  discount.value = dataPro[i].discount;
  count.value = dataPro[i].count;
  category.value = dataPro[i].category;
  getTotal()
  count.style.display = 'none';
  submit.innerHTML = 'Update';
  mood = 'Update'
  tmp = i;
  scroll({
    top : 0
  })
}



let searchMode = 'title';

function getSearchMode(id)
{
  let search = document.getElementById("search");
  if (id == 'searchTitle') {
    searchMode = "title";
    search.placeholder = 'Search By Title';
  } else {
    searchMode = "category";
    search.placeholder = "Search By Year";
  }
  search.focus()
  search.value = '';
  showData()
}


function searchData(value) {
  let table = '';
  if (searchMode == 'title') {
    
    for (let i = 0; i < dataPro.length; i++){
      if (dataPro[i].title.includes(value)) {

     table += `
              <tr>
                  <td> ${dataPro[i].title}</td>
                  <td>${dataPro[i].category}</td>
                  <td>${dataPro[i].count}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>`

      }
    }





  }
  
  
  
  
  
  
  
  
  else {
        for (let i = 0; i < dataPro.length; i++) {
          if (dataPro[i].category.includes(value)) {
            table += `
              <tr>
                  <td> ${dataPro[i].title}</td>
                  <td>${dataPro[i].category}</td>
                  <td>${dataPro[i].count}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  
                  <td><button onclick="updateData(${i})" id="update">update</button></td>
                  <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
              </tr>`;
          }
        }
  }
       document.getElementById('tbody').innerHTML = table;

}