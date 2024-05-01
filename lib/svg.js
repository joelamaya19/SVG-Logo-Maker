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
        let svg = `<svg version="1.1" width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">\n`;

        // Add shapes
        this.elements.forEach((element) => {
        svg += `    ${element.render()}\n`;
        });

        // Add text
        if (this.text) {
            const { content, color } = this.text;
            let x, y;

            // Calculate x and y based on the shape
            switch (this.elements.length ? this.elements[0].constructor.name : null) {
                case 'Circle':
                    x = this.width / 2;
                    y = this.height / 2 + 25; // Adjusting y for better positioning
                    break;
                case 'Triangle':
                    x = this.width / 2;
                    y = this.height / 2 + 50;
                    break;
                case 'Square':
                    x = this.width / 2;
                    y = this.height / 2 + 25;
                    break;
                default:
                    throw new Error ('Invalid Shape');
            }

            svg += `    <text x="${x}" y="${y}" font-size="60" text-anchor="middle" fill="${color}">${content}</text>\n`
        }

        svg += `</svg>`;
        return svg;
    }
}

module.exports = SVG;