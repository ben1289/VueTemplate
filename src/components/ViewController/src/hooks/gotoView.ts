interface Attrs {
  props?: Record<string, any>
  events?: Record<string, Function>
}

const _view = ref<string>('')
const _attrs = ref<Attrs>({})

export default function useGotoView(view: string, attrs: Attrs = {}) {
  const { props = {}, events = {} } = attrs
  _view.value = view
  _attrs.value = { props, events }

  return {
    view: _view,
    attrs: _attrs,
  }
}
