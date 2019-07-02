
// Create a table with information

let members = data.results[0].members;

let senate_body = document.getElementById("senate-body");

function tablesenate(lista) {

  for (i = 0; i < lista.length; i++) {

    let senate_row = document.createElement("tr");




    let senate_data = document.createElement("td"); // crear uno para cada

    // senate_data.textContent = lista[i].first_name;

    senate_data.textContent = lista[i].middle_name;

    senate_row.append(senate_data);


    senate_body.append(senate_row);

  }
}
tablesenate(members);


