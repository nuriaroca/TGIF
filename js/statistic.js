var members;

renderRemoteData();

function renderRemoteData() {

    var loader = document.getElementById("loader");
    var tableHidding = document.querySelector(".all-content");

    tableHidding.style.display = "none";

    var linkUrl;
    var senateUrl = "https://api.propublica.org/congress/v1/113/senate/members.json";
    var houseUrl = "https://api.propublica.org/congress/v1/113/house/members.json";

    if (document.URL.includes("senate")) {
        linkUrl = senateUrl;
    } else {
        linkUrl = houseUrl;
    }

    fetch(linkUrl, {
        method: "GET",
        headers: {
            'X-API-Key': '8MIEErroOmIsLiXRaTw24msRaY08vz1msuabKtbT'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    }).then(function (json) {
        // do something with json data
        members = json;
        members = members.results[0].members;

        statistics();
        pintEngaged();

        loader.style.display = "none";
        tableHidding.style.display = "";

    }).catch(function (error) {
        console.log("Request failed: " + error.message);
    });
}

function statistics() {

    var statistics = {
        numberOfDemocrats: 0,
        numberOfRepublicans: 0,
        numberOfIndependents: 0,
        democratsVotesAverage: 0
    };

    // Number of members
    statistics.numberOfDemocrats = numberOfMembers(members, "D");
    statistics.numberOfRepublicans = numberOfMembers(members, "R");
    statistics.numberOfIndependents = numberOfMembers(members, "I");

    // Average
    statistics.democratsVotesAverage = (getAverage(members, "D") / statistics.numberOfDemocrats).toFixed(2);
    statistics.republicansVotesAverage = (getAverage(members, "R") / statistics.numberOfRepublicans).toFixed(2);
    if (statistics.numberOfIndependents == 0) {
        statistics.independentsVotesAverage = 0;
    } else {
        statistics.independentsVotesAverage = (getAverage(members, "I") / statistics.numberOfIndependents).toFixed(2);
    }

    // Total Parties (Members and Average)
    statistics.totalNumberAllParties = (Number(statistics.numberOfDemocrats) + Number(statistics.numberOfRepublicans) + Number(statistics.numberOfIndependents));
    statistics.totalAverageAllParties = ((Number(statistics.democratsVotesAverage) + Number(statistics.republicansVotesAverage) + Number(statistics.independentsVotesAverage)) / 3).toFixed(2);
    console.log(statistics)
    createDataGlanceTable(statistics);

}

function numberOfMembers(members, letter) {

    var numberOfMembersByParty = 0;
    for (var i = 0; i < members.length; i++) {

        var membersParty = members[i].party;

        if (membersParty == letter) {
            numberOfMembersByParty++;
        }
    }
    for (var j = 0; j < 4; j++) {
        return numberOfMembersByParty;
    }
}

function getAverage(members, letter) {
    var average = 0;
    for (var i = 0; i < members.length; i++) {

        if (members[i].party == letter) {
            average = members[i].votes_with_party_pct + average;
        }
    }
    return average;
}

function createDataGlanceTable(statsObject) {
    var tbody = document.getElementById("glance-body");

    var trDemocrats = document.createElement("tr");
    var tdPartyD = document.createElement("td");
    var tdTotalD = document.createElement("td");
    var tdAvgD = document.createElement("td");

    var trRepublicans = document.createElement("tr");
    var tdPartyR = document.createElement("td");
    var tdTotalR = document.createElement("td");
    var tdAvgR = document.createElement("td");

    var trIndependents = document.createElement("tr");
    var tdPartyI = document.createElement("td");
    var tdTotalI = document.createElement("td");
    var tdAvgI = document.createElement("td");

    var trTotal = document.createElement("tr");
    var tdTotal = document.createElement("td");
    var tdTotalVotes = document.createElement("td");
    var tdTotalAvg = document.createElement("td");

    tdPartyD.textContent = "Democrats";
    tdTotalD.textContent = statsObject.numberOfDemocrats;
    tdAvgD.textContent = `${statsObject.democratsVotesAverage}%`;

    tdPartyR.textContent = "Republicans";
    tdTotalR.textContent = statsObject.numberOfRepublicans;
    tdAvgR.textContent = `${statsObject.republicansVotesAverage}%`;

    tdPartyI.textContent = "Independents";
    tdTotalI.textContent = statsObject.numberOfIndependents;
    tdAvgI.textContent = `${statsObject.independentsVotesAverage}%`;

    tdTotal.textContent = "Total";
    tdTotalVotes.textContent = statsObject.totalNumberAllParties;
    tdTotalAvg.textContent = `${statsObject.totalAverageAllParties}%`;

    trDemocrats.append(tdPartyD, tdTotalD, tdAvgD);
    tbody.append(trDemocrats);

    trRepublicans.append(tdPartyR, tdTotalR, tdAvgR);
    tbody.append(trRepublicans);

    trIndependents.append(tdPartyI, tdTotalI, tdAvgI);
    tbody.append(trIndependents);

    trTotal.append(tdTotal, tdTotalVotes, tdTotalAvg);
    tbody.append(trTotal);
}

function pintEngaged() {
    if (document.URL.includes("attendance")) {
        engaged(members, "missed_votes_pct", "desc", "tableBodyTop", "missed_votes");
        engaged(members, "missed_votes_pct", "asc", "tableBodyBottom", "missed_votes");
    } else {
        engaged(members, "votes_with_party_pct", "desc", "tableBodyTop", "total_votes");
        engaged(members, "votes_with_party_pct", "asc", "tableBodyBottom", "total_votes");
    }
}

function engaged(arrayOfMembers, criteria, order, tableBody, criteriaDos) {
    var sortedArray = []
    if (order == "desc") {
        sortedArray = arrayOfMembers.sort(function (a, b) {
            return b[criteria] - a[criteria]
        });
    } else {
        sortedArray = arrayOfMembers.sort(function (a, b) {
            return a[criteria] - b[criteria]
        });
    }

    newArray = [];
    console.log(sortedArray.length * 0.1, Math.round(sortedArray.length * 0.1))

    for (i = 0; i < sortedArray.length; i++) {
        console.log(sortedArray[11][criteria])
        if (i < Math.round(sortedArray.length * 0.1)) {
            newArray.push(sortedArray[i]);
            console.log(sortedArray[i][criteria], newArray[newArray.length - 1][criteria])
        } else if (sortedArray[i][criteria] == newArray[newArray.length - 1][criteria]) {
            console.log("if")
            newArray.push(sortedArray[i]);

        } else {
            break;
        }
    }
    console.log(newArray);
    createTableEngage(newArray, tableBody, criteria, criteriaDos);
}

function createTableEngage(members, tableBody, criteria, criteriaDos) {

    var tbody = document.getElementById(tableBody)

    for (i = 0; i < members.length; i++) {

        var tr = document.createElement("tr");
        var tdName = document.createElement("td");
        var tdMissedNumber = document.createElement("td");
        var tdMissedPct = document.createElement("td");

        var lastName = members[i].last_name;
        var firstName = members[i].first_name;
        var middleName = members[i].middle_name;
        if (middleName == null) {
            middleName = "";
        }
        var completedName = `${lastName}, ${firstName} ${middleName}`;
        var missedNumber = members[i][criteriaDos];
        var missedPct = members[i][criteria];

        if (members[i].url != "") {

            var membersUrl = document.createElement("a");
            membersUrl.setAttribute("href", members[i].url);
            membersUrl.setAttribute("target", "_blank");

            membersUrl.textContent = completedName;

            tdName.append(membersUrl);
        } else {
            tdName.append(completedName);
        }

        tdMissedNumber.textContent = missedNumber;
        tdMissedPct.textContent = `${missedPct}%`;

        tr.append(tdName, tdMissedNumber, tdMissedPct)
        tbody.append(tr)
    }
}