import { Link } from "react-router-dom";
import { Button } from 'gestalt'

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

  const ButtonElement = ({onClick}) => {return (<Button text="Ok" onClick={onClick} />)}

  return {TextElement, ButtonElement};
}
