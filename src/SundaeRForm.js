import React from "react";

function SundaeRForm({handleChange, handleForm, formData, showReviews}){

    return(
        <form onSubmit={handleForm} style={{display: showReviews}}>
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            ></input>
            <label>Comment</label>
            <input
                type="text"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
            ></input>
            <button type="submit">Submit</button>
        </form>
    )
}

export default SundaeRForm