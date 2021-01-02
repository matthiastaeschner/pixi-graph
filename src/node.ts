import * as PIXI from 'pixi.js';
import { EventEmitter } from 'events';
import { createNode, updateNodeStyle, updateNodeVisibility } from './renderers/node';
import { createNodeLabel, updateNodeLabelStyle, updateNodeLabelVisibility } from './renderers/node-label';
import { NodeStyle } from './utils/style';
import { TextureCache } from './texture-cache';

export class PixiNode extends EventEmitter {
  nodeGfx: PIXI.Container;
  nodeLabelGfx: PIXI.Container;
  nodePlaceholderGfx: PIXI.Container;
  nodeLabelPlaceholderGfx: PIXI.Container;

  hovered: boolean = false;

  constructor() {
    super();

    this.nodeGfx = this.createNode();
    this.nodeLabelGfx = this.createNodeLabel();
    this.nodePlaceholderGfx = new PIXI.Container();
    this.nodeLabelPlaceholderGfx = new PIXI.Container();
  }

  private createNode() {
    const nodeGfx = new PIXI.Container();
    nodeGfx.interactive = true;
    nodeGfx.buttonMode = true;
    nodeGfx.on('mouseover', () => this.emit('mouseover'));
    nodeGfx.on('mouseout', () => this.emit('mouseout'));
    nodeGfx.on('mousedown', () => this.emit('mousedown'));
    nodeGfx.on('mouseup', () => this.emit('mouseup'));
    nodeGfx.on('mouseupoutside', () => this.emit('mouseupoutside'));
    createNode(nodeGfx);
    return nodeGfx;
  }

  private createNodeLabel() {
    const nodeLabelGfx = new PIXI.Container();
    nodeLabelGfx.interactive = true;
    nodeLabelGfx.buttonMode = true;
    nodeLabelGfx.on('mouseover', () => this.emit('mouseover'));
    nodeLabelGfx.on('mouseout', () => this.emit('mouseout'));
    nodeLabelGfx.on('mousedown', () => this.emit('mousedown'));
    nodeLabelGfx.on('mouseup', () => this.emit('mouseup'));
    nodeLabelGfx.on('mouseupoutside', () => this.emit('mouseupoutside'));
    createNodeLabel(nodeLabelGfx);
    return nodeLabelGfx;
  }

  updatePosition(position: PIXI.IPointData) {
    this.nodeGfx.position.copyFrom(position);
    this.nodeLabelGfx.position.copyFrom(position);
  }

  updateStyle(nodeStyle: NodeStyle, textureCache: TextureCache) {
    updateNodeStyle(this.nodeGfx, nodeStyle, textureCache);
    updateNodeLabelStyle(this.nodeLabelGfx, nodeStyle, textureCache);
  }

  updateVisibility(zoomStep: number) {
    updateNodeVisibility(this.nodeGfx, zoomStep);
    updateNodeLabelVisibility(this.nodeLabelGfx, zoomStep);
  }
}