// //details page to get id that was passed to the url of the page
// const title = document.querySelector("#nam");
// const detailId = new URLSearchParams(window.location.search).get("id");
// const detailName = new URLSearchParams(window.location.search).get("name");
// title.textContent = detailName;

// //get token from users details
// const getToken =(details)=>{
//   const getDetails = localStorage.getItem(details);
//   const parseDetails = JSON.parse(getDetails);
//   const getToken = parseDetails.token;
//   // console.log(getToken)
//   return getToken;
// }

// //get sub category list (moved this to top (hoisting))
// function subCatList() {
//   localStorage.setItem("subcat",detailId)
//   const subcat = document.querySelector(".subcatList");

//   //get headers
//   const myheader = new Headers();
//   myheader.append("Authorization", `Bearer ${getToken("result")}`);

//   const myReq = {
//     method: "GET",
//     headers: myheader,
//   };

//   let viewAll=""
//   const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${detailId}`;
//   fetch(url, myReq)
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.length>0){
//         const allList = result.forEach((list) => {
//           viewAll +=`<div class="col-sm-12 col-md-12 col-lg-5 p-4 m-3 card">
//           <a href="details_page.html?id=${list.id}&name=${list.name}"><img src=${list.image} alt="sub-category-image" width="100%" height="250px"/></a>
//           <p class="mt-4 fw-bold fs-5">${list.name}</p>
//           <button class="btn btn-primary col-6" onclick="updateSubBtn(${list.id})">Update</button>
//           </div>`;
//         });
//       }
//       else if (result.length=== 0){
//         viewAll += "No Record Found"
//       }
//       subcat.innerHTML=viewAll
      
//     })
//     .then((error) => console.log(error));
// }
// subCatList();

// // function for register new user
// function signUp(event) {
//   event.preventDefault();

//   const getSpin = document.getElementById("spin");
//   getSpin.style.display = "inline-block";
//   let getName = document.querySelector("#name").value;
//   let getEmail = document.querySelector("#email").value;
//   let getPassword = document.querySelector("#password").value;
//   let getPasswordConfirm = document.querySelector("#confirmpassword").value;

//   // check if user wants to submit empty form
//   if (
//     getName === "" ||
//     getEmail === "" ||
//     getPassword === "" ||
//     getPasswordConfirm === ""
//   ) {
//     Swal.fire({
//       icon: "info",
//       text: "All fields are required!",
//       confirmButtonColor: "#2d85de",
//     });
//     getSpin.style.display = "none";
//   }

//   //check if password is less than 6 digits
//   if (getPassword.length < 6) {
//     Swal.fire({
//       icon: "info",
//       text: "Password is less than 6",
//       confirmButtonColor: "#2d85de",
//     });
//     getSpin.style.display = "none";
//   }

//   //check if password and confirm password match
//   else if (getPasswordConfirm !== getPassword) {
//     Swal.fire({
//       icon: "info",
//       text: `Password don't match`,
//       confirmButtonColor: "#2d85de",
//     });
//     getSpin.style.display = "none";
//   }

//   //if everything is ok
//   else {
//     const myFormData = new FormData();
//     myFormData.append("name", getName);
//     myFormData.append("email", getEmail);
//     myFormData.append("password", getPassword);
//     myFormData.append("password_confirmation", getPasswordConfirm);

//     const signReq = {
//       method: "POST",
//       body: myFormData,
//     };

//     //using fetch to call the API
//     const url = "https://pluralcodesandbox.com/yorubalearning/api/register_admin";
//     fetch(url, signReq)
//       .then((response) => response.json())
//       .then((result) => {

//         //if the registration is successful
//         if (result.status === "success") {
//           Swal.fire({
//             icon: "success",
//             text: `${result.message}`,
//             confirmButtonColor: "#2d85de",
//           });

//           setTimeout(() => {
//             location.href = "index.html";
//           }, 3000);
//         }
//         //if not successful
//         else {
//           Swal.fire({
//             icon: "warning",
//             text: "Unsuccessful!",
//             confirmButtonColor: "#2d85de",
//           });

//           getSpin.style.display = "none";
//         }
//       })
//       .catch((error) => console.log("error", error));
//   }
// }
// // function to login user
// function loginUser(event) {
//   event.preventDefault();
//   const getSpinn = document.getElementById("spinn");
//   getSpinn.style.display = "inline-block";
//   const getEmail = document.querySelector("#email").value;
//   const getPassword = document.querySelector("#password").value;

//   //check if fields are empty
//   if (getEmail === "" || getPassword === "") {
//     Swal.fire({
//       icon: "info",
//       text: "All fields must not be empty",
//       confirmButtonColor: "#2d85de",
//     });
//     getSpinn.style.display = "none";
//   }

//   //if fields are ok
//   else {
//     const myFormData = new FormData();
//     myFormData.append("email", getEmail);
//     myFormData.append("password", getPassword);

//     const loginReq = {
//       method: "POST",
//       body: myFormData,
//     };
//     const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

//     fetch(url, loginReq)
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//         localStorage.setItem("result", JSON.stringify(result));
//         const theNewItem = localStorage.getItem("result");
//         const brew = JSON.parse(theNewItem);
//         if (brew.hasOwnProperty("email")) {
//           window.location.href = "dashboard.html";
//         } else {
//           Swal.fire({
//             icon: "info",
//             text: "Unsuccessful",
//             confirmButtonColor: "#2d85de",
//           });
//           getSpinn.style.display = "none";
//         }
//       })
//       .catch((error) => console.log("error", error));
//   }
// }

// //for shrinking hamburger menu
function handleMenu() {
  const menu = document.querySelector(".second-section");
  const sideMenu = document.querySelector(".sidebar");
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

// //get sub headings for the cards
// const subHeadings = [
//   {
//     image: "bx bx-category-alt",
//     title: "Total Categories",
//     cls: "cat",
//   },
//   {
//     image: "bx bx-chalkboard",
//     title: "Learning Materials",
//     cls: "learn",
//   },
//   {
//     image: "bx bxs-dashboard",
//     title: "Total Subcategories",
//     cls: "totsub",
//   },
//   {
//     image: "bx bx-question-mark",
//     title: "Total Quiz",
//     cls: "totqz",
//   },
//   {
//     image: "bx bx-user",
//     title: "Total Students",
//     cls: "totstd",
//   },
//   {
//     title: "Top three students",
//     cls: "threestd",
//   },
// ];

// //populate the cards
// let realList = "";
// const list = subHeadings.forEach((head) => {
//   if (head.hasOwnProperty("image") && head.hasOwnProperty("title")) {
//     realList += `<div class="card px-3 border-0 my-3 my-lg-0 cbody shadow">
//       <i class="${head.image}" style="color:#b2ed53; font-size:25px;padding-top:1rem;"></i>
//       <p class="fs-5 pt-2">${head.title}</p>
//       <p class="${head.cls} fs-5"></p>
//       </div>`;
//   } else {
//     realList += `<div class="card p-3 border-0 cbody shadow">
//       <button id= "${head.cls}" class="w-100 m-auto fs-5 rounded-3 py-3 mt-2 bg-primary text-white border-0">${head.title}</button>
//       </div>`;
//   }
// });
// const getCardBox = document.querySelector(".list-card");
// getCardBox.insertAdjacentHTML("afterbegin", realList);

// // function to get dashboard api
// function getDashApi() {
//   const getModal = document.querySelector(".pagemodal");
//   getModal.style.display = "block";

//   const dashHead = new Headers();
//   dashHead.append("Authorization", `Bearer ${getToken("result")}`);

//   const dashReq = {
//     method: "GET",
//     headers: dashHead,
//   };

//   const url =
//     "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
//   fetch(url, dashReq)
//     .then((response) => response.json())
//     .then((result) => {
//       const getCat = document.querySelector(".cat");
//       const getLearn = document.querySelector(".learn");
//       const getTotsub = document.querySelector(".totsub");
//       const getTotqz = document.querySelector(".totqz");
//       const getTotstd = document.querySelector(".totstd");
//       const getAdName = document.querySelector("#nam");

//       getAdName.innerHTML = result.admin_email;
//       getCat.innerHTML = result.total_number_of_categories;
//       getTotstd.innerHTML = result.total_number_of_students;
//       getTotqz.innerHTML = result.total_number_of_quize;
//       getTotsub.innerHTML = result.total_number_of_subcategories;
//       getLearn.innerHTML = result.total_number_of_learningmaterial;

//       getModal.style.display = "none";
//     })
//     .catch((error) => console.log("error", error));
// }
// getDashApi();

// //to get top three students
// const getThree = document.querySelector("#threestd");
// function topThree() {
//   const threeModal = document.querySelector(".topmodal-container");
//   const topMod = document.querySelector(".topmodal");
//   const closebtn = document.querySelector("#close");
//   const handleClose = () => {
//     threeModal.style.display = "none";
//   };
//   closebtn.addEventListener("click", handleClose);
//   const getModal = document.querySelector(".pagemodal");
//   getModal.style.display = "block";
//   const url =
//     "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";

//   //get headers and add token
//   const tokHead = new Headers();
//   tokHead.append("Authorization", `Bearer ${getToken("result")}`);

//   //get second parameter in fetch
//   const req = {
//     method: "GET",
//     headers: tokHead,
//   };

//   // fetch API
//   fetch(url, req)
//     .then((response) => response.json())
//     .then((result) => {
//       let showThree = "";
//       result.forEach((list) => {
//         showThree += `
//         <main class="shadow-lg px-4 py-3 topcard m-4 rounded-4">
//         <p class="d-flex justify-content-between">
//         <span>Name:</span>
//         <span class="topname text-black">${list.name}</span>
//       </p>
//       <p class="d-flex justify-content-between">
//         <span>Email:</span>
//         <span class="topemail text-black">${list.email}</span>
//       </p>
//       <p class="d-flex justify-content-between">
//         <span>Phone:</span>
//         <span class="topphone text-black">${list.phone_number}</span>
//       </p>
//       <p class="d-flex justify-content-between">
//         <span>Position:</span>
//         <span class="topposition text-black">${list.position}</span>
//       </p>
//       <p class="d-flex justify-content-between">
//         <span>Score:</span>
//         <span class="topscore text-black">${list.total_score}</span>
//       </p>
//       </main>
//       `;
//       });
//       topMod.insertAdjacentHTML("beforeend", showThree);
//       threeModal.style.display = "block";
//       getModal.style.display = "none";
//     })
//     .catch((error) => console.log("error", error));
//   }
//   getThree.addEventListener("click", topThree);

// //function to populate the students table
// async function getAllStudents() {
//   const getTable = document.querySelector(".tableBody");
//   const url =
//     "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";


//   //get headers
//   const tokHead = new Headers();
//   tokHead.append("Authorization", `Bearer ${getToken("result")}`);

//   const req = {
//     method: "GET",
//     headers: tokHead,
//   };

//   const response = await fetch(url, req);
//   const data = await response.json();
//   let tableList = "";
//   const getAll = data.forEach((student) => {
//     tableList += `<tr>
//     <td class="tname">${student.name}</td>
//     <td class="temail">${student.email}</td>
//     <td class="tphnum">${student.phone_number}</td>
//     <td class="tpos">${student.position}</td>
//     <td class="tscore">${student.total_score}</td>
//   </tr>`;
//   });
//   getTable.innerHTML = tableList;
// }
// getAllStudents();

// //create category section
// function postCategory(event) {
//   event.preventDefault();

//   const getSpin = document.getElementById("spin");
//   getSpin.style.display = "inline-block";
//   const getCatName = document.querySelector("#catname").value;
//   const getCatImage = document.querySelector("#catimg").files[0];

//   //to check if fields are empty
//   if (getCatImage === "" || getCatName === "") {
//     Swal.fire({
//       icon: "info",
//       text: "All fields are required!",
//       confirmButtonColor: "#2d85de",
//     });
//     getSpin.style.display = "none";
//   } else {

//     const tokHead = new Headers();
//     tokHead.append("Authorization", `Bearer ${getToken("result")}`);

//     //get formdata
//     const myData = new FormData();
//     myData.append("name", getCatName);
//     myData.append("image", getCatImage);

//     const catReq = {
//       method: "POST",
//       headers: tokHead,
//       body: myData,
//     };

//     const url =
//       "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";

//     fetch(url, catReq)
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.status === "success") {
//           Swal.fire({
//             icon: "success",
//             text: result.message,
//             confirmButtonColor: "#2d85de",
//           });
//           setTimeout(function () {
//             location.reload();
//           }, 3000);
//           getSpin.style.display = "none";
//         } else {
//           Swal.fire({
//             icon: "info",
//             text: result.message.image,
//             confirmButtonColor: "#2d85de",
//           });
//           getSpin.style.display = "none";
//         }
//       })
//       .catch((error) => console.log(error));
//   }
// }

// //get category list
// function getCategory() {
//   url = "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";

//   const tokHead = new Headers();
//   tokHead.append("Authorization", `Bearer ${getToken("result")}`);

//   const catReq = {
//     method: "GET",
//     headers: tokHead,
//   };

//   fetch(url, catReq)
//     .then((response) => response.json())
//     .then((result) => {
//       const getCatList = document.querySelector(".cat-list");
//       let catList = "";
//       const listLoop = result.forEach((list) => {
//         catList += `<div class="card card-list-two m-auto p-4 rounded-4 border-0 shadow-lg my-4">
//           <a href="details_page.html?id=${list.id}&name=${list.name}"><img src=${list.image} alt="category-image" width="100%" /></a>
//           <p class="fw-bold py-2 fs-5">${list.name}</p>
//           <div class="d-flex w-100 btn-class justify-content-between">
//           <button class="btn btn-primary update" onclick="updateBtn(${list.id})">Update</button>
//           <button class="btn btn-danger" onclick="deleteBtn(${list.id})">Delete</button>
//           </div>
//         </div>
//           `;
//       });
//       getCatList.insertAdjacentHTML("beforeend", catList);
//       // }
//     })
//     .catch((error) => console.log(error));
// }
// getCategory();

// //update button in category page
// function updateBtn(detailId) {
//   let viewForm = document.querySelector(".modal-card-container");
//   viewForm.style.display = "block";

//   const catId = localStorage.setItem("catId", detailId);

//   //prefilling on the update category modal

//   const tokHead = new Headers();
//   tokHead.append("Authorization", `Bearer ${getToken("result")}`);

//   const getCatId = localStorage.getItem("catId");

//   const catReq = {
//     method: "GET",
//     headers: tokHead,
//   };

//   const url = `http://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${getCatId}`;

//   fetch(url, catReq)
//     .then((response) => response.json())
//     .then((result) => {
//       const catNameModal = document.querySelector("#catnamemodal");
//       const catImgModal = document.querySelector("#catimgmodal");

//       catNameModal.setAttribute("value", result.name);
//       catImgModal.setAttribute("value", result.image);
//     });
// }
// //update category function
// function updateCat(event){
//   event.preventDefault();

//   const getSpin = document.getElementById("spin");
//   getSpin.style.display = "inline-block"; 
//   const getId = localStorage.getItem("catId");
//   const getName= document.querySelector(".cat-name").value;
//   const getImg= document.querySelector(".cat-img").files[0];

//    //to check if fields are empty
//    if (getImg === "" || getName === "") {
//     Swal.fire({
//       icon: "info",
//       text: "All fields are required!",
//       confirmButtonColor: "#2d85de",
//     });
//     getSpin.style.display = "none";
//   } else {
//     const tokHead = new Headers();
//     tokHead.append("Authorization", `Bearer ${getToken("result")}`);

//     //get formdata
//     const myData = new FormData();
//     myData.append("name", getName);
//     myData.append("image", getImg);
//     // myData.append("image", getImgtwo);
//     myData.append("category_id", getId);

//     const catReq = {
//       method: "POST",
//       headers: tokHead,
//       body: myData,
//     };
//   const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";
//   fetch(url, catReq)
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.status === "success") {
//           Swal.fire({
//             icon: "success",
//             text: result.message,
//             confirmButtonColor: "#2d85de",
//           });
//           setTimeout(function () {
//             location.reload();
//           }, 3000);
//           getSpin.style.display = "none";
//         } else {
//           Swal.fire({
//             icon: "info",
//             text: "unsuccessful",
//             confirmButtonColor: "#2d85de",
//           });
//           getSpin.style.display = "none";
//         }
//       })
//       .catch((error) => console.log(error));
//   }
// }
// //change Image on update category modal
// function changeImg() {
//   const chngone = document.querySelector(".imgfileone");
//   const chngtwo = document.querySelector(".imgfiletwo");
//   chngone.style.display = "none";
//   chngtwo.style.display = "block";
// }

// //delete category button
// function deleteBtn(detailId) {
//   localStorage.setItem("getId", detailId);
//   const getId = localStorage.getItem("getId");
//   const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${getId}`;

//   //headers
//   const getHead = new Headers();
//   getHead.append("Authorization", `Bearer ${getToken("result")}`);

//   //req
//   const myReq = {
//     method: "GET",
//     headers: getHead,
//   };

//   fetch(url, myReq)
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.status === "success") {
//         Swal.fire({
//           icon: "info",
//           text: result.message,
//           confirmButtonColor: "#2d85de",
//         });
//         setTimeout(function () {
//           location.reload();
//         }, 2000);
//       } else {
//         Swal.fire({
//           icon: "info",
//           text: "Delete not successful, try again",
//           confirmButtonColor: "#2d85de",
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }


// //create sub categories
// function subCategory(event) {
//   event.preventDefault();

//   const getSpin = document.getElementById("spin");
//   getSpin.style.display = "inline-block";
//   const subName = document.querySelector("#subcatname").value;
//   const subImage = document.querySelector("#subcatimg").files[0];

//   if (subName === "" || subImage === "") {
//     Swal.fire({
//       icon: "info",
//       text: "fields must not be empty",
//       confirmButtonColor: "#2d85de",
//     });
//     getSpin.style.display = "none";
//   } else {
//     //get form data
//     const getFormdata = new FormData();
//     getFormdata.append("name", subName);
//     getFormdata.append("image", subImage);
//     getFormdata.append("category_id", detailId);

//     //get headers
//     const myHeader = new Headers();
//     myHeader.append("Authorization", `Bearer ${getToken("result")}`);

//     //set method and header
//     const myReq = {
//       method: "POST",
//       headers: myHeader,
//       body: getFormdata,
//     };
//     const url =
//       "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";
//     fetch(url, myReq)
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.status === "success") {
//           Swal.fire({
//             icon: "success",
//             text: result.message,
//             confirmButtonColor: "#2d85de",
//           });
//           setTimeout(function(){
//             location.reload()
//           },3000)
//           getSpin.style.display = "none";
//         } else {
//           Swal.fire({
//             icon: "info",
//             text: "Unsuccessful",
//             confirmButtonColor: "#2d85de",
//           });
//           getSpin.style.display = "none";
//         }
//       })
//       .catch((error) => console.log(error));
//   }
// }

// //subcategory update button
// function updateSubBtn(detailId) {
//   let viewForm = document.querySelector(".subcatmodal-container");
//   viewForm.style.display = "block";

//   const catId = localStorage.setItem("subcatId", detailId);

//   //prefilling on the update sub category modal

//   const tokHead = new Headers();
//   tokHead.append("Authorization", `Bearer ${getToken("result")}`);

//   const getCatId = localStorage.getItem("subcatId");

//   const catReq = {
//     method: "GET",
//     headers: tokHead,
//   };

//   const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?subcategory_id=${getCatId}`;

//   fetch(url, catReq)
//     .then((response) => response.json())
//     .then((result) => {
//       const catNameModal = document.querySelector("#subcat-name");
//       const catImgModal = document.querySelector("#subcat-img");

//       catNameModal.setAttribute("value", result.name);
//       catImgModal.setAttribute("value", result.image);
//     });
// }

// //update button function for subcategory
// function updateSubCat(event){
//   event.preventDefault();

//   const getSpin = document.getElementById("spin");
//   getSpin.style.display = "inline-block";
//   const subcat = localStorage.getItem("subcatId");

//   const subName = document.querySelector("#subcat-name").value;
//   const subImg = document.querySelector("#subcat-img").files[0];

//   if (subName === "" || subImg === ""){
//     Swal.fire({
//       icon:"info",
//       text:"Fields must not be empty",
//       confirmButtonColor:"#2d85de"
//     })
//     getSpin.style.display="none";
//   }
//   else {

//   //formdata
//   const formDt = new FormData()
//   formDt.append("name",subName)
//   formDt.append("image",subImg)
//   formDt.append("subcategory_id", subcat) 

//   //get headers
//   const subhead = new Headers();
//   subhead.append("Authorization", `Bearer ${getToken("result")}`)

//   //req
//   const req = {
//     method: "POST",
//     headers:subhead,
//     body: formDt
//   }

//   const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory";

//   fetch(url,req)
//   .then(response=>response.json())
//   .then(result=>{
//     if (result.status === "success"){
//       Swal.fire({
//         icon: "success",
//         text: result.message,
//         confirmButtonColor: "#2d85de"
//       })
//       setTimeout(function(){
//         location.reload()
//       },3000)
//       getSpin.style.display = "none";
//     }
//     else {
//       Swal.fire({
//         icon: "info",
//         text: "Unsuccessful",
//         confirmButtonColor: "#2d85de"
//       })
//       getSpin.style.display = "none";
//     }
//   })
//   .catch(error=>console.log(error))
// }
// }

// //logout function
// function logout(){
//   localStorage.clear()
//   location.href="index.html"
// }

// //create learning materials button modal
// function createBtn(modal){
//   const learnBtn = document.querySelector(modal);
//   learnBtn.style.display = "block";
//   const closebtn = document.querySelectorAll(".close");
//   const closebtn2 = document.querySelector("#close");
//   const handleClose = () => {
//     learnBtn.style.display = "none";
//   };
//   closebtn.forEach(btn=>btn.addEventListener("click", handleClose));
//   closebtn2.addEventListener("click", handleClose);
// }

// //form modals in create materials
// function openmoddef(event){
//   event.preventDefault();
//   const defmod = document.querySelector(".moddef")
//   const readmod = document.querySelector(".modread")
//   const conmod = document.querySelector(".modcon")

//   defmod.style.display = "block";
//   readmod.style.display = "none";
//   conmod.style.display = "none";
// }

// function openmodread(event){
//   event.preventDefault();
//   const defmod = document.querySelector(".moddef")
//   const readmod = document.querySelector(".modread")
//   const conmod = document.querySelector(".modcon")

//   defmod.style.display = "none";
//   readmod.style.display = "block";
//   conmod.style.display = "none";
// }

// function openmodcon(event){
//   event.preventDefault();
//   const defmod = document.querySelector(".moddef")
//   const readmod = document.querySelector(".modread")
//   const conmod = document.querySelector(".modcon")

//   defmod.style.display = "none";
//   readmod.style.display = "none";
//   conmod.style.display = "block";
// }

const loginForm = document.querySelector("#login");

loginForm.addEventListener("submit", function (event) {
  // Stop the default submit and page load
  event.preventDefault();

  

  // localStorage.setItem('userEmail', email);
  // localStorage.setItem('userPassword',password);
});

function auth(event) {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  // Handle validations

  if(!email || !password){
    alert(`Provide Email And password`)
  return;
  }
  
  // Set Loading state to true
  axios
    .post("https://zlglobalalliance.com.ng/api/login-admin", {
      email: email,
      password: password
    })
    .then((response) => {
      console.log(response);

      localStorage.setItem("token", response.data.token);
      // Handle response

       // Set Loading state to false
      if (response.data.token) {
        window.location.replace("./dashboard.html");
      } else {
        alert("Invalid information");
        return;
      }
    })
    .catch(err=>{
      console.log(err)
      })
    ;

  
}








