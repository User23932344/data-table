import { Car, SortableColumn } from "@/types/car";

export function getValue(car: Car, key: SortableColumn): string | number {
  switch (key) {
    case "id":
      return car.id;
    case "brand":
      return car.brand;
    case "model":
      return car.model;
    case "year":
      return car.year;
    case "engine.name":
      return car.engine.name;
    case "engine.type":
      return car.engine.type;
    case "engine.capacity":
      return car.engine.capacity;
    case "engine.horsepower":
      return car.engine.horsepower;
    case "engine.cylinders":
      return car.engine.cylinders;
    default:
      return "";
  }
}
