import React, {useState} from "react";
import ShakeRForm from "./ShakeRForm";

function ShakeReviews({reviews, setReviews, shakeId, showReviews}){
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        comment: '',
        shake_id: 0,
        likes: 0
    })

    function handleHelpful(review){
        fetch(`http://localhost:3500/shake_reviews/${review.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: review.name,
            comment: review.comment,
            likes: review.likes + 1 
        }),
    })
        .then(resp => resp.json())
        .then(newItem => handleAddHelpful(newItem))
    }

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value, "shake_id": shakeId})
    }

    function handleAddForm(e){
        e.preventDefault()
        fetch(`http://localhost:3500/shake_reviews`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        })
        .then(resp => resp.json())
        .then(newItem => handleAddComment(newItem))
        setFormData({
            name: '',
            comment: '',
            shake_id: 0,
            likes: 0
        })
    }

    function handleAddComment(item){
        setReviews([...reviews, item])
    }

    function populateForm(review){
        setFormData({
            name: review.name,
            comment: review.comment,
            id: review.id,
            likes: review.likes
        })
        setEditing(true)
    }

    function handleEditForm(e){
        e.preventDefault()
        fetch(`http://localhost:3500/shake_reviews/${formData.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
            name: formData.name,
            comment: formData.comment,
            likes: formData.likes
        }),
        })
        .then(resp => resp.json())
        .then(newItem => handleEditComment(newItem))
        setFormData({
            name: '',
            comment: '',
            shake_id: 0,
            likes: 0
        })
        setEditing(false)
    }

    function handleEditComment(item){
        const updatedItem = reviews.map(review=>{
            if(review.id === item.id){
                return item
            }else{
                return review
            }
        })
        setReviews(updatedItem)
    }


    function handleAddHelpful(item){
        const updatedItem = reviews.map(review=>{
            if(review.id === item.id){
                return item
            }else{
                return review
            }
        })
        setReviews(updatedItem)
    }

    function handleDelete(id){
        fetch(`http://localhost:3500/shake_reviews/${id}`,{
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(item => showDelete(item))
    }

    function showDelete(item){
        const updatedItem = reviews.filter(review => review.id !== item.id)
        setReviews(updatedItem)
    }

    const show_reviews = reviews.map(item => {
        return(
            <>
            <div key={item.name}>
                <h4>{item.name}</h4>
                <p style={{}}>{item.comment}</p>
                <p style={{}}>Helpful: {item.likes}</p>
                <button style={{float: "center"}} onClick={()=>handleHelpful(item)}>Helpful</button>
                <button onClick={()=>populateForm(item)}>Edit</button>
                <button onClick={()=>handleDelete(item.id)}>Delete</button>
            </div>
            </>
        )
    })

    return(
        <div style={{width: "600px",
                left: "600px",
                position: "fixed"}}>
        {show_reviews} 
        <br/>
        <ShakeRForm handleChange={handleChange} formData={formData} handleForm={editing? handleEditForm : handleAddForm} showReviews={showReviews}/>
        </div>
    )
}

export default ShakeReviews