//table PAGE

// Create the general table with general information

let members = data.results[0].members;

let table_body = document.getElementById("table-body");

tabletable(members);

function tabletable(lista) {

    let template = " ";

    for (let i = 0; i < lista.length; i++) {
        template += `
      <tr>
      <td> <a href="${lista[i].url}">${lista[i].first_name} ${(lista[i].second_name || "")} ${lista[i].last_name} </a></td>
  <td> ${lista[i].party}</td>
    <td> ${lista[i].state}</td>
    <td> ${lista[i].seniority}</td>
    <td> ${lista[i].votes_with_party_pct}</td>
    </tr >
`;
        table_body.innerHTML = template;
    }

}