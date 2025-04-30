export function useSetFormValue(name: string, value: string) {
  return function setValue(event) {
    const form = event.currentTarget.form
    if (!form || !form.elements[name]) return;

    form.elements[name].value = value
    form.elements[name].focus()
  }
}