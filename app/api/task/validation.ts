import { z } from "zod";
import { zfd } from "zod-form-data";

export const taskSchema = zfd.formData({
  id: zfd.text().optional(),
  title: zfd.text(),
  description: zfd.text(),
  team: zfd.text(),
  status: zfd.text(),
  deadline: zfd.text(),
  created_by: zfd.text().optional(),
  assigned_to: zfd.text(),
  modified_at: zfd.text().nullish(),
});
