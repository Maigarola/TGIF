//table PAGE

// Create the general table with general information

let members = data.results[0].members;

let table_body = document.getElementById("table-body");

// tabletable(members);

//FILTROS
filter(members, "D");
filter(members, "R");
filter(members, "I");


dropdownmenu(members);

document.getElementById("R_checked").addEventListener("click", () => filter(members, "R"));
document.getElementById("D_checked").addEventListener("click", () => filter(members, "D"));
document.getElementById("I_checked").addEventListener("click", () => filter(members, "I"));
document.getElementById("State").addEventListener("change", () => filterS(members));


function filterS(lista) {

    let thestate = document.getElementById("State").value;

    console.log(thestate);

    let template = " ";

    if (thestate == "AllStates") {
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
    else {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].state == thestate) {
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


}

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
    if (m_filtrada.length == 0) {

        table_body.innerHTML = "NO CRITERIA WITH THIS FILTERS"
    }

    else { tabletable(m_filtrada) }

}

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

function dropdownmenu(lista) {

    let norepes = [];

    let newoption = document.getElementById("State");

    for (let i = 0; i < lista.length; i++) {

        if (!norepes.includes(lista[i].state)) { norepes.push(lista[i].state); }
    }

    norepes.sort();

    let template = `<option value = "AllStates">-- All States --</option>`
        ;
    for (let i = 0; i < norepes.length; i++) {
        template += `
        <option value = "${norepes[i]}">${norepes[i]}</option>
        `;
    }
    newoption.innerHTML = template;

}

