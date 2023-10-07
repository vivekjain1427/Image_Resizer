const uploadBox = document.querySelector(".ImageUploading");
previewImg = uploadBox.querySelector("img");
fileInput = uploadBox.querySelector("input");
widthInput = document.querySelector(".Width input");
heightInput = document.querySelector(".Height input");
ratioInput = document.querySelector(".Ratio input");
downloadbtn = document.querySelector(".DownloadImage");
qualityInput = document.querySelector(".Quality");  

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
    // getting height acc to the ratio checkbox status
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener("keyup", () =>{
    // getting width acc to the ratio checkbox status
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
 