const { ImageAnnotatorClient } = require('@google-cloud/vision');
const client = new ImageAnnotatorClient();

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = process.env.GOOGLE_APPLICATION_CREDENTIALS;


async function logoDetection(req, res, next) {
    try {
        const [result] = await client.logoDetection('https://res.cloudinary.com/dizg5ajyl/image/upload/v1696960802/qz30virmoxeuvrxjwomd.png');
        const cloudVisionApi = result.logoAnnotations;
        if (!cloudVisionApi || cloudVisionApi.length === 0) {
            return res.status(404).json({ message: 'No LOGO detected. choose your LOGO' });
        }
        if (req.route.path === '/all') {
            req.logoDetails = cloudVisionApi[0].description;
            return next();
        }
        res.json(cloudVisionApi[0].description);
    } catch (error) {
        console.error('Error fetching logos:', error);
        res.status(500).send('Error fetching logos');
    }
}




async function labelDetection (req, res, next){
    try {
              const [result] = await client.labelDetection('https://res.cloudinary.com/dizg5ajyl/image/upload/v1696960802/qz30virmoxeuvrxjwomd.png');
              const label = result.labelAnnotations[0].description;
       
         if (req.route.path === '/all') {
            req.labelDetails = label;
            return next();
        }
            res.json(label);
        } catch (error) {
              console.error('Error fetching labels:', error);
              res.status(500).send('Error fetching labels');
            }
}


async function imageProperties (req, res, next){
    try {
            const [result] = await client.imageProperties('https://res.cloudinary.com/dizg5ajyl/image/upload/v1696960802/qz30virmoxeuvrxjwomd.png');
            const colorRgb = result.imagePropertiesAnnotation.dominantColors.colors[0].color;

            let rgb_arr = [colorRgb.red, colorRgb.green, colorRgb.blue];
            let hex:string = "#" + rgb_arr.map(e=>e.toString(16).padStart(2, "0")).join("")

          if (req.route.path === '/all') {
            req.hexColor = hex;
            return next();
        }
          res.json(hex);
        } catch (error) {
            console.error('Error fetching labels:', error);
            res.status(500).send('Error fetching labels');
          }
}



function sendFinalResponse(req, res) {
    res.json({
        logos: req.logoDetails,
        labels: req.labelDetails,
        hexColor: req.hexColor
    });
}







export default {
   logoDetection,
   labelDetection,
   imageProperties,
   sendFinalResponse,
  };
  