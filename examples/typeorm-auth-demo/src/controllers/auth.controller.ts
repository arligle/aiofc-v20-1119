import {
  CurrentUser,
  IAccessTokenPayload,
  SkipAuth,
  Permissions,
  PermissionCheckMode,
  Roles,
  RoleCheckMode,
} from '@aiofc/auth';
import { TenantClsStore } from '@aiofc/common-entities';
import { Controller, Get } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { RoleType } from './vo/role-type';

@Controller('auth')
export class AuthController {
  constructor(private readonly clsService: ClsService<TenantClsStore>) {}

  @Get('skip-auth')
  @SkipAuth()
  async skipAuth() {
    return 'hello';
  }

  @Get('no-permission')
  async noPermission() {
    return 'hello';
  }

  @Get('current-user')
  async userTest(@CurrentUser() payload: IAccessTokenPayload) {
    return payload;
  }

  @Get('first-level-any-permission')
  @Permissions('admin')
  async anyAdmin() {
    return 'hello';
  }

  @Get('second-level-any-permission')
  @Permissions('admin.user')
  async inviteUser() {
    return 'hello';
  }

  @Get('any-match')
  @Permissions(
    ['admin.user.create', 'admin.user.update'],
    'ALL',
    PermissionCheckMode.ANY
  )
  async anyMatch() {
    return 'hello';
  }

  @Get('each-match')
  @Permissions(
    ['admin.user.create', 'admin.user.update'],
    'ALL',
    PermissionCheckMode.EACH
  )
  async createOrUpdate() {
    return 'hello';
  }

  @Get('/cls-store')
  async getClsStore() {
    return this.clsService.get();
  }

  @Get('admin-role-default-check-mode')
  @Roles([RoleType.ADMIN])
  async anyAdminRole() {
    return 'hello';
  }

  @Get('admin-role-each-check-mode')
  @Roles([RoleType.ADMIN], RoleCheckMode.EACH)
  async eachAdminRole() {
    return 'hello';
  }

  @Get('admin-role-any-check-mode')
  @Roles([RoleType.ADMIN], RoleCheckMode.ANY)
  async anyCheckModeAdminRole() {
    return 'hello';
  }
}
