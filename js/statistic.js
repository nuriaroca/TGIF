// GLANCE

var statistics = {
    numberOfDemocrats: 0,
    numberOfRepublicans: 0,
    numberOfIndependents: 0,
    democratsVotesAverage: 0
};

var members = data.results[0].members;

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
statistics.totalNumberAllParties = getTotal()

console.log(statistics);

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


var totalNumberAllParties = 0;
var totalAverageAllParties = 0;
getTotal();

function getTotal() {
    totalNumberAllParties = (Number(statistics.numberOfDemocrats) + Number(statistics.numberOfRepublicans) + Number(statistics.numberOfIndependents));
    totalAverageAllParties = ((Number(statistics.democratsVotesAverage) + Number(statistics.republicansVotesAverage) + Number(statistics.independentsVotesAverage)) / 3).toFixed(2);

}
console.log(totalNumberAllParties);
console.log(totalAverageAllParties);


createDataGlanceTable(statistics);

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
    tdTotalVotes.textContent = totalNumberAllParties;
    tdTotalAvg.textContent = `${totalAverageAllParties}%`;

    trDemocrats.append(tdPartyD, tdTotalD, tdAvgD);
    tbody.append(trDemocrats);

    trRepublicans.append(tdPartyR, tdTotalR, tdAvgR);
    tbody.append(trRepublicans);

    trIndependents.append(tdPartyI, tdTotalI, tdAvgI);
    tbody.append(trIndependents);

    trTotal.append(tdTotal, tdTotalVotes, tdTotalAvg);
    tbody.append(trTotal);
}


// Least Engaged





engaged(members, "missed_votes_pct");

function engaged(arrayOfMembers, criteria) {

    var sortedArray = arrayOfMembers.sort(function (a, b) {
        return a[criteria] - b[criteria]
    });
    newArray = [];

    for (i = 0; i < sortedArray.length; i++) {

        if (i < sortedArray.length * 0.1) {
            newArray.push(sortedArray[i]);

        } else if (sortedArray[i] == sortedArray[i - 1]) {
            newArray.push(sortedArray[i]);

        } else {
            break;
        }
    }
    console.log(newArray);

}



function createTableEngage(array, idElement);
    var tbody = 

// Most Engaged