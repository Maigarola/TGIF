// Nº of party

let members = data.results[0].members;

let statistics = {
  num_rep: 0,
  rep_votes: 0,
  num_dem: 0,
  dem_votes: 0,
  num_ind: 0,
  ind_votes: 0
};

let per = members.length / 10;
let m_ordenvotes = members.sort(function (a, b) { return (a.missed_votes - b.missed_votes) })

calcstats();
printtable();
mostengaged();

function calcstats() {
  members.forEach(member => {
    if (member.party == "R") {
      statistics.num_rep++;
      statistics.rep_votes += member.votes_with_party_pct;
    }
    if (member.party == "D") {
      statistics.num_dem++;
      statistics.dem_votes += member.votes_with_party_pct;
    }
    if (member.party == "I") {
      statistics.num_ind++;
      statistics.ind_votes += member.votes_with_party_pct;
    }
  });

  if (statistics.num_rep == 0) {
    statistics.totalAvgR = 0
  }
  else {
    statistics.totalAvgR = statistics.rep_votes / statistics.num_rep;
  }
  if (statistics.num_dem == 0) {
    statistics.totalAvgD = 0
  }
  else {
    statistics.totalAvgD = statistics.dem_votes / statistics.num_dem;
  }
  if (statistics.num_ind == 0) {
    statistics.totalAvgI = 0
  }
  else {
    statistics.totalAvgI = statistics.ind_votes / statistics.num_ind
  }



}
function printtable() {

  document.getElementById("demtot").innerHTML = statistics.num_rep;
  document.getElementById("reptot").innerHTML = statistics.num_dem;
  document.getElementById("itot").innerHTML = statistics.num_ind;
  document.getElementById("total").innerHTML =
    statistics.num_rep + statistics.num_dem + statistics.num_ind;

  document.getElementById("demvotes").innerHTML = statistics.totalAvgD.toFixed(
    2
  );
  document.getElementById("repvotes").innerHTML = statistics.totalAvgR.toFixed(
    2
  );
  document.getElementById("ivotes").innerHTML = statistics.totalAvgI.toFixed(2);
  document.getElementById("totalvotes").innerHTML =
    (statistics.totalAvgD.toFixed(2) +
      statistics.totalAvgR.toFixed(2) +
      statistics.totalAvgI.toFixed(2)) /
    3;
}
function mostengaged() {

  let tablebody = document.getElementById("tbody_most");
  let template = " ";

  for (let i = 0; i < per; i++) {

    template += `
      <tr>
        <td> <a href="${m_ordenvotes[i].url}">${m_ordenvotes[i].first_name} ${m_ordenvotes[i].second_name || ""} ${m_ordenvotes[i].last_name} </a></td>
        <td> ${m_ordenvotes[i].missed_votes}</td>
        </tr >
    `;
  }

  tablebody.innerHTML = template;
}
