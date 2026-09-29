"use client";

import Image from "next/image";
import { useState } from "react";
import type { Produto } from "@/data/produtos";

export function ProductImage({
  produto,
  priority = false,
  compact = false,
}: {
  produto: Produto;
  priority?: boolean;
  compact?: boolean;
}) {
  const [remoteImageFailed, setRemoteImageFailed] = useState(false);
  const imagemLocal = produto.imagem?.startsWith("/")
    ? produto.imagem
    : undefined;
  const imagemRemota = produto.imagem?.match(/^https?:\/\//)?.[0]
    ? produto.imagem
    : undefined;

  return (
    <div className={`product-image ${compact ? "product-image--compact" : ""}`}>
      {imagemLocal ? (
        <Image
          src={imagemLocal}
          alt={produto.nome}
          fill
          priority={priority}
          sizes={
            compact
              ? "(max-width: 640px) 100vw, 320px"
              : "(max-width: 768px) 100vw, 560px"
          }
          className="object-contain p-6"
        />
      ) : imagemRemota && !remoteImageFailed ? (
        // A planilha pode apontar para domínios diferentes; a imagem nativa
        // preserva esse suporte sem ampliar a lista de hosts do Next.js.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imagemRemota}
          alt={produto.nome}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-contain p-6"
          onError={() => setRemoteImageFailed(true)}
        />
      ) : (
        <div
          className="product-image__placeholder"
          role="img"
          aria-label={`Imagem ilustrativa de ${produto.nome}`}
        >
          <span className="product-image__speaker" />
          <span className="product-image__screen">
            <strong>{produto.marca ?? "RODE"}</strong>
            <small>Smartphone</small>
          </span>
          <span className="product-image__camera" />
        </div>
      )}
    </div>
  );
}
