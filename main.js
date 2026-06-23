// ---------- Color Controls ----------

const hue = document.getElementById("hue");
const sat = document.getElementById("sat");
const light = document.getElementById("light");
const opacity = document.getElementById("opacity");

const overlay = document.getElementById("overlay");

function updateColor() {

    overlay.style.backgroundColor =
        `hsl(${hue.value}, ${sat.value}%, ${light.value}%)`;

    overlay.style.opacity =
        opacity.value / 100;
}

hue.addEventListener("input", updateColor);
sat.addEventListener("input", updateColor);
light.addEventListener("input", updateColor);
opacity.addEventListener("input", updateColor);

updateColor();


// ---------- Camera ----------

const video = document.getElementById("camera");

async function startCamera() {

    try {

        const stream =
            await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "user"
                }
            });

        video.srcObject = stream;

        video.onloadedmetadata = async () => {

            try {
                await video.play();
                console.log("Camera started");
            }
            catch(err) {
                console.error("Video play error:", err);
            }

        };

    }
    catch(error) {

        console.error("Camera Error:", error);

        // Retry after 1 second
        setTimeout(startCamera, 1000);

    }

}

startCamera();


// ---------- Photo Capture ----------

const captureBtn = document.getElementById("capture");
const canvas = document.getElementById("canvas");

captureBtn.addEventListener("click", () => {

    if (video.videoWidth === 0) {
        alert("Camera is not ready yet.");
        return;
    }

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