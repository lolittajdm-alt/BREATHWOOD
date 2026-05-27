"use client";

import { useEffect, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { DoodleIcon } from "@/components/ui/DoodleIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const NOVA_POSHTA_API_KEY = "d257b15154ae57f26a6bfbc2bc8e8737";
const NOVA_POSHTA_API_URL = "https://api.novaposhta.ua/v2.0/json/";

type CityOption = {
  ref: string;
  name: string;
};

type WarehouseOption = {
  ref: string;
  name: string;
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [cityQuery, setCityQuery] = useState("");
  const [cities, setCities] = useState<CityOption[]>([]);
  const [selectedCityRef, setSelectedCityRef] = useState("");
  const [warehouses, setWarehouses] = useState<WarehouseOption[]>([]);
  const [selectedWarehouseRef, setSelectedWarehouseRef] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);
  const [npError, setNpError] = useState("");

  useEffect(() => {
    const query = cityQuery.trim();
    if (query.length < 2) {
      setCities([]);
      setSelectedCityRef("");
      setWarehouses([]);
      setSelectedWarehouseRef("");
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        setLoadingCities(true);
        setNpError("");

        const response = await fetch(NOVA_POSHTA_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: NOVA_POSHTA_API_KEY,
            modelName: "Address",
            calledMethod: "searchSettlements",
            methodProperties: {
              CityName: query,
              Limit: 20,
            },
          }),
        });

        const json = await response.json();
        const addresses = json?.data?.[0]?.Addresses ?? [];
        const mapped: CityOption[] = addresses.map((item: { DeliveryCity: string; Present: string }) => ({
          ref: item.DeliveryCity,
          name: item.Present,
        }));
        setCities(mapped);
      } catch {
        setNpError("Не вдалося завантажити міста Нової Пошти.");
      } finally {
        setLoadingCities(false);
      }
    }, 350);

    return () => window.clearTimeout(timer);
  }, [cityQuery]);

  useEffect(() => {
    if (!selectedCityRef) {
      setWarehouses([]);
      setSelectedWarehouseRef("");
      return;
    }

    const loadWarehouses = async () => {
      try {
        setLoadingWarehouses(true);
        setNpError("");

        const response = await fetch(NOVA_POSHTA_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apiKey: NOVA_POSHTA_API_KEY,
            modelName: "AddressGeneral",
            calledMethod: "getWarehouses",
            methodProperties: {
              CityRef: selectedCityRef,
              Limit: 100,
            },
          }),
        });

        const json = await response.json();
        const mapped: WarehouseOption[] = (json?.data ?? []).map((item: { Ref: string; Description: string }) => ({
          ref: item.Ref,
          name: item.Description,
        }));
        setWarehouses(mapped);
      } catch {
        setNpError("Не вдалося завантажити відділення Нової Пошти.");
      } finally {
        setLoadingWarehouses(false);
      }
    };

    void loadWarehouses();
  }, [selectedCityRef]);

  const handleCityPick = (value: string) => {
    setCityQuery(value);
    const found = cities.find((city) => city.name === value);
    setSelectedCityRef(found?.ref ?? "");
    setSelectedWarehouseRef("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCityRef || !selectedWarehouseRef) {
      setNpError("Оберіть місто та відділення для доставки.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-shell relative py-12 md:py-32">
      <span className="section-number">07</span>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="ДАВАЙ ПОЗНАЙОМИМОСЬ" line2="БЛИЖЧЕ" />
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
                <p className="mt-2 text-muted">Заявку на доставку отримано. Зв&apos;яжемось із вами найближчим часом.</p>
              </motion.div>
            ) : (
              <>
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
                  <div>
                    <label
                      htmlFor="city"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Місто (Нова Пошта)
                    </label>
                    <input
                      id="city"
                      required
                      list="np-cities-list"
                      value={cityQuery}
                      onChange={(e) => handleCityPick(e.target.value)}
                      className="mt-2 w-full resize-none border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink"
                      placeholder="Почніть вводити місто..."
                    />
                    <datalist id="np-cities-list">
                      {cities.map((city) => (
                        <option key={city.ref} value={city.name} />
                      ))}
                    </datalist>
                    {loadingCities ? (
                      <p className="mt-2 text-xs text-muted">Шукаємо міста...</p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="warehouse"
                      className="text-xs font-semibold uppercase tracking-wider text-muted"
                    >
                      Відділення
                    </label>
                    <select
                      id="warehouse"
                      required
                      value={selectedWarehouseRef}
                      onChange={(e) => setSelectedWarehouseRef(e.target.value)}
                      disabled={!selectedCityRef || loadingWarehouses}
                      className="mt-2 w-full border-b border-ink/15 bg-transparent py-3 text-base outline-none transition-colors focus:border-ink disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <option value="">
                        {loadingWarehouses
                          ? "Завантажуємо відділення..."
                          : selectedCityRef
                            ? "Оберіть відділення"
                            : "Спочатку оберіть місто"}
                      </option>
                      {warehouses.map((warehouse) => (
                        <option key={warehouse.ref} value={warehouse.ref}>
                          {warehouse.name}
                        </option>
                      ))}
                    </select>
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
