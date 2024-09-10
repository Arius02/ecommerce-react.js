export const imageType = [
  "image/jpeg",
  "image/png",
  "image/PNG",
  "image/JPEG",
  "image/jpg",
  "image/JPG",
  "image/WEBP",
  "image/webp",
];

export const imageSize = 5242880;

export const formatFileSize=(sizeInBytes:number) =>{
  if (sizeInBytes < 1024) {
    return sizeInBytes + " B";
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(1) + " KB";
  } else {
    return (sizeInBytes / (1024 * 1024)).toFixed(1) + " MB";
  }
}
