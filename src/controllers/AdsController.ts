import { Request, Response } from 'express';
import prisma from '../prisma';
import { converHourStringToMinutes, convertMinutesAmountToHourString } from '../utils/DateUtils';

export async function CreateAdsController (request:Request, response:Response) {
  try {
    const { name, yearsPlaying, discord, weekdays, hourStart, hourEnd, useVoiceChannel, game_id: gameId } = request.body;
    const newAd = await prisma.ad.create({
      data: {
        discord,
        yearsPlaying,
        name,
        weekdays: weekdays.join(','),
        hourStart: converHourStringToMinutes(hourStart),
        hourEnd: converHourStringToMinutes(hourEnd),
        useVoiceChannel,
        game: {
          connect: {
            id: gameId
          }
        }
      }
    });

    if (!newAd?.id) return response.json({ success: false, message: 'Happening some error while create ADS!' });

    return response.json({ success: true });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, error });
  }
}

export async function ListAdsController (request:Request, response:Response) {
  try {
    const ads = await prisma.ad.findMany();
    const adsFormatted = ads.map(ad => {
      return {
        ...ad,
        weekdays: ad.weekdays.split(','),
        hourStart: convertMinutesAmountToHourString(ad.hourStart),
        hourEnd: convertMinutesAmountToHourString(ad.hourEnd)
      };
    });

    return response.json({ success: true, ads: adsFormatted });
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
