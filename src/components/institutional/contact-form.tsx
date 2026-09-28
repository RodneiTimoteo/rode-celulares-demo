"use client";

import { useState } from "react";
import { Button, SectionTitle } from "@/components/ui";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <section className="ui-card">
      <SectionTitle className="text-2xl">Envie sua mensagem</SectionTitle>
      <p id="contact-note" className="mt-3 text-sm leading-relaxed text-muted">
        Formulário demonstrativo. Nenhum dado é enviado ou armazenado.
      </p>
      <form
        aria-describedby="contact-note"
        className="mt-7 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSent(true);
          event.currentTarget.reset();
        }}
        onChange={() => setSent(false)}
      >
        <div>
          <label htmlFor="contact-name" className="form-label">
            Nome
          </label>
          <input
            id="contact-name"
            name="nome"
            className="ui-input"
            autoComplete="name"
            required
            maxLength={120}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="form-label">
            Telefone
          </label>
          <input
            id="contact-phone"
            name="telefone"
            type="tel"
            className="ui-input"
            autoComplete="tel"
            maxLength={30}
            required
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="form-label">
            Assunto
          </label>
          <select
            id="contact-subject"
            name="assunto"
            className="ui-input"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione um assunto
            </option>
            <option>Consultar produto</option>
            <option>Acessórios</option>
            <option>Condições de pagamento</option>
            <option>Atendimento</option>
            <option>Outros</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" className="form-label">
            Mensagem
          </label>
          <textarea
            id="contact-message"
            name="mensagem"
            rows={5}
            className="ui-input resize-y"
            maxLength={2000}
            required
          />
        </div>
        <Button type="submit">Enviar mensagem</Button>
        <p
          role="status"
          aria-live="polite"
          className={
            sent
              ? "rounded-xl bg-health-soft p-4 text-sm font-semibold text-health"
              : "sr-only"
          }
        >
          {sent ? "Mensagem demonstrativa enviada." : ""}
        </p>
      </form>
    </section>
  );
}
