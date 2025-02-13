import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.policyLinks}>
        <Link href="/payment-policy">Политика платежей</Link>
      </div>
      <p>© 2024 KAZUSA. All rights reserved.</p>
    </footer>
  );
}
