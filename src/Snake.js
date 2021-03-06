import React from "react";

let Snake= (props) => {
    return (
        <div>
            {props.snakeDots.map((dot, i) => {
                const style = {
                    top: `${dot[0]}%`,
                    left: `${dot[1]}%`
            }
            return(
                <div className="snakeDot" key={i} style={style}></div>
                )
            })}
        </div>
    )
}

export default Snake;