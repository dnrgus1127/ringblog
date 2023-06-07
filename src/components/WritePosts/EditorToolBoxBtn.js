import React from 'react'
import styled from 'styled-components'

const ToolBoxButton = styled.button`
    padding : 1rem;
    color : ${({ theme }) => theme.btnColor};
    /* color : ${({ theme }) => theme.pointColor}; */
    
    font-size : 1.8rem;
    &:hover {
        font-weight: 800;
        border-radius: 2px;
        background-color: ${({ theme }) => theme.bgElement3};
    }
    ${(props) => props.type === 'bold' && `font-weight : 800`};
    ${(props) => props.type === 'italic' && `font-style : italic`};
    ${(props) => props.type === 'cancle' && `text-decoration: line-through;`};
`

export default function EditorToolBoxBtn({ icon = "h1", onClick, type = "header" }) {
    return (
        <ToolBoxButton onClick={onClick} type={type}>
            {icon}
        </ToolBoxButton>
    )
}