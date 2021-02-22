
import React from 'react';
import {Table} from "@material-ui/core"
import AddCircleIcon from '@material-ui/icons/AddCircle';

const FoodsDisplay = ({foods, setSelectedFood, setFoodId}) => {

  const handleSelectFood = (e, id) => {
    setSelectedFood(e.target.parentNode.parentNode.parentNode.children[0].innerText)
    setFoodId(id)
  }
  
  return (
    <React.Fragment>

      <div>
        <h1>Food Search</h1>
            <div className="table-calories">
              <Table >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Calories
                        (Per Unit)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {foods.map(food => <tr>
                      <td>{food.name}</td>
                      <td>{food.category}</td>
                      <td>{food.calories}</td>
                      <td><AddCircleIcon onClick={(e) => handleSelectFood(e, food.id)} fontSize="small" style={{ fontSize: 20, color: "pink" }} /></td>
                    </tr>
                    )}
                    
                  </tbody>
                </Table>
            </div>
        </div>
    
    </React.Fragment>
  )
}

export default FoodsDisplay;

