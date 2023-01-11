//details page
const title = document.querySelector("#nam");
const detailId = new URLSearchParams(window.location.search).get("id");
const detailName = new URLSearchParams(window.location.search).get("name");
title.textContent = detailName;

//get sub category list
function subCatList() {
  const subcat = document.querySelector(".subcatList");

  //get token
  const tok = localStorage.getItem("result");
  const parseTok = JSON.parse(tok);
  const myTok = parseTok.token;

  //get headers
  const myheader = new Headers();
  myheader.append("Authorization", `Bearer ${myTok}`);

  const myReq = {
    method: "GET",
    headers: myheader,
  };

  let viewAll=""
  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${detailId}`;
  fetch(url, myReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.length>0){
        const allList = result.forEach((list) => {
          console.log(list)
          viewAll +=`<div class="col-sm-12 col-md-12 col-lg-6 card">
          <a href="details_subpage.html?id=${list.id}&name=${list.name}"><img src=${list.image} alt="sub-category-image" /></a>
          <p class="mt-4">${list.name}</p>
          </div>`;
        });
      }
      else if (result.length=== 0){
        viewAll += "No Record Found"
      }
      subcat.innerHTML=viewAll
      
    })
    .then((error) => console.log(error));
}
subCatList();

// function for register
function signUp(event) {
  event.preventDefault();

  const getSpin = document.getElementById("spin");
  getSpin.style.display = "inline-block";
  let getName = document.querySelector("#name").value;
  let getEmail = document.querySelector("#email").value;
  let getPassword = document.querySelector("#password").value;
  let getPasswordConfirm = document.querySelector("#confirmpassword").value;

  // check if user wants to submit empty form
  if (
    getName === "" ||
    getEmail === "" ||
    getPassword === "" ||
    getPasswordConfirm === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  }

  //check if password is less than 6 digits
  if (getPassword.length < 6) {
    Swal.fire({
      icon: "info",
      text: "Password is less than 6",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  }

  //check if password and confirm password match
  else if (getPasswordConfirm !== getPassword) {
    Swal.fire({
      icon: "info",
      text: `Password don't match`,
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  }

  //if everything is ok
  else {
    const myFormData = new FormData();
    myFormData.append("name", getName);
    myFormData.append("email", getEmail);
    myFormData.append("password", getPassword);
    myFormData.append("password_confirmation", getPasswordConfirm);

    const signReq = {
      method: "POST",
      body: myFormData,
    };

    //using fetch to call the API
    const url = "https://codesandbox.com.ng/yorubalearning/api/register_admin";
    fetch(url, signReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        //if the registration is successful
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2d85de",
          });

          setTimeout(() => {
            location.href = "index.html";
          }, 3000);
        }
        //if not successful
        else {
          Swal.fire({
            icon: "warning",
            text: "Unsuccessful!",
            confirmButtonColor: "#2d85de",
          });

          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

function loginUser(event) {
  event.preventDefault();
  const getSpinn = document.getElementById("spinn");
  getSpinn.style.display = "inline-block";
  const getEmail = document.querySelector("#email").value;
  const getPassword = document.querySelector("#password").value;

  //check if fields are empty
  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: "info",
      text: "All fields must not be empty",
      confirmButtonColor: "#2d85de",
    });
    getSpinn.style.display = "none";
  }

  //if fields are ok
  else {
    const myFormData = new FormData();
    myFormData.append("email", getEmail);
    myFormData.append("password", getPassword);

    const loginReq = {
      method: "POST",
      body: myFormData,
    };
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

    fetch(url, loginReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("result", JSON.stringify(result));
        const theNewItem = localStorage.getItem("result");
        const brew = JSON.parse(theNewItem);
        if (brew.hasOwnProperty("email")) {
          window.location.href = "dashboard.html";
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful",
            confirmButtonColor: "#2d85de",
          });
          getSpinn.style.display = "none";
        }
      })
      .catch((error) => console.log("error", error));
  }
}

