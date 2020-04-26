import { NavItem } from './side-menu-item/nav-item';

export const MENU: NavItem[] = [
    {
      displayName: 'Dashboard',
      route: 'management/',
      iconName: 'dashboard',
      allowed_roles: []
    },
    {
      displayName: 'Service Transactions',
      iconName: 'print',
      route: 'management/service-transactions',
      allowed_roles: []
    },
    {
      displayName: 'Students',
      iconName: 'contacts',
      route: 'management/students',
      allowed_roles: []
    },
    {
      displayName: 'Posting',
      iconName: 'developer_board',
      route: 'management/posts',
      allowed_roles: []
    },
    {
      displayName: 'Events',
      iconName: 'event',
      route: 'management/events',
      allowed_roles: []
    },
    {
      displayName: 'Administration',
      iconName: 'account_balance',
      allowed_roles: ['administrator'],
      children: [
        {
          displayName: 'Users',
          route: 'management/users',
          iconName: 'group',
          allowed_roles: [ 'administrator' ]
        },
        {
          displayName: 'Service Settings',
          route: 'management/settings/printing-service',
          iconName: 'insert_drive_file',
          allowed_roles: [ 'administrator' ]
        },
      ]
    }
  ];