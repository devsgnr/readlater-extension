type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  username?: string;
  image?: string | null | undefined;
};

type Collection = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  count: number;
  emoji?: string;
  visibility: "private" | "public";
  isUnsorted: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

type GetCollection = {
  user: User;
  collections: Collection[];
};

type TRPCResponse<T> = {
  result: {
    data: T;
  };
};

type GetCollectionResponse = TRPCResponse<GetCollection>;

type CreateBookmarkInput = {
  bookmark: {
    content: string;
    title: string;
    url: string;
    description: string;
    image: string;
  };
  collections?: string[] | undefined;
};

type Article = {
  title: string | null | undefined;
  content: string | null | undefined;
  textContent: string | null | undefined;
  length: number | null | undefined;
  excerpt: string | null | undefined;
  byline: string | null | undefined;
  dir: string | null | undefined;
  siteName: string | null | undefined;
  lang: string | null | undefined;
  publishedTime: string | null | undefined;
  cleaned: string;
} | null;

export type {
  User,
  Collection,
  GetCollectionResponse,
  CreateBookmarkInput,
  GetCollection,
  TRPCResponse,
  Article,
};
