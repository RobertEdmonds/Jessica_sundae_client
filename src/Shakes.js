import React,{useEffect, useState} from "react";
import ShakeReviews from "./ShakeReviews";

function Shakes(){
    const [shakes, setShakes] = useState([])
    const [reviews, setReviews] = useState([])
    const [shakeId, setShakeId] = useState(0)
    const [showReviews, setShowReviews] = useState("none")

    useEffect(()=>{
        fetch("http://localhost:3500/shakes")
        .then(resp => resp.json())
        .then(shakes => setShakes(shakes))
    },[])

    function handleLikes(item){
        fetch(`http://localhost:3500/shakes/${item.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           likes: item.likes + 1
        }),
    })
        .then(resp => resp.json())
        .then(newItem => handleUpdatedShake(newItem))
    }

    function handleReviews(item){
        const updatedItem = shakes.find(shake => shake.id === item.id)
            setShakeId(item.id)
            setShowReviews("block")
            setReviews(updatedItem.shake_reviews)
    }

    function handleUpdatedShake(item){
        const updatedItem = shakes.map(shake =>{
          if(shake.id === item.id){
            return item
          }else{
            return shake
          }
        })
        setShakes(updatedItem)
    }

    const show_shakes = shakes.map(item =>{
        return(
            <>
                <div key={item.id}>
                    <img src={item.image_url} alt={item.name} style={{width: "250px", height: "200px"}}/>
                    <h2>{item.name}</h2>
                    <p style={{width: "500px"}}>Ingredients: {item.ingredients}</p>
                    <button onClick={()=>handleLikes(item)}>Likes {item.likes}</button>
                    <button onClick={()=>handleReviews(item)}>Reviews</button>
                </div>
                <br/>
            </>
        )
    })

    return(
        <>
        <ShakeReviews reviews={reviews} setReviews={setReviews} shakeId={shakeId} showReviews={showReviews}/>
        {show_shakes}  
        </>
    )
}

export default Shakes;