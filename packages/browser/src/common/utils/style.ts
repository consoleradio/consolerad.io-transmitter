export function setStyle(element: HTMLElement, style: Partial<CSSStyleDeclaration>): () => void {
    const props = Object.keys(style);
    const propsCount = props.length;
    const previousStyle = {};
    let currentProp: string;

    for (let i = 0; i < propsCount; i++) {
        currentProp = props[i];

        previousStyle[currentProp] = element.style[currentProp];

        element.style[currentProp] = style[currentProp];
    }

    return () => {
        for (let i = 0; i < propsCount; i++) {
            currentProp = props[i];
            element.style[currentProp] = previousStyle[currentProp];
        }
    };
}

export function injectStyleRules(rules: string, doc: Document = document) {
    const s = doc.createElement("style");
    s.innerHTML = rules.replace(/\n/g, "");
    doc.head.appendChild(s);
}