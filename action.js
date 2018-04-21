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
            "<div class='yds'>" + mycourse[i].teeBoxes[teeindex].yards +"</div>" +
            //add par and hcp here
            "</div>");
    }
   buildCard();
}

function buildCard() {
    for(let p = 1; p <= numPlayers; p++) {
        $(".left").append("<div>player" + p + "</div>");
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