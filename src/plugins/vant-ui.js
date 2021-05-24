import {
  Button,
  Row,
  Col,
  CellGroup,
  Icon,
  Popup,
  Checkbox,
  CheckboxGroup,
  Field,
  NumberKeyboard,
  RadioGroup,
  Radio,
  Search,
  Switch,
  Loading,
  PullRefresh,
  List,
  Panel,
  Toast
} from 'vant'
export default class VantUI {
  init(_vue) {
    _vue.use(Button)
    _vue.use(Row)
    _vue.use(Col).use(CellGroup)
    _vue.use(Icon)
    _vue.use(Popup)
    _vue.use(Checkbox)
    _vue.use(CheckboxGroup)
    _vue.use(NumberKeyboard)
    _vue.use(RadioGroup)
    _vue.use(Search)
    _vue.use(Field)
    _vue.use(Radio)
    _vue.use(Switch)
    _vue.use(Loading)
    _vue.use(PullRefresh)
    _vue.use(List)
    _vue.use(Panel)
    _vue.use(Toast)
  }
}
