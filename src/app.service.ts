import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection() private readonly mongoConnection: Connection,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  isDbAlive(): Promise<{ status: string; message: string }> {
    try {
      const state = this.mongoConnection.readyState;
      if (state === ConnectionStates.connected) {
        return Promise.resolve({
          status: 'success',
          message: 'Database connection is alive',
        });
      } else {
        return Promise.resolve({
          status: 'error',
          message: 'Database connection is not ready',
        });
      }
    } catch (error) {
      return Promise.resolve({
        status: 'error',
        message: `Database connection error: ${error.message}`,
      });
    }
  }
}
