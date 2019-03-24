import { fromEvent, timer, combineLatest } from 'rxjs';
import { map, debounce, startWith, share } from 'rxjs/operators';
import { getScrollObserver } from './scroll';
import verge from 'verge';
import { Victor } from '@js-basics/vector';

const resizeObserver = fromEvent(global, 'resize')
  .pipe(
    startWith(0),
    debounce(() => timer(350)),
    map(() => new Victor(verge.viewportW(), verge.viewportH())),
    share()
  );

export const viewportObserver = combineLatest(resizeObserver, getScrollObserver())
  .pipe(
    share()
  );
