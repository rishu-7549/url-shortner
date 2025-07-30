import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  UseGuards,
  Req,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenUrlDto } from './dto/shorten-url.dto';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('URL Shortener')
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('api/test')
  @ApiResponse({ status: 200, description: 'Test endpoint' })
  async test(@Req() req) {
    return { message: 'Test successful', user: req.user };
  }

  @Post('api/shorten')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: ShortenUrlDto })
  @ApiResponse({ status: 201, description: 'URL shortened successfully.' })
  async shorten(@Body() dto: ShortenUrlDto, @Req() req) {
    
    if (!req.user) {
      console.error('No user found in request');
      throw new UnauthorizedException('User not authenticated');
    }

    if (!req.user.userId) {
      console.error('No userId found in user object:', req.user);
      throw new UnauthorizedException('Invalid user data');
    }

    try {
      const result = await this.urlService.createShortUrl(dto, req.user.userId);
      console.log('URL Shortened:', result);
      return result;
    } catch (error) {
      console.error('Error in shorten():', error);
      throw error;
    }
  }

  @Public()
  @Get('r/:shortCode')
  @HttpCode(302)
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    try {
      console.log(
        'UrlController - redirect called with shortCode:',
        shortCode,
      );

      const originalUrl =
        await this.urlService.redirectToOriginalUrl(shortCode);
      console.log('UrlController - Redirecting to:', originalUrl);

      return res.redirect(originalUrl);
    } catch (error) {
      console.error('UrlController - Error in redirect:', error);
      throw error;
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('api/stats/:shortCode')
  @ApiResponse({
    status: 200,
    description: 'URL statistics retrieved successfully.',
  })
  async stats(@Param('shortCode') shortCode: string, @Req() req) {
    return this.urlService.getStats(shortCode, req.user.userId);
  }

  // @Get('api/debug/:shortCode')
  // @ApiResponse({ status: 200, description: 'Debug stats for shortened URL' })
  // async getDebug(@Param('shortCode') shortCode: string) {
  //   return this.urlService.getStats(shortCode);
  // }
}
