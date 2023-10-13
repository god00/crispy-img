# crispy-img
This is the repository for processing images by using sharp library.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

Ensure you have Node.js installed. Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
npm install
```

## Usage

Run the script using:
```bash
npm start -- <inputImagePath> [outputImagePath] [options]
```

## Option

- --width, -w: Set the width of the output image.
- --height, -h: Set the height of the output image.
- --crop, -c: Set the cropping region (JSON string).
- --format, -f: Set the output image format (JSON string).
- --grayscale, -g: Convert the image to grayscale.
- --blur, -b: Apply blur to the image.
- --sharpen, -s: Apply sharpening to the image.
- --out, -o: Set the output path for the processed image.

## Examples

```bash
# Resize and convert to grayscale
npm start -- input.jpg -w 300 -h 200 -g

# Crop and apply blur
npm start -- input.jpg --crop '{"left": 10, "top": 10, "width": 300, "height": 200}' -b 5 -o output.jpg

# Crop and set width and format to png
npm start -- input.jpg --crop '{"left": 10, "top": 10, "width": 300, "height": 200}' -w 500 -f '{"id": "png", "quality": 85}' -o t.png
```

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature/your-feature.
5. Submit a pull request.

## License
This project is licensed under the MIT License.