import { RequestHandler } from "express";
import { cleanPhone } from "../utils/clean-phone";

const redirectToPhoneOverview: () => RequestHandler<
  {},
  {},
  {},
  {
    q?: string;
  }
> = () => (req, res) => {
  const { q } = req.query;
  if (!q) return res.redirect("/");
  return res.redirect(`/wpp/${cleanPhone(q)}`);
};

export default redirectToPhoneOverview;
