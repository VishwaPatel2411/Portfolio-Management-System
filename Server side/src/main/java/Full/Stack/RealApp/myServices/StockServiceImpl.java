package Full.Stack.RealApp.myServices;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import Full.Stack.RealApp.Dao.ClientRepository;
import Full.Stack.RealApp.Dao.StockRepository;
import Full.Stack.RealApp.Entities.ClientsInfo;
import Full.Stack.RealApp.Entities.StockInfo;
import jakarta.transaction.Transactional;

@Service
public class StockServiceImpl implements StockService {

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private StockRepository stockRepository;

	@Override
	public StockInfo addStockForClient(int id, StockInfo stockInfo) {
		Optional<ClientsInfo> c = clientRepository.findById(id);
		stockInfo.setClientId(id);
		stockInfo.setTotalBuyPrice(stockInfo.getBuyQuantity() * stockInfo.getBuyprice());
		return stockRepository.save(stockInfo);

	}

	@Override // query based
	public List<StockInfo> getHoldStocksByClientId(int clientId) {
		return stockRepository.findHoldsByClientId(clientId);

	}

	@Override // Query based
	public List<StockInfo> getSoldStocksByClientId(int clientId) {
		return stockRepository.findSoldStockByClientId(clientId);
	}

	@Override
	public StockInfo getStockByStockId(int stockId) {
		return stockRepository.findBystockId(stockId);
	}

	@Override
	@Transactional
	public String deleteStock(int stockId) {
		stockRepository.deleteByStockId(stockId);
		return " deleted successfully";

	}

	@Override
	public ResponseEntity<StockInfo> updateStock(int clientId, int stockId, StockInfo stockInfo) {
		StockInfo s = stockRepository.findBystockId(stockId);

		if (s != null) {
			s.setClientId(clientId);
			s.setBuy_sell(stockInfo.getBuy_sell());
			s.setBuyDate(stockInfo.getBuyDate());
			s.setBuyprice(stockInfo.getBuyprice());
			s.setBuyQuantity(stockInfo.getBuyQuantity());
			s.setStockName(stockInfo.getStockName());
			s.setTotalBuyPrice(stockInfo.getBuyQuantity() * stockInfo.getBuyprice());
			StockInfo si = stockRepository.save(s);
			return ResponseEntity.ok(si);
		}
		return null;
	}

	@Override
	public ResponseEntity<StockInfo> updateToSold(int stockId, StockInfo stockInfo) {

		StockInfo s = stockRepository.findBystockId(stockId);
		s.setClientId(stockInfo.getClientId());
		s.setStockName(stockInfo.getStockName());
		s.setBuy_sell("Sold");
		StockInfo si = stockRepository.save(s);
		return ResponseEntity.ok(si);
	}

	@Override
	@Transactional
	public ResponseEntity<StockInfo> addToSold(int stockId, int clientId, StockInfo stockInfo) {
		StockInfo s = stockRepository.findBystockId(stockId);
		if (s != null && stockInfo.getSellQuantity() == s.getBuyQuantity()) {

			stockInfo.setTotalBuyPrice(stockInfo.getBuyQuantity() * stockInfo.getBuyprice());
			stockInfo.setTotalSellPrice(stockInfo.getSellQuantity() * stockInfo.getSellPrice());
			stockInfo.setBuy_sell("Sold");
			stockInfo.setClientId(clientId);
			stockInfo.setBuyDate(s.getBuyDate());
			stockInfo.setBuyprice(s.getBuyprice());
			stockInfo.setBuyQuantity(s.getBuyQuantity());
			stockInfo.setTotalBuyPrice(s.getBuyprice() * s.getBuyQuantity());
			StockInfo si = stockRepository.save(stockInfo);
			deleteStock(s.getStockId());
			return ResponseEntity.ok(si);
		} else {
			long a = s.getBuyQuantity() - stockInfo.getSellQuantity();
			s.setBuyQuantity(a);
			s.setTotalBuyPrice(s.getBuyQuantity() * s.getBuyprice());
			stockInfo.setBuy_sell("Sold");
			System.out.println("clientid=" + clientId);
			stockInfo.setClientId(clientId);
			stockInfo.setBuyDate(s.getBuyDate());
			stockInfo.setBuyprice(s.getBuyprice());
			stockInfo.setBuyQuantity(stockInfo.getSellQuantity());
			stockInfo.setTotalBuyPrice(stockInfo.getBuyQuantity() * stockInfo.getBuyprice());
			stockInfo.setTotalSellPrice(stockInfo.getSellQuantity() * stockInfo.getSellPrice());
			System.out.println("" + s.getStockId());

			StockInfo si = stockRepository.save(stockInfo);
			return ResponseEntity.ok(si);

		}
	}

