import sharp from 'sharp';
import path from 'path';

interface ImageOptions {
  width?: number;
  height?: number;
  crop?: sharp.Position;
  format?: sharp.OutputFormatInfo;
  grayscale?: boolean;
  blur?: number;
  sharpen?: number;
}

interface CommandLineArgs {
  inputImagePath: string;
  outputImagePath: string;
  options: ImageOptions;
}

const parseCommandLineArgs = (): CommandLineArgs => {
  if (process.argv.length < 4 || process.argv.length > 18) {
    console.error('Usage: node imageProcessor.js <inputImagePath> [outputImagePath] [options]');
    process.exit(1);
  }
  const inputImagePath = process.argv[2];
  let outputImagePath = 'output_image.jpg';
  outputImagePath = path.resolve(process.cwd(), outputImagePath);

  const options: ImageOptions = {};

  const outputArgIndex = process.argv.findIndex((arg) => arg === '-o' || arg === '--out')
  if (outputArgIndex !== -1) {
    outputImagePath = process.argv[outputArgIndex + 1]
    process.argv.splice(outputArgIndex, 2)
  }

  for (let i = 3; i < process.argv.length; i += 2) {
    const option = process.argv[i].toLowerCase();

    switch (option) {
      case '--width':
      case '-w':
        options.width = parseInt(process.argv[i + 1], 10);
        break;
      case '--height':
      case '-h':
        options.height = parseInt(process.argv[i + 1], 10);
        break;
      case '--crop':
      case '-c':
        options.crop = JSON.parse(process.argv[i + 1]) as sharp.Position;
        break;
      case '--format':
      case '-f':
        options.format = JSON.parse(process.argv[i + 1]) as sharp.OutputFormatInfo;
        break;
      case '--grayscale':
      case '-g':
        options.grayscale = true;
        i -= 1;
        break;
      case '--blur':
      case '-b':
        options.blur = parseFloat(process.argv[i + 1]);
        break;
      case '--sharpen':
      case '-s':
        options.sharpen = parseFloat(process.argv[i + 1]);
        break;
      default:
        console.error(`Unknown option: ${process.argv[i]}`);
        process.exit(1);
    }
  }

  return { inputImagePath, outputImagePath, options };
};

const processImage = async (inputPath: string, outputPath: string, options: ImageOptions): Promise<void> => {
  try {
    let pipeline = sharp(inputPath);

    if (options.width || options.height) {
      pipeline = pipeline.resize(options.width, options.height);
    }

    if (options.crop) {
      pipeline = pipeline.extract(options.crop);
    }

    if (options.grayscale) {
      pipeline = pipeline.grayscale();
    }

    if (options.blur) {
      pipeline = pipeline.blur(options.blur);
    }

    if (options.sharpen) {
      pipeline = pipeline.sharpen(options.sharpen);
    }

    if (options.format) {
      pipeline = pipeline.toFormat(options.format);
    }

    await pipeline.toFile(outputPath);

    console.log('Image processed successfully!');
  } catch (error) {
    console.error('Error processing image:', error);
  }
};

const { inputImagePath, outputImagePath, options } = parseCommandLineArgs();
processImage(inputImagePath, outputImagePath, options);
