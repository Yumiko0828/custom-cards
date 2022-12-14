import * as Canvas from "canvas";
import { join } from "node:path";
import { Level } from "../classes/Level";
import { Welcome } from "../classes/Welcome";
import Error from "../utils/Error";
import welcome from "./welcome";
import level from "./level";

// Functions
function registerFont(fontName: string, family: string) {
  Canvas.registerFont(join(__dirname, `../../fonts/${fontName}`), {
    family,
  });
  return;
}

// Register fonts
registerFont("Capriola-Regular.ttf", "Capriola Regular");
registerFont("FredokaOne-Regular.ttf", "FredokaOne Regular");
registerFont("Poppins-Bold.ttf", "Poppins Bold");
registerFont("MilkyCoffee.ttf", "Milky Coffee");

type CanvasCardType = {
  welcome: Welcome;
  level: Level;
};

async function CanvasCard<T extends keyof CanvasCardType>(
  type: T,
  model: CanvasCardType[T]
) {
  try {
    const cardTypes = {
      welcome: welcome,
      level: level,
    };

    const card = await cardTypes[type](Canvas, <any>model);
    return card;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export { CanvasCard };
