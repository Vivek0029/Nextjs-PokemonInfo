import styles from "../Styles/Pokecard.module.css";

function Pokecard({ name, image, attacks }) {
  let previousPoke = null;

  return (
    <div className={styles.pokecard}>
      <h2>{name}</h2>
      <img src={image} className={styles.image} />
      <div>
        <div className={styles.ability}>
          {attacks.map((poke) => {
            if (poke !== previousPoke) {
              previousPoke = poke;
              return <h2 key={poke}>{poke.charAt(0).toUpperCase() + poke.slice(1)}</h2>;
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Pokecard;
