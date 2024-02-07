let image = document.getElementById('img');
let canvas = document.getElementById('img_canvas');
let cv_cont;
let button = document.getElementById('distort_button')

function uploadImage(event) {
    console.log('In uploadImage() function');
    //button.disabled = false;
    image.src = URL.createObjectURL(event.target.files[0]);
    
    image.onload = function () {
        console.log('In image.onload function');
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        canvas.crossOrigin = 'anonymous';
        cv_cont = canvas.getContext('2d');
        cv_cont.drawImage(image, 0 , 0, image.naturalWidth, image.naturalHeight);
        console.log(image.naturalWidth + "x" + image.naturalHeight);
    };
};

function distortImage() {
    console.log('In distortImage() function');
    //button.disabled = true;
    cv_cont.drawImage(image, 0 , 0, image.naturalWidth, image.naturalHeight);
    const image_data = cv_cont.getImageData(0, 0, image.naturalWidth, image.naturalHeight);

    /* for (let i = 0; i < image_data.data.length; i += 4) {
        if (i % 69 == 0) {
            image_data.data[i] = Math.random() * 256;
            image_data.data[i+1] = Math.random() * 256;
            image_data.data[i+2] = Math.random() * 256;
        }
    } */
    
    /* var radius = Math.random() * (image.width/2);
    var center = [Math.random() * image.height, Math.random() * image.width];

    for (let i = 0; i < image_data.height; i++) {
        for (let j = 0; j < image_data.width; j++) {
            if ((i <= center[0] + radius && i >= center[0] - radius) && (j <= center[1] + radius && j >= center[1] - radius)) {
                console.log(i + " " + j);
                var distance = Math.sqrt(Math.pow(center[0] - i, 2) + Math.pow(center[1] - j, 2));
                if (distance <= radius) {
                    var converted = 4 * ((i*image_data.width)+j);
                    image_data.data[converted] = 255 - image_data.data[converted];
                    image_data.data[converted+1] = 255 - image_data.data[converted+1];
                    image_data.data[converted+2] = 255 - image_data.data[converted+2];
                }
            }
        }
    } */
    circle(image_data);
    for (let i = 0; i < 8; i++) {
        bar(image_data);
    }
    cv_cont.putImageData(image_data, 0, 0);

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