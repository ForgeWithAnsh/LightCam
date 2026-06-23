// ---------- Color Controls ----------

const hue = document.getElementById("hue");
const sat = document.getElementById("sat");
const light = document.getElementById("light");

const overlay = document.getElementById("overlay");

function updateColor() {

    overlay.style.backgroundColor =
        `hsl(${hue.value}, ${sat.value}%, ${light.value}%)`;

}

hue.addEventListener("input", updateColor);
sat.addEventListener("input", updateColor);
light.addEventListener("input", updateColor);

updateColor();


// ---------- Camera ----------

const video = document.getElementById("camera");

navigator.mediaDevices.getUserMedia({
    video: {
        facingMode: "user"
    }
})
.then(stream => {

    video.srcObject = stream;

    video.onloadedmetadata = () => {
        video.play();
    };

})
.catch(error => {
    console.error("Camera Error:", error);
});


// ---------- Photo Capture ----------

const captureBtn = document.getElementById("capture");
const canvas = document.getElementById("canvas");

captureBtn.addEventListener("click", () => {

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.save();

    ctx.scale(-1, 1);

    ctx.drawImage(
        video,
        -canvas.width,
        0,
        canvas.width,
        canvas.height
    );

    ctx.restore();

    const link = document.createElement("a");

    link.download = "photo.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

});