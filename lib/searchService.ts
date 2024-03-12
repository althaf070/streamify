import { getSelf } from "./auth-store";
import { db } from "./db";

export const getSearch = async (term?: string) => {
  try {
    const self = await getSelf();
    const userId = self?.id;

    const streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
              mode: 'insensitive', // Case-insensitive search
            },
          },
          {
            user: {
              username: {
                contains: term,
                mode: 'insensitive', // Case-insensitive search
              },
            },
          },
        ],
        NOT: {
          user: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });

    return streams;
  } catch (error) {
    console.error("Error fetching streams:", error);
    return []; // Return an empty array if an error occurs
  }
};
