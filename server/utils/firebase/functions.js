const { readFile } = require("fs/promises");
const { deleteObject, getDownloadURL, listAll, ref, uploadBytes } = require("firebase/storage");

async function uploadImage(path) {
    const fileBuffer = await readFile(path);
    const fileBlob = new Blob([fileBuffer], { type: "image/jpeg" });

    try {
        const imageRef = ref(storage, `images/${eventId}`);

        const snapshot = await uploadBytes(imageRef, fileBlob);
        const url = await getDownloadURL(snapshot.ref);

        return url;
    } catch {
        console.log("Image upload failed.")
        return null;
    }
}

async function deleteAllImages() {
    try {
        const listRef = ref(storage, "images/");
        const imageList = await listAll(listRef);

        await Promise.all(imageList.items.map(image => {
            const deleteImageRef = ref(storage, image.fullPath);
            return deleteObject(deleteImageRef);
        }));
    } catch {
        console.log("Deleting existing images failed.")
    }
}

module.exports = {
    uploadImage
};