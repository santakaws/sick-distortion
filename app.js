import * as distortions from "distortions";

let image = document.getElementById('img');
let canvas = document.getElementById('img_canvas');
let cv_cont;
let dist_button = document.getElementById('distort_button');
let dload_button = document.getElementById('download_button');

function uploadImage(event) {
    console.log('In uploadImage() function');
    dload_button.disabled = true;
    //dist_button.disabled = false;
    image.src = URL.createObjectURL(event.target.files[0]);
    
    image.onload = function () {
        console.log('In image.onload function');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        canvas.crossOrigin = 'anonymous';
        cv_cont = canvas.getContext('2d');
        cv_cont.drawImage(image, 0 , 0, image.naturalWidth, image.naturalHeight);
        //canvas.toBlob(resolve, 'image/jpeg')
        console.log(image.naturalWidth + "x" + image.naturalHeight);
    };
};

function downloadDistortedImage() {
    console.log('In downloadDistortedImage() function');
    var dataURL = canvas.toDataURL("image/jpeg");
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = "distorted-image.jpg";
    link.click();
    console.log(link.href);
};

function distortImage() {
    console.log('In distortImage() function');
    //dist_button.disabled = true;
    cv_cont.drawImage(image, 0 , 0, image.naturalWidth, image.naturalHeight);
    const image_data = cv_cont.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
    
    distortions.circle(image_data);
    for (let i = 0; i < 8; i++) {
        distortions.bar(image_data);
    }
    for (let i = 0; i < 8; i++) {
        distortions.tvStatic(image_data);
    }
    
    cv_cont.putImageData(image_data, 0, 0);

    dload_button.disabled = false;

    console.log("distortImage() complete");
};
