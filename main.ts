console.log("Script active.");
setInterval(intervalFunction, 500);
windowHandler();

var white = true;

var audio = new Audio('assets/you_are_an_idiot_sound.mp3');
var startPlayPromise = audio.play();

audio.onended = function () {
    audio.currentTime = 0;
    audio.play();
};

const movingSpeed = 2;

if (startPlayPromise !== undefined) {
    startPlayPromise.then(() => {
    }).catch(error => {
        if (error.name === "NotAllowedError") {
            // alert("Auto play is disabled, please enable, for an authentic experience.");
        }
    });
}

function turnBlack() {
    var heading = document.getElementById("heading");
    if (heading != null) {
        heading.style.color = "white";
    }
    var backgroundDiv = document.getElementById("backgroundDiv");
    if (backgroundDiv != null) {
        backgroundDiv.style.backgroundColor = "black";
    }
    var allDiv = document.getElementById("allDiv");
    if (allDiv != null) {
        allDiv.style.backgroundColor = "white";
    }
    for (let idx = 1; idx <= 3; idx++) {
        var icon = document.getElementById("icon" + idx);
        if (icon != null) {
            icon.style.color = "white";
        }
    }

}

function turnWhite() {
    var heading = document.getElementById("heading");

    if (heading != null) {
        heading.style.color = "black";
    }
    var backgroundDiv = document.getElementById("backgroundDiv");
    if (backgroundDiv != null) {
        backgroundDiv.style.backgroundColor = "white";
    }

    var allDiv = document.getElementById("allDiv");
    if (allDiv != null) {
        allDiv.style.backgroundColor = "black";
    }

    for (let idx = 1; idx <= 3; idx++) {
        var icon = document.getElementById("icon" + idx);
        if (icon != null) {
            icon.style.color = "black";
        }
    }
}

function intervalFunction() {

    if (white) {
        turnBlack();
        white = false;
    } else {
        turnWhite();
        white = true;
    }
}

function windowHandler() {
    window.onbeforeunload = windowNotCloser;
    window.onclose = windowNotCloser;
    if (window.opener != window) {
        setTimeout(mover, 0);
    }
}

function windowNotCloser() {
    for (var i = 0; i < 6; i++) {
        var prom = openNewWindow();
        prom.then(function (new_window) {
            new_window.postMessage({
                "toOpen": 8,
            }, "newWindow");
        });
    }
}

async function openNewWindow(): Promise<Window | null> {
    var left = Math.floor(Math.random() * window.screen.availWidth) + 1;
    var top = Math.floor(Math.random() * window.screen.availHeight) + 1;
    var new_window: Window | null = window.open("http://" + window.location.host, undefined, 'width=' + 400 + ', height=' + 300 + ', location=no, menubar=no, status=no, toolbar=no, left=' + left + ', top=' + top);
    return new_window;
}

function mover() {
    var x = Math.floor(Math.random()) + 1;
    var y = Math.floor(Math.random()) + 1;
    setInterval(function () {
        window.moveBy(x * movingSpeed, y * movingSpeed);
        if (window.screenX === 0) {
            x = Math.floor(Math.random()) + 1;
        } else if (window.screenX + window.outerWidth >= window.screen.availWidth) {
            x = Math.floor(Math.random() * -1) - 1;
        } else if (window.screenY + window.outerHeight >= window.screen.availHeight) {
            y = Math.floor(Math.random() * -1) - 1;
        } else if (window.screenY <= window.screen.height - window.screen.availHeight) {
            y = Math.floor(Math.random() * 1) + 1;
        }
    }, 1);
}