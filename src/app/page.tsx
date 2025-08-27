import DataTable from "../components/DataTable/DataTable";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Data Table Demo</h1>
        <DataTable />
      </main>
      <footer className={styles.footer}>
        <p>© 2025 Data Table Project</p>
      </footer>
    </div>
  );
}
