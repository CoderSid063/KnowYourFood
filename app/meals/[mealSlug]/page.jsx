import Image from "next/image";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import { getMeal } from "@/components/lib/meals";

export default async function MealDetailsPage({ params }) {
  const meal = await getMeal(params.mealSlug);
  // console.log("The meal after", meal);

  if (!meal) {
    notFound();
  }

  // meal.instructions = meal.instructions.join("<br/>");

  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        {Array.isArray(meal.instructions) ? (
          <ol className={styles.instructions}>
            {meal.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        ) : (
          <p className={styles.instructions}>{meal.instructions}</p>
        )}
      </main>
    </>
  );
}
