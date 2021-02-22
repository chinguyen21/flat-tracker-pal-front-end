
import React from 'react';
import {Table} from "@material-ui/core"
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

const Dinner = ({user_foods, handleDelete}) => {

  return (
    <React.Fragment>

      <div className='rowC'>
            <div className="meal"><span>Dinner</span></div>
            <div className="table-calories">
              <Table >
                  <thead>
                    <tr>
                      <th><FastfoodIcon /></th>
                      <th><FormatListNumberedIcon /></th>
                      <th>Calories</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {user_foods.map(user_food => 
                      <tr>
                      <td>{user_food.food.name}</td>
                      <td>{user_food.quantity}</td>
                      <td>{user_food.quantity * user_food.food.calories}</td>
                        <td style={{color: "pink"}} onClick={() => handleDelete(user_food)}>x</td>
                    </tr>
                    )}
                    
                  </tbody>
                </Table>

            </div>
        </div>
    
    </React.Fragment>
  )
}

export default Dinner;

