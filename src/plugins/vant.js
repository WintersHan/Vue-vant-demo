import Vue from 'vue';
import {
  Button,
  Toast,
  NavBar,
  Swipe,
  SwipeItem,
  Dialog,
  TreeSelect,
  Cell,
  DropdownMenu,
  DropdownItem,
  DatetimePicker,
  Picker,
  Collapse,
  CollapseItem,
  ActionSheet,
  Area,
  CellGroup,
  Uploader,
  Field,
  Lazyload,
  Search,
  List,
  Sticky,
  Popup,
  PasswordInput,
  NumberKeyboard,
  Tab,
  Tabs,
  IndexBar,
  IndexAnchor,
  Col,
  Row,
  Grid,
  GridItem,
  Skeleton,
  Switch,
  Rate,
  Radio,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Form,
  Icon,
  Tag,
  CountDown,
  ImagePreview,
  Empty,
  PullRefresh,
  Divider,
  Steps,
  Step
} from 'vant';

import { Image as VanImage } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
Vue.use(PullRefresh);
Vue.use(Button);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(TreeSelect);
Vue.use(Area);
Vue.use(CellGroup);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(Picker);
Vue.use(ActionSheet);
Vue.use(Field);
Vue.use(Swipe).use(SwipeItem);// 轮播图
Vue.use(Lazyload, {
  error: '/img/default.png'
});// 图片懒加载
Vue.use(Search);// 搜索框
Vue.use(List);// 上拉加载
Vue.use(Sticky);// 吸顶
Vue.use(Popup);// 弹窗层
Vue.use(PasswordInput);// 密码输入框
Vue.use(NumberKeyboard);// 数字键盘
Vue.use(Tab);// 标签
Vue.use(Tabs);// 标签
Vue.use(IndexBar); // 索引栏
Vue.use(IndexAnchor);
Vue.use(Col);
Vue.use(Row);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Skeleton);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(RadioGroup);
Vue.use(Form);
Vue.use(Switch);
Vue.use(Icon);
Vue.use(Rate);
Vue.use(Tag);
Vue.use(CountDown);
Vue.use(ImagePreview);
Vue.use(VanImage);
Vue.use(Empty);
Vue.use(Divider);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Tabbar);
Vue.use(TabbarItem);
