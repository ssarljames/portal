export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];

  permission: string;

  isActive?: boolean;

  routerLinkOption?: any
}
