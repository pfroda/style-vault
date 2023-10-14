const { ImageAnnotatorClient } = require('@google-cloud/vision');
const client = new ImageAnnotatorClient();

process.env['GOOGLE_APPLICATION_CREDENTIALS'] = process.env.GOOGLE_APPLICATION_CREDENTIALS;

async function logoDetection(req, res, next) {
    const imageUrl = req.body.imageUrl;

    try {
        const [result] = await client.logoDetection(imageUrl);
        const cloudVisionApi = result.logoAnnotations;

        if (!cloudVisionApi || cloudVisionApi.length === 0) {
            // no logo is detected, continue to next step
            req.logoDetails = '';
        } else {
            req.logoDetails = cloudVisionApi[0].description;
        }

        return next();

    } catch (error) {
        console.error('Error fetching logos:', error);
        res.status(500).send('Error fetching logos');
    }
}



// Cambiar nombre, labelDetection esta comentada, esta funcion es objectLocalization
async function labelDetection(req, res, next) {
    const imageUrl = req.body.imageUrl;

    try {
        const [result] = await client.objectLocalization(imageUrl);
        const label = result.localizedObjectAnnotations[0].name;
         console.log("esto -->",label)

        req.labelDetails = label;
        return next();
        
    } catch (error) {
        console.error('Error fetching labels:', error);
        res.status(500).send('Error fetching labels');
    }
}



// async function labelDetection(req, res, next) {
//     const imageUrl = req.body.imageUrl;

//     try {
//         const [result] = await client.labelDetection(imageUrl);
//         const label = result.labelAnnotations[0].description;


//         req.labelDetails = label;
//         return next();
        
//     } catch (error) {
//         console.error('Error fetching labels:', error);
//         res.status(500).send('Error fetching labels');
//     }
// }


async function imageProperties(req, res, next) {
    const imageUrl = req.body.imageUrl;

    try {
        const [result] = await client.imageProperties(imageUrl);
        const colorRgb = result.imagePropertiesAnnotation.dominantColors.colors[0].color;
        let rgb_arr = [colorRgb.red, colorRgb.green, colorRgb.blue];

        // let hex = "#" + rgb_arr.map(e => e.toString(16).padStart(2, "0")).join("");

        // req.hexColor = hex;
        req.hexColor = rgb_arr;

        // Continue to the next step
        return next();
    } catch (error) {
        console.error('Error fetching image properties:', error);
        res.status(500).send('Error fetching image properties');
    }
}






function sendFinalResponse(req, res) {
    res.json({
        logos: req.logoDetails,
        labels: req.labelDetails,
        hexColor: req.hexColor
    });
}


// localizedObjectAnnotations


export default {
    logoDetection,
    labelDetection,
    imageProperties,
    sendFinalResponse,
    // localizedObjectAnnotations
};


