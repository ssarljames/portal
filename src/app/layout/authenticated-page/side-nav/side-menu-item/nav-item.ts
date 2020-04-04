export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];

  allowed_roles: string[];

  isActive?: boolean;
}
