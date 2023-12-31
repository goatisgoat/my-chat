import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`

${reset}
    *{
        box-sizing: border-box;
        font-family: 'Noto Sans KR'; 
    }    
    
    body{
        line-height: 1.4;
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #323232;
    }

    html, body, div, span, h1, h2, h3, h4, h5, h6, p,
    a, dl, dt, dd, ol, ul, li, form, label, table{
        font-family: 'Noto Sans KR'; 
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    a{
        text-decoration: none;
        cursor: pointer;
        &:hover {
            cursor: pointer;
        }
    }
    a:link, a:focus, a:active, a:visited, a:hover  {
        color: inherit
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
        padding: 0;
    }
    img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;

export default GlobalStyles;
