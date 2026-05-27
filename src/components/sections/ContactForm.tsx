"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { NovaPoshtaLogo } from "@/components/ui/NovaPoshtaLogo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  callNovaPoshta,
  deliveryMethodOptions,
  fetchWarehousesForCity,
  formatNovaPoshtaError,
  formatWarehouseLabel,
  searchWarehouses,
  type DeliveryMethod,
  type WarehouseApiItem,
} from "@/lib/novaPoshta";

const NOVA_POSHTA_API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY ?? "";
const WAREHOUSE_LIST_LIMIT = 500;

type CityOption = {
  ref: string;
  name: string;
};

type WarehouseOption = {
  ref: string;
  name: string;
  number: string;
};

function mapWarehouseItem(item: WarehouseApiItem): WarehouseOption {
  const number = item.Number != null ? String(item.Number) : "";
  return {
    ref: item.Ref,
    name: formatWarehouseLabel(item),
    number,
  };
}

function filterWarehousesLocal(
  items: WarehouseOption[],
  query: string,
): WarehouseOption[] {
  const q = query.trim();
  if (!q) return items;

  if (/^\d+$/.test(q)) {
    return items.filter(
      (item) =>
        item.number === q ||
        item.name.includes(`№${q}`) ||
        item.name.includes(`№${q}:`),
    );
  }

  const normalized = q.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(normalized));
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("warehouse");
  const [cityQuery, setCityQuery] = useState("");
  const [cityLocked, setCityLocked] = useState(false);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [showCityList, setShowCityList] = useState(false);
  const [selectedCityRef, setSelectedCityRef] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [warehouseInput, setWarehouseInput] = useState("");
  const [warehouseOpen, setWarehouseOpen] = useState(false);
  const [allWarehouses, setAllWarehouses] = useState<WarehouseOption[]>([]);
  const [remoteWarehouses, setRemoteWarehouses] = useState<WarehouseOption[]>([]);
  const [warehousesCacheKey, setWarehousesCacheKey] = useState("");
  const [selectedWarehouseRef, setSelectedWarehouseRef] = useState("");
  const [selectedWarehouseName, setSelectedWarehouseName] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);
  const [loadingRemoteSearch, setLoadingRemoteSearch] = useState(false);
  const [npError, setNpError] = useState("");

  const warehouseFieldRef = useRef<HTMLDivElement>(null);
  const warehouseLoadIdRef = useRef(0);

  const hasApiKey = NOVA_POSHTA_API_KEY.length > 0;
  const activeDelivery = deliveryMethodOptions.find((item) => item.id === deliveryMethod)!;
  const warehouseCacheKey = selectedCityRef ? `${selectedCityRef}:${deliveryMethod}` : "";

  const resetWarehouseSelection = useCallback(() => {
    setWarehouseInput("");
    setWarehouseOpen(false);
    setAllWarehouses([]);
    setRemoteWarehouses([]);
    setWarehousesCacheKey("");
    setSelectedWarehouseRef("");
    setSelectedWarehouseName("");
  }, []);

  const applyCitySelection = useCallback(
    (city: CityOption) => {
      setCityQuery(city.name);
      setSelectedCityRef(city.ref);
      setSelectedCityName(city.name);
      resetWarehouseSelection();
      setCityLocked(true);
      setShowCityList(false);
      setNpError("");
    },
    [resetWarehouseSelection],
  );

  const applyWarehouseSelection = useCallback((warehouse: WarehouseOption) => {
    setWarehouseInput(warehouse.name);
    setSelectedWarehouseRef(warehouse.ref);
    setSelectedWarehouseName(warehouse.name);
    setWarehouseOpen(false);
    setRemoteWarehouses([]);
    setNpError("");
  }, []);

  const loadWarehousesForSelectedCity = useCallback(async () => {
    if (!hasApiKey || !selectedCityRef) return;

    const requestId = ++warehouseLoadIdRef.current;
    setLoadingWarehouses(true);
    setNpError("");

    try {
      const data = await fetchWarehousesForCity(
        NOVA_POSHTA_API_KEY,
        selectedCityRef,
        deliveryMethod,
        WAREHOUSE_LIST_LIMIT,
      );

      if (requestId !== warehouseLoadIdRef.current) return;

      const mapped = data.map(mapWarehouseItem);
      setAllWarehouses(mapped);
      setRemoteWarehouses([]);
      setWarehousesCacheKey(warehouseCacheKey);
    } catch (error) {
      if (requestId !== warehouseLoadIdRef.current) return;
      const message = error instanceof Error ? error.message : undefined;
      setNpError(
        message ??
          `Не вдалося завантажити ${activeDelivery.pointLabel.toLowerCase()} Нової Пошти.`,
      );
      setAllWarehouses([]);
      setWarehousesCacheKey(warehouseCacheKey);
    } finally {
      if (requestId === warehouseLoadIdRef.current) {
        setLoadingWarehouses(false);
      }
    }
  }, [
    hasApiKey,
    selectedCityRef,
    deliveryMethod,
    warehouseCacheKey,
    activeDelivery.pointLabel,
  ]);

  const openWarehouseDropdown = useCallback(() => {
    if (!hasApiKey || !selectedCityRef) return;

    setWarehouseOpen(true);
    setNpError("");

    const needsLoad =
      warehousesCacheKey !== warehouseCacheKey ||
      (warehousesCacheKey === warehouseCacheKey && allWarehouses.length === 0);

    if (needsLoad) {
      void loadWarehousesForSelectedCity();
    }
  }, [
    hasApiKey,
    selectedCityRef,
    warehousesCacheKey,
    warehouseCacheKey,
    allWarehouses.length,
    loadWarehousesForSelectedCity,
  ]);

  const localFilteredWarehouses = useMemo(
    () => filterWarehousesLocal(allWarehouses, warehouseInput).slice(0, 50),
    [allWarehouses, warehouseInput],
  );

  const displayWarehouses = useMemo(() => {
    const q = warehouseInput.trim();

    if (
      warehouseOpen &&
      selectedWarehouseRef &&
      warehouseInput === selectedWarehouseName
    ) {
      return allWarehouses.slice(0, 50);
    }

    if (q.length > 0 && localFilteredWarehouses.length === 0 && remoteWarehouses.length > 0) {
      return remoteWarehouses.slice(0, 50);
    }

    return localFilteredWarehouses;
  }, [
    warehouseInput,
    warehouseOpen,
    selectedWarehouseRef,
    selectedWarehouseName,
    allWarehouses,
    localFilteredWarehouses,
    remoteWarehouses,
  ]);

  useEffect(() => {
    if (!warehouseOpen || !selectedCityRef || !hasApiKey) return;

    const query = warehouseInput.trim();
    if (query.length < 1) {
      setRemoteWarehouses([]);
      setLoadingRemoteSearch(false);
      return;
    }

    if (localFilteredWarehouses.length > 0) {
      setRemoteWarehouses([]);
      setLoadingRemoteSearch(false);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        setLoadingRemoteSearch(true);
        setNpError("");

        const data = await searchWarehouses(
          NOVA_POSHTA_API_KEY,
          selectedCityRef,
          deliveryMethod,
          query,
        );

        if (cancelled) return;

        setRemoteWarehouses(data.map(mapWarehouseItem));
      } catch (error) {
        if (cancelled) return;
        const message = error instanceof Error ? error.message : undefined;
        setNpError(
          message ??
            `Не вдалося знайти ${activeDelivery.pointLabel.toLowerCase()} Нової Пошти.`,
        );
        setRemoteWarehouses([]);
      } finally {
        if (!cancelled) setLoadingRemoteSearch(false);
      }
    }, 400);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    warehouseOpen,
    warehouseInput,
    selectedCityRef,
    deliveryMethod,
    hasApiKey,
    localFilteredWarehouses.length,
    activeDelivery.pointLabel,
  ]);

  useEffect(() => {
    if (!warehouseOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!warehouseFieldRef.current?.contains(event.target as Node)) {
        setWarehouseOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [warehouseOpen]);

  useEffect(() => {
    if (cityLocked) return;

    const query = cityQuery.trim();
    if (!hasApiKey || query.length < 2) {
      setCities([]);
      setShowCityList(false);
      setSelectedCityRef("");
      setSelectedCityName("");
      resetWarehouseSelection();
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        setLoadingCities(true);
        setNpError("");

        const json = await callNovaPoshta<
          { Addresses: { DeliveryCity: string; Present: string }[] }[]
        >(NOVA_POSHTA_API_KEY, "Address", "searchSettlements", {
          CityName: query,
          Limit: 20,
        });

        if (!json?.success) {
          setNpError(
            formatNovaPoshtaError(json.errors) ??
              "Нова Пошта: не вдалося знайти міста. Перевірте API-ключ.",
          );
          setCities([]);
          setShowCityList(false);
          return;
        }

        const addresses = json?.data?.[0]?.Addresses ?? [];
        const mapped: CityOption[] = addresses.map((item) => ({
          ref: item.DeliveryCity,
          name: item.Present,
        }));
        setCities(mapped);
        setShowCityList(mapped.length > 0);

        if (mapped.length === 1) {
          applyCitySelection(mapped[0]);
        }
      } catch {
        setNpError("Не вдалося завантажити міста Нової Пошти.");
      } finally {
        setLoadingCities(false);
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [cityQuery, hasApiKey, cityLocked, applyCitySelection, resetWarehouseSelection]);

  useEffect(() => {
    if (!selectedCityRef || !hasApiKey) return;
    if (warehousesCacheKey === warehouseCacheKey) return;

    void loadWarehousesForSelectedCity();
  }, [
    selectedCityRef,
    warehouseCacheKey,
    hasApiKey,
    warehousesCacheKey,
    loadWarehousesForSelectedCity,
  ]);

  const handleCityInput = (value: string) => {
    setCityQuery(value);
    setCityLocked(false);
    setSelectedCityRef("");
    setSelectedCityName("");
    resetWarehouseSelection();
    setShowCityList(true);
  };

  const handleWarehouseInput = (value: string) => {
    setWarehouseInput(value);
    if (selectedWarehouseRef) {
      setSelectedWarehouseRef("");
      setSelectedWarehouseName("");
    }
    setRemoteWarehouses([]);
    setWarehouseOpen(true);
  };

  const handleCitySelect = (city: CityOption) => {
    applyCitySelection(city);
  };

  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setDeliveryMethod(method);
    resetWarehouseSelection();
    setNpError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hasApiKey) {
      setNpError("API-ключ Нової Пошти не налаштований.");
      return;
    }
    if (!selectedCityRef || !selectedWarehouseRef) {
      setNpError(`Оберіть місто та ${activeDelivery.pointLabel.toLowerCase()} для доставки.`);
      return;
    }
    setSubmitted(true);
  };

  const warehouseListBusy = loadingWarehouses || loadingRemoteSearch;

  return (
    <section id="contact" className="section-shell relative py-12 md:py-32">
      <span className="section-number">07</span>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="ДАВАЙ ПОЗНАЙОМИСЬ" line2="БЛИЖЧЕ" />
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="cell-glass mt-6 w-full rounded-xl p-5 sm:mt-8 sm:rounded-[2rem] sm:p-8 md:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                  <DoodleIcon type="star" className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">Повідомлення надіслано!</h3>
                <p className="mt-2 text-muted">
                  Заявку на доставку ({activeDelivery.label}) отримано. Зв&apos;яжемось із вами
                  найближчим часом.
                </p>
              </motion.div>
            ) : (
              <>
                {!hasApiKey ? (
                  <p className="mb-4 rounded-xl bg-amber-100/80 px-4 py-3 text-sm text-ink">
                    API-ключ Нової Пошти ще не підключений. Додайте його в налаштуваннях проєкту.
                  </p>
                ) : null}

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Ім’я
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="mt-2 w-full border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink max-sm:text-base"
                      placeholder="Ваше ім’я"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Телефон
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      className="mt-2 w-full border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink max-sm:text-base"
                      placeholder="+380 XX XXX XX XX"
                    />
                  </div>

                  <fieldset disabled={!hasApiKey}>
                    <legend className="text-xs font-semibold uppercase tracking-wider text-muted">
                      Спосіб отримання
                    </legend>
                    <div className="mt-3 space-y-3">
                      {deliveryMethodOptions.map((option) => {
                        const selected = deliveryMethod === option.id;
                        return (
                          <label
                            key={option.id}
                            className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-all has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60 ${
                              selected
                                ? "border-ink bg-ink/5 shadow-soft"
                                : "border-ink/15 bg-card/30 hover:border-ink/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="deliveryMethod"
                              value={option.id}
                              checked={selected}
                              onChange={() => handleDeliveryMethodChange(option.id)}
                              className="h-4 w-4 shrink-0 accent-ink"
                            />
                            <NovaPoshtaLogo className="h-9 w-9 shrink-0" />
                            <span className="font-display text-sm font-bold sm:text-base">
                              {option.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>

                  <div className="relative">
                    <label
                      htmlFor="city"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Місто (Нова Пошта)
                    </label>
                    <input
                      id="city"
                      required
                      autoComplete="off"
                      value={cityQuery}
                      onChange={(e) => handleCityInput(e.target.value)}
                      onFocus={() => cities.length > 0 && setShowCityList(true)}
                      disabled={!hasApiKey}
                      className="mt-2 w-full border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder="Почніть вводити місто (мін. 2 літери)..."
                    />
                    {loadingCities ? (
                      <p className="mt-2 text-xs text-muted">Шукаємо міста...</p>
                    ) : null}
                    {showCityList && cities.length > 0 ? (
                      <ul
                        role="listbox"
                        className="absolute left-0 right-0 top-full z-20 mt-1 max-h-52 overflow-y-auto rounded-2xl border border-ink/10 bg-card py-1 shadow-card"
                      >
                        {cities.map((city) => (
                          <li key={city.ref}>
                            <button
                              type="button"
                              role="option"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleCitySelect(city)}
                              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent/40 ${
                                selectedCityRef === city.ref ? "bg-accent/30 font-semibold" : ""
                              }`}
                            >
                              {city.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {!loadingCities &&
                    cityQuery.trim().length >= 2 &&
                    cities.length === 0 &&
                    hasApiKey ? (
                      <p className="mt-2 text-xs text-muted">Місто не знайдено. Спробуйте інший запит.</p>
                    ) : null}
                    {selectedCityName ? (
                      <p className="mt-2 text-xs text-muted">Обрано: {selectedCityName}</p>
                    ) : (
                      <p className="mt-2 text-xs text-muted">
                        Оберіть місто зі списку — після цього завантажаться відділення.
                      </p>
                    )}
                  </div>

                  <div ref={warehouseFieldRef} className="relative">
                    <label
                      htmlFor="warehouse"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      {activeDelivery.pointLabel}
                    </label>
                    <input
                      id="warehouse"
                      type="text"
                      autoComplete="off"
                      value={warehouseInput}
                      onChange={(e) => handleWarehouseInput(e.target.value)}
                      onFocus={openWarehouseDropdown}
                      onClick={openWarehouseDropdown}
                      disabled={!hasApiKey || !selectedCityRef}
                      className="mt-2 w-full border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink disabled:cursor-not-allowed disabled:opacity-60"
                      placeholder={
                        selectedCityRef
                          ? "Натисніть для списку або введіть номер..."
                          : "Спочатку оберіть місто"
                      }
                    />
                    {warehouseListBusy ? (
                      <p className="mt-2 text-xs text-muted">
                        {loadingWarehouses
                          ? `Завантажуємо ${activeDelivery.pointLabel.toLowerCase()}...`
                          : "Уточнюємо пошук..."}
                      </p>
                    ) : null}
                    {warehouseOpen && selectedCityRef ? (
                      <ul
                        role="listbox"
                        className="absolute left-0 right-0 top-full z-20 mt-1 max-h-52 overflow-y-auto rounded-2xl border border-ink/10 bg-card py-1 shadow-card"
                      >
                        {warehouseListBusy && displayWarehouses.length === 0 ? (
                          <li className="px-4 py-2.5 text-sm text-muted">Завантаження...</li>
                        ) : null}
                        {!warehouseListBusy &&
                        displayWarehouses.length === 0 &&
                        warehouseInput.trim().length > 0 ? (
                          <li className="px-4 py-2.5 text-sm text-muted">
                            {activeDelivery.pointLabel} не знайдено. Спробуйте інший номер.
                          </li>
                        ) : null}
                        {!warehouseListBusy &&
                        displayWarehouses.length === 0 &&
                        warehouseInput.trim().length === 0 &&
                        allWarehouses.length === 0 ? (
                          <li className="px-4 py-2.5 text-sm text-muted">
                            Немає {activeDelivery.pointLabel.toLowerCase()} у цьому місті.
                          </li>
                        ) : null}
                        {displayWarehouses.map((warehouse) => (
                          <li key={warehouse.ref}>
                            <button
                              type="button"
                              role="option"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                applyWarehouseSelection(warehouse);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent/40 ${
                                selectedWarehouseRef === warehouse.ref
                                  ? "bg-accent/30 font-semibold"
                                  : ""
                              }`}
                            >
                              {warehouse.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {selectedCityRef && !selectedWarehouseRef ? (
                      <p className="mt-2 text-xs text-muted">
                        Натисніть поле — з&apos;явиться список. Введіть номер, щоб звузити пошук.
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="comment"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Коментар до замовлення
                    </label>
                    <textarea
                      id="comment"
                      rows={3}
                      className="mt-2 w-full resize-none border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink"
                      placeholder="Наприклад: зручний час для дзвінка"
                    />
                  </div>
                </div>
                {npError ? <p className="mt-4 text-sm text-red-500">{npError}</p> : null}

                <div className="mt-8">
                  <MagneticButton
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink py-4 text-sm font-semibold uppercase tracking-wider text-surface sm:w-auto sm:px-10"
                  >
                    Оформити доставку
                    <DoodleIcon type="arrow" className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </>
            )}
          </form>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="contact-footer mt-20 grid gap-6 border-t border-border pt-16 sm:grid-cols-[1fr_auto]">
            <div className="cell-glass rounded-3xl p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold md:text-3xl">Контакти</h3>
              <ul className="mt-6 space-y-3 text-sm md:text-base">
                <li>
                  <a
                    href="mailto:hello@breathwood.com"
                    className="animated-underline hover:text-ink"
                  >
                    hello@breathwood.com
                  </a>
                </li>
                <li>
                  <a href="tel:+380441234567" className="animated-underline hover:text-ink">
                    +38 (044) 123-45-67
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-underline hover:text-ink"
                  >
                    @breathwood.ua
                  </a>
                </li>
                <li>
                  <a href="#hero" className="animated-underline hover:text-ink">
                    breathwood.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="mx-auto flex aspect-square w-full max-w-[10rem] items-center justify-center rounded-3xl bg-accent p-6 sm:mx-0 sm:w-40 sm:max-w-none">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-sm ${[0, 1, 2, 4, 5, 6, 10, 12, 14, 18, 20, 22, 24].includes(i) ? "bg-ink" : "bg-transparent"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
