const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 24;

var stroke_color = "white";

// fillRect()
// ctx.fillStyle = "red";
// ctx.fillRect(20, 20, 150, 100);
// ctx.fillStyle = "blue";
// ctx.fillRect(200, 20, 150, 100);

// // strokeRect()
// ctx.lineWidth = 5;
// ctx.strokeStyle = "green";
// ctx.strokeRect(20, 150, 150, 100);

// // clearRect()
// ctx.clearRect(25, 25, 140, 90)

// // fillText()
// ctx.font = '30px Arial';
// ctx.fillText('Hello Me', 400, 50);

// // Arc
// ctx.beginPath();
// ctx.arc(200, 200, 80, 0, 2 * Math.PI);
// ctx.stroke();
// ctx.moveTo(360, 200);
// ctx.arc(300, 200, 60, 0, 2 * Math.PI);
// ctx.stroke();

window.addEventListener("load", (e) => {
    document.addEventListener("mousedown", startPainting);
    document.addEventListener("mouseup", stopPainting);
    document.addEventListener("mousemove", sketch);

    const myimg = document.querySelector("#myimage");
    console.log(myimg);

    myimg.onchange = (e) => {
        var img = new Image();
        img.onload = function () {
            const imgHeight = img.height;
            const imgWidth = img.width;
            canvas.setAttribute("width", imgWidth);
            canvas.setAttribute("height", imgHeight);
            ctx.drawImage(img, 0, 0);
            // console.log(img.height, "Height");
            // console.log(img.width, "Width")
        };
        img.src = URL.createObjectURL(e.target.files[0]);
    };

    const radioButtons = document.querySelectorAll("input[type=radio]");
    radioButtons.forEach((input) => {
        input.addEventListener("change", (e) => {
            stroke_color = e.target.value;
        });
    });

    const brushSize = document.querySelector("#brush_size");
    brushSize.addEventListener("keyup", (e) => {
        let val = e.target.value;
        if (val) {
            ctx.lineWidth = val;
        } else {
            ctx.lineWidth = 24;
        }
    });

    const downloadBtn = document.querySelector("#download_mask");
    downloadBtn.addEventListener("click", () => {
        const anchor = document.createElement("a");
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = "mask_image.png";
        anchor.click();
    });
});

let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to
// trigger drawing
let paint = false;

// Resizes the canvas to the available size of the window.
function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}

// Updates the coordianates of the cursor when
// an event e is triggered to the coordinates where
// the said event is triggered.
function getPosition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop;
}

// The following functions toggle the flag to start
// and stop drawing
function startPainting(event) {
    paint = true;
    getPosition(event);
}
function stopPainting() {
    paint = false;
}

function sketch(event) {
    if (!paint) return;
    ctx.beginPath();
    // Sets the end of the lines drawn
    // to a round shape.
    ctx.lineCap = "round";

    ctx.strokeStyle = stroke_color;

    // The cursor to start drawing
    // moves to this coordinate
    ctx.moveTo(coord.x, coord.y);

    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    getPosition(event);

    // A line is traced from start
    // coordinate to this coordinate
    ctx.lineTo(coord.x, coord.y);

    // Draws the line.
    ctx.stroke();
}
