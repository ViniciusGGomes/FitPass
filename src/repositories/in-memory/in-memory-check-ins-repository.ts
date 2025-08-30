import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export class InMemoryCheckInRepository implements CheckInRepository {
  public itens: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date) {
    const startDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.itens.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.itens.push(checkIn);

    return checkIn;
  }
}
