// Nº of party

let members = data.results[0].members;

function from_party(lista, p) {

  let j = 0;


  for (let i = 0; i < lista.length; i++) {

    if (lista[i].party == p) {
      j++;
    }
  }
}
function house_glance(lista) {
  from_party(members, "D");

}
from_party(members, "D");

