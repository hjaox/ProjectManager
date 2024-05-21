import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./auth";

export async function uploadToFirebase(file: File | Blob, eventId: string) {
    try {
        const imageRef = ref(storage, `images/${eventId}`);

        const snapshot = await uploadBytes(imageRef, file)
        const url = await getDownloadURL(snapshot.ref);

        return url;
    } catch {
        return null;
    }
}

export async function downloadImage(eventId: string) {
    try {
        const path = `images/${eventId}`;
        const imageRef = ref(storage, path);
        const url = await getDownloadURL(imageRef);

        if (url) return url;
        return null;
    } catch {
        return null;
    }
}