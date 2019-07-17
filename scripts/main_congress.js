//table PAGE

// Create the general table with general information

let members = data.results[0].members;

let table_body = document.getElementById("table-body");

// tabletable(members);

//FILTROS
filter(members,"D");
filter(members,"R");
filter(members,"I");

document.getElementById("R_checked").addEventListener("click", () => filter(members, "R"));
document.getElementById("D_checked").addEventListener("click", () => filter(members, "D"));
document.getElementById("I_checked").addEventListener("click", () => filter(members, "I"));

function filter(lista, a) {

    D_checked = document.getElementById("D_checked").checked;
    R_checked = document.getElementById("R_checked").checked;
    I_checked = document.getElementById("I_checked").checked;

    let whochecked = [];

    if (D_checked) {
        whochecked.push("D");
    }
    if (R_checked) {
        whochecked.push("R");
    }

    if (I_checked) {
        whochecked.push("I");
    }

    m_filtrada = [];

    for (let i = 0; i < lista.length; i++) {
        if (whochecked.includes(lista[i].party)) {
            m_filtrada.push(lista[i]);
        }
    }
    tabletable(m_filtrada);


    function tabletable(lista) {

        let template = " ";

        for (let i = 0; i < lista.length; i++) {
            template += `
      <tr>
      <td> <a href="${lista[i].url}">${lista[i].first_name} ${(lista[i].middle_name || "")} ${lista[i].last_name} </a></td>
      <td> ${lista[i].party}</td>
      <td> ${lista[i].state}</td>
      <td> ${lista[i].seniority}</td>
      <td> ${lista[i].votes_with_party_pct}</td>
      </tr>
       `;
            table_body.innerHTML = template;
        }
    }
}
