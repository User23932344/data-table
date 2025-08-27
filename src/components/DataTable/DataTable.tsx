"use client";
import { useState } from "react";
import cars from "@/data/cars.json";
import styles from "./DataTable.module.css";

export default function DataTable() {
  const itemsPerPage = 30;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(cars.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableRow}>
          <th className={styles.tableHeader}>ID</th>
          <th className={styles.tableHeader}>Бренд</th>
          <th className={styles.tableHeader}>Модель</th>
          <th className={styles.tableHeader}>Год пр-ва</th>
          <th className={styles.tableHeader}>Название двигателя</th>
          <th className={styles.tableHeader}>Тип двигателя</th>
          <th className={styles.tableHeader}>Объем</th>
          <th className={styles.tableHeader}>Мощность</th>
          <th className={styles.tableHeader}>Кол-во цилиндров</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {currentCars.map((row) => (
          <tr key={row.id} className={styles.tableRow}>
            <td className={styles.tableCell}>{row.id}</td>
            <td className={styles.tableCell}>{row.brand}</td>
            <td className={styles.tableCell}>{row.model}</td>
            <td className={styles.tableCell}>{row.year}</td>
            <td className={styles.tableCell}>{row.engine.name}</td>
            <td className={styles.tableCell}>{row.engine.type}</td>
            <td className={styles.tableCell}>{row.engine.capacity}</td>
            <td className={styles.tableCell}>{row.engine.horsepower}</td>
            <td className={styles.tableCell}>{row.engine.cylinders}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className={styles.pagination}>
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
        >
          Назад
        </button>
        <span>
          Страница {page} из {totalPages}
        </span>
        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
        >
          Вперёд
        </button>
      </div>
    </>
  );
}
