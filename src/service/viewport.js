import { combineLatest } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { resizeObserver, scrollObserver } from './window';

export const viewportObserver = combineLatest(resizeObserver, scrollObserver)
  .pipe(
    shareReplay()
  );
