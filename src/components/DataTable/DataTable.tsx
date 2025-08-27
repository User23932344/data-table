"use client";
import { useMemo, useState } from "react";
import rawCars from "@/data/cars.json";
import type { Car, SortableColumn } from "@/types/car.ts";
import styles from "./DataTable.module.css";

const cars: Car[] = rawCars as Car[];

function getValue(car: Car, column: SortableColumn): string | number {
  switch (column) {
    case "id": return car.id;
    case "brand": return car.brand;
    case "model": return car.model;
    case "year": return car.year;
    case "engine.name": return car.engine.name;
    case "engine.type": return car.engine.type;
    case "engine.capacity": return car.engine.capacity;
    case "engine.horsepower": return car.engine.horsepower;
    case "engine.cylinders": return car.engine.cylinders;
  }
}

export default function DataTable() {
  const itemsPerPage = 30;
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedCars = useMemo(() => {
    const arr = [...cars];
    if (!sortColumn) return arr;

    return arr.sort((a, b) => {
      const av = getValue(a, sortColumn);
      const bv = getValue(b, sortColumn);

      if (typeof av === "number" && typeof bv === "number") {
        return sortOrder === "asc" ? av - bv : bv - av;
      }
      const cmp = String(av).localeCompare(String(bv), "ru", { sensitivity: "base" });
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [sortColumn, sortOrder]);

  const totalPages = Math.ceil(sortedCars.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentCars = sortedCars.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (col: SortableColumn) => {
    if (sortColumn === col) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(col);
      setSortOrder("asc");
    }
    setPage(1); 
  };

  const arrow = (col: SortableColumn) =>
    sortColumn === col ? (sortOrder === "asc" ? " ▲" : " ▼") : "";

  return (
    <>
      <table className={styles.table}>
      <thead className={styles.tableHead}>
  <tr className={styles.tableRow}>
    <th
      onClick={() => handleSort("id")}
      aria-sort={
        sortColumn === "id"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      ID{arrow("id")}
    </th>
    <th
      onClick={() => handleSort("brand")}
      aria-sort={
        sortColumn === "brand"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      Бренд{arrow("brand")}
    </th>
    <th
      onClick={() => handleSort("model")}
      aria-sort={
        sortColumn === "model"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      Модель{arrow("model")}
    </th>
    <th
      onClick={() => handleSort("year")}
      aria-sort={
        sortColumn === "year"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      Год пр-ва{arrow("year")}
    </th>
    <th
      onClick={() => handleSort("engine.name")}
      aria-sort={
        sortColumn === "engine.name"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      Название двигателя{arrow("engine.name")}
    </th>
    <th
      onClick={() => handleSort("engine.type")}
      aria-sort={
        sortColumn === "engine.type"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      Тип двигателя{arrow("engine.type")}
    </th>
    <th
      onClick={() => handleSort("engine.capacity")}
      aria-sort={
        sortColumn === "engine.capacity"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      Объем{arrow("engine.capacity")}
    </th>
    <th
      onClick={() => handleSort("engine.horsepower")}
      aria-sort={
        sortColumn === "engine.horsepower"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      Мощность{arrow("engine.horsepower")}
    </th>
    <th
      onClick={() => handleSort("engine.cylinders")}
      aria-sort={
        sortColumn === "engine.cylinders"
          ? sortOrder === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      Цилиндры{arrow("engine.cylinders")}
    </th>
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
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Назад</button>
        <span>Страница {page} из {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Вперёд</button>
      </div>
    </>
  );
}