//for shrinking hamburger menu
const menu = document.querySelector(".second-section");
const sideMenu = document.querySelector(".sidebar");
function handleMenu() {
  let x = document.getElementById("mysidebar");
  if (screen.width < 998 && x.className === "sidebar") {
    x.className += " siderestwo";
  } else if (x.className === "sidebar") {
    x.className += " sideres";
    menu.className += " side";
  } else {
    x.className = "sidebar";
    menu.className = "second-section";
  }
}

//get sub headings for the cards
const subHeadings = [
  {
    image: "bx bx-category-alt",
    title: "Total Categories",
    cls: "cat",
  },
  {
    image: "bx bx-chalkboard",
    title: "Learning Materials",
    cls: "learn",
  },
  {
    image: "bx bxs-dashboard",
    title: "Total Subcategories",
    cls: "totsub",
  },
  {
    image: "bx bx-question-mark",
    title: "Total Quiz",
    cls: "totqz",
  },
  {
    image: "bx bx-user",
    title: "Total Students",
    cls: "totstd",
  },
  {
    title: "Top three students",
    cls: "threestd",
  },
];

//populate the cards
let realList = "";
const list = subHeadings.forEach((head) => {
  if (head.hasOwnProperty("image") && head.hasOwnProperty("title")) {
    realList += `<div class="card px-3 border-0 my-3 my-lg-0 cbody shadow">
      <i class="${head.image}" style="color:#b2ed53; font-size:25px;padding-top:1rem;"></i>
      <p class="fs-5 pt-2">${head.title}</p>
      <p class="${head.cls} fs-5"></p>
      </div>`;
  } else {
    realList += `<div class="card p-3 border-0 cbody shadow">
      <button id= "${head.cls}" class="w-100 m-auto fs-5 rounded-3 py-3 mt-2 bg-primary text-white border-0">${head.title}</button>
      </div>`;
  }
});
const getCardBox = document.querySelector(".list-card");
getCardBox.insertAdjacentHTML("afterbegin", realList);

// function to get dashboard api
function getDashApi() {
  const getModal = document.querySelector(".pagemodal");
  getModal.style.display = "block";

  // get your token from localstorage
  const tokenItem = localStorage.getItem("result");
  const myToken = JSON.parse(tokenItem);
  const theToken = myToken.token;

  const dashHead = new Headers();
  dashHead.append("Authorization", `Bearer ${theToken}`);

  const dashReq = {
    method: "GET",
    headers: dashHead,
  };

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
  fetch(url, dashReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      const getCat = document.querySelector(".cat");
      const getLearn = document.querySelector(".learn");
      const getTotsub = document.querySelector(".totsub");
      const getTotqz = document.querySelector(".totqz");
      const getTotstd = document.querySelector(".totstd");
      const getAdName = document.querySelector("#nam");

      getAdName.innerHTML = result.admin_email;
      getCat.innerHTML = result.total_number_of_categories;
      getTotstd.innerHTML = result.total_number_of_students;
      getTotqz.innerHTML = result.total_number_of_quize;
      getTotsub.innerHTML = result.total_number_of_subcategories;
      getLearn.innerHTML = result.total_number_of_learningmaterial;

      getModal.style.display = "none";
    })
    .catch((error) => console.log("error", error));
}
getDashApi();

//to get top three students
const getThree = document.querySelector("#threestd");

