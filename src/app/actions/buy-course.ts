"use server";

import { redirect } from "next/navigation";
import { createHmac, randomUUID } from "node:crypto";

export const buyCourse = async (formData: FormData) => {
  "use client";

  const orderId = randomUUID();

  let raw = await fetch(`${process.env.BASE_URL}/payment`, {
    method: "POST",
    body: JSON.stringify({
      userId: formData.get("user_id"),
      courseId: formData.get("course_id"),
      orderId: orderId.toString(),
    }),
  });

  let response = await raw.json();

  if (!response.ok) {
    throw new Error("Something's wrong with the payment");
  }

  const payload = {
    amount: Number(formData.get("course_price")),
    currency: "KZT",
    order_id: orderId.toString(),
    description: `${formData.get("user_email")} buys ${formData.get("course_name")}`,
    payment_type: "pay",
    payment_method: "ecom",
    items: [
      {
        merchant_id: process.env.OV_MID,
        service_id: process.env.OV_SID,
        merchant_name: "KazUSA Platform",
        name: formData.get("course_name"),
        quantity: 1,
        amount_one_pcs: Number(formData.get("course_price")),
        amount_sum: Number(formData.get("course_price")),
      },
    ],
    user_id: formData.get("user_id"),
    email: formData.get("user_email"),
    success_url: `https://kazusa-client.vercel.app/courses/${formData.get("course_id")}`,
    failure_url: `https://kazusa-client.vercel.app/courses/${formData.get("course_id")}`,
    callback_url: `${process.env.BASE_URL}/payment/confirm`,
    payment_lifetime: 1800,
    lang: "en",
  };

  console.log(payload);

  const payloadJson = JSON.stringify(payload);
  const payloadBase64 = btoa(payloadJson);
  const hmac = createHmac("sha512", process.env.OV_API_SECRET as string);
  const signed = hmac.update(Buffer.from(payloadBase64, "utf-8")).digest("hex");
  const request = {
    data: payloadBase64,
    sign: signed,
  };

  const token = btoa(process.env.OV_API_KEY as string);

  raw = await fetch(`${process.env.OV_HOST}/payment/create`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  response = await raw.json();

  const data = JSON.parse(atob(response.data));

  return redirect(data.payment_page_url);
};
