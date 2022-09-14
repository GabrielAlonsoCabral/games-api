import { Request, Response } from 'express';
import prisma from '../prisma';

export async function ListAdsController (request:Request, response:Response) {
  try {
    const ads = await prisma.ad.findMany();
    return response.json({ success: true, ads });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, error });
  }
}
export async function GetDiscordByAdController (request:Request, response:Response) {
  try {
    const { id: adId } = request.params;

    const ad = await prisma.ad.findUniqueOrThrow({
      where: {
        id: adId
      },
      select: {
        discord: true
      }
    });

    return response.json({ success: true, discord: ad.discord });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, error });
  }
}
