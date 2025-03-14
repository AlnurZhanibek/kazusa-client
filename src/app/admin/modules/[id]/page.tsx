export const dynamic = "force-dynamic";
import { Module } from "@/generated/models";
import Form from "./components/form";
import { headers } from "next/headers";

type ModulePageParams = { id: string };

async function getModules(id: string): Promise<Module[]> {
  const res = await fetch(`${process.env.BASE_URL}/module?id=${id}`, {
    headers: new Headers(await headers()),
  });

  return res.json();
}

export default async function Page(props: { params: Promise<ModulePageParams> }) {
  const params = await props.params;
  const modules = await getModules(params.id);
  const moduleData = modules[0];

  return <Form moduleData={moduleData} />;
}
