import React,{useState, useEffect} from "react";

function Sundaes(){
    const [sundaes, setSundaes] = useState([])
    const [ingredient, setIngredient] = useState([])
    const [ingredientShow, setIngredientShow] = useState("none")

    useEffect(()=>{
        fetch("http://localhost:3500/sundae")
        .then(r => r.json())
        .then(sundae => setSundaes(sundae))
    },[])

    function handleShowIngredients(id){
        fetch(`http://localhost:3500/sundae_ingredients/${id}`)
        .then(r => r.json())
        .then(item => setIngredient(item))
        setIngredientShow("block")
    }
    const show_ingredient = ingredient.map(item => {
        return(
            <>
            <ul style={{display: ingredientShow}}>
                <li>{item}</li>
            </ul> 
            </>
        )
    })
    const show_sundae = sundaes.map(item =>{
        return(
            <div >
                <img onClick={() => handleShowIngredients(item.id)} src={item.image_url} alt={item.name} style={{width: "250px", height: "200px"}}/>
                <h2>{item.name}</h2>
                <button>Likes {item.likes}</button>
            </div>
        )
    })
    console.log(show_ingredient[0])
    return(
        <>
        <div style={{position: "fixed", width: "50px" , left: "900px"}}>
            <h3 style={{display: ingredientShow}}>Ingredients</h3>
            {show_ingredient}
        </div>
        {show_sundae}
        </>
    )
}

export default Sundaes;