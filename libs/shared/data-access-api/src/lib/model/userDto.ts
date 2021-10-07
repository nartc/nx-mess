/**
 * Nx Messenger API
 * API documentation for Nx Messenger
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface UserDto { 
    createdAt: string;
    updatedAt: string;
    active: boolean;
    id: string;
    username: string;
    userId: string;
    name?: string;
    givenName?: string;
    familyName?: string;
    nickname?: string;
    email?: string;
    phoneNumber?: string;
    picture?: string;
}
