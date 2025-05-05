import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.policyLinks}>
        <Link href="/payment-policy">Политика платежей</Link>
        <Link href="https://kazusa-bucket.fra1.cdn.digitaloceanspaces.com/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA%20%D0%BF%D1%80%D0%BE%D1%88%D0%B5%D0%B4%D1%88%D0%B8%D1%85%20%D1%83%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2.pdf">
          Список успешно завершивших преподавателей
        </Link>
      </div>
      <p>© 2024 KAZUSA. All rights reserved.</p>
    </footer>
  );
}
