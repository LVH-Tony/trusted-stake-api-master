import { ApiPromise, WsProvider } from '@polkadot/api';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BlockMonitorService {
  private api: ApiPromise;

  constructor(
    private readonly configService: ConfigService,
  ) {
    void this.connectAPI(this.configService.get<string>('BITTENSOR_RPC'));
  }

  async connectAPI(url?: string) {
    if (!url) return;
    try {
      const provider = new WsProvider(url);
      this.api = await ApiPromise.create({ provider });

      this.api.on('connected', () => {
        Logger.log('Successfully connected to the RPC node.');
      });
      this.api.on('disconnected', () => {
        Logger.warn('Disconnected from the RPC node.');
      });
      this.api.on('error', () => {
        Logger.error('An error occured');
      });
      this.api.on('ready', () => {
        Logger.log('API Ready');
      });

      await this.api.isReady;

      await this.api.rpc.chain.subscribeNewHeads(async (header) => {
        const height = header.number.toNumber();
        await this.processBlock(height);
      });
    } catch (e) {
      Logger.error(
        `[Indexer] Failed to connect to the RPC node. ${url} Error code: ${e}`,
      );
    }
  }

  async processBlock(height: number) {
  }
}
