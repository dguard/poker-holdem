import { action, makeObservable, observable } from 'mobx'

export class StringValue {
  // observable
  value: string = ''

  constructor(private initialValue = '') {
    this.value = this.initialValue
    makeObservable(this, {
      value: observable,
      set: action,
    })
  }

  set = (text: string) => {
    this.value = text
  }
}
