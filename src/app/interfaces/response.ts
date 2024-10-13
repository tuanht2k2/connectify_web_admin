namespace ResponseInterfaces {
  export interface IAccount {
    id?: string;
    type?: number;
    phoneNumber?: string;
    email?: string;
    password?: string;
    profileImage?: string;
    displayName?: string;
    createdAt?: Date;
    coverImage?: string;
  }

  export interface IPostResponse {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    content?: string;
    type?: "NORMAL" | "PROFILE_IMAGE";
    audience?: "PUBLIC" | "FRIENDS" | "PRIVATE";
    createdBy?: ResponseInterfaces.IAccount;
    // reactions?: IReactionResponse[];
    group?: any;
    // files: IFileResponse[];
  }
}
