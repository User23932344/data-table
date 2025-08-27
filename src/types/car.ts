export interface Engine {
    name: string;
    type: string;
    capacity: number;      // литры
    horsepower: number;    // л.с.
    cylinders: number;
  }
  
  export interface Car {
    id: number;
    brand: string;
    model: string;
    year: number;
    engine: Engine;
  }
  
  export type SortableColumn =
    | "id"
    | "brand"
    | "model"
    | "year"
    | "engine.name"
    | "engine.type"
    | "engine.capacity"
    | "engine.horsepower"
    | "engine.cylinders";
  