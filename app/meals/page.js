import Link from "next/link";
import style from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/components/lib/meals";
import { Suspense } from "react";

async function Meals() {
  // getMeals() from sql data base
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

export default async function MealsPage() {
  return (
    <>
      <header className={style.header}>
        <h1>
          Delicious meal, Created{" "}
          <span className={style.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself, its easy and fun.
        </p>
        <p className={style.cta}>
          <Link href="/meals/share">Share Your favorite Recipe</Link>
        </p>
      </header>
      <main className={style.main}>
        <Suspense fallback={<p className={style.loading}>Fetching Meals..</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
