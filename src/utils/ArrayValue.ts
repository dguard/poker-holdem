import { action, makeObservable, observable } from 'mobx'

export class ArrayValue {
  // observable
  value: Object[] = []

  constructor(private initialValue = []) {
    this.value = this.initialValue
    makeObservable(this, {
      value: observable,
      set: action,
    })
  }

  set = (arr: Object[]) => {
    this.value = arr
  }
}
