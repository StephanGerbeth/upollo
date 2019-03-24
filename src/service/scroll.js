import { fromEvent } from 'rxjs';
import { startWith, map, share } from 'rxjs/operators';
import verge from 'verge';
import { Victor } from '@js-basics/vector';

const observer = new Map();
let lastPosition = new Victor(verge.scrollX(), verge.scrollY());

export function getScrollObserver (el = global) {
  if (!observer.has(el)) {
    observer.set(el, fromEvent(el, 'scroll'));
  }
  return observer.get(el)
    .pipe(
      startWith(0),
      map(() => {
        let position = new Victor(verge.scrollX(), verge.scrollY());
        let direction = new Victor(() => (position - lastPosition) / Math.abs(position - lastPosition));
        lastPosition = position;
        return {
          position,
          direction
        };
      }),
      share()
    );
}
