export const NOVA_POSHTA_API_URL = "https://api.novaposhta.ua/v2.0/json/";

/** Відділення — самовивіз з відділення Нової Пошти */
export const NP_WAREHOUSE_BRANCH_REF = "841339c7-591a-42e2-8233-7a0a00f0ed6f";

/** Поштомат Нової Пошти */
export const NP_WAREHOUSE_POSTOMAT_REF = "f9316480-5f2d-425d-bc2c-ac7cd29decf0";

export type DeliveryMethod = "warehouse" | "postomat";

export const deliveryMethodOptions: {
  id: DeliveryMethod;
  label: string;
  description: string;
  typeRef: string;
  pointLabel: string;
}[] = [
  {
    id: "warehouse",
    label: "Відділення",
    description: "Самовивіз з відділення Нової Пошти",
    typeRef: NP_WAREHOUSE_BRANCH_REF,
    pointLabel: "Відділення",
  },
  {
    id: "postomat",
    label: "Поштомат",
    description: "Отримання у поштоматі Нової Пошти",
    typeRef: NP_WAREHOUSE_POSTOMAT_REF,
    pointLabel: "Поштомат",
  },
];

export type NovaPoshtaResponse<T> = {
  success: boolean;
  data: T;
  errors?: unknown[];
};

export function formatNovaPoshtaError(errors?: unknown[]): string | undefined {
  if (!errors?.length) return undefined;
  const first = errors[0];
  if (typeof first === "string") return first;
  if (typeof first === "object" && first && "message" in first) {
    return String((first as { message: string }).message);
  }
  return undefined;
}

export async function callNovaPoshta<T>(
  apiKey: string,
  modelName: string,
  calledMethod: string,
  methodProperties: Record<string, unknown>,
): Promise<NovaPoshtaResponse<T>> {
  const response = await fetch(NOVA_POSHTA_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      modelName,
      calledMethod,
      methodProperties,
    }),
  });

  return response.json();
}

export type WarehouseApiItem = {
  Ref: string;
  Description: string;
  Number?: string;
  CategoryOfWarehouse?: string;
};

export function formatWarehouseLabel(item: WarehouseApiItem): string {
  if (item.Number) {
    return `№${item.Number} — ${item.Description}`;
  }
  return item.Description;
}

export async function searchWarehouses(
  apiKey: string,
  cityRef: string,
  deliveryMethod: DeliveryMethod,
  findByString: string,
): Promise<WarehouseApiItem[]> {
  const typeRef =
    deliveryMethod === "postomat" ? NP_WAREHOUSE_POSTOMAT_REF : NP_WAREHOUSE_BRANCH_REF;
  const query = findByString.trim();

  const json = await callNovaPoshta<WarehouseApiItem[]>(
    apiKey,
    "AddressGeneral",
    "getWarehouses",
    {
      CityRef: cityRef,
      TypeOfWarehouseRef: typeRef,
      FindByString: query,
      Limit: 30,
    },
  );

  if (json.success && json.data?.length) {
    return json.data;
  }

  if (!json.success) {
    throw new Error(formatNovaPoshtaError(json.errors) ?? "Nova Poshta warehouse search failed");
  }

  const fallback = await callNovaPoshta<WarehouseApiItem[]>(
    apiKey,
    "AddressGeneral",
    "getWarehouses",
    {
      CityRef: cityRef,
      FindByString: query,
      Limit: 30,
    },
  );

  if (!fallback.success) {
    throw new Error(
      formatNovaPoshtaError(fallback.errors) ?? "Nova Poshta warehouse search failed",
    );
  }

  const category = deliveryMethod === "postomat" ? "Postomat" : "Branch";
  return (fallback.data ?? []).filter((item) => item.CategoryOfWarehouse === category);
}

export async function fetchWarehousesForCity(
  apiKey: string,
  cityRef: string,
  deliveryMethod: DeliveryMethod,
): Promise<WarehouseApiItem[]> {
  const typeRef =
    deliveryMethod === "postomat" ? NP_WAREHOUSE_POSTOMAT_REF : NP_WAREHOUSE_BRANCH_REF;

  const json = await callNovaPoshta<WarehouseApiItem[]>(
    apiKey,
    "AddressGeneral",
    "getWarehouses",
    {
      CityRef: cityRef,
      TypeOfWarehouseRef: typeRef,
      Limit: 500,
    },
  );

  if (json.success && json.data?.length) {
    return json.data;
  }

  const fallback = await callNovaPoshta<WarehouseApiItem[]>(
    apiKey,
    "AddressGeneral",
    "getWarehouses",
    {
      CityRef: cityRef,
      Limit: 500,
    },
  );

  if (!fallback.success) {
    throw new Error(
      formatNovaPoshtaError(fallback.errors) ?? "Nova Poshta warehouses request failed",
    );
  }

  const category = deliveryMethod === "postomat" ? "Postomat" : "Branch";
  return (fallback.data ?? []).filter((item) => item.CategoryOfWarehouse === category);
}
