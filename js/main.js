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