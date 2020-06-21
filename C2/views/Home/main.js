var form = document.querySelector("#patient-data");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = formDataToJSON(new FormData(form));
  addPatient(data);
  form.reset();
});
