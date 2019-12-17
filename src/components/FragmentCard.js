import React from 'react'

const FragmentCard = (props) => {
    return (
        <li><h3>{props.fragment.title}</h3><p>{props.fragment.text}</p></li>
    )
}

export default FragmentCard