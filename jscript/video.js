function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function captureVideo() {
    if (hasGetUserMedia()) {
        const constraints = {
            video: true
        };
        
        const captureVideoButton = document.querySelector("#CaptureVideoButton");
        const screenshotButton = document.querySelector("#TakeScreenshotButton");
        const saveScreenshotButton = document.querySelector("#SaveScreenshotButton");
        const cssFiltersButton = document.querySelector("#ApplyCSSFiltersButton");
        const img = document.getElementById("screenshot-img");
        const video = document.querySelector("video");
        const canvas = document.createElement("canvas");
        
        
        let filterIndex = 0;
        const filters = [
            "grayscale",
            "sepia",
            "blur",
            "brightness",
            "contrast",
            "hue-rotate",
            "hue-rotate2",
            "hue-rotate3",
            "saturate",
            "invert",
            "",
        ];

        captureVideoButton.onclick = function () {
            navigator.mediaDevices
            .getUserMedia(constraints)
            .then(handleSuccess)
            .catch(handleError);
        };

        screenshotButton.onclick = video.onclick = function () {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0);
            // Other browsers will fall back to image/png
            img.src = canvas.toDataURL("image/webp");
            saveScreenshotButton.disabled = false;
        };
        
        saveScreenshotButton.onclick = function () {
            download("Screenshot in Happy Beanz.webp", canvas.toDataURL("image/webp"));
        };
        
        cssFiltersButton.onclick = video.onclick = function () {
            video.className = filters[filterIndex++ % filters.length];
        };

        function handleSuccess(stream) {
            screenshotButton.disabled = false;
            cssFiltersButton.disabled = false;
            video.srcObject = stream;
        }

        function handleError(error) {
            console.error('navigator.getUserMedia error: ', error);
        }
    } 
    else {
        //Not supported
    }
}

// Call the function
captureVideo();

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', text);
    pom.setAttribute('download', filename);
    pom.click();
}