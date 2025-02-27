export const dynamic = "force-dynamic";

import { Course, Module } from "@/generated/models";
import styles from "./module-page.module.css";
import Link from "next/link";
import { headers } from "next/headers";
import { createActivity } from "@/app/actions/create-activity";
import { getUser } from "@/app/utils/auth";

type ModulePageParams = {
  params: Promise<{
    id: string;
  }>;
};

async function getModule(id: string): Promise<Module[]> {
  const res = await fetch(
    `${process.env.BASE_URL}/module?id=${encodeURIComponent(id)}`,
    {
      headers: new Headers(await headers()),
    },
  );

  return res.json();
}

async function getCourse(id: string): Promise<Course[]> {
  const res = await fetch(
    `${process.env.BASE_URL}/course?id=${encodeURIComponent(id)}`,
    {
      headers: new Headers(await headers()),
    },
  );

  return res.json();
}

async function getModules(courseId: string): Promise<Module[]> {
  const res = await fetch(
    `${process.env.BASE_URL}/module?course_id=${encodeURIComponent(courseId)}`,
    {
      headers: new Headers(await headers()),
    },
  );

  return res.json();
}

export default async function ModulePage(props: ModulePageParams) {
  const params = await props.params;
  const currentUser = await getUser();

  const modulesData = await getModule(params.id);
  const moduleData = modulesData[0];

  const courseModules = await getModules(moduleData.courseId);

  const foundModuleIndex = courseModules.findIndex(
    (mdl) => mdl.id === moduleData.id,
  );

  const prevIndex = foundModuleIndex - 1;
  const nextIndex = foundModuleIndex + 1;

  const prevId = prevIndex >= 0 ? courseModules[prevIndex]?.id : null;
  const nextId =
    nextIndex <= courseModules.length ? courseModules[nextIndex]?.id : null;

  const isLast = !nextId;

  if (currentUser) {
    const courses = await getCourse(moduleData.courseId);
    const course = courses[0];

    await createActivity({
      userId: currentUser.userId,
      userEmail: currentUser.email,
      userFullname: currentUser.name,
      courseId: moduleData.courseId,
      courseName: course.title,
      moduleId: moduleData.id,
      isLast,
    });
  }

  return (
    <div className={styles.modulePage}>
      <div className={styles.moduleContent}>
        <div dangerouslySetInnerHTML={{ __html: moduleData.content }} />
        <div className={styles.moduleControls}>
          {prevId ? (
            <Link href={`/modules/${prevId || ""}`}>prev</Link>
          ) : (
            <div />
          )}
          {nextId ? (
            <Link href={`/modules/${nextId || ""}`}>next</Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
