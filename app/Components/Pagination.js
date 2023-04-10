import styles from "../Styles/Pagination.module.css"

function Pagination({ previousProp, nextProp, previousUrl, nextUrl}) {


  return (
    <div className={styles.Pagination}>
        {previousUrl && <button onClick={previousProp}>Previous</button>}
        {nextUrl && <button onClick={nextProp}>Next</button>}
    </div>
  )
}

export default Pagination;