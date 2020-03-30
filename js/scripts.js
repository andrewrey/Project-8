

const empUrl = "https://randomuser.me/api/?results=12";
const cardHolder = document.querySelector('.card-holder');
let employees = [];
let test = 1;



async function getEmployees(url){
  try{
    let response = await fetch(url);
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch (err){
    throw err;
  }
}

function createCards(data){
  employees = data;
  test = 2;
  let html = '';
  employees.forEach((employee, index)=>{
    html += `
      <div class="card" data-index="${index}">
        <img src="${employee.picture.large}" alt="Headshot of ${employee.name.first}">
        <div class="card-text">
          <h2>${employee.name.first} ${employee.name.last}</h2>
          <p>${employee.email}</p>
          <p><${employee.location.city}/p>
        </div>
      </div>
    `;
  });
  cardHolder.innerHTML = html;
  console.log(employees);
}


getEmployees(empUrl)
  .then(data => data.results)
  .then(results => createCards(results))
  .catch((err)=>{
    cardHolder.innerHTML = `<h2>Oops, something went wrong!</h2>`;
    console.log(err);
  });

