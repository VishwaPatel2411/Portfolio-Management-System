export class StockInfo {
    [key: string]: any;

    clientId: number;
    stockId: number;
    stockName: string;
    buy_sell: string;
    buyprice: number;
    buyQuantity: number;
    buyDate: string;
    totalBuyPrice: number;
    sellPrice: number;
    sellQuantity: number;
    sellDate: string;
    totalSellPrice: number;

}
