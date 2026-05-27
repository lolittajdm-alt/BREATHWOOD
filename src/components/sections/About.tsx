"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const mainFeatures = [
  {
    title: "Допомога при відмові від куріння",
    text: "Пристрій відмінно імітує звичний ритуал «рука-рот», допомагаючи подолати психологічну залежність без шкоди для здоров'я, диму та нікотину.",
  },
  {
    title: "Ароматерапія та кастомізація смаку",
    text: "Інгалятор легко налаштовується під ваші уподобання. Використовуйте улюблені ефірні олії або ароматичні картриджі, щоб створити індивідуальний мікс для розслаблення, концентрації чи тонусу.",
  },
  {
    title: "Дихальна медитація",
    text: "Спеціально розроблена конструкція оптимізує опір повітря під час вдиху, допомагаючи практикувати глибоке, розмірене дихання для зняття тривожності та стресу.",
  },
  {
    title: "Преміальний дизайн",
    text: "Елегантний дерев'яний корпус приємно тримати в руках, а компактний розмір дозволяє носити стік із собою всюди.",
  },
];

export function About() {
  return (
    <section id="about" className="section-shell relative -mt-4 pb-12 pt-8 md:-mt-10 md:pb-16 md:pt-12">
      <span className="section-number absolute top-4 left-1 sm:top-8 sm:left-4 md:left-12">03</span>

      <div className="section-container">
        <Reveal>
          <SectionHeading line1="ПРО" line2="ПРОДУКТ" />
        </Reveal>

        <div className="mt-8 max-w-3xl space-y-8 sm:mt-10 sm:space-y-12">
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base md:text-lg">
                Я — це стильний та екологічний девайс, створений для тих, хто прагне
                м&apos;яко відмовитися від куріння, впоратися зі стресом та впровадити
                усвідомлене дихання у повсякденне життя.
              </p>
            </Reveal>

            <div className="h-px w-full bg-ink/10" />

            <Reveal delay={0.15}>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                  Основні переваги та функції
                </h4>
                <ul className="mt-4 space-y-4 sm:mt-6 sm:space-y-6">
                  {mainFeatures.map((feature) => (
                    <li key={feature.title} className="space-y-1.5 sm:space-y-2">
                      <p className="font-display text-base font-bold sm:text-lg md:text-xl">
                        {feature.title}
                      </p>
                      <p className="text-sm leading-relaxed text-muted sm:text-base">{feature.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
        </div>
      </div>
    </section>
  );
}
