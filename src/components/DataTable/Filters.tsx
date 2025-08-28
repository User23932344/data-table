import { Car, SortableColumn } from "@/types/car";
import { getValue } from "@/utils/getValue";

type FiltersProps = {
  filters: Partial<Record<SortableColumn, string | number>>;
  setFilters: React.Dispatch<
    React.SetStateAction<Partial<Record<SortableColumn, string | number>>>
  >;
  cars: Car[];
};

export default function Filters({ filters, setFilters, cars }: FiltersProps) {
  const filteredCars = cars.filter((car) =>
    Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(getValue(car, key as SortableColumn)) === String(value);
    })
  );

  const brands = Array.from(new Set(filteredCars.map((c) => c.brand)));
  const models = Array.from(new Set(filteredCars.map((c) => c.model)));
  const years = Array.from(new Set(filteredCars.map((c) => c.year)));
  const engineTypes = Array.from(new Set(filteredCars.map((c) => c.engine.type)));

  const engineNames = Array.from(new Set(filteredCars.map((c) => c.engine.name)));
  const capacities = Array.from(new Set(filteredCars.map((c) => c.engine.capacity)));
  const horsepowers = Array.from(new Set(filteredCars.map((c) => c.engine.horsepower)));
  const cylinders = Array.from(new Set(filteredCars.map((c) => c.engine.cylinders)));

  return (
    <div style={{ marginBottom: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <select
        value={filters.brand ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, brand: e.target.value || undefined }))
        }
      >
        <option value="">Все марки</option>
        {brands.map((b) => (
          <option key={String(b)} value={b}>
            {b}
          </option>
        ))}
      </select>

      <select
        value={filters.model ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, model: e.target.value || undefined }))
        }
      >
        <option value="">Все модели</option>
        {models.map((m) => (
          <option key={String(m)} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={filters.year ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, year: e.target.value || undefined }))
        }
      >
        <option value="">Все года</option>
        {years.map((y) => (
          <option key={String(y)} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={filters["engine.type"] ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            "engine.type": e.target.value || undefined,
          }))
        }
      >
        <option value="">Все типы двигателя</option>
        {engineTypes.map((t) => (
          <option key={String(t)} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={filters["engine.name"] ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            "engine.name": e.target.value || undefined,
          }))
        }
      >
        <option value="">Все названия двигателя</option>
        {engineNames.map((n) => (
          <option key={String(n)} value={n}>
            {n}
          </option>
        ))}
      </select>

      <select
        value={filters["engine.capacity"] ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            "engine.capacity": e.target.value || undefined,
          }))
        }
      >
        <option value="">Все объёмы</option>
        {capacities.map((c) => (
          <option key={String(c)} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={filters["engine.horsepower"] ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            "engine.horsepower": e.target.value || undefined,
          }))
        }
      >
        <option value="">Все мощности</option>
        {horsepowers.map((h) => (
          <option key={String(h)} value={h}>
            {h}
          </option>
        ))}
      </select>

      <select
        value={filters["engine.cylinders"] ?? ""}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            "engine.cylinders": e.target.value || undefined,
          }))
        }
      >
        <option value="">Все цилиндры</option>
        {cylinders.map((c) => (
          <option key={String(c)} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
