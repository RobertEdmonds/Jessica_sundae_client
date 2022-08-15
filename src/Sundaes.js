import React,{useState, useEffect} from "react";
import SundaeReviews from "./SundaeReviews";

function Sundaes(){
    const [sundaes, setSundaes] = useState([])
    const [reviews, setReviews] = useState([])
    const [sundaeId, setSundaeId] = useState(0)
    const [showReviews, setShowReviews] = useState("none")
    const [help , setHelp] = useState(false)

    useEffect(()=>{
        fetch("http://localhost:3500/sundaes")
        .then(r => r.json())
        .then(sundae => setSundaes(sundae))
    },[help])

    function handleLikes(item){
        fetch(`http://localhost:3500/sundae/${item.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           likes: item.likes + 1 
        }),
    })
        .then(resp => resp.json())
        .then(newItem => handleUpdatedSundae(newItem))
        setHelp(!help)
    }

    function handleUpdatedSundae(item){
        const updatedItem = sundaes.map(sundae =>{
          if(sundae.id === item.id){
            return item
          }else{
            return sundae
          }
        })
        setSundaes(updatedItem)
    }

    function handleReviews(item){
        // fetch(`http://localhost:3500/sundae/${id}`)
        // .then(resp => resp.json())
        // .then(review => {
        //     setSundaeId(id)
        //     setShowReviews("block")
        //     setReviews(review)
        // })
        const updatedItem = sundaes.find(sundae => sundae.id === item.id)
            setSundaeId(item.id)
            setShowReviews("block")
            setReviews(updatedItem.sundae_reviews)
    }

    const show_sundae = sundaes.map(item =>{
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
        <SundaeReviews reviews={reviews} setReviews={setReviews} sundaeId={sundaeId} showReviews={showReviews}/>
        {show_sundae}
        </>
    )
}

export default Sundaes;