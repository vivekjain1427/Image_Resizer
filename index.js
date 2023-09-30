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

const resizeAndDownload = ()=>{
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");
    // if quality checkbox is checked, pass 0.7 to imgquality wlse pass 1.0
    // 1.0 is 100% quality where 0.7 is 70% of total you can pass from 0.1-1.0
    const imgQuality =qualityInput.checked ? 0.7:1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // drawing user selected image onto the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    
    a.href = canvas.toDataURL("image/jpeg" , imgQuality);
    a.download = new Date().getTime(); // passing current time as download value
    a.click(); // clicking <a> element so the file download 
}

downloadbtn.addEventListener("click",resizeAndDownload)
fileInput.addEventListener("change",loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
 