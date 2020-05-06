import { NavItem } from './side-menu-item/nav-item';

export const MENU: NavItem[] = [
    {
      displayName: 'Dashboard',
      route: 'management/',
      iconName: 'dashboard',
      permission: null
    },
    {
      displayName: 'Students',
      iconName: 'contacts',
      route: 'management/students',
      permission: 'MANAGE_STUDENTS_VIEW_ANY'
    },
    {
      displayName: 'Posting',
      iconName: 'developer_board',
      route: 'management/posts',
      permission: 'MANAGE_POSTS_VIEW_ANY'
    },
    {
      displayName: 'Events',
      iconName: 'event',
      route: 'management/events',
      permission: 'MANAGE_EVENTS_VIEW_ANY'
    },
    {
      displayName: 'Service Transactions',
      iconName: 'print',
      route: 'management/service-transactions',
      permission: 'MANAGE_SERVICE_TRANSACTIONS_VIEW_ANY'
    },
    {
      displayName: 'Administration',
      iconName: 'account_balance',
      permission: 'ADMIN',
      children: [
        {
          displayName: 'Users',
          route: 'management/users',
          iconName: 'group',
          permission: 'MANAGE_USERS_VIEW_ANY'
        },
        {
          displayName: 'Service Settings',
          route: 'management/settings/printing-service',
          iconName: 'insert_drive_file',
          permission: 'MANAGE_PRINT_SERVICE_SETTINGS_VIEW_ANY'
        },
      ]
    }
  ];