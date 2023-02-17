//the learning material category drop down list
function categoryDropList() {
  const getcatdp = document.querySelector(".dplist");

  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/categorylist_dropdown";

  const headreq = new Headers();
  headreq.append("Authorization", `Bearer ${getToken("result")}`);

  const dropList = {
    method: "GET",
    headers: headreq,
  };

  fetch(url, dropList)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((list) => {
        getcatdp.innerHTML += `  <div class="px-4 pb-1">
        <h4 class="parent">${list.parent_category.name}</h4>
        <p class="sub-category-${list.parent_category.id}"></p>
        <hr class="pine">
          <div>`;
        list.sub_category.forEach((category) => {
          document.querySelector(
            `.sub-category-${category.parentcategory_id}`
          ).innerHTML += `
              <p class="list-unstyled text-primary fs-5">
                <a onclick="learningMat(${category.id})">${category.name}</a>
              </p>
            `;
        });
      });
    })
    .catch((error) => console.log(error));
}
categoryDropList();

//the function to toggle button
const DropList = () => {
  const getcatdp = document.querySelector(".dplist");
  if (getcatdp.style.display === "block") {
    getcatdp.style.display = "none";
  } else {
    getcatdp.style.display = "block";
  }
};
const getDropdown = document.querySelector(".catdrop");
getDropdown.addEventListener("click", DropList);

//the learning material modal
function matModal(getId) {
  localStorage.setItem("learnId", getId);
  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?material_id=${getId}`;

  //get headers
  const getHead = new Headers();
  getHead.append("Authorization", `Bearer ${getToken("result")}`);

  //request
  const req = {
    method: "GET",
    headers: getHead,
  };

  fetch(url, req)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.type === "default") {
        createBtn(".learnmodal-container-update");
        const getName = document.querySelector(".defname");
        getName.setAttribute("value", result.title);
      } else if (result.type === "reading") {
        createBtn(".learnmodal-container-update-read");
        const english = document.querySelector(".engread");
        const yoruba = document.querySelector(".youread");
        english.setAttribute("value", result.reading_word_in_english);
        yoruba.setAttribute("value", result.reading_word_in_yoruba);
      } else {
        createBtn(".learnmodal-container-update-con");
        const englishqst = document.querySelector(".engqst");
        const yorubaqst = document.querySelector(".youqst");
        const englishans = document.querySelector(".engans");
        const yorubaans = document.querySelector(".youans");
        englishqst.setAttribute("value", result.conversation_english_question);
        yorubaqst.setAttribute("value", result.conversation_yoruba_question);
        englishans.setAttribute("value", result.conversation_english_answer);
        yorubaans.setAttribute("value", result.conversation_yoruba_answer);
      }
    })
    .catch((error) => console.log(error));
}

//to get the list of materials created in each type
let globalId = "";
function learningMat(matid) {
  globalId = matid;
  localStorage.setItem("subcatmat", globalId);
  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/list_all_learning_materials?subcategory_id=${matid}`;

  //get headers
  const getHead = new Headers();
  getHead.append("Authorization", `Bearer ${getToken("result")}`);

  //request
  const req = {
    method: "GET",
    headers: getHead,
  };

  fetch(url, req)
    .then((response) => response.json())
    .then((result) => {
      const getDiv = document.querySelector(".learnsec");
      console.log(result);
      let showCard = "";
      result.forEach((result) => {
        //default cards
        if (result.type === "default") {
          showCard += `<div class="showlearncard shadow-lg">
          <img src= "${result.image_file}" width="100%"/>
          <p>${result.title}</p>
          <audio controls>
            <source src="${result.audio}" type="audio">
          </audio>
            <div class="gap-3 pt-3">
              <button class="btn btn-primary col-sm-12 col-md-6 col-lg-4" onclick="matModal(${result.id})">Update</button>
              <button class="btn btn-danger col-sm-12 col-md-6 col-lg-4" onclick="deleteMatButton(${result.id})">Delete</button>
            </div>
          </div>`;
        }

        //reading cards
        if (result.type === "reading") {
          showCard += `<div class="showlearncard shadow-lg">
          <img src= "${result.image_file}" width="100%"/>
          <p>${result.reading_word_in_english}</p>
          <p>${result.reading_word_in_yoruba}</p>
          <audio controls>
            <source src="${result.audio}" type="audio">
          </audio>
            <div class="gap-3 pt-3">
              <button class="btn btn-primary col-sm-12 col-md-6 col-lg-4" onclick="matModal(${result.id})">Update</button>
              <button class="btn btn-danger col-sm-12 col-md-6 col-lg-4" onclick="deleteMatButton(${result.id})">Delete</button>
            </div>
          </div>`;
        }

        //conversation cards
        if (result.type === "conversation") {
          showCard += `<div class="showlearncard shadow-lg">
          <img src= "${result.image_file}" width="100%"/>
          <p>${result.conversation_english_question}</p>
          <p>${result.conversation_yoruba_question}</p>
          <p>${result.conversation_english_answer}</p>
          <p>${result.conversation_yoruba_answer}</p>
          <audio controls>
            <source src="${result.conversation_audio_question_inyoruba}" type="audio">
          </audio>
          <audio controls>
            <source src="${result.conversation_audio_answer_inyoruba}" type="audio">
          </audio>
            <div class="gap-3 pt-3">
              <button class="btn btn-primary col-sm-12 col-md-6 col-lg-4" onclick="matModal(${result.id})">Update</button>
              <button class="btn btn-danger col-sm-12 col-md-6 col-lg-4" onclick="deleteMatButton(${result.id})">Delete</button>
            </div>
          </div>`;
        }
      });
      getDiv.innerHTML = showCard;
    })
    .catch((error) => console.log(error));
}

