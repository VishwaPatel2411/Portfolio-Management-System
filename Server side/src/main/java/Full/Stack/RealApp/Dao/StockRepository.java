package Full.Stack.RealApp.Dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import Full.Stack.RealApp.Entities.ClientsInfo;
import Full.Stack.RealApp.Entities.StockInfo;
import jakarta.transaction.Transactional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

@Repository
@EnableJpaRepositories
public interface StockRepository extends JpaRepository<StockInfo, Integer> {

	List<StockInfo> findAllByClientId(int clientId);

	@Query("SELECT e FROM stocks_details e WHERE e.buy_sell = 'buy' AND e.clientId = :clientId")
	List<StockInfo> findHoldsByClientId(@Param("clientId") int clientId);

	void deleteByStockId(int stockId);

	StockInfo findBystockId(int stockId);

	ClientsInfo findByClientId(int clientId);

	@Query("SELECT e FROM stocks_details e WHERE e.buy_sell = 'sold' AND e.clientId = :clientId")
	List<StockInfo> findSoldStockByClientId(@Param("clientId") int clientId);

	@Query("SELECT Sum(c.totalSellPrice - c.totalBuyPrice) FROM stocks_details c WHERE c.buy_sell ='Sold' AND c.clientId = :clientId")
	Long StockProfit(@PathVariable("clientId") int clientId);

	@Query("select sum(totalSellPrice -totalBuyPrice) from stocks_details  where buy_sell= 'sold'")
	Long clientProfit();

	@Query("select e from stocks_details e where e.buy_sell ='buy'")
	List<StockInfo> backUpBuy();

	@Query("select e from stocks_details e where e.buy_sell ='sold'")
	List<StockInfo> backUpSold();



}
