const { ImageAnnotatorClient } = require('@google-cloud/vision');
const client = new ImageAnnotatorClient();



process.env['GOOGLE_APPLICATION_CREDENTIALS'] = process.env.GOOGLE_APPLICATION_CREDENTIALS;

async function logoDetection (req, res) {
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

        res.json(logoDetails);
    } catch (error) {
        console.error('Error fetching logos:', error);
        res.status(500).send('Error fetching logos');
      }
}











export default {
   logoDetection
  };
  