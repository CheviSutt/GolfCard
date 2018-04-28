let numPlayers = 4;
let allCourses;
let selcourse;
let par = 0;

loadDoc();

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            allCourses = JSON.parse(this.responseText);
            console.log(allCourses);
            for(let i = 0; i < allCourses.courses.length; i++){
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
        par += parseInt(mycourse[i].teeBoxes[teeindex].par);
        console.log(par);
    }
    $(".parBox").append("<div class='parBox'>Total:"+par+"</div>"); //Appends after score totals
    //$(".boxR").append(par);
   buildCard();
}

function buildCard() {

    for (let p = 1; p <= numPlayers; p++) {
        $(".left").append("<div class='playaFloss' id='playa" + p + "'><span onclick='delPlaya(" + p + ")' class='fa fa-trash'></span><span contenteditable='true'>Player" + p + "</span></div>");
        $(".boxR").append("<div class='scorebox scoreTot"+p+"'></div>");
        for (let h = 0; h < selcourse.data.holes.length; h++) {
            $("#c" + h).append("<input type='number' min='0' onkeyup='addScore(" + p + ")' id='p" + p + "h" + h + "'type='text' class='holeinput playa" + p + "'>");
        }
    }
}

function delPlaya(incPlayer) {
    $("#playa" + incPlayer).remove();
    $(".playa" + incPlayer).remove();
    $(".scoreTot" + incPlayer).remove();
}

function addScore(myval){
    console.log(myval);
    let numberofholes = selcourse.data.holes.length;
    let tempscore = 0;
    for(let i = 0; i < numberofholes; i++){
        let invalue = Number($("#p" + myval + "h" + i).val());
        tempscore += invalue;
    }
    if(tempscore <= par){
        console.log("good job");
        $(".scoreTot" + myval).css('background-color', '#ADFF2F');
    }
    else if (tempscore > par){
        console.log("You suck");
        $(".scoreTot" + myval).css('background-color', '#DC143C');
    }
     console.log(tempscore);
     $(".scoreTot" + myval).html(tempscore);
}

//buildCard() original functionality-code below
/*function buildCard() {
    for(let p = 1; p <= numPlayers; p++){
        $(".left").append("<div contenteditable='true' class='playa'>player" + p +
            "<div class='fa fa-trash' onclick='(this)'></div></div>"); //Original Code
        for (let h = 0; h < selcourse.data.holes.length; h++) {
            $("#c" + h).append("<input id='p"+ p +"h" + h +"'type='text' class='holeinput'>");
        }
        $(".boxR").append("<div id='score' class='scoreTot'></div>");
    }
}*/