	@Override
	public ResponseEntity<StockInfo> updateSoldStock(int clientId, int stockId, StockInfo stockInfo) {
		StockInfo s = stockRepository.findBystockId(stockId);

		if (s != null) {
			s.setBuy_sell("sold");
			s.setSellDate(stockInfo.getSellDate());
			s.setSellPrice(stockInfo.getSellPrice());
			s.setSellQuantity(stockInfo.getSellQuantity());
			s.setStockName(stockInfo.getStockName());
			s.setTotalSellPrice(s.getSellPrice() * s.getSellQuantity());
			StockInfo si = stockRepository.save(s);
			return ResponseEntity.ok(si);
		}
		return null;
	}

	List<StockInfo> s;

	@Override
	@Transactional
	public void mergeSellColumns() {

		l = stockRepository.backUpSold();
		backUpSold = new ArrayList<>(stockRepository.backUpSold());
		s = new ArrayList<>(backUpSold.size());
		for (StockInfo original : backUpSold) {
			StockInfo copy = new StockInfo();
			copy.setBuy_sell(original.getBuy_sell());
			copy.setBuyDate(original.getBuyDate());
			copy.setBuyprice(original.getBuyprice());
			copy.setBuyQuantity(original.getBuyQuantity());
			copy.setClientId(original.getClientId());
			copy.setSellDate(original.getSellDate());
			copy.setSellPrice(original.getSellPrice());
			copy.setSellQuantity(original.getSellQuantity());
			copy.setStockId(original.getStockId());
			copy.setStockName(original.getStockName());
			copy.setTotalBuyPrice(original.getTotalBuyPrice());
			copy.setTotalSellPrice(original.getTotalSellPrice());
			s.add(copy);

		}
		for (int i = 0; i < l.size(); i++) {
			StockInfo current = l.get(i);
			for (int j = i + 1; j < l.size(); j++) {
				StockInfo next = l.get(j);
				if (current.getClientId() == next.getClientId() && current.getStockName().equals(next.getStockName())) {
					if (current.getStockId() < next.getStockId()) {
						current.setSellQuantity(current.getSellQuantity() + next.getSellQuantity());
						current.setBuyQuantity(current.getBuyQuantity() + next.getBuyQuantity());
						current.setTotalBuyPrice(current.getTotalBuyPrice() + next.getTotalBuyPrice());
						current.setTotalSellPrice(current.getTotalSellPrice() + next.getTotalSellPrice());
						current.setSellDate(next.getSellDate());
						current.setBuyDate(current.getBuyDate());
						current.setBuyprice(current.getTotalBuyPrice() / current.getBuyQuantity());
						current.setSellPrice(current.getTotalSellPrice() / current.getSellQuantity());
						System.out.println(" s :" + s);

						stockRepository.delete(next);
					} else {
						next.setSellQuantity(next.getSellQuantity() + current.getSellQuantity());
						next.setBuyQuantity(next.getBuyQuantity() + current.getBuyQuantity());
						next.setTotalBuyPrice(next.getTotalBuyPrice() + current.getTotalBuyPrice());
						next.setTotalSellPrice(next.getTotalSellPrice() + current.getTotalSellPrice());
						next.setSellDate(current.getSellDate());
						next.setBuyDate(next.getBuyDate());
						next.setBuyprice(next.getTotalBuyPrice() / next.getBuyQuantity());
						stockRepository.delete(current);
					}
				}
			}
		}
	}

	List<StockInfo> l;
	List<StockInfo> backUpBuy;
	List<StockInfo> backUpSold;
	List<StockInfo> b;

	long q;
	float bp;
	float tb;

