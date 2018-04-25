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
    }
   buildCard();
}

//<div class='fa fa-trash' onclick='removePlayer("+ p +")'></div> research remove

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

function removePlayer(theeElement) {
    let grandpa = $(theeElement).parent();
    $(grandpa).slideUp('1000', function () {
        //fires after slide up is done
        $(grandpa).remove();
    })
}


/*document.addEventListener("onkeyup", function () {
    let dtest = $('input[id^="p"]').val();
    console.log(dtest);
});*/

function buildCard() {
    for (let p = 1; p <= numPlayers; p++) {
        $(".left").append("<div class='playa" + p + "'><span onclick='delPlaya(" + p + ")' class='fa fa-trash'></span><span>Player" + p + "</span></div>");
        for (let h = 0; h < selcourse.data.holes.length; h++) {
            $("#c" + h).append("<input id='p" + p + "h" + h + "'type='text' class='holeinput playa" + p + "'>");
        }
        $(".boxR").append("<div id='score' class='scoreTot'></div>");
    }


}


function delPlaya(incPlayer) {
    $(".playa" + incPlayer).remove();
}





function scoreFinal() {
    var boxone = document.getElementById("p").value;
    var boxtwo = document.getElementById("h").value;
    var plyScore = runThis(boxone, boxtwo);
    document.getElementById("score").innerHTML = plyScore;
}

function runThis(value1, value2){
    console.log(value1, value2);
    return Number(value1) + Number(value2);
}
