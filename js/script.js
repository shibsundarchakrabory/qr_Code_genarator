
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    data: "https://www.google.com",
    image: "",
    dotsOptions: {
        color: "#000000",
        type: "rounded"
    },
    backgroundOptions: {
        color: "#ffffff",
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
    }
});

window.onload = () => {
    qrCode.append(document.getElementById("qrcode"));
};

const generateBtn = document.getElementById("generate-btn");
const logoInput = document.getElementById("logo");
const fileNameSpan = document.getElementById("file-name");
const logoPreview = document.getElementById("logo-preview");

logoInput.addEventListener("change", () => {
    if (logoInput.files.length > 0) {
        fileNameSpan.textContent = logoInput.files[0].name;
        const reader = new FileReader();
        reader.onload = function(e) {
            logoPreview.src = e.target.result;
            logoPreview.style.display = "block";
        };
        reader.readAsDataURL(logoInput.files[0]);
    } else {
        fileNameSpan.textContent = "";
        logoPreview.src = "";
        logoPreview.style.display = "none";
    }
});

generateBtn.addEventListener("click", () => {
    const text = document.getElementById("text-input").value;
    const colorDark = document.getElementById("color-dark").value;
    const colorLight = document.getElementById("color-light").value;
    const logo = document.getElementById("logo").files[0];

    const updateQRCode = (imageUrl) => {
        qrCode.update({
            data: text,
            dotsOptions: {
                color: colorDark
            },
            backgroundOptions: {
                color: colorLight
            },
            image: imageUrl
        });
    };

    if (logo) {
        const reader = new FileReader();
        reader.onload = function() {
            updateQRCode(reader.result);
        };
        reader.readAsDataURL(logo);
    } else {
        updateQRCode("");
    }
});
