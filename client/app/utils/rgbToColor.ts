type RGB = [number, number, number];
type ColorData = { color: string; value: string };

export default function rgbToColor(rgb: string): string {
  if (!rgb || rgb.length !== 3) {
    return ' ';
  }

  const colorsData = [
    { color: 'White', value: '#FFFFFF' },
    { color: 'Silver', value: '#C0C0C0' },
    { color: 'Gray', value: '#808080' },
    { color: 'Black', value: '#000000' },
    { color: 'Red', value: '#FF0000' },
    { color: 'Maroon', value: '#800000' },
    { color: 'Yellow', value: '#FFFF00' },
    { color: 'Olive', value: '#808000' },
    { color: 'Lime', value: '#00FF00' },
    { color: 'Green', value: '#008000' },
    { color: 'Aqua', value: '#00FFFF' },
    { color: 'Teal', value: '#008080' },
    { color: 'Blue', value: '#0000FF' },
    { color: 'Navy', value: '#000080' },
    { color: 'Fuchsia', value: '#FF00FF' },
    { color: 'Purple', value: '#800080' }
  ];

  function hexToRgb(hex: string): RGB {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  let closestColor = colorsData[0].color;
  let smallestDistance = Infinity;

  colorsData.forEach(({ color, value }) => {
    const [r2, g2, b2] = hexToRgb(value);
    const distance = Math.sqrt((r2 - rgb[0]) ** 2 + (g2 - rgb[1]) ** 2 + (b2 - rgb[2]) ** 2);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestColor = color;
    }
  });

  return closestColor;
}


// export default function rgbToColor(rgb) {

//   if (!rgb || rgb.length !== 3) {
//     return ' ';
//   }
  
//   const colors = {
//     White: [255, 255, 255],
//     Silver: [192, 192, 192],
//     Gray: [128, 128, 128],
//     Black: [0, 0, 0],
//     Red: [255, 0, 0],
//     Maroon: [128, 0, 0],
//     Yellow: [255, 255, 0],
//     Olive: [128, 128, 0],
//     Lime: [0, 255, 0],
//     Green: [0, 128, 0],
//     Aqua: [0, 255, 255],
//     Teal: [0, 128, 128],
//     Blue: [0, 0, 255],
//     Navy: [0, 0, 128],
//     Fuchsia: [255, 0, 255],
//     Purple: [128, 0, 128]
//   };

//   let minDist = 1000;
//   let closest;

//   for (let name in colors) {
//     let color = colors[name];
//     let dist = Math.sqrt(Math.pow(color[0] - rgb[0], 2) + Math.pow(color[1] - rgb[1], 2) + Math.pow(color[2] - rgb[2], 2));

//     if (dist < minDist) {
//       minDist = dist;
//       closest = name;
//     }
//   }

//   return closest;
// }

 