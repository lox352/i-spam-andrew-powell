import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export async function uploadChallengePhoto(
  playerId: string,
  challengeId: string,
  file: File
): Promise<string> {
  const storageRef = ref(storage, `photos/${playerId}/${challengeId}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
