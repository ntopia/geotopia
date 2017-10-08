import * as PIXI from 'pixi.js';

function setupGrid(parent: PIXI.Container) {
    let grid = new PIXI.Graphics();
    grid.lineStyle(1, 0x555555, 1);
    grid.moveTo(-50, 50);
    grid.lineTo(900, 50);
    grid.moveTo(-50, 100);
    grid.lineTo(900, 100);

    parent.addChild(grid);
}

function setupApp(app: PIXI.Application) {
    let objectStage = new PIXI.Container();

    setupGrid(objectStage);

    let line = new PIXI.Graphics();
    line.lineStyle(3, 0, 1);
    line.moveTo(1, 1);
    line.lineTo(200, 200);
    objectStage.addChild(line);

    let canvasDOM = app.renderer.view;

    let backgroundStage = new PIXI.Container();
    backgroundStage.interactive = true;
    backgroundStage.hitArea = new PIXI.Rectangle(0, 0, 800, 600);

    let isDragging = false;
    let prevX = 0, prevY = 0;

    canvasDOM.addEventListener('pointerdown', function (ev) {
        isDragging = true;
        let rect = canvasDOM.getBoundingClientRect();
        let x = ev.clientX - rect.left, y = ev.clientY - rect.top;
        prevX = x; prevY = y;
    });
    canvasDOM.addEventListener('pointerup', function (ev) {
        isDragging = false;
    });
    canvasDOM.addEventListener('pointermove', function (ev) {
        if (!isDragging) return;

        let rect = canvasDOM.getBoundingClientRect();
        let x = ev.clientX - rect.left, y = ev.clientY - rect.top;
        let dx = x - prevX, dy = y - prevY;

        objectStage.position.x += dx;
        objectStage.position.y += dy;
        prevX = x; prevY = y;
    });
    canvasDOM.addEventListener('wheel', function (ev) {

    });

    backgroundStage.addChild(objectStage);
    app.stage.addChild(backgroundStage);
}

document.addEventListener('DOMContentLoaded', () => {
    let app = new PIXI.Application(800, 600,
        {
            antialias: true, transparent: false, resolution: 1, backgroundColor: 0xcccccc
        }
    );
    document.body.appendChild(app.view);
    setupApp(app);
});
