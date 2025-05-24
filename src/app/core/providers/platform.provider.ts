import { PLATFORM_ID, Injectable, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get window(): Window | null {
    return this.isBrowser ? window : null;
  }

  get document(): Document | null {
    return this.isBrowser ? document : null;
  }

  get navigator(): Navigator | null {
    return this.isBrowser ? navigator : null;
  }

  get localStorage(): Storage | null {
    return this.isBrowser ? localStorage : null;
  }
}