function topThree() {
  const threeModal = document.querySelector(".topmodal-container");
  const topMod = document.querySelector(".topmodal");
  const closebtn = document.querySelector("#close");
  const handleClose = () => {
    threeModal.style.display = "none";
  };
  closebtn.addEventListener("click", handleClose);
  const getModal = document.querySelector(".pagemodal");
  getModal.style.display = "block";
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
  //to get token from local storage
  const getToken = localStorage.getItem("result");
  const parseToken = JSON.parse(getToken);
  const myToken = parseToken.token;

  //get headers
  const tokHead = new Headers();
  tokHead.append("Authorization", `Bearer ${myToken}`);

  //get second parameter in fetch
  const req = {
    method: "GET",
    headers: tokHead,
  };

  // fetch API
  fetch(url, req)
    .then((response) => response.json())
    .then((result) => {
      let showThree = "";
      result.forEach((list) => {
        showThree += `
        <main class="shadow-lg px-4 py-3 topcard m-4 rounded-4">
        <p class="d-flex justify-content-between">
        <span>Name:</span>
        <span class="topname text-black">${list.name}</span>
      </p>
      <p class="d-flex justify-content-between">
        <span>Email:</span>
        <span class="topemail text-black">${list.email}</span>
      </p>
      <p class="d-flex justify-content-between">
        <span>Phone:</span>
        <span class="topphone text-black">${list.phone_number}</span>
      </p>
      <p class="d-flex justify-content-between">
        <span>Position:</span>
        <span class="topposition text-black">${list.position}</span>
      </p>
      <p class="d-flex justify-content-between">
        <span>Score:</span>
        <span class="topscore text-black">${list.total_score}</span>
      </p>
      </main>
      `;
      });
      topMod.insertAdjacentHTML("beforeend", showThree);
      threeModal.style.display = "block";
      getModal.style.display = "none";
    })
    .catch((error) => console.log("error", error));
}
getThree.addEventListener("click", topThree);

//function to populate the students table
async function getAllStudents() {
  const getTable = document.querySelector(".tableBody");
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";

  //to get token
  const getT = localStorage.getItem("result");
  const parseT = JSON.parse(getT);
  const myT = parseT.token;

  //get headers
  const tokHead = new Headers();
  tokHead.append("Authorization", `Bearer ${myT}`);

  const req = {
    method: "GET",
    headers: tokHead,
  };

  const response = await fetch(url, req);
  const data = await response.json();
  let tableList = "";
  const getAll = data.forEach((student) => {
    tableList += `<tr>
    <td class="tname">${student.name}</td>
    <td class="temail">${student.email}</td>
    <td class="tphnum">${student.phone_number}</td>
    <td class="tpos">${student.position}</td>
    <td class="tscore">${student.total_score}</td>
  </tr>`;
  });
  getTable.innerHTML = tableList;
}
getAllStudents();

//create category section
function postCategory(event) {
  event.preventDefault();

  const getSpin = document.getElementById("spin");
  getSpin.style.display = "inline-block";
  const getCatName = document.querySelector("#catname").value;
  const getCatImage = document.querySelector("#catimg").files[0];

  //to check if fields are empty
  if (getCatImage === "" || getCatName === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required!",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //get token
    const myToken = localStorage.getItem("result");
    const myT = JSON.parse(myToken);
    const realToken = myT.token;

    const tokHead = new Headers();
    tokHead.append("Authorization", `Bearer ${realToken}`);

    //get formdata
    const myData = new FormData();
    myData.append("name", getCatName);
    myData.append("image", getCatImage);

    const catReq = {
      method: "POST",
      headers: tokHead,
      body: myData,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";

    fetch(url, catReq)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: result.message,
            confirmButtonColor: "#2d85de",
          });
          setTimeout(function () {
            location.reload();
          }, 3000);
          getSpin.style.display = "none";
        } else {
          Swal.fire({
            icon: "info",
            text: result.message.image,
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log(error));
  }
}

//get category list

