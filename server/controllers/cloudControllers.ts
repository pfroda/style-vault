const { ImageAnnotatorClient } = require('@google-cloud/vision');
const client = new ImageAnnotatorClient();

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = process.env.GOOGLE_APPLICATION_CREDENTIALS;



async function logoDetection (req, res, next) {
    try {
        const [result] = await client.logoDetection('https://res.cloudinary.com/dizg5ajyl/image/upload/v1696960802/qz30virmoxeuvrxjwomd.png');
        // './controllers/gucci.png'
        const logos = result.logoAnnotations;

        if (!logos || logos.length === 0) {
            return res.status(404).json({ message: 'No brand detected.' });
        }

        const logoDetails = logos.map(logo => ({
            description: logo.description,
            score: logo.score,
            position: logo.boundingPoly.vertices[0]
        }));

        console.log("LOGO:",logos[0].description);

        if (req.route.path === '/all') {
            req.logoDetails = logoDetails;
            return next();
        }

        res.json(logoDetails);
        
    } catch (error) {
        console.error('Error fetching logos:', error);
        res.status(500).send('Error fetching logos');
      }
}



async function labelDetection (req, res, next){
    try {
              const [result] = await client.labelDetection('https://res.cloudinary.com/dizg5ajyl/image/upload/v1696960802/qz30virmoxeuvrxjwomd.png');
              console.log("-->",result);
              const annotations = result.labelAnnotations;
              const descriptions = annotations.map(label => label.description);
              const scores = annotations.map(label => label.score)
        
         if (req.route.path === '/all') {
            req.labelDetails = { descriptions, scores };
            return next();
        }
            res.json({ descriptions, scores: scores });
        } catch (error) {
              console.error('Error fetching labels:', error);
              res.status(500).send('Error fetching labels');
            }
}


async function imageProperties (req, res, next){
    try {
            const [result] = await client.imageProperties('https://res.cloudinary.com/dizg5ajyl/image/upload/v1696960802/qz30virmoxeuvrxjwomd.png');
            console.log("-->",result);
            const imageProps = result.imagePropertiesAnnotation.dominantColors.colors;
          const imageColors = imageProps.map(color => color)
          console.log(imageProps[0])

          if (req.route.path === '/all') {
            req.imageProps = imageColors;
            return next();
        }
        
          res.json({imageColors});
         
        } catch (error) {
            console.error('Error fetching labels:', error);
            res.status(500).send('Error fetching labels');
          }
}



function sendFinalResponse(req, res) {
    res.json({
        logos: req.logoDetails,
        labels: req.labelDetails,
        imageProps: req.imageProps
    });
}







export default {
   logoDetection,
   labelDetection,
   imageProperties,
   sendFinalResponse,
  };
  