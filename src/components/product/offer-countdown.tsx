import { ofertaTerminaEmTimestamp } from "@/utils/product-price";

function doisDigitos(valor: number) {
  return String(valor).padStart(2, "0");
}

export function OfferCountdown({
  ofertaTerminaEm,
  agora,
  variant = "card",
  className = "",
}: {
  ofertaTerminaEm?: string | null;
  agora: number;
  variant?: "card" | "detail";
  className?: string;
}) {
  const terminaEm = ofertaTerminaEmTimestamp(ofertaTerminaEm);
  if (terminaEm === null || agora <= 0 || agora >= terminaEm) return null;

  const segundosTotais = Math.ceil((terminaEm - agora) / 1000);
  const dias = Math.floor(segundosTotais / 86400);
  const horas = Math.floor((segundosTotais % 86400) / 3600);
  const minutos = Math.floor((segundosTotais % 3600) / 60);
  const segundos = segundosTotais % 60;

  const partes = [
    ...(dias > 0 ? [`${doisDigitos(dias)}d`] : []),
    ...(dias > 0 || horas > 0 ? [`${doisDigitos(horas)}h`] : []),
    `${doisDigitos(minutos)}m`,
    `${doisDigitos(segundos)}s`,
  ];
  const contagem = partes.join(" ");

  return (
    <div
      className={`offer-countdown offer-countdown--${variant} ${className}`}
      role="timer"
      aria-label={`Oferta termina em ${contagem}`}
    >
      {variant === "detail" && (
        <p className="offer-countdown__eyebrow">Oferta por tempo limitado</p>
      )}
      <div className="offer-countdown__time-row">
        <span>Termina em</span>
        <time dateTime={new Date(terminaEm).toISOString()}>{contagem}</time>
      </div>
    </div>
  );
}
