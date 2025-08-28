"use client";
import { useMemo, useState } from "react";
import rawCars from "@/data/cars.json";
import type { Car, SortableColumn } from "@/types/car";
import Filters from "./Filters"; 
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

type SortOrder = "asc" | "desc" | "none";

const getAriaSort = (
  column: SortableColumn,
  sortColumn: SortableColumn | null,
  sortOrder: SortOrder
): "ascending" | "descending" | "none" => {
  if (sortColumn !== column) return "none";
  return sortOrder === "asc" ? "ascending" : "descending";
};

const columns: { key: SortableColumn; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "brand", label: "Бренд" },
  { key: "model", label: "Модель" },
  { key: "year", label: "Год пр-ва" },
  { key: "engine.name", label: "Название двигателя" },
  { key: "engine.type", label: "Тип двигателя" },
  { key: "engine.capacity", label: "Объем" },
  { key: "engine.horsepower", label: "Мощность" },
  { key: "engine.cylinders", label: "Цилиндры" },
];

export default function DataTable() {
  const itemsPerPage = 30;
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [filters, setFilters] = useState<Partial<Record<SortableColumn, string | number>>>({});

  const filteredCars = useMemo(() => {
    return cars.filter((car) =>
      Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === "") return true;
        return String(getValue(car, key as SortableColumn)) === String(value);
      })
    );
  }, [filters]);  

  const sortedCars = useMemo(() => {
    const arr = [...filteredCars];
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
  }, [filteredCars, sortColumn, sortOrder]);

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
      <Filters filters={filters} setFilters={setFilters} cars={cars} />

      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                aria-sort={getAriaSort(key, sortColumn, sortOrder)}
              >
                {label}{arrow(key)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {currentCars.map((row) => (
            <tr key={row.id} className={styles.tableRow}>
              {columns.map(({ key }) => (
                <td key={key} className={styles.tableCell}>
                  {String(getValue(row, key))}
                </td>
              ))}
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
