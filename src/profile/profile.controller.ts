import { Controller,Get, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from 'src/profile/dto/profile.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateProfileDto } from 'src/profile/dto/updateProfile.dto';


@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('me')
    @UseGuards(AuthGuard)
    getProfile(@Request() req) {
        const userID = req.user.id;
        return this.profileService.getProfile(userID);
    }

    @Patch('update')
    @UseGuards(AuthGuard)
    async updateProfile(
        @Request() req,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.profileService.updateProfile(req.user.id, updateProfileDto);
    }

}
