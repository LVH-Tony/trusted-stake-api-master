import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { SubnetIdentityService } from './subnet_identity.service';
import { Response } from 'express';
import {
  SubnetIdentityResponseDto,
  SubnetIdentityListResponseDto,
} from './subnet_identity.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Subnet Identities')
@Controller('subnet_identities')
export class SubnetIdentityController {
  constructor(private readonly identityService: SubnetIdentityService) {}

  /**
   * Get all subnet identity records
   * @returns Promise<SubnetIdentityListResponseDto>
   */
  @ApiOperation({
    summary: 'Get all subnet identity records',
    description:
      'Retrieves a complete list of all available subnets with their identity information.',
  })
  @ApiOkResponse({
    type: SubnetIdentityListResponseDto,
    description: 'Successfully retrieved list of subnet identities',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error occurred while processing the request',
  })
  @Get()
  async findAll(): Promise<SubnetIdentityListResponseDto> {
    return this.identityService.findAll();
  }

  /**
   * Get a single subnet info record by net_uid
   * @param net_uid The unique identifier of the subnet
   * @returns Promise<SubnetIdentityResponseDto>
   */
  @ApiOperation({
    summary: 'Get subnet identity record by ID',
    description:
      'Retrieves identity information about a specific subnet identified by its unique net_uid.',
  })
  @ApiParam({
    name: 'net_uid',
    description: 'Unique identifier of the subnet',
    type: Number,
    example: 1,
    required: true,
  })
  @ApiOkResponse({
    type: SubnetIdentityResponseDto,
    description: 'Successfully retrieved subnet identity',
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
      const record = await this.identityService.findOne(net_uid);
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
}
