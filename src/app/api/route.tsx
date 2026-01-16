import fs from "fs";
import path from "path";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const files = fs.readdirSync(publicDir);

  // กรองเฉพาะ .jpg .png .webp
  const images = files.filter((file) =>
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  return new Response(JSON.stringify(images), {
    headers: { "Content-Type": "application/json" },
  });
}
