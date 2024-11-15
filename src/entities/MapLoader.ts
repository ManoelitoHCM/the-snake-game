import 'phaser';

// export function loadMap(scene: Phaser.Scene, mapKey: string, tilesetName: string, tilesetImageKey: string, layerName: string): Phaser.Tilemaps.TilemapLayer {
//     const map = scene.make.tilemap({ key: mapKey });
//     const tileset = map.addTilesetImage(tilesetName, tilesetImageKey);
//     const layer = map.createLayer(layerName, tileset);

//     // Aplica colisões apenas nas bordas do mapa
//     addBorderCollisions(map, layerName);

//     return layer;
// }

// function addBorderCollisions(map: Phaser.Tilemaps.Tilemap, layerName: string): void {
//     const layer = map.getLayer(layerName).tilemapLayer;
//     const { width, height } = map;

//     layer.forEachTile((tile) => {
//         if (tile.x === 0 || tile.x === width - 1 || tile.y === 0 || tile.y === height - 1) {
//             tile.setCollision(true);
//         }
//     });
// }
