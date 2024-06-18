"use client";
import Link from "next/link";
import style from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { useEffect, useState } from "react";

function Meals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchMeals() {
    try {
      const response = await fetch("/api/meals", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const { data } = await response.json();
      // console.log(data);
      setMeals(data);
    } catch (error) {
      console.error("Failed to fetch meals:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) {
    return <p className={style.loading}>Fetching Meals...</p>;
  }

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
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
        <Meals />
      </main>
    </>
  );
}
