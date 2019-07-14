//table PAGE

// Create the general table with general information

let members = data.results[0].members;

let table_body = document.getElementById("table-body");

function tabletable(lista) {
  lista.forEach(member => {
    let table_row = document.createElement("tr");

    table_row.insertCell().textContent =
      member.first_name +
      " " +
      (member.middle_name || "") +
      " " +
      member.last_name;
    table_row.insertCell().textContent = member.party;
    table_row.insertCell().textContent = member.state;
    table_row.insertCell().textContent = member.seniority;
    table_row.insertCell().textContent = member.votes_with_party_pct;

    table_body.append(table_row);
  });
}

tabletable(members);

function more_less() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "View less"; 
    moreText.style.display = "inline";
  }
}