document.addEventListener('DOMContentLoaded', function() {
const regForm = document.querySelector("#register");
const token =  localStorage.getItem('token');
// console.log(token)
regForm.addEventListener("submit", function (event) {
  // Stop the default submit and page load
  event.preventDefault();

  const name = document.querySelector("#name").value;
  const cardNumber = document.querySelector("#cardNumber").value;
  const age = document.querySelector("#age").value;
  const sex = document.querySelector("#sex").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const address = document.querySelector("#address").value;
  const maritalStatus = document.querySelector("#maritalStatus").value;
  const nextOfKin = document.querySelector("#nextOfKin").value;
  const nextOfKinNumber = document.querySelector("#nextOfKinNumber").value;
  const relationship = document.querySelector("#relationship").value;
  const bloodPressure = document.querySelector("#bloodPressure").value;
  const temperature = document.querySelector("#temperature").value;
  const pulse = document.querySelector("#pulse").value;
  const weight = document.querySelector("#weight").value;
  const urinalysis = document.querySelector("#urinalysis").value;
  const blood = document.querySelector("#blood").value;
  const bilirubin = document.querySelector("#bilirubin").value;
  const urobilinogen = document.querySelector("#urobilinogen").value;
  const ketones = document.querySelector("#ketones").value;
  const glucose = document.querySelector("#glucose").value;
  const protein = document.querySelector("#protein").value;
  const nitrite = document.querySelector("#nitrite").value;
  const leukocytes = document.querySelector("#leukocytes").value;
  const ph = document.querySelector("#ph").value;
  const specificGravity = document.querySelector("#specificGravity").value;

  const token = localStorage.getItem("token");
  console.log(token);

  // Handle validations

  axios
    .post(
      "https://zlglobalalliance.com.ng/api/create-medical-records",
      {
        name: name,
        cardnumber: cardNumber,
        age: age,
        sex: sex,
        phonenumber: phoneNumber,
        address: address,
        maritalstatus: maritalStatus,
        next_of_kin: nextOfKin,
        next_of_kin_phonenumber: nextOfKinNumber,
        relationship: relationship,
        blood_pressure: bloodPressure,
        temperature: temperature,
        pulse: pulse,
        weight: weight,
        urinanalysis: urinalysis,
        blood: blood,
        bilirubin: bilirubin,
        urobilinogen: urobilinogen,
        ketones: ketones,
        glucose: glucose,
        protein: protein,
        nitrite: nitrite,
        leukocytes: leukocytes,
        ph: ph,
        specific_gravity: specificGravity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    .then((response) => {
      console.log(response);
      alert(`Form submitted successfully`)
      //   localStorage.setItem('token', JSON.stringify(response.data.token));
      // Handle response
    });

    const inputs = document.querySelectorAll('#name, #cardNumber, #sex, #age, #phoneNumber,#address, #maritalStatus, #nextOfKin, #nextOfKinNumber, #relationship, #bloodPressure, #temperature, #pulse, #weight, #urinalysis, #blood, #bilirubin, #urobilinogen, #ketones, #glucose, #protein, #nitrite, #leukocytes, #ph, #specificGravity');

    inputs.forEach(input => {
      input.value = '';
    });




  // localStorage.setItem('userEmail', email);
  // localStorage.setItem('userPassword',password);
});
});

    //logout function
    function logout(){
        localStorage.clear()
        location.href="index.html"
    }