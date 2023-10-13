const uploadBox = document.querySelector(".ImageUploading");
previewImg = uploadBox.querySelector("img");
fileInput = uploadBox.querySelector("input");
widthInput = document.querySelector(".Width input");
heightInput = document.querySelector(".Height input");
ratioInput = document.querySelector(".Ratio input");
downloadbtn = document.querySelector(".DownloadImage");
qualityInput = document.querySelector(".Quality"); 
saturation = document.querySelector("#saturation");
contrast = document.querySelector("#contrast");
saturationOutput = document.querySelector("#saturation-output"); 
contrastOutput = document.querySelector("#contrast-output");
fliphorizontal = document.querySelector("#flip-horizontal");
flipvertical = document.querySelector("#flip-vertical");
rotateleft = document.querySelector("#rotate-left");

let ogImageRatio;

const loadFile = (e) =>{
    const file = e.target.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", ()=>{
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
    console.log(file); 
}

widthInput.addEventListener("keyup", () =>{
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () =>{
    const Width = ratioInput.checked ? heightInput.value * ogImageRatio : heightInput.value;
    widthInput.value = Math.floor(Width);
});

const resizeAndDownload = () =>{
    const width = widthInput.value;
    const height = heightInput.value;
    const quality = qualityInput.value;
    if(!width || !height){
        alert("Please select an image first");
        return;
    };
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.filter = `saturate(${saturation.value}%) contrast(${contrast.value}%)`;
    if(previewImg.style.transform === "scaleX(-1)"){
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
    }
    if(previewImg.style.transform === "scaleY(-1)"){
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
    }
    ctx.drawImage(previewImg,0,0,width,height);
    canvas.toBlob((blob) =>{
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.download = "image.png";
        a.href = url;
        a.click();
    },"image/png",quality);
}

downloadbtn.addEventListener("click",resizeAndDownload)
fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
 
saturation.addEventListener("input", () =>{
    previewImg.style.filter = `saturate(${saturation.value}%) contrast(${contrast.value}%)`;
    saturationOutput.innerHTML = saturation.value;
});

contrast.addEventListener("input", () =>{
    previewImg.style.filter = `saturate(${saturation.value}%) contrast(${contrast.value}%)`;
    contrastOutput.innerHTML = contrast.value;
});


window.addEventListener("beforeunload", () =>{
    previewImg.src = "";
    widthInput.value = "";
    heightInput.value = "";
    saturation.value = 100;
    contrast.value = 100;
    saturationOutput.innerHTML = 100;
    contrastOutput.innerHTML = 100;
    document.querySelector(".wrapper").classList.remove("active");
});

fliphorizontal.addEventListener("click", () =>{
    if (previewImg.style.transform === "scaleX(-1)"){
        previewImg.style.transform = "scaleX(1)";
    } else {
        previewImg.style.transform = "scaleX(-1)";
    }
});

flipvertical.addEventListener("click", () =>{
    if (previewImg.style.transform === "scaleY(-1)"){
        previewImg.style.transform = "scaleY(1)";
    } else {
        previewImg.style.transform = "scaleY(-1)";
    }
});