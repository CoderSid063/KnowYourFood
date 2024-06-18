import MealItem from "./meal-item";
import style from "./meals-grid.module.css";

export default function MealsGrid({ meals }) {
  return (
    <ul className={style.meals}>
      {meals.map((meal) => (
        <li key={meal._id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
