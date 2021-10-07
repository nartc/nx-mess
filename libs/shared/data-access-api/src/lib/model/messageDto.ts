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
import { UserDto } from './userDto';


export interface MessageDto { 
    createdAt: string;
    updatedAt: string;
    active: boolean;
    id: string;
    text: string;
    sender: UserDto;
    receiver?: UserDto;
    attachmentThumbnail?: string;
    attachmentOriginal?: string;
    reactions: { [key: string]: string; };
}
