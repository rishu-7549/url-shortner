import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './interfaces/url.interfaces';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlService {
  constructor(@InjectModel('Url') private urlModel: Model<Url>) {}

  async createShortUrl(dto: ShortenUrlDto, userId: string) {
    try {
      console.log('UrlService - createShortUrl called with:', {
        dto,
        userId,
      });

      const { url, customCode } = dto;

      const shortCode = customCode || nanoid(7);
      console.log('UrlService - Generated shortCode:', shortCode);

      const existing = await this.urlModel.findOne({ shortCode });
      if (existing) {
        throw new ConflictException('Custom code already in use.');
      }

      console.log('UrlService - Creating URL document with user:', userId);
      const created = await this.urlModel.create({
        originalUrl: url,
        shortCode,
        user: userId, 
      });

      console.log('UrlService - Created document:', created);

      const result = {
        originalUrl: url,
        shortUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/r/${shortCode}`,
      };

      console.log('UrlService - Returning result:', result);
      return result;
    } catch (error) {
      console.error('UrlService - Error in createShortUrl:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create short URL');
    }
  }

  async redirectToOriginalUrl(shortCode: string): Promise<string> {
    try {
      console.log(
        'UrlService - redirectToOriginalUrl called with shortCode:',
        shortCode,
      );

      const urlDoc = await this.urlModel.findOne({ shortCode });
      console.log('UrlService - Found URL document:', urlDoc);

      if (!urlDoc) {
        console.log(
          'UrlService - No URL document found for shortCode:',
          shortCode,
        );
        throw new NotFoundException('Short URL not found.');
      }

      console.log(
        'UrlService - Incrementing clicks for URL:',
        urlDoc.originalUrl,
      );
      urlDoc.clicks++;
      await urlDoc.save();
      console.log(
        'UrlService - Clicks updated, returning original URL:',
        urlDoc.originalUrl,
      );

      return urlDoc.originalUrl;
    } catch (error) {
      console.error('UrlService - Error in redirectToOriginalUrl:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to redirect to original URL',
      );
    }
  }

  async getStats(shortCode: string, userId?: string) {
    const query: any = { shortCode };
    if (userId) query.user = userId;

    const urlDoc = await this.urlModel.findOne(query);
    if (!urlDoc) throw new NotFoundException('Short URL not found.');

    return {
      originalUrl: urlDoc.originalUrl,
      shortUrl: `${process.env.BASE_URL}/r/${urlDoc.shortCode}`,
      clicks: urlDoc.clicks,
    };
  }
}
