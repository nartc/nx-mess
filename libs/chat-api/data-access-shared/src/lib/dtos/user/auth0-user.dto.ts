import { AutoMap } from '@automapper/classes';

export class Auth0UserDto {
  /** (unique) User's unique identifier. */
  @AutoMap()
  user_id!: string;
  /** (unique) User's username. */
  @AutoMap()
  username?: string;
  /** User's full name. */
  @AutoMap()
  name?: string;
  /** User's given name. */
  @AutoMap()
  given_name?: string;
  /** User's family name. */
  @AutoMap()
  family_name?: string;
  /** User's nickname. */
  @AutoMap()
  nickname?: string;
  /** (unique) User's email address. */
  @AutoMap()
  email?: string;
  /** Indicates whether the user has verified their email address. */
  @AutoMap()
  email_verified!: boolean;
  /** User's phone number. Only valid for users with SMS connections. */
  @AutoMap()
  phone_number?: string;
  /** Indicates whether the user has verified their phone number. Only valid for users with SMS connections. */
  @AutoMap()
  phone_verified?: boolean;
  /** URL pointing to the [user's profile picture](https://auth0.com/docs/users/change-user-picture). */
  @AutoMap()
  picture?: string;
  /** Timestamp indicating when the user profile was first created. */
  @AutoMap()
  created_at!: string;
  /** Timestamp indicating when the user's profile was last updated/modified. */
  @AutoMap()
  updated_at!: string;
}
