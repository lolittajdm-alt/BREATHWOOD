"use client";

import { FeatureHeading } from "@/components/ui/FeatureHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const mainFeatures = [
  {
    line1: "ДОПОМОГА ПРИ",
    line2: "ВІДМОВІ ВІД КУРІННЯ",
    text: "Пристрій відмінно імітує звичний ритуал «рука-рот», допомагаючи подолати психологічну залежність без шкоди для здоров'я, диму та нікотину.",
  },
  {
    line1: "АРОМАТЕРАПІЯ",
    line2: "ТА СМАКИ",
    text: "Інгалятор легко налаштовується під ваші уподобання. Використовуйте улюблені ефірні олії або ароматичні картриджі, щоб створити індивідуальний мікс для розслаблення, концентрації чи тонусу.",
  },
  {
    line1: "ДИХАЛЬНА",
    line2: "МЕДИТАЦІЯ",
    text: "Спеціально розроблена конструкція оптимізує опір повітря під час вдиху, допомагаючи практикувати глибоке, розмірене дихання для зняття тривожності та стресу.",
  },
  {
    line1: "ПРЕМІАЛЬНИЙ",
    line2: "ДИЗАЙН",
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

        <div className="mt-8 max-w-3xl space-y-10 sm:mt-10 sm:space-y-14">
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base md:text-lg">
              Я — це стильний та екологічний девайс, створений для тих, хто прагне
              м&apos;яко відмовитися від куріння, впоратися зі стресом та впровадити
              усвідомлене дихання у повсякденне життя.
            </p>
          </Reveal>

          <div className="h-px w-full bg-border" />

          <div className="space-y-10 sm:space-y-14">
            <Reveal delay={0.15}>
              <SectionHeading line1="ОСНОВНІ ПЕРЕВАГИ" line2="ТА ФУНКЦІЇ" />
            </Reveal>

            <ul className="space-y-10 sm:space-y-12">
              {mainFeatures.map((feature, i) => (
                <li key={feature.line1}>
                  <Reveal delay={0.2 + i * 0.08}>
                    <FeatureHeading line1={feature.line1} line2={feature.line2} />
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg">
                      {feature.text}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
