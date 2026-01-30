type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

type Collection = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  count: number;
  visibility: "private" | "public";
  createdAt: Date | null;
  updatedAt: Date | null;
};

type GetCollectionResponse = {
  result: {
    data: {
      user: User;
      collections: Collection[];
    };
  };
};

export type { User, Collection, GetCollectionResponse };
