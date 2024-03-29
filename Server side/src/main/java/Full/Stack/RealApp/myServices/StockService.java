package Full.Stack.RealApp.myServices;

import java.util.List;

import org.springframework.http.ResponseEntity;

import Full.Stack.RealApp.Entities.StockInfo;

public interface StockService {

	StockInfo addStockForClient(int id, StockInfo stockInfo);

	List<StockInfo> getHoldStocksByClientId(int clientId);

	String deleteStock(int stockId);

	ResponseEntity<StockInfo> updateStock(int stockId, int clientId, StockInfo stockInfo);

	StockInfo getStockByStockId(int stockId);

	List<StockInfo> getSoldStocksByClientId(int clientId);

	ResponseEntity<StockInfo> updateToSold(int stockId, StockInfo stockInfo);

	ResponseEntity<StockInfo> addToSold(int stockId, int clientId, StockInfo stockInfo);

	ResponseEntity<StockInfo> updateSoldStock(int clientId, int stockId, StockInfo stockInfo);

	void mergeSellColumns();

	void mergeBuyColumns();

	void undoMerge();

	void undoSoldMerge();

	ResponseEntity<Long> stockProfit(int clientId);

	ResponseEntity<Long> clientProfit();

}
