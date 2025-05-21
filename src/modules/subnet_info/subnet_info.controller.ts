import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { SubnetInfoService } from './subnet_info.service';
import { Response } from 'express';
import {
  SubnetInfoResponseDto,
  SubnetListResponseDto,
} from './subnet_info.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Subnets')
@Controller('subnets')
export class SubnetInfoController {
  constructor(private readonly subnetInfoService: SubnetInfoService) {}

  /**
   * Get all subnet info records
   * @returns Promise<SubnetListResponseDto>
   */
  @ApiOperation({
    summary: 'Get all subnets',
    description:
      'Retrieves a complete list of all available subnets with their basic information.',
  })
  @ApiOkResponse({
    type: SubnetListResponseDto,
    description: 'Successfully retrieved list of subnets',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error occurred while processing the request',
  })
  @Get()
  async findAll(): Promise<SubnetListResponseDto> {
    return this.subnetInfoService.findAll();
  }

  /**
   * Get a single subnet info record by net_uid
   * @param net_uid The unique identifier of the subnet
   * @returns Promise<SubnetInfoResponseDto>
   */
  @ApiOperation({
    summary: 'Get subnet by ID',
    description:
      'Retrieves detailed information about a specific subnet identified by its unique net_uid.',
  })
  @ApiOkResponse({
    type: SubnetInfoResponseDto,
    description: 'Successfully retrieved subnet information',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Subnet with specified net_uid was not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid net_uid format provided',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error occurred while processing the request',
  })
  @Get(':net_uid')
  async findOne(
    @Param('net_uid') net_uid: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const record = await this.subnetInfoService.findOne(net_uid);
      if (!record) {
        res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Subnet with net_uid ${net_uid} not found`,
        });
        return;
      }
      res.status(HttpStatus.OK).json(record);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @ApiOperation({
    summary: 'Get token symbol by subnet id',
    description: "Retrieves the subnet's token symbol with the net_uid",
  })
  @ApiOkResponse({
    type: String,
    description: 'Successfully retrieved subnet information',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error occurred while processing the request',
  })
  @Get(':net_uid/symbol')
  async getSubnetSymbol(
    @Param('net_uid') net_uid: number,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const symbol = await this.subnetInfoService.getTokenSymbol(net_uid);
      res.status(HttpStatus.OK).json({ symbol });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
