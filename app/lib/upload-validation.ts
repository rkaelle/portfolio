export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
export const UPLOAD_ACCEPT = 'image/jpeg,image/png,application/pdf';

export class UploadValidationError extends Error {}

// These client checks give early feedback. Storage rules must separately enforce
// size/type and access controls; client validation cannot authorize an upload.
export async function validateUpload(file: File): Promise<void> {
  if (file.size === 0) throw new UploadValidationError('Choose a non-empty file.');
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadValidationError('Each file must be 5 MB or smaller.');

  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const matches = (signature: number[]) => signature.every((byte, index) => bytes[index] === byte);
  const valid =
    (file.type === 'image/jpeg' && matches([0xff, 0xd8, 0xff])) ||
    (file.type === 'image/png' && matches([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) ||
    (file.type === 'application/pdf' && matches([0x25, 0x50, 0x44, 0x46, 0x2d]));

  if (!valid) throw new UploadValidationError('Choose a PNG, JPG, or PDF file that matches its file type.');
}
