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

// const MAX_FILE_SIZE: number = 102400; // 100KB

// const validFileExtensions: { [key: string]: string[] } = {
//   image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
// };

// function isValidFileType(
//   fileName: string | null | undefined,
//   fileType: string
// ): boolean {
//   return (
//     fileName &&
//     validFileExtensions[fileType].indexOf(
//       (fileName.split(".").pop() || "").toLowerCase()
//     ) > -1
//   );
// }
export const formatFileSize=(sizeInBytes:number) =>{
  if (sizeInBytes < 1024) {
    return sizeInBytes + " B";
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(1) + " KB";
  } else {
    return (sizeInBytes / (1024 * 1024)).toFixed(1) + " MB";
  }
}
