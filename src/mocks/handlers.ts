import { http, HttpResponse } from "msw";
import investments from "./investments";
import transactions from "./transactions";
import savings from "./savings";

export const handlers = [
  http.get("/api/investments", () => HttpResponse.json(investments)),
  http.get("/api/transactions", () => HttpResponse.json(transactions)),
  http.get("/api/savings", () => HttpResponse.json(savings)),
];
