import Animal from "../../assets/Animal.svg?react";
import "./onboarding.scss";

export default function Onboarding({ onSkip }) {
  return (
    <main className="onboarding">
      <section className="onboarding__main-content">
        <Animal className="onboarding__figure" />
        <article className="onboarding__text">
          <h1 className="onboarding__title">Welcome to My Pets!</h1>
          <p className="onboarding__description">
            Discover and find the perfect pet companion for you.
          </p>
        </article>
        <button className="onboarding__skip-button" onClick={onSkip}>
          Skip
        </button>
      </section>
    </main>
  );
}
