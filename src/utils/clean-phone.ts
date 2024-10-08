export const cleanPhone: (phone: string) => string = (phone) =>
  phone.replace(/\D/g, "");