function getCategory() {
  url = "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";

  //get token
  const myToken = localStorage.getItem("result");
  const myT = JSON.parse(myToken);
  const realToken = myT.token;

  const tokHead = new Headers();
  tokHead.append("Authorization", `Bearer ${realToken}`);

  const catReq = {
    method: "GET",
    headers: tokHead,
  };

  fetch(url, catReq)
    .then((response) => response.json())
    .then((result) => {
      const getCatList = document.querySelector(".cat-list");
      let catList = "";
      const listLoop = result.forEach((list) => {
        catList += `<div class="card card-list-two m-auto p-4 rounded-4 border-0 shadow-lg my-4">
          <a href="details_page.html?id=${list.id}&name=${list.name}"><img src=${list.image} alt="category-image" /></a>
          <p>${list.name}</p>
          <div class="d-flex w-100 btn-class">
          <button class="btn btn-danger update" onclick="updateBtn(${list.id})">Update</button>
          <button class="btn btn-danger" onclick="deleteBtn(${list.id})">Delete</button>
          </div>
        </div>
          `;
      });
      getCatList.insertAdjacentHTML("beforeend", catList);
      // }
    })
    .catch((error) => console.log(error));
}
getCategory();

//update button in category page
function updateBtn(detailId) {
  let viewForm = document.querySelector(".modal-card-container");
  viewForm.style.display = "block";

  const catId = localStorage.setItem("catId", detailId);

  //prefilling on the update category modal

  //get token
  const myToken = localStorage.getItem("result");
  const myT = JSON.parse(myToken);
  const realToken = myT.token;

  const tokHead = new Headers();
  tokHead.append("Authorization", `Bearer ${realToken}`);

  const getCatId = localStorage.getItem("catId");

  const catReq = {
    method: "GET",
    headers: tokHead,
  };

  const url = `http://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${getCatId}`;

  fetch(url, catReq)
    .then((response) => response.json())
    .then((result) => {
      const catNameModal = document.querySelector("#catnamemodal");
      const catImgModal = document.querySelector("#catimgmodal");

      catNameModal.setAttribute("value", result.name);
      catImgModal.setAttribute("value", result.image);
    });
}

//delete category button
function deleteBtn(detailId) {
  localStorage.setItem("getId", detailId);
  const getId = localStorage.getItem("getId");
  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${getId}`;

  //token
  const getTok = localStorage.getItem("result");
  const getTokreq = JSON.parse(getTok);
  const myTok = getTokreq.token;

  //headers
  const getHead = new Headers();
  getHead.append("Authorization", `Bearer ${myTok}`);

  //req
  const myReq = {
    method: "GET",
    headers: getHead,
  };

  fetch(url, myReq)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status === "success") {
        Swal.fire({
          icon: "info",
          text: result.message,
          confirmButtonColor: "#2d85de",
        });
        setTimeout(function () {
          location.reload();
        }, 2000);
      } else {
        Swal.fire({
          icon: "info",
          text: "Delete not successful, try again",
          confirmButtonColor: "#2d85de",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

//change Image on update category modal
function changeImg() {
  const chngone = document.querySelector(".imgfileone");
  const chngtwo = document.querySelector(".imgfiletwo");
  chngone.style.display = "none";
  chngtwo.style.display = "block";
}

//create sub categories

function subCategory(event) {
  event.preventDefault();

  const getSpin = document.getElementById("spin");
  getSpin.style.display = "inline-block";
  const subName = document.querySelector("#subcatname").value;
  const subImage = document.querySelector("#subcatimg").files[0];

  if (subName === "" || subImage === "") {
    Swal.fire({
      icon: "info",
      text: "fields must not be empty",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //get token
    const tok = localStorage.getItem("result");
    const myTokk = JSON.parse(tok);
    const tokk = myTokk.token;

    //get form data
    const getFormdata = new FormData();
    getFormdata.append("name", subName);
    getFormdata.append("image", subImage);
    getFormdata.append("category_id", detailId);

    //get headers
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${tokk}`);

    //set method and header
    const myReq = {
      method: "POST",
      headers: myHeader,
      body: getFormdata,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";
    fetch(url, myReq)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: result.message,
            confirmButtonColor: "#2d85de",
          });
          setTimeout(function(){
            location.reload()
          },3000)
          getSpin.style.display = "none";
        } else {
          Swal.fire({
            icon: "info",
            text: "Unsuccessful",
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log(error));
  }
}

