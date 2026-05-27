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

export async function callNovaPoshta<T>(
  apiKey: string,
  modelName: string,
  calledMethod: string,
  methodProperties: Record<string, unknown>,
): Promise<{ success: boolean; data: T; errors?: unknown[] }> {
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
