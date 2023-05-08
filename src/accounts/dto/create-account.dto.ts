import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  operationManagerName: string;
}
