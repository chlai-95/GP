const convertImageIntoBase64 = (targetFile: any, callback: Function) => {
    let reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onload = function () {
        callback(true, reader.result)
    };
    reader.onerror = function (error) {
        callback(false, error);
    };
};

export { convertImageIntoBase64 };