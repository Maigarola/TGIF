// Nº of party
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

    let statistics = {
        num_rep: 0,
        rep_votes: 0,
        num_dem: 0,
        dem_votes: 0,
        num_ind: 0,
        ind_votes: 0
    };

    let per = Math.round(members.length / 10); //We'll use it as a index

    let m_ordenvotes = members;
    let ceros = 0;

    calcstats();
    printtable();


    document.getElementById("loader1").setAttribute("class", "hide-loader");
    document.getElementById("loader2").setAttribute("class", "hide-loader");



    if (window.location.href.includes("attendance")) {
        m_ordenvotes.sort(function (a, b) {
            return (b.missed_votes_pct - a.missed_votes_pct)
        });
        leastmostengaged(m_ordenvotes, "tbody_least");
        m_ordenvotes.sort(function (a, b) {
            return (a.missed_votes_pct - b.missed_votes_pct)
        });
        leastmostengaged(m_ordenvotes, "tbody_most");
    }
    else if (window.location.href.includes("loyalty")) {

        m_ordenvotes.sort(function (a, b) {
            return (b.votes_with_party_pct - a.votes_with_party_pct)
        });
        leastmostloyal(m_ordenvotes, "tbody_most_party");

        m_ordenvotes.sort(function (a, b) {
            return (a.votes_with_party_pct - b.votes_with_party_pct)
        });
        leastmostloyal(m_ordenvotes, "tbody_least_party");
    }


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
            ceros++;
        } else {
            statistics.totalAvgR = statistics.rep_votes / statistics.num_rep;
        }
        if (statistics.num_dem == 0) {
            statistics.totalAvgD = 0
            ceros++;
        } else {
            statistics.totalAvgD = statistics.dem_votes / statistics.num_dem;
        }
        if (statistics.num_ind == 0) {
            statistics.totalAvgI = 0
            ceros++;
        } else {
            statistics.totalAvgI = statistics.ind_votes / statistics.num_ind;
        }
    }
    function printtable() {

        document.getElementById("demtot").innerHTML = statistics.num_dem;
        document.getElementById("reptot").innerHTML = statistics.num_rep;
        document.getElementById("itot").innerHTML = statistics.num_ind;
        document.getElementById("total").innerHTML =
            statistics.num_rep + statistics.num_dem + statistics.num_ind;

        document.getElementById("demvotes").innerHTML = statistics.totalAvgD.toFixed(
            2
        ) + "%";
        document.getElementById("repvotes").innerHTML = statistics.totalAvgR.toFixed(
            2
        ) + "%";
        document.getElementById("ivotes").innerHTML = statistics.totalAvgI.toFixed(2) + "%";
        document.getElementById("totalvotes").innerHTML =
            ((statistics.totalAvgD + statistics.totalAvgR + statistics.totalAvgI) /
                (3 - ceros)).toFixed(2) + "%";
    }
    function leastmostengaged(m_ordenvotes, idhtml) {

        let tablebody = document.getElementById(idhtml);
        let template = " ";
        let perdup = per;
        for (let i = 0; i < per; i++) {
            template += `
      <tr>
      <td> <a href="${m_ordenvotes[i].url}">${m_ordenvotes[i].first_name} ${(m_ordenvotes[i].second_name || "")} ${m_ordenvotes[i].last_name} </a></td>
      <td> ${m_ordenvotes[i].missed_votes}</td>
        <td> ${m_ordenvotes[i].missed_votes_pct + "%"}</td>
      </tr>
    `;

        }
        while (m_ordenvotes[perdup - 1].missed_votes_pct == m_ordenvotes[perdup].missed_votes_pct) {
            template += `
    <tr>
      <td> <a href="${m_ordenvotes[perdup].url}">${m_ordenvotes[perdup].first_name} ${(m_ordenvotes[perdup].second_name || "")} ${m_ordenvotes[perdup].last_name} </a></td>
      <td> ${m_ordenvotes[perdup].missed_votes}</td>
      <td> ${m_ordenvotes[perdup].missed_votes_pct + "%"}</td>

      </tr >
  `;
            perdup++;
        }
        tablebody.innerHTML = template;
    }
    function leastmostloyal(m_ordenvotes, idhtml) {

        let tablebody = document.getElementById(idhtml);
        let template = " ";
        let perdup = per;
        for (let i = 0; i < per; i++) {

            template += `
      <tr>
      <td> <a href="${m_ordenvotes[i].url}">${m_ordenvotes[i].first_name} ${(m_ordenvotes[i].second_name || "")} ${m_ordenvotes[i].last_name} </a></td>
      <td> ${m_ordenvotes[i].total_votes}</td>
        <td> ${m_ordenvotes[i].votes_with_party_pct + " %"}</td>

        </tr >
    `;

        }
        while (m_ordenvotes[perdup - 1].votes_with_party_pct == m_ordenvotes[perdup].votes_with_party_pct) {
            template += `
    <tr>
      <td> <a href="${m_ordenvotes[perdup].url}">${m_ordenvotes[perdup].first_name} ${(m_ordenvotes[perdup].second_name || "")} ${m_ordenvotes[perdup].last_name} </a></td>
      <td> ${m_ordenvotes[i].total_votes}</td>
      <td> ${m_ordenvotes[i].votes_with_party_pct + " %"}</td>
      </tr >
  `;
            perdup++;
        }
        tablebody.innerHTML = template;

    }
}).catch(function (error) {
    console.log("Request failed: " + error.message);
});