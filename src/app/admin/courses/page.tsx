export const dynamic = "force-dynamic";

import styles from "./index.module.css";
import Table from "@/app/components/table/table";
import Pagination from "@/app/components/pagination/pagination";
import { Course } from "@/generated/models";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function getCourses({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}): Promise<Course[]> {
  const res = await fetch(
    `${process.env.BASE_URL}/course?offset=${offset}&limit=${limit}`,
  );

  return res.json();
}

interface ICoursePageProps {
  searchParams?: Promise<{
    offset?: string;
    limit?: string;
  }>;
}

export default async function CourseList(props: ICoursePageProps) {
  const searchParams = await props.searchParams;
  const offset = Number(searchParams?.offset) || 0;
  const limit = Number(searchParams?.limit) || 20;
  const courses = await getCourses({
    offset,
    limit,
  });

  const deleteCourse = async (id: string) => {
    "use server";

    const raw = await fetch(`${process.env.BASE_URL}/course?id=${id}`, {
      method: "DELETE",
    });

    const ok: boolean = await raw.json();

    if (ok) {
      revalidatePath("/admin/course");
    }
  };

  const columns = ["title", "price"] as (keyof Course)[];
  return (
    <div className={styles.courseList}>
      <div className={styles.courseContainer}>
        <header className={styles.courseContainerHeader}>
          <div className="spacer"></div>
          <p className={styles.courseContainerTitle}>Course List</p>
          <div className={styles.actionsWrapper}>
            <Link href="courses/create">Create</Link>
          </div>
        </header>
        <Table
          updateUrl="courses"
          onDelete={deleteCourse}
          columns={columns}
          data={courses}
        />
        <Pagination />
      </div>
    </div>
  );
}
