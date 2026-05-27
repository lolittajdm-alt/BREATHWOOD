const MONOBANK_INVOICE_URL = "https://api.monobank.ua/api/merchant/invoice/create";

export type MonobankInvoiceResponse = {
  invoiceId: string;
  pageUrl: string;
};

export type CreateMonobankInvoiceInput = {
  amountKopiykas: number;
  reference: string;
  destination: string;
  comment?: string;
  redirectUrl: string;
};

export function getOrderAmountKopiykas(): number {
  const uah = Number(process.env.NEXT_PUBLIC_ORDER_AMOUNT_UAH ?? "1299");
  const safe = Number.isFinite(uah) && uah > 0 ? uah : 1299;
  return Math.round(safe * 100);
}

export function getOrderAmountUah(): number {
  return getOrderAmountKopiykas() / 100;
}

export function buildPaymentRedirectUrl(): string {
  if (typeof window === "undefined") {
    return "/?payment=success";
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const origin = window.location.origin;
  const path = basePath ? `${basePath}/` : "/";
  return `${origin}${path}?payment=success`;
}

export async function createMonobankInvoice(
  token: string,
  input: CreateMonobankInvoiceInput,
): Promise<MonobankInvoiceResponse> {
  const response = await fetch(MONOBANK_INVOICE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Token": token,
    },
    body: JSON.stringify({
      amount: input.amountKopiykas,
      ccy: 980,
      merchantPaymInfo: {
        reference: input.reference,
        destination: input.destination,
        comment: input.comment,
      },
      redirectUrl: input.redirectUrl,
      validity: 3600,
    }),
  });

  const data = (await response.json()) as MonobankInvoiceResponse & {
    errText?: string;
    errorDescription?: string;
  };

  if (!response.ok) {
    throw new Error(
      data.errText ?? data.errorDescription ?? `Monobank API: ${response.status}`,
    );
  }

  if (!data.pageUrl) {
    throw new Error("Monobank не повернув посилання на оплату.");
  }

  return data;
}
