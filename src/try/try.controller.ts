import { Body, Controller, Post } from '@nestjs/common';
import { TryService } from './try.service';

@Controller('try')
export class TryController {
    constructor(private readonly tryService: TryService) {}

    @Post('createData')
    async createData(@Body() data: any): Promise<void> {
        await this.tryService.createData(data);
    }
}