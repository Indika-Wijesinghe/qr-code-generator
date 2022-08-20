const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const spinner = document.getElementById("spinner");

const showSpinner = () => {
  spinner.style.display = "block";
};

const hideSpinner = () => {
  spinner.style.display = "none";
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");

  if (saveLink) {
    saveLink.remove();
  }
};

const createSaveBtn = (saveURL) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-1/3 m-auto my-5";
  link.href = saveURL;
  link.download = "qrcode";
  link.innerHTML = "Download Image";

  document.getElementById("generated").appendChild(link);
};

const generateQR = (
  url,
  size,
  primary_color = "#000000",
  secondary_color = "#ffffff"
) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark: primary_color,
    colorLight: secondary_color,
  });
};

const onGenerateSubmit = (e) => {
  e.preventDefault();
  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();
      generateQR(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
