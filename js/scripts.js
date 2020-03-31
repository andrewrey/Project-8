

const empUrl = "https://randomuser.me/api/?results=12";
const modalCover = document.querySelector('.cover');
const cardHolder = document.querySelector('.card-holder');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let employees = [];



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
  console.log(employees);
  let html = '';
  employees.forEach((employee, index)=>{
    html += `
      <div class="card" data-index="${index}">
        <img src="${employee.picture.large}" alt="Headshot of ${employee.name.first}">
        <div class="card-text">
          <h2>${employee.name.first} ${employee.name.last}</h2>
          <p>${employee.email}</p>
          <p>${employee.location.city}</p>
        </div>
      </div>
    `;
  });
  cardHolder.innerHTML = html;
}


function createModal(index){
  let {name:{first, last}, location:{street:{number, name:streetName }, city, state,country, postcode}, email, dob, phone, picture:{large}} = employees[index];
  let birthdate = new Date(dob.date);
  console.log(index);
  let html = `
    <div class="modal" data-index="${index}">
      <div class="prev">&#8227</div>
      <div class="next">&#8227</div>
      <button class="close">X</button>
      <img src="${large}" alt="head shot of ${first}">
      <h2>${first} ${last}</h2>
      <p>${email}</p>
      <p>${city}</p>
      <hr>
      <p>${phone}</p>
      <p class="address">${number} ${streetName}, ${state} ${postcode}</p>
      <p>${birthdate.getMonth()}/${birthdate.getDate()}/${birthdate.getFullYear()}</p>
    </div>
    
  `;
  modalCover.innerHTML = html;
  modalCover.classList.remove("hidden");

}

getEmployees(empUrl)
  .then(data => data.results)
  .then(results => createCards(results))
  .catch((err)=>{
    cardHolder.innerHTML = `<h2>Oops, something went wrong!</h2>`;
    console.log(err);
  });


cardHolder.addEventListener('click', (e)=>{
  if(e.target !== cardHolder){
    let card = e.target.closest(".card");
    let index = card.getAttribute('data-index');
    createModal(index);
  }
});

modalCover.addEventListener('click', (e)=>{
  
  if(e.target.className === "close"){
    console.log('hello');
    e.target.parentNode.parentNode.classList.add('hidden');
  }
});

modalCover.addEventListener('click', (e)=>{
  if(e.target.className === "prev"){
    let currentIndex = parseInt(e.target.parentNode.getAttribute('data-index'));
    if (currentIndex != 0){
      let newIndex = currentIndex - 1;
      console.log(newIndex);
      createModal(newIndex);
    }

  } else if (e.target.className === "next"){
    let currentIndex = parseInt(e.target.parentNode.getAttribute('data-index'));
    if (currentIndex != employees.length - 1){
      let newIndex = currentIndex + 1;
      console.log(newIndex);
      createModal(newIndex);
    }

  }
});