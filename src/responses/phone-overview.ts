import { Ban, Warning } from "../entities";

export const phoneOverviewResponse = (
  phone: string,
  warnings: Warning[],
  bans: Ban[]
) => {
  return JSON.stringify({ phone, warnings, bans });
};
