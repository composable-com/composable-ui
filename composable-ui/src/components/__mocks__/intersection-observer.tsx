export const mockedIntersectionObserver = class {
  root: null
  rootMargin: '0px'
  thresholds: [0]

  constructor(callback: IntersectionObserverCallback) {
    this.root = null
    this.rootMargin = '0px'
    this.thresholds = [0]

    callback([{ isIntersecting: true } as IntersectionObserverEntry], this)
  }

  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}
