const { Shape } = require('./shapes.js');

class SVG {
    constructor (width = 300, height = 200) {
        this.width = width;
        this.height = height;
        this.elements = [];
    }
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }

    setText(text, color) {
        this.text = { content: text, color };
    }

    setShape(shape) {
        if (!(shape instanceof Shape)) {
        throw new Error("Invalid shape object");
        }
        this.elements.push(shape);
    }

    render() {
        let svg = `<svg version="1.1" width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">`;

        // Add shapes
        this.elements.forEach((element) => {
        svg += element.render();
        });

        // Add text
        if (this.text) {
        const { content, color } = this.text;
        const x = this.width / 2;
        const y = this.height / 2;
        svg += `<text x="${x}" y="${y}" font-size="60" text-anchor="middle" fill="${color}">${content}</text>`;
        }

        svg += `</svg>`;
        return svg;
    }
}

module.exports = SVG;