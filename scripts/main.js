//table PAGE

// Create a table with information

let members = data.results[0].members;

let table_body = document.getElementById("table-body");

function tabletable(lista) {

  for (i = 0; i < lista.length; i++) {

    let table_row = document.createElement("tr");

    //name

    let table_name = document.createElement("td");

    table_firstname = lista[i].first_name;

    if (lista[i].middle_name != null) {
      table_middlename = lista[i].middle_name;
    }
    else {
      table_middlename = "";
    }

    table_lastname = lista[i].last_name;

    table_name.textContent = table_firstname + " " + table_middlename + " " + table_lastname;

    table_row.append(table_name);

    //party

    let table_party = document.createElement("td");
    table_party.textContent = lista[i].party;
    table_row.append(table_party);

    //state

    let table_state = document.createElement("td");
    table_state.textContent = lista[i].state;
    table_row.append(table_state);

    //years in office

    let table_senority = document.createElement("td");
    table_senority.textContent = lista[i].seniority;
    table_row.append(table_senority);

    //%Votes

    let table_total_votes = document.createElement("td");
    table_total_votes.textContent = lista[i].votes_with_party_pct;
    table_row.append(table_total_votes);

    table_body.append(table_row);

  }
}
tabletable(members);


