import {
  formatarMoeda,
  precoValido,
  temPromocaoValida,
} from "@/utils/product-price";

export function ProductPrice({
  precoOriginal,
  precoPromocional,
  temPromocao,
  size = "card",
  showBadge = false,
  className = "",
}: {
  precoOriginal?: number | null;
  precoPromocional?: number | null;
  temPromocao?: boolean;
  size?: "card" | "detail";
  showBadge?: boolean;
  className?: string;
}) {
  const promocao = temPromocaoValida({
    precoOriginal,
    precoPromocional,
    temPromocao,
  });
  const possuiOriginal = precoValido(precoOriginal);
  const destaque = size === "detail" ? "text-3xl md:text-4xl" : "text-xl";

  if (!promocao) {
    return (
      <div className={className}>
        <p className={`font-heading font-bold text-foreground ${destaque}`}>
          {formatarMoeda(precoOriginal)}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {showBadge && (
        <span className="mb-3 inline-flex rounded-full bg-health-soft px-3 py-1 text-xs font-semibold text-health">
          Preço especial
        </span>
      )}
      {possuiOriginal && (
        <p className="text-sm text-muted">
          De <s>{formatarMoeda(precoOriginal)}</s>
        </p>
      )}
      <p className={`mt-1 font-heading font-bold text-health ${destaque}`}>
        {possuiOriginal && (
          <span className="mr-1 text-sm font-semibold text-foreground">
            Por
          </span>
        )}
        {formatarMoeda(precoPromocional)}
      </p>
    </div>
  );
}
