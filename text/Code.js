import React from "react";
import styled from "styled-components";
import Theme from "../theme";

const CodeBlock = styled.pre`
    font-family: 'Fira Code', monospace;
    border-left: 3px solid;
    border-image: linear-gradient(
      to bottom, 
      ${Theme.Colors.Blue}, 
      ${Theme.Colors.Purple}
    ) 1 100%;
    margin: 0;
    padding: 1rem 1.5rem;
    flex: 1 0 auto;
`;

const StringStyle = styled.span`
    color: ${Theme.Colors.Code.String};
`;

const TextStyle = styled.span`
    color: ${Theme.Colors.Code.Text};
`;

const AttributeStyle = styled.span`
    color: ${Theme.Colors.Code.Attribute};
`; 

const TagStyle = styled.span`
    color: ${Theme.Colors.Code.Tag};
`;

const TagBracketsStyle = styled.span`
    color: ${Theme.Colors.Code.Tag}66;
`;

const OperatorStyle = styled.span`
    color: ${Theme.Colors.Code.Operator};
`;

export default function({text}) {
    const formattedCode = formatCode(cleanCode(text));

    return <CodeBlock>{formattedCode}</CodeBlock>;
}


function cleanCode(input) {
    const removeInitialLineBreak = string => string.replace(/\n/, "");
    const removeTrailingWhitespace = string => string.replace(/\s+$/, "");
    const trimmedInput = removeTrailingWhitespace(removeInitialLineBreak(input));

    const [indentPattern] = trimmedInput.match(/\s+/, "");
    const normalizeIndents = string => string.replace(new RegExp(indentPattern, "g"), "");

    return normalizeIndents(trimmedInput);
}

function formatCode(input) {
    const patterns = [
        {
            label: "Strings bound in quotes",
            match: /("[^"]+")/g,
            Component: StringStyle
        },
        {
            label: "Strings between tags",
            match: /([^(<\/)\<\>(\/>)]+)/g,
            matchBehind: /\/?\>$/g,
            matchAhead: /^\<\/?/g,
            Component: TextStyle
        },
        {   
            label: "Open Tags",
            match: /([\w]+)/g,
            matchBehind: /\<\/?$/g,
            Component: TagStyle
        },
        {
            label: "Close Tags",
            match: /([\w]+)/g,
            matchBehind: /\<\/?$/g,
            matchAhead: /^\/?\>/g,
            Component: TagStyle
        },
        {   
            match: /([\w-]+)/g,
            Component: AttributeStyle
        },
        {   
            match: /([\<\/\>]+)/g,
            Component: TagBracketsStyle
        },
        {   
            match: /([\=]+)/g,
            Component: OperatorStyle
        }
    ];

    return patterns.reduce((acc, {Component, ...pattern}) => {
        // Skip disabled patterns
        if (pattern.disable) return acc;

        const iteration = acc.reduce((tokens, token, index) => {
            // Skip this token if it's already a component
            if(typeof token !== "string") return tokens.concat([token]);
            const subTokens = token.split(pattern.match).filter(Boolean);

            const processTokens = (item, i) => {
                if (typeof item !== "string") return item;
                
                const matchPattern = (testPattern, offset = 0) => {
                    if (!testPattern) return true;
                    const testItem = subTokens[i + offset] || acc[index + offset];
                    if (typeof testItem !== "string") return false;

                    return testItem && testItem.match(testPattern);
                }

                const conditions = [
                    matchPattern(pattern.match),
                    matchPattern(pattern.matchAhead, 1),
                    matchPattern(pattern.matchBehind, -1)
                ];

                return conditions.every(Boolean) 
                    ? <Component>{item}</Component>
                    : item;
            };

            return tokens.concat(subTokens.map(processTokens));
        }, []);
        console.log(iteration);
        return iteration;
    }, [input]);
}