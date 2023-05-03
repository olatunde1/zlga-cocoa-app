// let activepage;
// localStorage.setItem("num",activepage)

//populate cards
function threeCards() {
    const getSpinal = document.querySelector(".pagemodal");
  
    getSpinal.style.display = "block";
    const myToken = localStorage.getItem("token");
  
    const tokenHeader = new Headers();
  
    tokenHeader.append("Authorization", `Bearer ${myToken}`);
  
    const tokenRequest = {
      method: "GET",
      headers: tokenHeader,
    };
  
    const url = "https://zlglobalalliance.com.ng/api/admin-dashboard";
  
    fetch(url, tokenRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const getRecord = document.querySelector(".recordnum1");
        const getMen = document.querySelector(".recordnum2");
        const getWomen = document.querySelector(".recordnum3");
        getRecord.innerHTML = result.total_records;
        getMen.innerHTML = result.total_men;
        getWomen.innerHTML = result.total_women;
      });
  
    getSpinal.style.display = "none";
  }
  threeCards();
  
  function populateTable() {
    const getSpinal = document.querySelector(".pagemodal");
  
    getSpinal.style.display = "block";
  
    const myToken = localStorage.getItem("token");
    const pagenum = localStorage.getItem("num");
    console.log(pagenum);
  
    const tokenHeader = new Headers();
  
    tokenHeader.append("Authorization", `Bearer ${myToken}`);
  
    const tokenRequest = {
      method: "GET",
      headers: tokenHeader,
    };
  
    let data = [];
  
    const url = `https://zlglobalalliance.com.ng/api/get-medical-records?page=0`;
    fetch(url, tokenRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
  
        const patientsRecord = document.querySelector(".patData");
  
        if (result.length === 0) {
          patientsRecord.innerHTML = "No Record Found";
        } else {
          result.records.rows.map((item) => {
            data += `
                  <tr>
                      <td>${item.name}</td>
                      <td>${item.address}</td>
                      <td>${item.sex}</td>
                      <td>${item.age}</td>
                      <td>${item.cardnumber}</td>
                      <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
                      
                  </tr>
              `;
            // activepage=result.totalpages
            localStorage.setItem("num", result.totalpages);
          });
          patientsRecord.innerHTML = data;
          getSpinal.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
  
  populateTable();
  
  function showPage(num) {
    const getSpinal = document.querySelector(".pagemodal");
  
    getSpinal.style.display = "block";
  
    const myToken = localStorage.getItem("token");
    // console.log(pagenum)
  
    const tokenHeader = new Headers();
  
    tokenHeader.append("Authorization", `Bearer ${myToken}`);
  
    const tokenRequest = {
      method: "GET",
      headers: tokenHeader,
    };
  
    let data = [];
  
    const url = `https://zlglobalalliance.com.ng/api/get-medical-records?page=${num}`;
    fetch(url, tokenRequest)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
  
        const patientsRecord = document.querySelector(".patData");
  
        if (result.length === 0) {
          patientsRecord.innerHTML = "No Record Found";
        } else {
          result.records.rows.map((item) => {
            data += `
                  <tr>
                      <td>${item.name}</td>
                      <td>${item.address}</td>
                      <td>${item.sex}</td>
                      <td>${item.age}</td>
                      <td>${item.cardnumber}</td>
                      <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
                      
                  </tr>
              `;
          });
          patientsRecord.innerHTML = data;
          getSpinal.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
  
  // pagination
  let getN = localStorage.getItem("num");
  let numarr = [];
  for (let a = 0; a < getN; a++) {
    numarr.push(a);
  }
  console.log(numarr);
  
  let getPageDiv = document.querySelector(".pagination");
  numarr.map((page) => {
    getPageDiv.innerHTML += `<button onclick="showPage(${page})" class="btnpage">${
      page + 1
    }</button>`;
  });
  
  function viewDetails(id) {
    let data = [];
    const getSpinal = document.querySelector(".pagemodal");
    getSpinal.style.display = "block";
    const activenum = localStorage.getItem("activepage");
    const patientsRecord = document.querySelector(".patData");
    const myToken = localStorage.getItem("token");
  
    const url = `https://zlglobalalliance.com.ng/api/get-medical-records-details/${id}`;
  
    const reqq = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${myToken}`,
      },
    };
  
    fetch(url, reqq)
      .then((response) => response.json())
      .then((result) => {
        const getPop = document.querySelector(".popup");
        const getPopcont = document.querySelector(".pop-container");
        getPopcont.style.display = "block";
        getPop.innerHTML = `
      <div class="poptitle">
      <p class="poptext">Details</p>
      <button class="closepop">X</button>
      </div>
      <div>
              <label>Name:</label>
              <input type="text" value=${result.name} class="pop">
              </div>
            <div >
            <label>Address:</label>
              <input type="text" value=${result.address} class="pop add">
              </div>
              <div>
              <label>Age:</label>
              <input type="text" value=${result.age} class="pop">
              </div>
              <div>
              <label>Bilirubin:</label>
              <input type="text" value=${result.bilirubin} class="pop">
              </div>
              <div>
              <label>Blood:</label>
              <input type="text" value=${result.blood} class="pop">
              </div>
              <div>
              <label>Blood Pressure:</label>
              <input type="text" value=${result.blood_pressure} class="pop">
              </div>
              <div>
              <label>Card Number:</label>
              <input type="text" value=${result.cardnumber} class="pop">
              </div>
            <div>
            <label>Date:</label>
              <input type="text" value=${result.date} class="pop">
            </div>
            <div>
              <label>Glucose:</label>
              <input type="text" value=${result.glucose} class="pop">
              </div>
              <div>
              <label>Ketones:</label>
              <input type="text" value=${result.ketones} class="pop">
              </div>
              <div>
              <label>Leukocytes:</label>
              <input type="text" value=${result.leukocytes} class="pop">
            </div>
            <div>
              <label>Marital Status:</label>
              <input type="text" value=${result.maritalstatus} class="pop">
            </div>
            <div>
              <label>Next of kin:</label>
              <input type="text" value=${result.next_of_kin} class="pop">
            </div>
            <div>
              <label>Next of kin phone number:</label>
              <input type="text" value=${result.next_of_kin_phonenumber} class="pop">
              </div>
            <div>
            <label>Nitrite:</label>
              <input type="text" value=${result.nitrite} class="pop">
            </div>
            <div>
              <label>pH:</label>
              <input type="text" value=${result.ph} class="pop">
              </div>
            <div>
              <label>Phone number:</label>
              <input type="text" value=${result.phonenumber} class="pop">
              </div>
            <div>
            <label>Protein:</label>
              <input type="text" value=${result.protein} class="pop">
            </div>
            <div>
            <label>Pulse:</label>
            <input type="text" value=${result.pulse} class="pop">
            </div>
            <div>
              <label>Relationship:</label>
              <input type="text" value=${result.relationship} class="pop">
            </div>
            <div>
            <label>sex:</label>
            <input type="text" value=${result.sex} class="pop">
            </div>
            <div>
            <label>Specific gravity:</label>
              <input type="text" value=${result.specific_gravity} class="pop">
              </div>
            <div>
            <label>Temperature:</label>
              <input type="text" value=${result.temperature} class="pop">
            </div>
            <div>
            <label>Updated:</label>
              <input type="text" value=${result.updatedAt} class="pop">
            </div>
            <div>
              <label>Urine analysis:</label>
              <input type="text" value=${result.urinanalysis} class="pop">
              </div>
              <div>
              <label>Urobilinogen:</label>
              <input type="text" value=${result.urobilinogen} class="pop">
              </div>
            <div>
              <label>Weight:</label>
              <input type="text" value=${result.weight} class="pop">
            </div>
       `;
        document.querySelector(".add").setAttribute("value", result.address);
        document
          .querySelector(".closepop")
          .addEventListener("click", function () {
            getPopcont.style.display = "none";
          });
      });
    getSpinal.style.display = "none";
  }
  function showFilter(num) {
    let data = [];
    const patientsRecord = document.querySelector(".patData");
  
    const activenum = localStorage.getItem("filternum");
  
    const getStart = document.querySelector(".start").value;
  
    const getEnd = document.querySelector(".end").value;
  
    const getTotalrec = document.querySelector(".recordnum1");
  
    const getSpinal = document.querySelector(".pagemodal");
  
    getSpinal.style.display = "block";
  
    if (getStart === "" || getEnd === "") {
      alert("all fields are required");
      getSpinal.style.display = "none";
    } else {
      const myToken = localStorage.getItem("token");
  
      const rawForm = JSON.stringify({
        startdate: getStart,
        enddate: getEnd,
      });
  
      const url = `https://zlglobalalliance.com.ng/api/daterange-filter-medical-records?page=${num}`;
      const reqq = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: rawForm,
      };
      fetch(url, reqq)
        .then((response) => response.json())
        .then((result) => {
          if (result.records.rows.length === 0) {
            patientsRecord.innerHTML = "No Record Found";
            getSpinal.style.display = "none";
          } else {
            console.log(result);
            getTotalrec.innerHTML = result.records.count;
            result.records.rows.map((item) => {
              data += `
            <tr>
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.sex}</td>
            <td>${item.age}</td>
            <td>${item.cardnumber}</td>
            <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
            </tr>
            `;
              patientsRecord.innerHTML = data;
              getSpinal.style.display = "none";
            });
          }
        });
    }
  }
  
  //filter by date
  const view = document.querySelector(".viewMoree");
  // let filterN;
  // localStorage.setItem("filternum",filterN)
  view.addEventListener("click", function filterDate(event) {
    // console.log("hey")
    event.preventDefault();
    let data = [];
    const patientsRecord = document.querySelector(".patData");
  
    const getpd = document.querySelector(".pagination");
  
    const getStart = document.querySelector(".start").value;
  
    const getEnd = document.querySelector(".end").value;
  
    const getTotalrec = document.querySelector(".recordnum1");
  
    const getSpinal = document.querySelector(".pagemodal");
  
    getSpinal.style.display = "block";
  
    if (getStart === "" || getEnd === "") {
      alert("all fields are required");
      getSpinal.style.display = "none";
    } else {
      const myToken = localStorage.getItem("token");
  
      const rawForm = JSON.stringify({
        startdate: getStart,
        enddate: getEnd,
      });
  
      const url = `https://zlglobalalliance.com.ng/api/daterange-filter-medical-records?page=0`;
      const reqq = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: rawForm,
      };
      fetch(url, reqq)
        .then((response) => response.json())
        .then((result) => {
          if (result.records.rows.length === 0) {
            patientsRecord.innerHTML = "No Record Found";
            getSpinal.style.display = "none";
          } else {
            getpd.innerHTML = "";
            for (let i = 0; i < result.totalpages; i++) {
              console.log(i);
              getpd.innerHTML += `<button onclick="showFilter(${i})" class="btnpage">${
                i + 1
              }</button>`;
            }
            console.log(result);
            getTotalrec.innerHTML = result.records.count;
            result.records.rows.map((item) => {
              data += `
            <tr>
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.sex}</td>
            <td>${item.age}</td>
            <td>${item.cardnumber}</td>
                    <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
                    </tr>
                    `;
  
              patientsRecord.innerHTML = data;
              getSpinal.style.display = "none";
            });
            // filterN = result.totalpages
            // localStorage.setItem("num", result.totalpages);
            // localStorage.removeItem("num");
          }
        });
    }
  });
  
  function showSearch(num) {
    const getSearch = document.querySelector(".search-input").value;
  
    if (getSearch === "") {
      return;
    } else {
      let data = [];
      const getSpinal = document.querySelector(".pagemodal");
      getSpinal.style.display = "block";
      const activenum = localStorage.getItem("activepage");
      const patientsRecord = document.querySelector(".patData");
  
      const url = `https://zlglobalalliance.com.ng/api/filter-medical-records?page=${num}`;
  
      const myToken = localStorage.getItem("token");
  
      const rawForm = JSON.stringify({
        query: getSearch,
      });
      const reqq = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: rawForm,
      };
      fetch(url, reqq)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.records.rows.length === 0) {
            patientsRecord.innerHTML = "No Record Found";
            getSpinal.style.display = "none";
          } else {
            result.records.rows.map((item) => {
              data += `
              <tr>
                    <td>${item.name}</td>
                    <td>${item.address}</td>
                    <td>${item.sex}</td>
                    <td>${item.age}</td>
                    <td>${item.cardnumber}</td>
                    <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
                    
                    </tr>
                    `;
              patientsRecord.innerHTML = data;
            });
          }
        });
      getSpinal.style.display = "none";
    }
  }
  //search
  function searchData() {
    const getSearch = document.querySelector(".search-input").value;
  
    if (getSearch === "") {
      return;
    } else {
      let data = [];
      const getSpinal = document.querySelector(".pagemodal");
      getSpinal.style.display = "block";
      const patientsRecord = document.querySelector(".patData");
      const getpd = document.querySelector(".pagination");
  
      const url = `https://zlglobalalliance.com.ng/api/filter-medical-records?page=0`;
  
      const myToken = localStorage.getItem("token");
  
      const rawForm = JSON.stringify({
        query: getSearch,
      });
      const reqq = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myToken}`,
        },
        body: rawForm,
      };
      fetch(url, reqq)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.records.rows.length === 0) {
            patientsRecord.innerHTML = "No Record Found";
            getSpinal.style.display = "none";
          } else {
            getpd.innerHTML = "";
            for (let i = 0; i < result.totalpages; i++) {
              console.log(i);
              getpd.innerHTML += `<button onclick="showSearch(${i})" class="btnpage">${
                i + 1
              }</button>`;
            }
            result.records.rows.map((item) => {
              data += `
              <tr>
                    <td>${item.name}</td>
                    <td>${item.address}</td>
                    <td>${item.sex}</td>
                    <td>${item.age}</td>
                    <td>${item.cardnumber}</td>
                    <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
                    
                    </tr>
                    `;
              patientsRecord.innerHTML = data;
              // localStorage.setItem("num", result.totalpages);
              // localStorage.removeItem("num");
            });
          }
        });
      getSpinal.style.display = "none";
    }
  }
  
  function logout(){
    localStorage.clear()
    location.href="index.html"
}

  // const apiUrl = 'https://zlglobalalliance.com.ng/api/daterange-filter-medical-records?page=1';
  // const perPage = 10;
  // let currentPage = 1;
  
  // const dataContainer = document.querySelector('#data-container');
  // const prevBtn = document.querySelector('#prev-btn');
  // const nextBtn = document.querySelector('#next-btn');
  
  // function fetchData(page) {
  //   fetch(`${apiUrl}?page=${page}&per_page=${perPage}`)
  //     .then(response => response.json())
  //     .then(data => renderData(data));
  // }
  
  // function renderData(data) {
  //   // Clear the data container
  //   dataContainer.innerHTML = '';
  
  //   // Render the data
  //   data.forEach(item => {
  //     const itemElement = document.createElement('div');
  //     itemElement.classList.add('item');
  
  //     const titleElement = document.createElement('h2');
  //     titleElement.textContent = item.title;
  
  //     const bodyElement = document.createElement('p');
  //     bodyElement.textContent = item.body;
  
  //     itemElement.appendChild(titleElement);
  //     itemElement.appendChild(bodyElement);
  
  //     dataContainer.appendChild(itemElement);
  //   });
  
  //   // Enable/disable the pagination buttons
  //   if (currentPage === 1) {
  //     prevBtn.disabled = true;
  //   } else {
  //     prevBtn.disabled = false;
  //   }
  //   if (data.length < perPage) {
  //     nextBtn.disabled = true;
  //   } else {
  //     nextBtn.disabled = false;
  //   }
  // }
  
  // prevBtn.addEventListener('click', () => {
  //   if (currentPage > 1) {
  //     currentPage--;
  //     fetchData(currentPage);
  //   }
  // });
  
  // nextBtn.addEventListener('click', () => {
  //   currentPage++;
  //   fetchData(currentPage);
  // });
  
  // fetchData(currentPage);
  
  // const header = new Headers();
  // header.append("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl90eXBlIjoiYWRtaW4iLCJpYXQiOjE2ODI3ODgwNjl9.2_3_yniURb3EGrpX50I0HplmoXsEZSN688a-s3XN8CM`)
  
  // const reqq = {
  //     method: "GET",
  //     headers:header
  // }
  // const arr = []
  // function getPage(pagenum){
  //     fetch(`https://zlglobalalliance.com.ng/api/get-medical-records?page=${pagenum}`,reqq)
  //     .then(response=>response.json())
  //     .then(result=>{
  //         console.log(result)
  //         localStorage.setItem("pagenum",JSON.stringify(result.totalpages))
  //     })
  // }
  // getPage()
  
  // const getPageBtn = document.querySelector(".pagebtn");
  // const getArr = JSON.parse(localStorage.getItem("pagenum"))
  // for (let i =0; i < getArr; i++){
  //     arr.push(i)
  // }
  
  // arr.map(num=>{
  //     getPageBtn.innerHTML+=`<button onclick="getPage(${num})">${num + 1}</button>`
  // })-->
  
  // SETTING PAGINATION FOR EACH PAGE
  // selecting required element
  // const element = document.querySelector(".pagination ul");
  // let totalPages = getArr;
  // let page = 1;
  
  // //calling function with passing parameters and adding inside element which is ul tag
  // element.innerHTML = createPagination(totalPages, page);
  // function createPagination(totalPages, page){
  //   let liTag = '';
  //   let active;
  //   let data=[]
  //   let beforePage = page - 1;
  //   let afterPage = page + 1;
  //   if(page > 1){ //show the next button if the page value is greater than 1
  //     liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  //   }
  
  //   // if(page > 2){ //if page value is less than 2 then add 1 after the previous button
  //   //   liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
  //     if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
  //       liTag += `<li class="dots"><span>...</span></li>`;
  //     }
  //   // }
  
  //   // how many pages or li show before the current li
  //   if (page == totalPages) {
  //     // beforePage = beforePage - 2;
  //   } else if (page == totalPages - 1) {
  //     beforePage = beforePage - 1;
  //   }
  //   // how many pages or li show after the current li
  //   // if (page == 1) {
  //   //   afterPage = afterPage + 2;
  //   // } else if (page == 2) {
  //   //   afterPage  = afterPage + 1;
  //   // }
  
  //   for (var plength = beforePage; plength <= afterPage; plength++) {
  //     if (plength > totalPages) { //if plength is greater than totalPage length then continue
  //       continue;
  //     }
  //     if (plength == 0) { //if plength is 0 than add +1 in plength value
  //       plength = plength + 1;
  //     }
  //     if(page == plength){ //if page is equal to plength than assign active string in the active variable
  //       active = "active";
  //       const myToken = localStorage.getItem("token");
  //       const patientsRecord = document.querySelector(".patData");
  //       const getSpinal = document.querySelector(".pagemodal");
  
  //       getSpinal.style.display = "block";
  
  //       const tokenHeader = new Headers();
  //   const header = new Headers();
  //   header.append("Authorization", `Bearer ${myToken}`)
  
  //   const reqq = {
  //       method: "GET",
  //       headers:header
  //   }
  //     fetch(`https://zlglobalalliance.com.ng/api/get-medical-records?page=${page-1}`,reqq)
  //     .then(response=>response.json())
  //     .then(result=>{
  //         console.log(result)
  //         result.records.rows.map((item) => {
  //           data += `
  //                 <tr>
  //                     <td>${item.name}</td>
  //                     <td>${item.address}</td>
  //                     <td>${item.sex}</td>
  //                     <td>${item.age}</td>
  //                     <td>${item.cardnumber}</td>
  //                     <td><button class="viewMore" onclick="viewDetails(${item.id})">view more</button></td>
  //                     <td><button class="delete" onclick="deleteDetails(${item.id})">delete</button></td>
  //                 </tr>
  //             `
  //           patientsRecord.innerHTML = data;
  //           getSpinal.style.display = "none";
  //         });
  //         localStorage.setItem("pagenum",JSON.stringify(result.totalpages))
  //     })
  //     }else{ //else leave empty to the active variable
  //       active = "";
  //     }
  //     liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  
  //   }
  
  //   if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
  //     if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
  //       liTag += `<li class="dots"><span>...</span></li>`;
  //     }
  //     liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  //   }
  
  //   if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
  //     liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1})"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  //   }
  //   element.innerHTML = liTag; //add li tag inside ul tag
  //   return liTag; //reurn the li tag
  // }
  