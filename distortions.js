export function circle(image_data) {
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

export function bar(image_data) {
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

export function tvStatic(image_data) {
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
}