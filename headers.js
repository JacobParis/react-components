import React from "react";
import styled from "styled-components";

import Theme from "./theme";

export const Header = styled.div`
    background-image: url(${({image}) => image});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    margin: 0 0 -4rem 0;
    border-radius: ${({float}) => float ? Theme.Layout.Corners : "0"};
    height: 600px;
    position: relative;
    z-index: 0;
    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-image: ${getGradientFromProps};
        background-color: ${getColorFromProps};
        border-radius: ${({float}) => float ? Theme.Layout.Corners : "0"};
        z-index: -1;
        opacity: 0.4
    }
`;

export const HeaderContent = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex: 1 1 auto;
    text-align: center;
    padding: 1rem 4rem 4rem 4rem;
`;

export const HeaderTitle = styled.h1`
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 4.5rem;
    color: white;
    text-transform: uppercase;
    font-weight: normal;
`;

export const HeaderDescription = styled.p`
    font-family: Roboto, sans-serif;
    font-size: 1.3rem;
    color: white;
    text-align: center;
`;

function getColorFromProps(props) {
    if ("red" in props) return Theme.Colors.Red;
    if ("orange" in props) return Theme.Colors.Orange;
    if ("olive" in props) return Theme.Colors.Olive;
    if ("green" in props) return Theme.Colors.Green;
    if ("blue" in props) return Theme.Colors.Blue;
    if ("purple" in props) return Theme.Colors.Purple;
    if ("black" in props) return Theme.Shades.Darkest;
    if ("white" in props) return Theme.Shades.White;

    return "transparent";
}

function getGradientFromProps(props) {
    if ("to-red" in props) return `linear-gradient(0deg, transparent, ${Theme.Colors.Red})`;
    if ("to-orange" in props) return `linear-gradient(0deg, transparent, ${Theme.Colors.Orange})`;
    if ("to-olive" in props) return `linear-gradient(0deg, transparent, ${Theme.Colors.Olive})`;
    if ("to-green" in props) return `linear-gradient(0deg, transparent, ${Theme.Colors.Green})`;
    if ("to-blue" in props) return `linear-gradient(0deg, transparent, ${Theme.Colors.Blue})`;
    if ("to-purple" in props) return `linear-gradient(0deg, transparent, ${Theme.Colors.Purple})`;
    if ("to-black" in props) return `linear-gradient(0deg, transparent, #000)`;
    if ("to-blerg" in props) return `linear-gradient(0deg, transparent, #B02)`;

    return "none";
}
//linear-gradient(to right, #D74059, #A234D5);
