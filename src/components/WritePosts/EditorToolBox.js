import React from 'react'
import styled from 'styled-components'
import EditorToolBoxBtn from './EditorToolBoxBtn'

const ToolBoxBlock = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    hr {
        height: 2rem;
        border: none;
        width: 1px;
        background-color: ${({ theme }) => theme.greyColor};
    }

`

export default function EditorToolBox({ changeContents }) {
    const headings = ['# ', "## ", "### ", "#### "];
    return (
        <ToolBoxBlock>
            {headings.map((item, idx) => (
                <EditorToolBoxBtn icon={`h${idx + 1}`} type='heading' onClick={() => {
                    changeContents(item, item.length);
                }} />
            ))}
            <hr />
            <EditorToolBoxBtn icon='B' type='bold' />
            <EditorToolBoxBtn icon='I' type="italic" />
            <EditorToolBoxBtn icon='T' type="cancle" />
            <hr />
            <EditorToolBoxBtn icon='💻' />
            <EditorToolBoxBtn icon='📷' />
            <EditorToolBoxBtn icon='🔗' />
            <EditorToolBoxBtn icon='💬' />


        </ToolBoxBlock>
    )
}
