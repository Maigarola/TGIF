// table PAGE

// Create the general table with general information
let url = " ";

if (window.location.href.includes("senate")) {
    url = "https://api.propublica.org/congress/v1/113/senate/members.json";
}
else if (window.location.href.includes("house")) {
    url = "https://api.propublica.org/congress/v1/113/house/members.json";
}

fetch(url, {
    method: "GET",
    headers: {
        "X-API-Key": "3Ibg4YcgFB2moMyp06P8mt1DXxuN0dWlDmvayaWb"
    }
}).then(function (response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);

}).then(function (json) {

    data = json;

    let members = data.results[0].members;

    let table_body = document.getElementById("table-body");

    //FILTROS

    dropdownmenu(members);
    filter(members);
    $('#loader').addClass("hide-loader");


    document.getElementById("R_checked").addEventListener("click", () => filter(members));
    document.getElementById("D_checked").addEventListener("click", () => filter(members));
    document.getElementById("I_checked").addEventListener("click", () => filter(members));
    document.getElementById("State").addEventListener("change", () => filter(members));

    function filter(lista) {

        let thestate = document.getElementById("State").value;
        let D_checked = document.getElementById("D_checked").checked;
        let R_checked = document.getElementById("R_checked").checked;
        let I_checked = document.getElementById("I_checked").checked;

        let m_filtrada = [];

        for (let i = 0; i < lista.length; i++) {

            if ((D_checked) && ((thestate == "AllStates") || (lista[i].state == thestate)) && (lista[i].party == "D")) {
                m_filtrada.push(lista[i]);
            }
            if ((R_checked) && ((thestate == "AllStates") || (lista[i].state == thestate)) && (lista[i].party == "R")) {
                m_filtrada.push(lista[i]);
            }
            if ((I_checked) && ((thestate == "AllStates") || (lista[i].state == thestate)) && (lista[i].party == "I")) {
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

}).catch(function (error) {
    console.log("Request failed: " + error.message);
});