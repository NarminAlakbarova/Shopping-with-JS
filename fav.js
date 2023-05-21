let row = document.querySelector(".row");
const BASE_URL = "http://localhost:8090/fav";


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
            <i class="fa-solid fa-trash" onclick=deletefav(${item.id})></i>
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
  let data = resp.data;
  drawCards(data);
}
getData();

async function deletefav(id){
  await axios.delete(`${BASE_URL}/${id}`)
}