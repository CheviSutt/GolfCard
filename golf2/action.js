let numPlayers = 4;
let allCourses;
let selcourse
loadDoc();

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            allCourses = JSON.parse(this.responseText);
            console.log(allCourses);
            for(let i =0; i < allCourses.courses.length; i++){
                $(".courseDropdown").append("<option value='" + allCourses.courses[i].id +"'>" +
                    allCourses.courses[i].name +"</option>");
            }
         }
    };

    xhttp.open("GET", "https://uxcobra.com/golfapi/courses.txt", true);
    xhttp.send();
}

function getCourse(courseid) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            selcourse = JSON.parse(this.responseText);
            console.log(selcourse);
            let holeonetees = selcourse.data.holes[0].teeBoxes;
            for (let i = 0; i < holeonetees.length; i++) {
                $(".teeDropdown").append("<option value='" + i + "'>" + holeonetees[i].teeType + "</option>");
            }
        }
    };
    xhttp.open("GET", "https://uxcobra.com/golfapi/course"+ courseid +".txt", true);
    xhttp.send();
}

function setTee(teeindex) {
    $(".right").html("");

    let mycourse = selcourse.data.holes;
    for (let i = 0; i < mycourse.length; i++) {
        $(".right").append("<div class='column' id='c"+ i +"'>" +
            "<div class='cheader'>" + (i + 1) + "</div>" +
            "<div class='yds'>Yrds:" + mycourse[i].teeBoxes[teeindex].yards + "</div>" +
            "<div class='par'>Par:" + mycourse[i].teeBoxes[teeindex].par + "</div>"  +
            "<div class='hcp'>HCP:" + mycourse[i].teeBoxes[teeindex].hcp + "</div>"  +
            "</div>");
    }
   buildCard();
}

function buildCard() {
    for(let p = 1; p <= numPlayers; p++){
        $(".left").append("<div>Player" + p + "</div>");//Original Code
        //(".left").append("<div>Player" + p + "</div>").get(0).contentEditable = true; //original code w editable added
        //$(".left").append("<div><div class='player' id='pName'>Player" + p + "</div></div>");
        //$(".player").get(0).contentEditable = "true"; //not so working edit
        //$(".left").append("<input type='text' class='player'>" + p + "</in>");
        // $(".player").get(0).contentEditable = "true";
        //$(".left").append("<div class='player'>player" + p + "</div><button onclick='player()'>Enter Name</button>");
        for (let h = 0; h < selcourse.data.holes.length; h++) {
        $("#c" + h).append("<input id='p"+ p +"h" + h +"'type='text' class='holeinput'>");
        }
    }
}


/*function createCard() {
    for(let i = 0; i < course.holes.length; i++){
        $(".right").append("<div id='col"+ i +"' class='column'><div class='cheader'>"+ course.holes[i].name +"</div></div>");
    }

    fillCard();
}

function fillCard() {
    for(let p = 1; p <= numPlayers; p++){
        $(".left").append("<div class='playerlabel'>player" + p + "</div>");
        for(let h = 0; h < course.holes.length; h++){
            $("#col" + h).append("<input class='holeinput' id='p"+ p +"h"+ h +"'  type='text'>")
        }
    }
}*/