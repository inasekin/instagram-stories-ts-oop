export default class Swiped {
  constructor(elemTrigger, fireAfterTrigger) {
    this.touchstartX = 0;
    this.touchstartY = 0;
    this.touchendX = 0;
    this.touchendY = 0;

    this.elemTrigger = elemTrigger;
    this.fireAfterTrigger = {
      left: () => {},
      right: () => {},
      top: () => {},
      bottom: () => {},
      tap: () => {},
      ...fireAfterTrigger,
    };

    this.addEvent(this.elemTrigger);
  }

  addEvent(document) {
    document.addEventListener(
      'touchstart',
      (event) => {
        this.touchstartX = event.changedTouches[0].screenX;
        this.touchstartY = event.changedTouches[0].screenY;
      },
      false
    );

    document.addEventListener(
      'touchend',
      (event) => {
        this.touchendX = event.changedTouches[0].screenX;
        this.touchendY = event.changedTouches[0].screenY;
        this.handleGesture();
      },
      false
    );
  }

  handleGesture() {
    const delX = this.touchendX - this.touchstartX;
    const delY = this.touchendY - this.touchstartY;

    if (Math.abs(delX) > Math.abs(delY)) {
      if (delX > 0) return this.fireAfterTrigger.right();
      else return this.fireAfterTrigger.left();
    } else if (Math.abs(delX) < Math.abs(delY)) {
      if (delY > 0) return this.fireAfterTrigger.bottom();
      else return this.fireAfterTrigger.top();
    } else return this.fireAfterTrigger.tap();
  }
}
