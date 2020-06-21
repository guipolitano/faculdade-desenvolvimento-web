Patient = new Patient();
function addPatient({ name, address, illness, weight, height, cel }) {
  const newPatient = Patient.createPatient(name, address, illness, weight, height, cel);
  
  if (document.querySelector(".no-data")){
    document.querySelector(".no-data").parentNode.remove();
  }

  document.querySelector("#table-body").innerHTML += `
  <tr> 
    <td class="info-nome">${newPatient.name}</td>
    <td class="info-endereco">${newPatient.address}</td>
    <td class="info-telefone">${newPatient.cel}</td>
    <td class="info-peso">${newPatient.weight}</td>
    <td class="info-altura">${newPatient.height}</td>
    <td class="info-saude">${newPatient.illness}</td>
    <td><button id="deletar" onclick="deletePatient()" class="btn btn-danger">Remover</button></td>
</tr>`;
}

function deletePatient() {
  document.querySelector("#deletar").parentNode.parentNode.remove();
  const rowsCount = document.querySelectorAll("tr").length;
  if (rowsCount === 1) {
    document.querySelector("#table-body").innerHTML += `
      <tr>
        <td class="text-center no-data" colspan="7">Nenhum Paciente Cadastrado</td>
      </tr>`;
  }
}

function formDataToJSON(data) {
  var object = {};
  data.forEach((value, key) => {
    object[key] = value;
  });
  return object;
}
