import verge from 'verge';
import { Victor } from '@js-basics/vector';

export function getBounds (node) {
  return verge.rectangle(node);
}

export function getDimension (node) {
  const bounds = getBounds(node);
  return new Victor(bounds.width, bounds.height);
}

export function getOffset (node) {
  return new Victor(node.offsetLeft, node.offsetTop);
}

export function getTranslation (node) {
  const transform = new global.WebKitCSSMatrix(global.getComputedStyle(node).transform);
  return new Victor(transform.m41, transform.m42);
}

export function getPositionInViewport (node) {
  const bounds = getBounds(node);
  return new Victor(bounds.left, bounds.top);
}

export function getPositionInParentElement (node) {
  return new Victor(() => getTranslation(node) + getOffset(node));
}

export function intersects (node) {
  return verge.inViewport(node);
}
