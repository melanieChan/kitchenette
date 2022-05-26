import { Link } from "react-router-dom";

/* toast data for notifying the user after cooking a recipe,
  linking to the pantry page where the updated ingredients can be seen,
  and having a button on the toast
*/
export const cookedRecipeToastData = () => {
  const TextElement =
      <div style={{textAlign: 'center'}}>
        <b>Recipe Used</b>
        <br/>
        Any pantry ingredients used for this recipe have been decremented. A serving of this recipe has also been added to your{' '}
        <b>
          <Link to='/pantry'>Pantry</Link>
        </b>
        .
      </div>;

  return {TextElement};
}

// toast data for user action of saving a recipe from one of the search results
export const savedRecipeToastData = (isUniqueAddition) => {
  const TextElement =
      <div style={{textAlign: 'center'}}>
        {isUniqueAddition ?
          <>Recipe Saved in{' '}
            <b><Link to='/cookbook'>Cookbook</Link></b>
          </>
        : <>Recipe Already Saved</>
        }
      </div>;

  return {TextElement};
}
