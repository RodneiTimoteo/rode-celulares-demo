import { Button, Card, buttonStyles } from "@/components/ui";
import { storeUnits } from "@/data/units";
import { whatsappUrl } from "@/utils/whatsapp";
import { InstitutionalIcon } from "./shared";

export function UnitCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {storeUnits.map((unit, index) => (
        <Card key={unit.id} className="institutional-unit-card">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="eyebrow">Unidade {index + 1}</p>
              <h2 className="text-2xl font-bold text-brand">{unit.name}</h2>
            </div>
            <span className="category-icon shrink-0">
              <InstitutionalIcon kind="location" />
            </span>
          </div>

          <dl className="mt-8 grid gap-5 text-sm">
            <div>
              <dt className="font-semibold text-foreground">Endereço</dt>
              <dd className="mt-1 text-muted">{unit.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Horário</dt>
              <dd className="mt-1 text-muted">{unit.hours}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Atendimento</dt>
              <dd className="mt-1 text-muted">WhatsApp</dd>
            </div>
          </dl>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {unit.locationUrl ? (
              <a
                href={unit.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles("secondary")}
              >
                Ver localização
              </a>
            ) : (
              <Button disabled variant="secondary">
                Ver localização
              </Button>
            )}
            <a
              href={whatsappUrl(`Olá! Gostaria de falar com a ${unit.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles("whatsapp")}
            >
              Falar no WhatsApp
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
