import { RequestHandler } from "express";
import { cleanPhone } from "../utils/clean-phone";

const redirectToPhoneOverview: () => RequestHandler<
  {},
  {},
  {},
  {
    phone?: string;
  }
> = () => (req, res) => {
  const { phone } = req.query;
  if (!phone) return res.redirect("/");
  return res.redirect(`/wpp/${cleanPhone(phone)}`);
};

export default redirectToPhoneOverview;
