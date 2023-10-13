export default function rgbToColor(rgb) {

  if (!rgb || rgb.length !== 3) {
    return ' ';
  }
  
  const colors = {
    White: [255, 255, 255],
    Silver: [192, 192, 192],
    Gray: [128, 128, 128],
    Black: [0, 0, 0],
    Red: [255, 0, 0],
    Maroon: [128, 0, 0],
    Yellow: [255, 255, 0],
    Olive: [128, 128, 0],
    Lime: [0, 255, 0],
    Green: [0, 128, 0],
    Aqua: [0, 255, 255],
    Teal: [0, 128, 128],
    Blue: [0, 0, 255],
    Navy: [0, 0, 128],
    Fuchsia: [255, 0, 255],
    Purple: [128, 0, 128]
  };

  let minDist = 1000;
  let closest;

  for (let name in colors) {
    let color = colors[name];
    let dist = Math.sqrt(Math.pow(color[0] - rgb[0], 2) + Math.pow(color[1] - rgb[1], 2) + Math.pow(color[2] - rgb[2], 2));

    if (dist < minDist) {
      minDist = dist;
      closest = name;
    }
  }

  return closest;
}

 