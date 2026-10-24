import { level1 } from "./levels.js";
import { canEscape, removeArrow} from "./logic.js";

let arrows = level1.arrows
const size = level1.size

const a3 = arrows.find((a) => a.id === 3)

console.log('Arrow 1:', canEscape(arrows[0], arrows, size));
console.log('Arrow 3:', canEscape(a3, arrows, size));

arrows = removeArrow(arrows, 1)
console.log('Arrow 3 ab:', canEscape(a3, arrows, size));