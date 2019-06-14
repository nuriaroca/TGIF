// function resizeHeaderOnScroll() {
//     const distanceY = window.pageYOffset || document.documentElement.scrollTop,
//         shrinkOn = 100,
//         headerEl = document.getElementById('js-header');
//     if (distanceY > shrinkOn) {
//         headerEl.classList.add("smaller");
//     } else {
//         headerEl.classList.remove("smaller");
//     }
// }

// window.addEventListener('scroll', resizeHeaderOnScroll);


//TABLE SENATE-DATA

var members = data.results[0].members;

getMembersName(members);

function getMembersName(arrayOfMembers) {
    var tbody = document.getElementById("table-body");
    var error = document.getElementById("error");
    tbody.innerHTML = "";
    
    if (arrayOfMembers.length == 0) {

        error.style = "display:block"

    } else {

        error.style = "display:none"

        for (var i = 0; i < arrayOfMembers.length; i++) {
            var tr = document.createElement("tr");
            var tdName = document.createElement("td");
            var tdParty = document.createElement("td");
            var tdState = document.createElement("td");
            var tdYears = document.createElement("td");
            var tdVotes = document.createElement("td");

            var lastName = arrayOfMembers[i].last_name;
            var firstName = arrayOfMembers[i].first_name;
            var middleName = arrayOfMembers[i].middle_name;
            if (middleName == null) {
                middleName = "";
            }
            // tdName.textContent = lastName + ", " + firstName + " " +middleName;
            var completedName = `${lastName}, ${firstName} ${middleName}`;
            var party = arrayOfMembers[i].party;
            var state = arrayOfMembers[i].state;
            var years = arrayOfMembers[i].seniority;
            var votes = arrayOfMembers[i].votes_with_party_pct;

            if (members[i].url != "") {

                var membersUrl = document.createElement("a");
                membersUrl.setAttribute("href", members[i].url);
                membersUrl.setAttribute("target", "_blank");

                membersUrl.textContent = completedName;

                tdName.append(membersUrl);
            } else {
                tdName.append(completedName);
            }

            tdParty.textContent = party;
            tdState.textContent = state;
            tdYears.textContent = years;
            tdVotes.textContent = `${votes}%`;

            tr.append(tdName, tdParty, tdState, tdYears, tdVotes)
            tbody.append(tr)
        }
    }

}


// Filters

var checkboxR = document.getElementById("republican")
var checkboxD = document.getElementById("democrat")
var checkboxI = document.getElementById("independent")
var dropdown = document.getElementById("state")

checkboxR.addEventListener('click', function () {
    filter()
});
checkboxD.addEventListener('click', function () {
    filter()
});
checkboxI.addEventListener('click', function () {
    filter()
});

dropdown.addEventListener('change', function () {
    filter()
});


function filter() {
    var filteredArray = [];
    var checkbox = Array.from(document.querySelectorAll('input[type=checkbox]:checked')).map(function (cb) {
        return cb.value;
    })

    if (checkbox.length == 0) { // INDEPENDTENTS HOUSE??
        filterState(members);
    } else {
        for (i = 0; i < members.length; i++) {
            // if array cd [R,I,D] includes the value party of the members, pushhh
            if (checkbox.includes(members[i].party)) {
                filteredArray.push(members[i]);
            }

        }
        filterState(filteredArray);
    }
}

getStateName(members);

function getStateName(members) {

    var allStates = members.map(member => member.state);
    var uniqueStates = [];
    var dropdown = document.getElementById("state");

    for (i = 0; i < allStates.length; i++) {
        if (!uniqueStates.includes(allStates[i])) {
            uniqueStates.push(allStates[i]);
        }
    }
    uniqueStates.sort()

    for (j = 0; j < uniqueStates.length; j++) {

        var option = document.createElement("option");
        option.setAttribute("value", uniqueStates[j]);
        option.innerHTML = uniqueStates[j];
        dropdown.append(option);
    }
}

function filterState(members) {
    var statesArray = [];
    var dropdownValue = document.getElementById("state").value;

    if (dropdownValue == "all") {
        getMembersName(members);
    } else {
        for (i = 0; i < members.length; i++) {
            if (dropdownValue == members[i].state) {
                statesArray.push(members[i]);
            }
        }
        getMembersName(statesArray);
    }
}



// READ MORE
function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

function myFunction2() {
    var dots = document.getElementById("dots2");
    var moreText = document.getElementById("more2");
    var btnText = document.getElementById("myBtn2");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}