"use server";

import { NewCourse } from "@/generated/models";
import { redirect } from "next/navigation";
import { CREATE_COURSE_SCHEMA } from "../validation/validation";

export async function createCourse(_prevState: any, formData: FormData) {
  const body: NewCourse = { title: "", price: 0, description: "" };

  body.title = String(formData.get("title"));
  body.price = Number(formData.get("price"));
  body.description = String(formData.get("description"));

  const validatedFields = CREATE_COURSE_SCHEMA.safeParse(body);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
    };
  }

  const raw = await fetch(`${process.env.BASE_URL}/course`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  const res: boolean = await raw.json();

  if (res) {
    redirect("/admin/courses");
  }
}
