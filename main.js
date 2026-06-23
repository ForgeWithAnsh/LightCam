// ---------- Elements ----------

const hue = document.getElementById("hue");
const sat = document.getElementById("sat");
const light = document.getElementById("light");
const opacity = document.getElementById("opacity");

const overlay = document.getElementById("overlay");

const sliderPanel = document.getElementById("sliderPanel");
const presetPanel = document.getElementById("presetPanel");

const showSliders = document.getElementById("showSliders");
const showPresets = document.getElementById("showPresets");
const showBoth = document.getElementById("showBoth");

const resetBtn = document.getElementById("resetBtn");

const presets = document.querySelectorAll(".preset");


// ---------- Save / Load ----------

function saveSettings() {

    localStorage.setItem("hue", hue.value);
    localStorage.setItem("sat", sat.value);
    localStorage.setItem("light", light.value);
    localStorage.setItem("opacity", opacity.value);

}

function loadSettings() {

    hue.value =
        localStorage.getItem("hue") ?? 0;

    sat.value =
        localStorage.getItem("sat") ?? 100;

    light.value =
        localStorage.getItem("light") ?? 50;

    opacity.value =
        localStorage.getItem("opacity") ?? 100;

}


// ---------- Color ----------

function updateColor() {

    overlay.style.backgroundColor =
        `hsl(${hue.value}, ${sat.value}%, ${light.value}%)`;

    overlay.style.opacity =
        opacity.value / 100;

    saveSettings();

}

hue.addEventListener("input", updateColor);
sat.addEventListener("input", updateColor);
light.addEventListener("input", updateColor);
opacity.addEventListener("input", updateColor);

loadSettings();
updateColor();


// ---------- Presets ----------

presets.forEach(button => {

    button.addEventListener("click", () => {

        hue.value = button.dataset.h;
        sat.value = button.dataset.s;
        light.value = button.dataset.l;
        opacity.value = button.dataset.o;

        presets.forEach(p =>
            p.classList.remove("active")
        );

        button.classList.add("active");

        updateColor();

    });

});


// ---------- Modes ----------

showSliders.addEventListener("click", () => {

    document.body.classList.remove("both-mode");

    sliderPanel.style.display = "block";
    presetPanel.style.display = "none";

});

showPresets.addEventListener("click", () => {

    document.body.classList.remove("both-mode");

    sliderPanel.style.display = "none";
    presetPanel.style.display = "flex";

});

showBoth.addEventListener("click", () => {

    document.body.classList.add("both-mode");

    sliderPanel.style.display = "block";
    presetPanel.style.display = "flex";

});


// ---------- Reset ----------

resetBtn.addEventListener("click", () => {

    hue.value = 0;
    sat.value = 100;
    light.value = 50;
    opacity.value = 100;

    presets.forEach(button =>
        button.classList.remove("active")
    );

    updateColor();

});


// ---------- Default Mode ----------

showBoth.click();


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
            }
            catch(error) {
                console.error(error);
            };

        };

    }
    catch(error) {

        console.error(error);

        setTimeout(
            startCamera,
            1000
        );

    }

}

startCamera();


// ---------- Capture ----------

const captureBtn =
    document.getElementById("capture");

const canvas =
    document.getElementById("canvas");

captureBtn.addEventListener("click", () => {

    if(video.videoWidth === 0){
        alert("Camera not ready");
        return;
    }

    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;

    const ctx =
        canvas.getContext("2d");

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

    const link =
        document.createElement("a");

    link.download =
        "photo.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();

});