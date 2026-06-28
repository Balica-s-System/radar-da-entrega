import { env } from "./env";

export async function uploadImage(
  file: File,
  folder: string,
): Promise<string> {
  const { createHash } = await import("node:crypto");

  const timestamp = Math.round(Date.now() / 1000);
  const str = `folder=${folder}&timestamp=${timestamp}${env.CLOUDINARY_API_SECRET}`;
  const signature = createHash("sha1").update(str).digest("hex");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  formData.append("api_key", env.CLOUDINARY_API_KEY);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Cloudinary upload failed: ${errorData}`);
  }

  const data = await response.json();
  return data.secure_url as string;
}