	@Override
	@Transactional
	public void mergeBuyColumns() {

		backUpBuy = new ArrayList<>(stockRepository.backUpBuy());
		l = stockRepository.backUpBuy();
		b = new ArrayList<>(backUpBuy.size());
		for (StockInfo original : backUpBuy) {
			StockInfo copy = new StockInfo();
			copy.setBuyQuantity(original.getBuyQuantity());
			copy.setTotalBuyPrice(original.getTotalBuyPrice());
			copy.setBuyprice(original.getTotalBuyPrice() / original.getBuyQuantity());
			copy.setStockId(original.getStockId());
			copy.setClientId(original.getClientId());
			copy.setStockName(original.getStockName());
			copy.setBuy_sell(original.getBuy_sell());
			copy.setBuyDate(original.getBuyDate());
			b.add(copy);
		}

		for (int i = 0; i < l.size(); i++) {
			StockInfo current = l.get(i);

			for (int j = i + 1; j < l.size(); j++) {
				StockInfo next = l.get(j);

				if (current.getClientId() == next.getClientId() && current.getBuy_sell().equals(next.getBuy_sell())
						&& current.getStockName().equals(next.getStockName())) {

					if (current.getStockId() < next.getStockId()) {
						current.setBuyDate(current.getBuyDate());
						current.setBuyQuantity(current.getBuyQuantity() + next.getBuyQuantity());
						current.setTotalBuyPrice(current.getTotalBuyPrice() + next.getTotalBuyPrice());
						current.setBuyprice(current.getTotalBuyPrice() / current.getBuyQuantity());
						System.out.println(" b :" + b);

						stockRepository.delete(next);
					} else {
						next.setBuyDate(next.getBuyDate());
						next.setBuyQuantity(current.getBuyQuantity() + next.getBuyQuantity());
						next.setTotalBuyPrice(current.getTotalBuyPrice() + next.getTotalBuyPrice());
						next.setBuyprice(next.getTotalBuyPrice() / next.getBuyQuantity());
						stockRepository.delete(current);
					}
				}
			}
		}
	}

	@Override
	@Transactional
	public void undoMerge() {
		System.out.println("in undoMerge b:" + b);

		if (b != null) {
			for (StockInfo stockInfo : b) {
				StockInfo entity = new StockInfo();
				entity.setBuyQuantity(stockInfo.getBuyQuantity());
				entity.setTotalBuyPrice(stockInfo.getTotalBuyPrice());
				entity.setBuyprice(stockInfo.getBuyprice());
				entity.setStockId(stockInfo.getStockId());
				entity.setClientId(stockInfo.getClientId());
				entity.setStockName(stockInfo.getStockName());
				entity.setBuy_sell(stockInfo.getBuy_sell());
				entity.setBuyDate(stockInfo.getBuyDate());

				stockRepository.save(entity);
			}
			b = null;
		} else {
			System.out.println("No original data available to undo merge operation.");
		}
	}

	@Override
	@Transactional
	public void undoSoldMerge() {
		System.out.println("in undoMerge s:" + s);

		if (s != null) {
			System.out.println("inside s != null ");
			for (StockInfo stockInfo : s) {
				StockInfo entity = new StockInfo();
				entity.setBuy_sell(stockInfo.getBuy_sell());
				entity.setBuyDate(stockInfo.getBuyDate());
				entity.setBuyprice(stockInfo.getBuyprice());
				entity.setBuyQuantity(stockInfo.getBuyQuantity());
				entity.setClientId(stockInfo.getClientId());
				entity.setSellDate(stockInfo.getSellDate());
				entity.setSellPrice(stockInfo.getSellPrice());
				entity.setSellQuantity(stockInfo.getSellQuantity());
				entity.setStockId(stockInfo.getStockId());
				entity.setStockName(stockInfo.getStockName());
				entity.setTotalBuyPrice(stockInfo.getTotalBuyPrice());
				entity.setTotalSellPrice(stockInfo.getTotalSellPrice());

				stockRepository.save(entity);
			}
			s = null;
		} else {
			System.out.println("No original data available to undo merge operation.");
		}
	}

	@Override
	public ResponseEntity<Long> stockProfit(int clientId) {
		Long stockProfit = stockRepository.StockProfit(clientId);
		return ResponseEntity.ok(stockProfit);
	}

	@Override
	public ResponseEntity<Long> clientProfit() {
		Long a = stockRepository.clientProfit();
		return ResponseEntity.ok(a);
	}
}
