import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

import Styling from '../styling/Styling'
import SearchIcon from '@material-ui/icons/Search';
import {InputBase, Toolbar, Button} from "@material-ui/core"

import FoodsDisplay from '../meals/FoodsDisplay'
import Breakfast from '../meals/Breakfast'
import Lunch from '../meals/Lunch'
import Dinner from '../meals/Dinner'

const Authorization = ({user, setUser}) => {

  const[date, setDate] =useState(new Date())
  const [foods,setFoods] = useState([])
  const [search, setSearch] = useState("")
  const [selectedFood, setSelectedFood] = useState("")
  const [meal,setMeal] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [foodId, setFoodId] = useState(null)
  const [calories, setCalories] = useState(0)

  const handleDate = (date) => {
    setDate(date)
    let totalCalories = user.user_foods.filter(log => log.date === date.toLocaleString().split(',')[0]).map(log => log.food.calories * log.quantity)
    totalCalories = totalCalories.reduce((total, ele) => total + ele, 0)
    setCalories(user.target_calories - totalCalories)
  }


  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (deleteLog) => {
    let question = window.confirm("Are you sure you want to delete?")
    if (question === true) {
      fetch(`http://localhost:3000/userfoods/${deleteLog.id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(response => {
        setCalories(calories + deleteLog.food.calories * deleteLog.quantity)
        setUser({...user, user_foods: user.user_foods.filter(log => log.id !== deleteLog.id)})
      })
    }
  }

  const handleAdd = (e) => {
    // debugger
    e.preventDefault()
    const newUserFood = {
      user_id: user.id,
      food_id: foodId,
      date: date.toLocaleString().split(',')[0],
      quantity: quantity,
      meal: meal
    }
    fetch("http://localhost:3000/userfoods", {
      method: 'POST', headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUserFood)
    })
    .then(res => res.json())
    .then(respond => {
      if (respond.user_food) {
        const resUserFood = JSON.parse(respond.user_food)
        setUser({...user, user_foods: [...user.user_foods, resUserFood]})
        setSelectedFood(respond.message)
        setMeal("")
        setQuantity(1)
        setFoodId(null)
        setCalories(calories - resUserFood.food.calories * resUserFood.quantity)
      } else {
        setSelectedFood(respond.message)
      }
    })
    e.target.reset()
  }

  const filterLog =(meal) => {
    if (user && user.user_foods) {
      const logs = user.user_foods.filter(log => log.date === date.toLocaleString().split(',')[0])
      return logs.filter(log => log.meal === meal)
    } else {
      return []
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/foods")
    .then(res => res.json())
    .then(setFoods)
  },[])

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/find", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({token: localStorage.token})
    })
    .then(res => res.json())
    .then(user => {
      let totalCalories = user.user_foods.filter(log => log.date === date.toLocaleString().split(',')[0]).map(log => log.food.calories * log.quantity)
      totalCalories = totalCalories.reduce((total, ele) => total + ele, 0)
      setCalories(user.target_calories - totalCalories)
    })
  },[])

  const searchFoods = () => search ?  foods.filter(food => food.name.toLowerCase().includes(search.toLowerCase())) : []

  return (
    <header className={"App-page-1"}>
      <div>
          <h1 className="calories">{calories}</h1>
      </div>
      <h5 className="notification"> {selectedFood ? selectedFood : "Remember always keep track your eating"}</h5>
       <h1>Food Log</h1>
        <div className='rowC'>
            <div className="container-1">
              <h1>Calendar</h1>
              <Calendar className="calendar" onChange={handleDate} value={date} />
            </div>
            <div className='container-2' >
            <form onSubmit={(e) => handleAdd(e)}>
              <Toolbar>
                  <div className={Styling().search}>
                    <div className={Styling().searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      onChange={handleChange}
                      placeholder="   Search.."
                      classes={{
                        root: Styling().inputRoot,
                        input: Styling().inputInput,
                      }}
                      inputProps={{ 'aria-label': 'search' }}
                      />
                  </div>
                  <div className={Styling().authBox}>
                       <label >For </label>
                    <select name="cars" id="cars" onChange={(e) => setMeal(e.target.value)}>
                        <option value="null"></option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                  </div>
                  <div className={Styling().authBox}>
                    <label >Quantity </label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                  </div>
                  <div className={Styling().authBox}>
                    <Button type="submit" variant="outlined" size="small" >
                        Add
                    </Button>
                  </div>
                </Toolbar>
              </form>
                  <div className='rowC'>
                    <div>
                      <div className='s-meal'><Breakfast user_foods={filterLog("breakfast")} handleDelete={handleDelete} /></div>
                      <div className='s-meal'><Lunch user_foods={filterLog("lunch")} handleDelete={handleDelete}/></div>
                      <div className='s-meal'><Dinner user_foods={filterLog("dinner")} handleDelete={handleDelete}/></div>
                    </div>
                    <div className='display-foods'>
                      <FoodsDisplay foods={searchFoods()} setSelectedFood={setSelectedFood} setFoodId={setFoodId}/>
                    </div>
                  </div>
            </div>
        </div>
    </header>
    
  )
}



export default Authorization;
