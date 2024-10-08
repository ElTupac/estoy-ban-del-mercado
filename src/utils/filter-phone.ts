const phones = ["5511915796827"];

export const filterPhone: (phone: string) => boolean = (phone) =>
  phones.indexOf(phone) !== -1;