// create default button function
function defButton(event) {
  event.preventDefault();

  const getSpin = document.getElementById("spin");
  getSpin.style.display = "inline-block";
  const getName = document.querySelector("#defname").value;
  const getImage = document.querySelector("#defimg").files[0];
  const getAudio = document.querySelector("#defaudio").files[0];
  const subCatMaterial = localStorage.getItem("subcatmat");

  if (getName === "" || getAudio === "" || getImage === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //get form data
    const formData = new FormData();
    formData.append("title", getName);
    formData.append("image", getImage);
    formData.append("audio", getAudio);
    formData.append("subcategory_id", subCatMaterial);

    // get headers
    const head = new Headers();
    head.append("Authorization", `Bearer ${getToken("result")}`);

    // get request
    const req = {
      method: "POST",
      headers: head,
      body: formData,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_defaultlearning";

    fetch(url, req)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          Swal.fire({
            icon: "info",
            text: result.message,
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
          setTimeout(() => location.reload(), 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `"Unsuccessful: Must be of the correct file type"`,
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log(error));
  }
}

//update default create material function
function updateDefButton(event) {
  event.preventDefault();
  const getSpin = document.querySelector("#spi");
  getSpin.style.display = "inline-block";
  const getName = document.querySelector(".defname").value;
  const getImage = document.querySelector(".defimg").files[0];
  const getAudio = document.querySelector(".defaudio").files[0];
  const learningId = localStorage.getItem("learnId");

  if (getName === "" || getImage === "" || getAudio === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //headers
    const head = new Headers();
    head.append("Authorization", `Bearer ${getToken("result")}`);

    //formdata
    const getData = new FormData();
    getData.append("title", getName);
    getData.append("image", getImage);
    getData.append("audio", getAudio);
    getData.append("learning_material_id", learningId);

    //req
    const req = {
      method: "POST",
      headers: head,
      body: getData,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/update_defaultlearning";
    fetch(url, req)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: result.message,
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";

          setTimeout(() => location.reload(), 3000);
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

//reading button
function readButton(event) {
  event.preventDefault();

  const getSpin = document.getElementById("spiner");
  getSpin.style.display = "inline-block";
  const english = document.querySelector("#engread").value;
  const yoruba = document.querySelector("#youread").value;
  const getImage = document.querySelector("#readimg").files[0];
  const getAudio = document.querySelector("#readaudio").files[0];
  const subCatMaterial = localStorage.getItem("subcatmat");

  if (english === "" || yoruba === "" || getAudio === "" || getImage === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //get form data
    const formData = new FormData();
    formData.append("words_in_english", english);
    formData.append("words_in_yoruba", yoruba);
    formData.append("image", getImage);
    formData.append("audio", getAudio);
    formData.append("subcategory_id", subCatMaterial);

    // get headers
    const head = new Headers();
    head.append("Authorization", `Bearer ${getToken("result")}`);

    // get request
    const req = {
      method: "POST",
      headers: head,
      body: formData,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_readingmaterial";

    fetch(url, req)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "info",
            text: result.message,
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
          setTimeout(() => location.reload(), 3000);
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

//update read function
function updateReadButton(event) {
  event.preventDefault();

  const getSpin = document.querySelector("#spii");
  getSpin.style.display = "inline-block";
  const english = document.querySelector(".engread").value;
  const yoruba = document.querySelector(".youread").value;
  const getImage = document.querySelector(".readimg").files[0];
  const getAudio = document.querySelector(".readaudio").files[0];
  const learnMaterial = localStorage.getItem("learnId");

  if (english === "" || yoruba === "" || getAudio === "" || getImage === "") {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //get form data
    const formData = new FormData();
    formData.append("words_in_english", english);
    formData.append("words_in_yoruba", yoruba);
    formData.append("image", getImage);
    formData.append("audio", getAudio);
    formData.append("learning_material_id", learnMaterial);

    // get headers
    const head = new Headers();
    head.append("Authorization", `Bearer ${getToken("result")}`);

    // get request
    const req = {
      method: "POST",
      headers: head,
      body: formData,
    };
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/update_readingmaterial";
    fetch(url, req)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "info",
            text: result.message,
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";

          setTimeout(() => location.reload(), 3000);
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

//conversation Button
function converseButton(event) {
  event.preventDefault();

  const getSpin = document.getElementById("spinner");
  getSpin.style.display = "inline-block";
  const englishqst = document.querySelector("#engqst").value;
  const yorubaqst = document.querySelector("#youqst").value;
  const englishans = document.querySelector("#engans").value;
  const yorubaans = document.querySelector("#youans").value;
  const getAudioqst = document.querySelector("#audioqst").files[0];
  const getAudioans = document.querySelector("#audioans").files[0];
  const getImage = document.querySelector("#conimg").files[0];
  const subCatMaterial = localStorage.getItem("subcatmat");

  if (
    englishqst === "" ||
    yorubaqst === "" ||
    getAudioqst === "" ||
    englishans === "" ||
    yorubaans === "" ||
    getAudioans === "" ||
    getImage === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //get form data
    const formData = new FormData();
    formData.append("conversation_english_question", englishqst);
    formData.append("conversation_yoruba_question", yorubaqst);
    formData.append("conversation_english_answer", englishans);
    formData.append("conversation_yoruba_answer", yorubaans);
    formData.append("conversation_audio_question_inyoruba", getAudioqst);
    formData.append("conversation_audio_answer_inyoruba", getAudioans);
    formData.append("image", getImage);
    formData.append("subcategory_id", subCatMaterial);

    // get headers
    const head = new Headers();
    head.append("Authorization", `Bearer ${getToken("result")}`);

    // get request
    const req = {
      method: "POST",
      headers: head,
      body: formData,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_learningconversation";

    fetch(url, req)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "info",
            text: result.message,
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
          setTimeout(() => location.reload(), 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `"Unsuccessful"`,
            confirmButtonColor: "#2d85de",
          });
          getSpin.style.display = "none";
        }
      })
      .catch((error) => console.log(error));
  }
}

//update conversation button
function updateConverseButton(event) {
  event.preventDefault();

  const getSpin = document.querySelector("#spiii");
  getSpin.style.display = "inline-block";
  const englishqst = document.querySelector(".engqst").value;
  const yorubaqst = document.querySelector(".youqst").value;
  const englishans = document.querySelector(".engans").value;
  const yorubaans = document.querySelector(".youans").value;
  const getAudioqst = document.querySelector(".audioqst").files[0];
  const getAudioans = document.querySelector(".audioans").files[0];
  const getImage = document.querySelector(".conimg").files[0];
  const learnMaterial = localStorage.getItem("learnId");

  if (
    englishqst === "" ||
    yorubaqst === "" ||
    getAudioqst === "" ||
    englishans === "" ||
    yorubaans === "" ||
    getAudioans === "" ||
    getImage === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //get form data
    const formData = new FormData();
    formData.append("conversation_english_question", englishqst);
    formData.append("conversation_yoruba_question", yorubaqst);
    formData.append("conversation_english_answer", englishans);
    formData.append("conversation_yoruba_answer", yorubaans);
    formData.append("conversation_audio_question_inyoruba", getAudioqst);
    formData.append("conversation_audio_answer_inyoruba", getAudioans);
    formData.append("image", getImage);
    formData.append("learning_material_id", learnMaterial);

    // get headers
    const head = new Headers();
    head.append("Authorization", `Bearer ${getToken("result")}`);

    // get request
    const req = {
      method: "POST",
      headers: head,
      body: formData,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/update_learningconversation";

    fetch(url, req)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "info",
            text: result.message,
            confirmButtonColor: "#2d85de",
          });
          getSpin.forEach((spin) => (spin.style.display = "none"));

          setTimeout(() => location.reload(), 3000);
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

// delete material button
function deleteMatButton(learnid) {
  //get head
  const header = new Headers();
  header.append("Authorization", `Bearer ${getToken("result")}`);

  const req = {
    method: "GET",
    headers: header,
  };
  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_material/${learnid}`;
  fetch(url, req)
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        Swal.fire({
          icon: "info",
          text: result.message,
          confirmButtonColor: "#2d85de",
        });
        setTimeout(() => location.reload(), 3000);
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

//view checkbox form
function viewCheckForm() {
  const option = document.querySelector(".option-part");
  const chk = document.querySelector("#chk");
  chk.checked === true
    ? (option.style.display = "block")
    : (option.style.display = "none");
}

//create quiz
function quiz(event) {
  event.preventDefault();

  const getSpin = document.getElementById("spi");
  getSpin.style.display = "inline-block";
  const subcat = localStorage.getItem("subcatmat");

  const qzEng = document.querySelector(".qzEng").value;
  const qzYor = document.querySelector(".qzYor").value;
  const qzAns = document.querySelector(".qzAns").value;
  const optone = document.querySelector(".optone").value;
  const opttwo = document.querySelector(".opttwo").value;
  const optthree = document.querySelector(".optthree").value;
  const optfour = document.querySelector(".optfour").value;
  const qzImg = document.querySelector(".qzImg").files[0];

  if (
    qzEng === "" ||
    qzYor === "" ||
    qzAns === "" ||
    qzImg === "" ||
    optone === "" ||
    opttwo === "" ||
    optthree === "" ||
    optfour === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "Fields must not be empty",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    //formdata
    const formDt = new FormData();
    formDt.append("question_in_english", qzEng);
    formDt.append("question_in_yoruba", qzYor);
    formDt.append("image", qzImg);
    formDt.append("answer_in_yoruba", qzAns);
    formDt.append("options[]", optone);
    formDt.append("options[]", opttwo);
    formDt.append("options[]", optthree);
    formDt.append("options[]", optfour);
    formDt.append("subcategory_id", subcat);

    //get headers
    const subhead = new Headers();
    subhead.append("Authorization", `Bearer ${getToken("result")}`);

    //req
    const req = {
      method: "POST",
      headers: subhead,
      body: formDt,
    };

    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/admin/create_quize";

    fetch(url, req)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: "Created Successfully",
            confirmButtonColor: "#2d85de",
          });
          setTimeout(function () {
            location.reload();
          }, 3000);
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

//get quiz
function getQuiz() {
  const getContainer = document.querySelector(".quiz");
  const subcat = localStorage.getItem("subcatmat");

  //get headers
  const subhead = new Headers();
  subhead.append("Authorization", `Bearer ${getToken("result")}`);
  //req
  const req = {
    method: "GET",
    headers: subhead,
  };

  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/getcategory_quize/${subcat}`;

  fetch(url, req)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.forEach((list) => {
        getContainer.innerHTML += `<div class="showlearncard shadow-lg">
      <img src= "${list.image_file}" width="100%"/>
      <p>English Ques: ${list.question_in_english}</p>
      <p>Yoruba Ques: ${list.question_in_yoruba}</p>
      <p>Yoruba Answer: ${list.answer_in_yoruba}</p>
      <hr/>
      <p class="text-center">Options</p>
      <p>${list.options
        .map((opt) => {
          const all = `<button class="px-3 mb-2 rounded-2 btn btn-secondary">${opt}</button>`;
          return all;
        })
        .join(" ")}</p>
      <hr/>
      <div class="gap-3 pt-3">
      <button class="btn btn-primary col-sm-12 col-md-6 col-lg-4" onclick="quizModal(${
        list.id
      })">Update</button>
      <button class="btn btn-danger col-sm-12 col-md-6 col-lg-4" onclick="deleteQuizButton(${
        list.id
      })">Delete</button>
      </div>
      </div>`;
      });
    })
    .catch((error) => console.log(error));
}
getQuiz();

//  prefilling the modal
function quizModal(getId) {
  localStorage.setItem("qzId", getId);
  const getDiv = document.querySelector(".learnmodal-container");
  const getbtn = document.querySelector(".first-btn");
  const getbtntwo = document.querySelector(".second-btn");
  const closebtn = document.querySelector("#close");
  const handleClose = () => {
    getDiv.style.display = "none";
  };
  closebtn.addEventListener("click", handleClose);
  getbtn.style.display = "none";
  getbtntwo.style.display = "block";
  getDiv.style.display = "block";

  const qzEng = document.querySelector(".qzEng");
  const qzYor = document.querySelector(".qzYor");
  const qzAns = document.querySelector(".qzAns");
  const optone = document.querySelector(".optone");
  const opttwo = document.querySelector(".opttwo");
  const optthree = document.querySelector(".optthree");
  const optfour = document.querySelector(".optfour");
  const qzImg = document.querySelector(".qzImg");

  //get headers
  const subhead = new Headers();
  subhead.append("Authorization", `Bearer ${getToken("result")}`);

  //req
  const reqt = {
    method: "GET",
    headers: subhead,
  };

  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?quiz_id=${getId}`;
  fetch(url, reqt)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      qzEng.setAttribute("value", result.question_in_english);
      qzYor.setAttribute("value", result.question_in_yoruba);
      qzAns.setAttribute("value", result.answer_in_yoruba);
      optone.setAttribute("value", result.options[0]);
      opttwo.setAttribute("value", result.options[1]);
      optthree.setAttribute("value", result.options[2]);
      optfour.setAttribute("value", result.options[3]);
      qzImg.setAttribute("value", result.image);
    });
}

function updateQuiz(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spi");
  getSpin.style.display = "inline-block";
  const qzId = localStorage.getItem("qzId");

  const qzEng = document.querySelector(".qzEng").value;
  const qzYor = document.querySelector(".qzYor").value;
  const qzAns = document.querySelector(".qzAns").value;
  const optone = document.querySelector(".optone").value;
  const opttwo = document.querySelector(".opttwo").value;
  const optthree = document.querySelector(".optthree").value;
  const optfour = document.querySelector(".optfour").value;
  const qzImg = document.querySelector(".qzImg").files[0];

  if (
    qzEng === "" ||
    qzYor === "" ||
    qzAns === "" ||
    qzImg === "" ||
    optone === "" ||
    opttwo === "" ||
    optthree === "" ||
    optfour === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "Fields must not be empty",
      confirmButtonColor: "#2d85de",
    });
    getSpin.style.display = "none";
  } else {
    const formDt = new FormData();
    formDt.append("question_in_english", qzEng);
    formDt.append("question_in_yoruba", qzYor);
    formDt.append("image", qzImg);
    formDt.append("answer_in_yoruba", qzAns);
    formDt.append("options[]", optone);
    formDt.append("options[]", opttwo);
    formDt.append("options[]", optthree);
    formDt.append("options[]", optfour);
    formDt.append("quize_id", qzId);

    //get headers
    const subhead = new Headers();
    subhead.append("Authorization", `Bearer ${getToken("result")}`);

    //req
    const reqt = {
      method: "POST",
      headers: subhead,
      body: formDt,
    };

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/update_quize`;
    fetch(url, reqt)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "success") {
          Swal.fire({
            icon: "info",
            text: "Successfully Updated",
            confirmButtonColor: "#2d85de",
          });
          setTimeout(() => location.reload(), 3000);
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

function deleteQuizButton(getId) {
  //get headers
  const subhead = new Headers();
  subhead.append("Authorization", `Bearer ${getToken("result")}`);

  //req
  const reqt = {
    method: "GET",
    headers: subhead,
  };

  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_quize/${getId}`;

  fetch(url, reqt)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.status === "success") {
        Swal.fire({
          icon: "info",
          text: "Successfully Deleted",
          confirmButtonColor: "#2d85de",
        });
        setTimeout(() => location.reload(), 3000);
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

function updateAdmin(event){
  event.preventDefault();

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";
  const getName = document.querySelector(".admin-name").value;
  const getEmail = document.querySelector(".admin-email").value;

  if (getName === "" || getEmail === ""){
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de"
    })
    getSpin.style.display = "none";
  }else{
    // get headers
    const header = new Headers();
    header.append("Authorization",`Bearer ${getToken('result')}`)

    //get form data
    const formData = new FormData();
    formData.append("name",getName)
    formData.append("email",getEmail)

    //get request
    const reqt = {
      method: "POST",
      headers: header,
      body: formData
    }

    const url = 'https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_profile'

    fetch(url, reqt)
    .then(response=> response.json())
    .then(result=>{console.log(result)
    if (result.status === "success"){
      Swal.fire({
        icon: "info",
        text: `${result.message}`,
        confirmButtonColor: "#2d85de"
      })
      getSpin.style.display = "none"
    }else{
      Swal.fire({
        icon: "info",
        text: "unsuccessful",
        confirmButtonColor: "#2d85de"
      })
      getSpin.style.display = "none"
    }
  })
    .catch(error=>console.log(error))
  }
}

function updatePassword(event){
  event.preventDefault();

  const getSpin = document.querySelector(".spi");
  getSpin.style.display = "inline-block";
  const getemailUpdate = document.querySelector(".email-update").value;
  const getNewPass = document.querySelector(".new-pass").value;
  const getConfPass = document.querySelector(".confirm-pass").value;

  if (getemailUpdate === "" || getNewPass === "" || getConfPass === ""){
    Swal.fire({
      icon: "info",
      text: "All fields are required",
      confirmButtonColor: "#2d85de"
    })
    getSpin.style.display = "none";
  }else if (getNewPass !== getConfPass){
    Swal.fire({
      icon: "info",
      text: "Password does not match",
      confirmButtonColor: "#2d85de"
    })
    getSpin.style.display = "none";
  }else{
    // get headers
    const header = new Headers();
    header.append("Authorization",`Bearer ${getToken('result')}`)

    //get form data
    const formData = new FormData();
    formData.append("email",getemailUpdate)
    formData.append("password",getNewPass)
    formData.append("password_confirmation",getConfPass)

    //get request
    const reqt = {
      method: "POST",
      headers: header,
      body: formData
    }

    const url = 'https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_password'

    fetch(url, reqt)
    .then(response=> response.json())
    .then(result=>{console.log(result)
    if (result.status === "success"){
      Swal.fire({
        icon: "info",
        text: `${result.message}`,
        confirmButtonColor: "#2d85de"
      })
      getSpin.style.display = "none"
    }else{
      Swal.fire({
        icon: "info",
        text: "unsuccessful",
        confirmButtonColor: "#2d85de"
      })
      getSpin.style.display = "none"
    }
  })
    .catch(error=>console.log(error))
  }
}
