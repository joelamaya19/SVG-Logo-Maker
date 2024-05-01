const { Shape } = require('./shapes');

class SVG {
    constructor(width = 300, height = 200) {
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
        if (text.length > 3) {
            throw new Error("Text must not exceed 3 characters.");
        }
        this.text = { content: text, color };

        // Adjust y-coordinate based on the shape if any shape is present
        let y = this.height / 2; // Initialize y-coordinate
        if (this.elements.length > 0) {
            switch (this.elements[0].constructor.name) {
                case 'Circle':
                    y += 25; // Adjusting y for better positioning
                    break;
                case 'Triangle':
                    y += 50;
                    break;
                case 'Square':
                    y += 25;
                    break;
                default:
                    throw new Error('Invalid Shape');
            }
        }
        this.text.positionY = y; // Store adjusted y-coordinate
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
            const { content, color, positionY } = this.text;
            let x = this.width / 2;
            let y = positionY; // Use adjusted y-coordinate

            svg += `<text x="${x}" y="${y}" font-size="60" text-anchor="middle" fill="${color}">${content}</text>`;
        }

        svg += `</svg>`;
        return svg;
    }
}

module.exports = SVG;
