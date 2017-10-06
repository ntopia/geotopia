
import * as PIXI from 'pixi.js';

document.addEventListener('DOMContentLoaded', () => {
    let app = new PIXI.Application(800, 600,
        {
            antialias: true, transparent: false, resolution: 1, backgroundColor: 0xcccccc
        }
    );
    document.body.appendChild(app.view);

    let stage = new PIXI.Container();

    let line = new PIXI.Graphics();
    line.lineStyle(3, 0, 1);
    line.moveTo(1, 1);
    line.lineTo(200, 200);
    stage.addChild(line);

    app.stage.addChild(stage);
});
