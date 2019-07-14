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

calcstats();
printtable();

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

  statistics.totalAvgR = statistics.rep_votes / statistics.num_rep;
  statistics.totalAvgD = statistics.dem_votes / statistics.num_dem;
  statistics.totalAvgI = statistics.ind_votes / statistics.num_ind;
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
