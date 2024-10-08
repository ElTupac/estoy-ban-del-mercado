import { Ban, Warning } from "../entities";

export const phoneOverviewResponse = (
  phone: string,
  warnings: Warning[],
  bans: Ban[]
) => {
  const title = `<h1><a href="/wpp/${phone}">${phone}</a></h1>`;

  const activeWarnings = warnings.filter(
    ({ expire_date }) => new Date().getTime() < new Date(expire_date).getTime()
  );
  const activeWarningsSection = activeWarnings.length
    ? `
        <section>
            <h3>Warnings activos</h3>
            <ul>
                ${activeWarnings.map(
                  ({ reason, expire_date }) =>
                    `<li>${reason} (Vencimiento: ${new Intl.DateTimeFormat(
                      "es"
                    ).format(new Date(expire_date))})</li>`
                )}
            </ul>
        </section>
    `
    : "";

  const activeBans = bans.filter(
    ({ expire_date }) => new Date().getTime() < new Date(expire_date).getTime()
  );
  const activeBansSection = activeBans.length
    ? `
        <section>
            <h3>Bans activos</h3>
            <ul>
                ${activeBans.map(
                  ({ reason, expire_date }) =>
                    `<li>${reason} (Vencimiento: ${new Intl.DateTimeFormat(
                      "es"
                    ).format(new Date(expire_date))})</li>`
                )}
            </ul>
        </section>
    `
    : "";

  const wholeEntries = [
    ...bans
      .map((ban) => ({ ...ban, type: "ban" }))
      .filter(({ id }) => !activeBans.some((activeBan) => activeBan.id === id)),
    ...warnings
      .map((warning) => ({ ...warning, type: "warning" }))
      .filter(
        ({ id }) =>
          !activeWarnings.some((activeWarning) => activeWarning.id === id)
      ),
  ];
  const wholeLog = wholeEntries.length
    ? `
        <section>
            <h3>Historico</h3>
            <ul>
                ${wholeEntries
                  .sort((a, b) => {
                    const aDate = new Date(a.expire_date).getTime();
                    const bDate = new Date(b.expire_date).getTime();
                    if (aDate > bDate) return 1;
                    if (aDate < bDate) return -1;
                    return 0;
                  })
                  .map(
                    ({ reason, expire_date, type }) =>
                      `<li>${type}: ${reason} (Vencimiento: ${new Intl.DateTimeFormat(
                        "es"
                      ).format(new Date(expire_date))})</li>`
                  )}
            </ul>
        </section>
    `
    : "";

  return `
    <style>
        section {
            margin-top: 1rem;
        }
    </style>
    ${title}
    ${activeBansSection}
    ${activeWarningsSection}
    ${wholeLog}
  `;
};
