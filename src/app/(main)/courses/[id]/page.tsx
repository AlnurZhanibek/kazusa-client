export const dynamic = "force-dynamic";

import Image from "next/image";
import { Button } from "@/app/components";
import styles from "./course-page.module.css";
import CourseSyllabus from "./components/course-syllabus/course-syllabus";
import { Course } from "@/generated/models";
import Link from "next/link";
import { headers } from "next/headers";
import { getUser } from "@/app/utils/auth";
import { buyCourse } from "@/app/actions/buy-course";

type CoursePageParams = { id: string };

async function getCourse(id: string): Promise<Course[]> {
  const res = await fetch(
    `${process.env.BASE_URL}/course?id=${id}&offset=0&limit=1`,
    {
      headers: new Headers(await headers()),
      cache: "no-store",
    },
  );

  return res.json();
}

export default async function CoursePage(props: {
  params: Promise<CoursePageParams>;
}) {
  const params = await props.params;
  const currentUser = await getUser();

  const courses = await getCourse(params.id);
  const course = courses[0];

  const duration = Math.ceil(
    (course?.modules?.reduce((acc, mod) => acc + mod.durationMinutes, 0) ||
      60) / 60,
  );

  return (
    <div className={styles.coursePage}>
      <div className={styles.courseContent}>
        <div className={styles.coursePageLeft}>
          <p className={styles.courseTitle}>{course.title}</p>
          <p className={styles.courseDescription}>{course.description}</p>
          {course?.modules?.length ? (
            <CourseSyllabus
              syllabus={course.modules || []}
              isInteractive={course.isPaid || currentUser?.role === "admin"}
            />
          ) : null}
          {course.attachmentUrls &&
            (course.isPaid || currentUser?.role === "admin") &&
            JSON.parse(course.attachmentUrls).attachment_urls && (
              <div className={styles.courseLinks}>
                {JSON.parse(course.attachmentUrls).attachment_urls.map(
                  (attachmentUrl: string, index: number) => {
                    const attachmentUrlTitle =
                      attachmentUrl.split("/")[
                        attachmentUrl.split("/").length - 1
                      ];
                    return (
                      <Link
                        key={index}
                        className={styles.courseAttachment}
                        href={attachmentUrl}
                      >
                        {attachmentUrlTitle}
                      </Link>
                    );
                  },
                )}
              </div>
            )}
        </div>
        <div className={styles.coursePageRight}>
          <div className={styles.coursePageImage}>
            <Image
              alt={`course-image-${params.id}`}
              src={course.coverUrl}
              objectFit="cover"
              fill
            />
          </div>
          <div className={styles.courseInfo}>
            <p className={styles.courseInfoText}>Price: {course.price}</p>
            <p className={styles.courseInfoText}>Duration: {duration}h</p>
            {course?.modules?.length &&
            (course.isPaid || currentUser?.role === "admin") ? (
              <Button>
                <Link
                  style={{ textDecoration: "none", color: "#fff" }}
                  href={`/modules/${course?.modules?.[0].id || ""}`}
                >
                  Get started
                </Link>
              </Button>
            ) : currentUser?.role === "admin" ? (
              <p className={styles.courseInfoText}>No modules yet</p>
            ) : currentUser ? (
              <form action={buyCourse}>
                <input
                  type="hidden"
                  name="user_email"
                  value={currentUser.email}
                />
                <input
                  type="hidden"
                  name="user_id"
                  value={currentUser.userId}
                />
                <input
                  type="hidden"
                  name="user_name"
                  value={currentUser.name}
                />
                <input type="hidden" name="course_name" value={course.title} />
                <input type="hidden" name="course_price" value={course.price} />
                <input type="hidden" name="course_id" value={course.id} />
                <Button type="submit">Buy</Button>
              </form>
            ) : (
              "Please login"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
