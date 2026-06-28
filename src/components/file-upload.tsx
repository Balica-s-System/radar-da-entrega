"use client";

import { Loader2, Upload } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FileUpload({
  value,
  onChange,
  accept = "image/*",
  folder = "organizations",
}: {
  value?: string | null;
  onChange: (url: string) => void;
  accept?: string;
  folder?: string;
}) {
  const [preview, setPreview] = React.useState<string | null>(value ?? null);
  const [uploading, setUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("O arquivo precisa ser uma imagem.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setPreview(data.url);
      onChange(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Erro ao fazer upload da imagem.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* Preview */}
      <Avatar size="lg" className="size-20 rounded-xl">
        {preview ? (
          <AvatarImage
            src={preview}
            alt="Preview"
            className="rounded-xl object-cover"
          />
        ) : (
          <AvatarFallback className="rounded-xl bg-muted">
            <Upload className="size-6 text-muted-foreground/60" />
          </AvatarFallback>
        )}
      </Avatar>

      {/* Upload button */}
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="cursor-pointer"
        >
          {uploading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="size-4" />
              {preview ? "Alterar imagem" : "Selecionar imagem"}
            </>
          )}
        </Button>
        <p className="text-[11px] text-muted-foreground">
          PNG, JPG ou SVG. Máx. 5MB.
        </p>
        <Input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
