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
    
    circle(image_data);
    for (let i = 0; i < 8; i++) {
        bar(image_data);
    }
    for (let i = 0; i < 8; i++) {
        static(image_data);
    }
    
    cv_cont.putImageData(image_data, 0, 0);

    dload_button.disabled = false;

    console.log("distortImage() complete");
};

function circle(image_data) {
    console.log('In circle() function');

    var radius = Math.random() * (image.naturalWidth/2);
    var center = [Math.random() * image.naturalHeight, Math.random() * image.naturalWidth];

    for (let i = 0; i < image_data.height; i++) {
        for (let j = 0; j < image_data.width; j++) {
            if ((i <= center[0] + radius && i >= center[0] - radius) && (j <= center[1] + radius && j >= center[1] - radius)) {
                var distance = Math.sqrt(Math.pow(center[0] - i, 2) + Math.pow(center[1] - j, 2));
                if (distance <= radius) {
                    var converted = 4 * ((i*image_data.width)+j);
                    image_data.data[converted] = 255 - image_data.data[converted];
                    image_data.data[converted+1] = 255 - image_data.data[converted+1];
                    image_data.data[converted+2] = 255 - image_data.data[converted+2];
                }
            }
        }
    }
};

function bar(image_data) {
    console.log('In bar() function');

    var half_l = Math.ceil((Math.random() * (image.naturalWidth/2))/2);
    var half_w = Math.ceil(((Math.random() * 5) + 5)/2);
    var center = [Math.ceil(Math.random() * image.naturalHeight), Math.ceil(Math.random() * image.naturalWidth)];
    
    for (let i = center[1] - half_l; i < center[1] + half_l; i++) {
        for (let j = center[0] - half_w; j < center[0] + half_w; j++) {
            console.log(i + " " + j);
            if (i >= 0 && j >= 0 && i < image.naturalWidth && j < image.naturalHeight) {
                var converted = 4 * ((j*image_data.width)+i);
                //image_data.data[converted] = 255 - image_data.data[converted];
                //image_data.data[converted] = 0;
                //image_data.data[converted+1] = 255 - image_data.data[converted+1];
                image_data.data[converted+1] = 255;
                //image_data.data[converted+2] = 255 - image_data.data[converted+2];
                //image_data.data[converted+2] = 0;
            }
        }
    }
};

function static(image_data) {
    console.log('In static() function');

    var half_l = Math.ceil((Math.random() * (image.naturalWidth/4)));
    var half_w = Math.ceil((Math.random() * (image.naturalHeight/4)));
    var center = [Math.ceil(Math.random() * image.naturalHeight), Math.ceil(Math.random() * image.naturalWidth)];
    
    for (let i = center[1] - half_l; i < center[1] + half_l; i++) {
        for (let j = center[0] - half_w; j < center[0] + half_w; j++) {
            if (i >= 0 && j >= 0 && i < image.naturalWidth && j < image.naturalHeight) {
                if (Math.ceil(Math.random()*5) % 5 == 0) {
                    var converted = 4 * ((j*image_data.width)+i);
                    image_data.data[converted] = Math.floor(Math.random() * 256);
                    image_data.data[converted+1] = Math.floor(Math.random() * 256);
                    image_data.data[converted+2] = Math.floor(Math.random() * 256);
                }
            }
        }
    }
};