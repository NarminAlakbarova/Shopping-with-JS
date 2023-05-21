let menuIcon = document.querySelector(".fa-bars");
let header = document.querySelector(".header");
let searcIicon = document.querySelector(".searchicon");
let search = document.querySelector("#search");
let shoes = document.querySelector("#shoes");
let clothes = document.querySelector("#clothes");
let row = document.querySelector(".row");
const BASE_URL = "http://localhost:8000/users";
const CLOTHES_URL = "http://localhost:8080/clothes";
menuIcon.addEventListener("click", function () {
  header.classList.toggle("show");

  this.classList.toggle("fa-xmark");
  this.classList.toggle("fa-bars");
  if (header.classList.contains("show")) {
    this.style.zIndex = "999";
  } else {
    this.style.zIndex = "1";
  }
});
searcIicon.addEventListener("click", function () {
  search.classList.toggle("shown");
});

function drawCards(arr) {
  row.innerHTML = "";
  arr.forEach((item) => {
    row.innerHTML += `
        <div class="col col-xl-3 col-md-6 col-sm-12 my-3">
        <div class="card">
          <img src="${item.photo}" alt="" />
          <div class="info-card">
            <p>${item.title}</p>
            <p class="count">${item.count} AZN</p>
            <div class="icons-cards">
            <a onclick="addFav(${item.id}, '${item.photo}', '${item.title}', '${item.count}')" class="fa-regular fa-heart fav"></a>

              <a class="fa-solid fa-basket-shopping"></a>
            </div>
          </div>
        </div>
      </div>
        
        
        `;
  });
}
function drawCardsDress(arr) {
  row.innerHTML = "";
  arr.forEach((item) => {
    row.innerHTML += `
    
    <div class="col col-xl-3 col-md-6 col-sm-12 my-3">
    <div class="card">
      <img src="${item.photo}" alt="" />
      <div class="info-card">
        <p>${item.title}</p>
        <p class="count">${item.count} AZN</p>
        <div class="icons-cards">
           <a  onclick="addFav(${item.id}, '${item.photo}', '${item.title}', '${item.count}')" class="fa-regular fa-heart fav"></a>
          
          <i class="fa-solid fa-basket-shopping"></i>
        </div>
      </div>
    </div>
  </div>
    
    
    `;
  });
}
async function getData() {
  let resp = await axios(BASE_URL);
  let data = await resp.data;
  drawCards(data);
}
getData();
// let boolean=false
function choseData() {
  clothes.addEventListener("click", async function () {
    clothes.style.color = "rgb(131, 2, 2)";
    shoes.style.color = "rgb(82, 58, 62)";

    let resp = await axios(CLOTHES_URL);
    let data = resp.data;
    drawCardsDress(data);
  });
  shoes.addEventListener("click", async function () {
    clothes.style.color = "rgb(82, 58, 62)";
    shoes.style.color = "rgb(131, 2, 2)";

    getData();
  });
}
choseData();
/////////////search//////////
search.addEventListener("input", async function (e) {
  row.innerHTML = "";
  let resp = await axios(BASE_URL);
  let data = resp.data.filter((item) =>
    item.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  drawCards(data);
  let response = await axios(CLOTHES_URL);
  let data2 = response.data.filter((item) =>
    item.title.toLowerCase().includes(e.target.value.toLowerCase())
  );
  drawCardsDress(data2);
});
async function addFav(id, photo, title, count) {
  // document.querySelector(".fav").style.color="red"
  const data = {
    id: id,
    photo: photo,
    title: title,
    count: count,
  };

  try {
    const response = await axios.post("http://localhost:8090/fav", data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
