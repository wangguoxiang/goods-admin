import {
  HomeOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  ToolOutlined,
  UserOutlined,
  GlobalOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';

const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: 'stock_manager', 
    path: '/admin/home', // 对应的path
    icon: HomeOutlined, // 图标名称
    public: true, // 公开的
  },
  {
    title: '教材库存管理',
    key: '',
    icon:  AppstoreOutlined,
    children: [ // 子菜单列表
      {
        title: '征订任务管理',
        key: 'task',
        path: '/admin/book/books', 
        icon: UnorderedListOutlined
      },
      {
        title: '入库管理',
        key: 'into_stock',
        path: '/admin/book/books', 
        icon: ToolOutlined
      },
      {
        title: '发放管理',
        key: 'outto_stock',
        path: '/admin/book/books', 
        icon: UnorderedListOutlined
      },
      {
        title: '教材库存管理',
        key: 'stocks',
        path: '/admin/book/books', 
        icon: UnorderedListOutlined
      },
    ]
  },

  {
    title: '信息管理',
    key: 'info',
    icon: GlobalOutlined,
    children: [ // 子菜单列表
      {
        title: '用户管理',
        key: 'user',
        path: '/admin/user', 
        icon: UnorderedListOutlined
      },
      {
        title: '权限管理',
        key: 'product',
        path: '/admin/access', 
        icon: ToolOutlined
      },
      {
        title: '角色管理',
        key: 'role',
        path: '/admin/role', 
        icon: SafetyOutlined,
      },
    ]
  },
  {
    title: '教材管理',
    key: 'charts',
    icon: AreaChartOutlined,
    children: [
      {
        title: '教材信息管理',
        key: 'bar',
        path: '/admin/charts/bar', 
        icon: BarChartOutlined
      },
      {
        title: '供应商管理',
        key: 'line',
        path: '/admin/charts/line', 
        icon: LineChartOutlined
      },
    ]
  },
  {
    title: '费用管理',
    key: 'charts',
    icon: AreaChartOutlined,
    children: [
      {
        title: '教材费用管理',
        key: 'bar',
        path: '/admin/charts/bar', 
        icon: BarChartOutlined
      }, 
    ]
  },
]

export default menuList