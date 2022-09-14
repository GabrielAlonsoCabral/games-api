import { Request, Response } from 'express';
import prisma from '../prisma';
import { convertMinutesAmountToHourString } from '../utils/DateUtils';

export async function ListGamesController (request:Request, response:Response) {
  try {
    const games = await prisma.game.findMany({
      orderBy: {
        Ads: { _count: 'desc' }
      },
      include: {
        _count: {
          select: {
            Ads: true

          }
        }
      }
    });
    return response.json({ success: true, games });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, error });
  }
}

export async function ListAdsByGamesController (request:Request, response:Response) {
  try {
    const { game_id: gameId } = request.params;
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekdays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourEnd: true,
        hourStart: true
      },
      where: { gameId },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const adsFiltered = ads.map(ad => {
      return {
        ...ad,
        weekdays: ad.weekdays.split(','),
        hourStart: convertMinutesAmountToHourString(ad.hourStart),
        hourEnd: convertMinutesAmountToHourString(ad.hourEnd)
      };
    });

    return response.json({ success: true, ads: adsFiltered });
  } catch (error) {
    console.error(error);
    return response.json({ success: false, error });
  }
}
